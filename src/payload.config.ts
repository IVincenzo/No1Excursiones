import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import {
  Activities,
  Categories,
  Destinations,
  Events,
  Guides,
  Providers,
} from "./collections/editorial";
import {
  Bookings,
  Payments,
  ProcessedWebhookEvents,
} from "./collections/operations";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const payloadSecret =
  process.env.PAYLOAD_SECRET ??
  "development-only-payload-secret-change-before-deploy";
if (process.env.VERCEL_ENV === "production" && !process.env.PAYLOAD_SECRET)
  throw new Error("PAYLOAD_SECRET is required in production");
const databaseURL =
  process.env.DATABASE_URL ??
  (process.env.NODE_ENV === "test"
    ? "postgres://postgres:postgres@127.0.0.1:5432/no1_excursiones_test"
    : undefined);
if (!databaseURL)
  throw new Error(
    "DATABASE_URL is required because public content is served from Payload.",
  );

export default buildConfig({
  sharp,
  secret: payloadSecret,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
      importMapFile: path.resolve(dirname, "app/(payload)/admin/importMap.ts"),
    },
  },
  editor: lexicalEditor(),
  collections: [
    Users,
    Media,
    Pages,
    Activities,
    Categories,
    Destinations,
    Providers,
    Events,
    Guides,
    Bookings,
    Payments,
    ProcessedWebhookEvents,
  ],
  localization: {
    locales: ["en", "es", "fr", "de"],
    defaultLocale: "en",
    fallback: false,
  },
  db: postgresAdapter({ pool: { connectionString: databaseURL }, push: false }),
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
});
