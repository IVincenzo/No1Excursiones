import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_cards_target" AS ENUM('activities', 'trip', 'contact');
  CREATE TYPE "public"."enum_pages_page_key" AS ENUM('home', 'about', 'contact', 'events', 'trip');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_cards_target" AS ENUM('activities', 'trip', 'contact');
  CREATE TYPE "public"."enum__pages_v_version_page_key" AS ENUM('home', 'about', 'contact', 'events', 'trip');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('en', 'es', 'fr', 'de');
  CREATE TABLE "pages_feature_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_feature_items_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_details_locales" (
  	"label" varchar,
  	"value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"target" "enum_pages_cards_target"
  );
  
  CREATE TABLE "pages_cards_locales" (
  	"title" varchar,
  	"text" varchar,
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"page_key" "enum_pages_page_key",
  	"hero_image_id" integer,
  	"hero_legacy_image_url" varchar,
  	"seo_index" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_locales" (
  	"hero_eyebrow" varchar,
  	"hero_title" varchar,
  	"hero_text" varchar,
  	"primary_section_kicker" varchar,
  	"primary_section_title" varchar,
  	"primary_section_lead" varchar,
  	"primary_section_body" varchar,
  	"secondary_section_kicker" varchar,
  	"secondary_section_title" varchar,
  	"secondary_section_text" varchar,
  	"cta_kicker" varchar,
  	"cta_title" varchar,
  	"cta_text" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_canonical" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_version_feature_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_feature_items_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_version_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_details_locales" (
  	"label" varchar,
  	"value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_version_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"target" "enum__pages_v_version_cards_target",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_cards_locales" (
  	"title" varchar,
  	"text" varchar,
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_page_key" "enum__pages_v_version_page_key",
  	"version_hero_image_id" integer,
  	"version_hero_legacy_image_url" varchar,
  	"version_seo_index" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__pages_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_locales" (
  	"version_hero_eyebrow" varchar,
  	"version_hero_title" varchar,
  	"version_hero_text" varchar,
  	"version_primary_section_kicker" varchar,
  	"version_primary_section_title" varchar,
  	"version_primary_section_lead" varchar,
  	"version_primary_section_body" varchar,
  	"version_secondary_section_kicker" varchar,
  	"version_secondary_section_title" varchar,
  	"version_secondary_section_text" varchar,
  	"version_cta_kicker" varchar,
  	"version_cta_title" varchar,
  	"version_cta_text" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_canonical" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "pages_feature_items" ADD CONSTRAINT "pages_feature_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_feature_items_locales" ADD CONSTRAINT "pages_feature_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_feature_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_details" ADD CONSTRAINT "pages_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_details_locales" ADD CONSTRAINT "pages_details_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_cards" ADD CONSTRAINT "pages_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_cards_locales" ADD CONSTRAINT "pages_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_feature_items" ADD CONSTRAINT "_pages_v_version_feature_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_feature_items_locales" ADD CONSTRAINT "_pages_v_version_feature_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_version_feature_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_details" ADD CONSTRAINT "_pages_v_version_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_details_locales" ADD CONSTRAINT "_pages_v_version_details_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_version_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_cards" ADD CONSTRAINT "_pages_v_version_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_cards_locales" ADD CONSTRAINT "_pages_v_version_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_version_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_feature_items_order_idx" ON "pages_feature_items" USING btree ("_order");
  CREATE INDEX "pages_feature_items_parent_id_idx" ON "pages_feature_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_feature_items_locales_locale_parent_id_unique" ON "pages_feature_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_details_order_idx" ON "pages_details" USING btree ("_order");
  CREATE INDEX "pages_details_parent_id_idx" ON "pages_details" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_details_locales_locale_parent_id_unique" ON "pages_details_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_cards_order_idx" ON "pages_cards" USING btree ("_order");
  CREATE INDEX "pages_cards_parent_id_idx" ON "pages_cards" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_cards_locales_locale_parent_id_unique" ON "pages_cards_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_page_key_idx" ON "pages" USING btree ("page_key");
  CREATE INDEX "pages_hero_hero_image_idx" ON "pages" USING btree ("hero_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_version_feature_items_order_idx" ON "_pages_v_version_feature_items" USING btree ("_order");
  CREATE INDEX "_pages_v_version_feature_items_parent_id_idx" ON "_pages_v_version_feature_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_version_feature_items_locales_locale_parent_id_uniq" ON "_pages_v_version_feature_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_version_details_order_idx" ON "_pages_v_version_details" USING btree ("_order");
  CREATE INDEX "_pages_v_version_details_parent_id_idx" ON "_pages_v_version_details" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_version_details_locales_locale_parent_id_unique" ON "_pages_v_version_details_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_version_cards_order_idx" ON "_pages_v_version_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_version_cards_parent_id_idx" ON "_pages_v_version_cards" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_version_cards_locales_locale_parent_id_unique" ON "_pages_v_version_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_page_key_idx" ON "_pages_v" USING btree ("version_page_key");
  CREATE INDEX "_pages_v_version_hero_version_hero_image_idx" ON "_pages_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");`);
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_feature_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_feature_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_details_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_cards_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_feature_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_feature_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_details_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_cards_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_pages_fk";
  DROP TABLE "pages_feature_items" CASCADE;
  DROP TABLE "pages_feature_items_locales" CASCADE;
  DROP TABLE "pages_details" CASCADE;
  DROP TABLE "pages_details_locales" CASCADE;
  DROP TABLE "pages_cards" CASCADE;
  DROP TABLE "pages_cards_locales" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "_pages_v_version_feature_items" CASCADE;
  DROP TABLE "_pages_v_version_feature_items_locales" CASCADE;
  DROP TABLE "_pages_v_version_details" CASCADE;
  DROP TABLE "_pages_v_version_details_locales" CASCADE;
  DROP TABLE "_pages_v_version_cards" CASCADE;
  DROP TABLE "_pages_v_version_cards_locales" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP INDEX "payload_locked_documents_rels_pages_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "pages_id";
  DROP TYPE "public"."enum_pages_cards_target";
  DROP TYPE "public"."enum_pages_page_key";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_cards_target";
  DROP TYPE "public"."enum__pages_v_version_page_key";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum__pages_v_published_locale";`);
}
