import assert from "node:assert/strict";
import { getPayload } from "payload";
import sharp from "sharp";
import config from "../src/payload.config";
import { getActivityByCode } from "../src/lib/content/activities";

const payload = await getPayload({ config });

async function createValidationMedia(name: string) {
  const imageData = await sharp({
    create: { width: 1800, height: 1000, channels: 3, background: "#0b6f75" },
  })
    .jpeg()
    .toBuffer();
  return payload.create({
    collection: "media",
    locale: "en",
    context: { skipRevalidation: true },
    data: { alt: "Temporary Payload image validation" },
    file: {
      data: imageData,
      mimetype: "image/jpeg",
      name,
      size: imageData.length,
    },
  });
}

const media = await createValidationMedia("__payload-image-validation.jpg");
try {
  assert.ok(media.url, "Payload did not persist the original image");
  assert.ok(
    media.sizes?.card?.url,
    "Sharp did not generate the card image size",
  );
  assert.ok(
    media.sizes?.hero?.url,
    "Sharp did not generate the hero image size",
  );
} finally {
  await payload.delete({
    collection: "media",
    id: media.id,
    context: { skipRevalidation: true },
  });
}

const result = await payload.find({
  collection: "activities",
  locale: "fr",
  fallbackLocale: false,
  where: { code: { equals: "boat-trips" } },
  limit: 1,
});
const activity = result.docs[0];
if (!activity)
  throw new Error("The imported boat-trips activity was not found.");

const original = activity.shortDescription;
const marker = `${original} [PAYLOAD_VALIDATION]`;

try {
  await payload.update({
    collection: "activities",
    id: activity.id,
    locale: "fr",
    draft: true,
    data: { shortDescription: marker },
    context: { skipRevalidation: true },
  });
  assert.equal(
    (await getActivityByCode("fr", "boat-trips"))?.summary,
    original,
    "A draft leaked into the public repository",
  );

  await payload.update({
    collection: "activities",
    id: activity.id,
    locale: "fr",
    draft: false,
    data: { shortDescription: marker, _status: "published" },
    context: { skipRevalidation: true },
  });
  assert.equal(
    (await getActivityByCode("fr", "boat-trips"))?.summary,
    marker,
    "Published content was not visible",
  );
} finally {
  await payload.update({
    collection: "activities",
    id: activity.id,
    locale: "fr",
    draft: false,
    data: { shortDescription: original, _status: "published" },
    context: { skipRevalidation: true },
  });
}

assert.equal(
  (await getActivityByCode("fr", "boat-trips"))?.summary,
  original,
  "Original content was not restored",
);

const validationCode = "__payload-missing-translation-validation";
const stale = await payload.find({
  collection: "activities",
  where: { code: { equals: validationCode } },
  limit: 10,
});
for (const doc of stale.docs)
  await payload.delete({
    collection: "activities",
    id: doc.id,
    context: { skipRevalidation: true },
  });
let validationId: number | undefined;
let validationMediaId: number | undefined;
try {
  const validationMedia = await createValidationMedia(
    "__payload-activity-validation.jpg",
  );
  validationMediaId = validationMedia.id;
  const created = await payload.create({
    collection: "activities",
    locale: "en",
    draft: false,
    context: { skipRevalidation: true },
    data: {
      code: validationCode,
      slug: "translation-validation",
      title: "Translation validation",
      shortDescription: "Temporary validation record",
      description: "Temporary validation record",
      images: [validationMedia.id],
      bookingProvider: "mock",
      currency: "EUR",
      seo: { index: false },
      _status: "published",
    },
  });
  validationId = created.id;
  assert.equal(
    (await getActivityByCode("en", validationCode))?.slug,
    "translation-validation",
  );
  assert.equal(
    await getActivityByCode("fr", validationCode),
    undefined,
    "A missing French translation incorrectly fell back to English",
  );
} finally {
  if (validationId !== undefined)
    await payload.delete({
      collection: "activities",
      id: validationId,
      context: { skipRevalidation: true },
    });
  if (validationMediaId !== undefined)
    await payload.delete({
      collection: "media",
      id: validationMediaId,
      context: { skipRevalidation: true },
    });
}

payload.logger.info(
  "Payload draft, publication and restoration validation passed.",
);
process.exit(0);
