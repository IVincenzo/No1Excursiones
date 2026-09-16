import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1 FROM activities WHERE legacy_image_url IS NOT NULL AND legacy_image_url <> ''
      ) THEN
        RAISE EXCEPTION 'Run pnpm payload:migrate-media before this migration; activities.legacy_image_url still contains data.';
      END IF;
      IF EXISTS (
        SELECT 1 FROM pages WHERE hero_legacy_image_url IS NOT NULL AND hero_legacy_image_url <> ''
      ) THEN
        RAISE EXCEPTION 'Run pnpm payload:migrate-media before this migration; pages.hero_legacy_image_url still contains data.';
      END IF;
    END $$;

    ALTER TABLE "activities" DROP COLUMN IF EXISTS "legacy_image_url";
    ALTER TABLE "_activities_v" DROP COLUMN IF EXISTS "version_legacy_image_url";
    ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_legacy_image_url";
    ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_legacy_image_url";
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "activities" ADD COLUMN IF NOT EXISTS "legacy_image_url" varchar;
    ALTER TABLE "_activities_v" ADD COLUMN IF NOT EXISTS "version_legacy_image_url" varchar;
    ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "hero_legacy_image_url" varchar;
    ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_hero_legacy_image_url" varchar;
  `);
}
