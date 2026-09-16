import { Pool } from "pg";
import { getPayload } from "payload";
import config from "../src/payload.config";

if (!process.env.DATABASE_URL)
  throw new Error("DATABASE_URL is required to migrate Payload media.");

const payload = await getPayload({ config });
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function upload(url: string, filename: string, alt: string) {
  const existing = await payload.find({
    collection: "media",
    where: { filename: { equals: filename } },
    limit: 1,
    locale: "en",
  });
  if (existing.docs[0]) return existing.docs[0].id;
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(
      `Could not download ${url}: ${response.status} ${response.statusText}`,
    );
  const data = Buffer.from(await response.arrayBuffer());
  const mimetype =
    response.headers.get("content-type")?.split(";")[0] ?? "image/jpeg";
  const media = await payload.create({
    collection: "media",
    locale: "en",
    context: { skipRevalidation: true },
    data: { alt },
    file: { data, mimetype, name: filename, size: data.length },
  });
  return media.id;
}

try {
  const pages = await pool.query<{
    id: number;
    page_key: string;
    hero_legacy_image_url: string;
  }>(
    "select id, page_key, hero_legacy_image_url from pages where hero_legacy_image_url is not null and hero_legacy_image_url <> $1 and hero_image_id is null",
    [""],
  );
  for (const page of pages.rows) {
    const mediaId = await upload(
      page.hero_legacy_image_url,
      `main-page-${page.page_key}.jpg`,
      `${page.page_key} hero`,
    );
    await pool.query(
      "update pages set hero_image_id = $1, hero_legacy_image_url = null where id = $2",
      [mediaId, page.id],
    );
    payload.logger.info(`Migrated main page image: ${page.page_key}`);
  }

  const activities = await pool.query<{
    id: number;
    code: string;
    legacy_image_url: string;
  }>(
    `select id, code, legacy_image_url from activities
     where legacy_image_url is not null and legacy_image_url <> $1
     and not exists (select 1 from activities_rels where parent_id = activities.id and path = 'images' and media_id is not null)`,
    [""],
  );
  for (const activity of activities.rows) {
    const mediaId = await upload(
      activity.legacy_image_url,
      `activity-${activity.code}.jpg`,
      `${activity.code} activity`,
    );
    await payload.update({
      collection: "activities",
      id: activity.id,
      data: { images: [mediaId] },
      context: { skipRevalidation: true },
    });
    await pool.query(
      "update activities set legacy_image_url = null where id = $1",
      [activity.id],
    );
    payload.logger.info(`Migrated activity image: ${activity.code}`);
  }
} finally {
  await pool.end();
}

payload.logger.info("Payload media migration complete.");
process.exit(0);
