import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "bookings" ADD COLUMN IF NOT EXISTS "contact_name" varchar;
    ALTER TABLE "bookings" ADD COLUMN IF NOT EXISTS "idempotency_key" varchar;
    UPDATE "bookings" SET "contact_name" = 'Unknown' WHERE "contact_name" IS NULL;
    UPDATE "bookings" SET "idempotency_key" = 'legacy:' || "id" WHERE "idempotency_key" IS NULL;
    ALTER TABLE "bookings" ALTER COLUMN "contact_name" SET NOT NULL;
    ALTER TABLE "bookings" ALTER COLUMN "idempotency_key" SET NOT NULL;
    CREATE UNIQUE INDEX IF NOT EXISTS "bookings_idempotency_key_idx" ON "bookings" USING btree ("idempotency_key");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "bookings_idempotency_key_idx";
    ALTER TABLE "bookings" DROP COLUMN IF EXISTS "contact_name";
    ALTER TABLE "bookings" DROP COLUMN IF EXISTS "idempotency_key";
  `);
}
