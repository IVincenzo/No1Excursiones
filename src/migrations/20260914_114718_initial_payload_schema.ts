import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'es', 'fr', 'de');
  CREATE TYPE "public"."enum_activities_difficulty" AS ENUM('easy', 'moderate', 'difficult');
  CREATE TYPE "public"."enum_activities_currency" AS ENUM('EUR');
  CREATE TYPE "public"."enum_activities_booking_provider" AS ENUM('mock', 'manual', 'bokun', 'fareharbor', 'rezdy');
  CREATE TYPE "public"."enum_activities_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__activities_v_version_difficulty" AS ENUM('easy', 'moderate', 'difficult');
  CREATE TYPE "public"."enum__activities_v_version_currency" AS ENUM('EUR');
  CREATE TYPE "public"."enum__activities_v_version_booking_provider" AS ENUM('mock', 'manual', 'bokun', 'fareharbor', 'rezdy');
  CREATE TYPE "public"."enum__activities_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__activities_v_published_locale" AS ENUM('en', 'es', 'fr', 'de');
  CREATE TYPE "public"."enum_categories_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__categories_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__categories_v_published_locale" AS ENUM('en', 'es', 'fr', 'de');
  CREATE TYPE "public"."enum_destinations_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__destinations_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__destinations_v_published_locale" AS ENUM('en', 'es', 'fr', 'de');
  CREATE TYPE "public"."enum_providers_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__providers_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__providers_v_published_locale" AS ENUM('en', 'es', 'fr', 'de');
  CREATE TYPE "public"."enum_events_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__events_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__events_v_published_locale" AS ENUM('en', 'es', 'fr', 'de');
  CREATE TYPE "public"."enum_guides_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__guides_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__guides_v_published_locale" AS ENUM('en', 'es', 'fr', 'de');
  CREATE TYPE "public"."enum_bookings_status" AS ENUM('pending_payment', 'paid_pending_confirmation', 'confirmed', 'manual_review', 'failed', 'cancelled');
  CREATE TYPE "public"."enum_payments_currency" AS ENUM('EUR');
  CREATE TYPE "public"."enum_payments_status" AS ENUM('pending', 'processing', 'paid', 'failed', 'partially_refunded', 'refunded');
  CREATE TYPE "public"."enum_processed_webhook_events_provider" AS ENUM('stripe');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "activities_videos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar
  );
  
  CREATE TABLE "activities_videos_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "activities_included" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "activities_not_included" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "activities_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "activities" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"category_id" integer,
  	"destination_id" integer,
  	"provider_id" integer,
  	"legacy_image_url" varchar,
  	"difficulty" "enum_activities_difficulty",
  	"minimum_age" numeric,
  	"pickup_available" boolean,
  	"price_from_minor" numeric,
  	"currency" "enum_activities_currency" DEFAULT 'EUR',
  	"booking_provider" "enum_activities_booking_provider" DEFAULT 'mock',
  	"booking_product_id" varchar,
  	"seo_index" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_activities_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "activities_locales" (
  	"slug" varchar,
  	"title" varchar,
  	"short_description" varchar,
  	"badge" varchar,
  	"description" varchar,
  	"duration" varchar,
  	"meeting_point" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_canonical" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "activities_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_activities_v_version_videos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_activities_v_version_videos_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_activities_v_version_included" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_activities_v_version_not_included" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_activities_v_version_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_activities_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_code" varchar,
  	"version_category_id" integer,
  	"version_destination_id" integer,
  	"version_provider_id" integer,
  	"version_legacy_image_url" varchar,
  	"version_difficulty" "enum__activities_v_version_difficulty",
  	"version_minimum_age" numeric,
  	"version_pickup_available" boolean,
  	"version_price_from_minor" numeric,
  	"version_currency" "enum__activities_v_version_currency" DEFAULT 'EUR',
  	"version_booking_provider" "enum__activities_v_version_booking_provider" DEFAULT 'mock',
  	"version_booking_product_id" varchar,
  	"version_seo_index" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__activities_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__activities_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_activities_v_locales" (
  	"version_slug" varchar,
  	"version_title" varchar,
  	"version_short_description" varchar,
  	"version_badge" varchar,
  	"version_description" varchar,
  	"version_duration" varchar,
  	"version_meeting_point" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_canonical" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_activities_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"seo_index" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_categories_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "categories_locales" (
  	"name" varchar,
  	"slug" varchar,
  	"description" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_canonical" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_categories_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_code" varchar,
  	"version_seo_index" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__categories_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__categories_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_categories_v_locales" (
  	"version_name" varchar,
  	"version_slug" varchar,
  	"version_description" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_canonical" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "destinations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"seo_index" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_destinations_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "destinations_locales" (
  	"name" varchar,
  	"slug" varchar,
  	"description" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_canonical" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_destinations_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_code" varchar,
  	"version_seo_index" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__destinations_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__destinations_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_destinations_v_locales" (
  	"version_name" varchar,
  	"version_slug" varchar,
  	"version_description" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_canonical" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "providers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"seo_index" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_providers_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "providers_locales" (
  	"name" varchar,
  	"slug" varchar,
  	"description" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_canonical" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_providers_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_code" varchar,
  	"version_seo_index" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__providers_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__providers_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_providers_v_locales" (
  	"version_name" varchar,
  	"version_slug" varchar,
  	"version_description" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_canonical" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"starts_at" timestamp(3) with time zone,
  	"ends_at" timestamp(3) with time zone,
  	"location" varchar,
  	"is_verified" boolean DEFAULT false,
  	"seo_index" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_events_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "events_locales" (
  	"slug" varchar,
  	"title" varchar,
  	"description" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_canonical" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_events_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_starts_at" timestamp(3) with time zone,
  	"version_ends_at" timestamp(3) with time zone,
  	"version_location" varchar,
  	"version_is_verified" boolean DEFAULT false,
  	"version_seo_index" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__events_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__events_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_events_v_locales" (
  	"version_slug" varchar,
  	"version_title" varchar,
  	"version_description" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_canonical" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "guides" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"seo_index" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_guides_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "guides_locales" (
  	"slug" varchar,
  	"title" varchar,
  	"excerpt" varchar,
  	"body" jsonb,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_canonical" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_guides_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_hero_image_id" integer,
  	"version_seo_index" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__guides_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__guides_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_guides_v_locales" (
  	"version_slug" varchar,
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_body" jsonb,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_canonical" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "bookings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"reference" varchar NOT NULL,
  	"activity_id" integer NOT NULL,
  	"provider_code" varchar NOT NULL,
  	"provider_reference" varchar,
  	"slot_id" varchar NOT NULL,
  	"participants" numeric NOT NULL,
  	"status" "enum_bookings_status" NOT NULL,
  	"contact_email" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payments" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"booking_id" integer NOT NULL,
  	"external_payment_id" varchar,
  	"amount_minor" numeric NOT NULL,
  	"currency" "enum_payments_currency" NOT NULL,
  	"status" "enum_payments_status" NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "processed_webhook_events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"external_event_id" varchar NOT NULL,
  	"provider" "enum_processed_webhook_events_provider" NOT NULL,
  	"processed_at" timestamp(3) with time zone NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"activities_id" integer,
  	"categories_id" integer,
  	"destinations_id" integer,
  	"providers_id" integer,
  	"events_id" integer,
  	"guides_id" integer,
  	"bookings_id" integer,
  	"payments_id" integer,
  	"processed_webhook_events_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "activities_videos" ADD CONSTRAINT "activities_videos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "activities_videos_locales" ADD CONSTRAINT "activities_videos_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."activities_videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "activities_included" ADD CONSTRAINT "activities_included_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "activities_not_included" ADD CONSTRAINT "activities_not_included_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "activities_highlights" ADD CONSTRAINT "activities_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "activities" ADD CONSTRAINT "activities_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "activities" ADD CONSTRAINT "activities_destination_id_destinations_id_fk" FOREIGN KEY ("destination_id") REFERENCES "public"."destinations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "activities" ADD CONSTRAINT "activities_provider_id_providers_id_fk" FOREIGN KEY ("provider_id") REFERENCES "public"."providers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "activities_locales" ADD CONSTRAINT "activities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "activities_rels" ADD CONSTRAINT "activities_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "activities_rels" ADD CONSTRAINT "activities_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_activities_v_version_videos" ADD CONSTRAINT "_activities_v_version_videos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_activities_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_activities_v_version_videos_locales" ADD CONSTRAINT "_activities_v_version_videos_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_activities_v_version_videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_activities_v_version_included" ADD CONSTRAINT "_activities_v_version_included_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_activities_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_activities_v_version_not_included" ADD CONSTRAINT "_activities_v_version_not_included_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_activities_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_activities_v_version_highlights" ADD CONSTRAINT "_activities_v_version_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_activities_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_activities_v" ADD CONSTRAINT "_activities_v_parent_id_activities_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."activities"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_activities_v" ADD CONSTRAINT "_activities_v_version_category_id_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_activities_v" ADD CONSTRAINT "_activities_v_version_destination_id_destinations_id_fk" FOREIGN KEY ("version_destination_id") REFERENCES "public"."destinations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_activities_v" ADD CONSTRAINT "_activities_v_version_provider_id_providers_id_fk" FOREIGN KEY ("version_provider_id") REFERENCES "public"."providers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_activities_v_locales" ADD CONSTRAINT "_activities_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_activities_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_activities_v_rels" ADD CONSTRAINT "_activities_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_activities_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_activities_v_rels" ADD CONSTRAINT "_activities_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_locales" ADD CONSTRAINT "categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categories_v" ADD CONSTRAINT "_categories_v_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_categories_v_locales" ADD CONSTRAINT "_categories_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "destinations_locales" ADD CONSTRAINT "destinations_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."destinations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_destinations_v" ADD CONSTRAINT "_destinations_v_parent_id_destinations_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."destinations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_destinations_v_locales" ADD CONSTRAINT "_destinations_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_destinations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "providers_locales" ADD CONSTRAINT "providers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."providers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_providers_v" ADD CONSTRAINT "_providers_v_parent_id_providers_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."providers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_providers_v_locales" ADD CONSTRAINT "_providers_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_providers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_locales" ADD CONSTRAINT "events_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_parent_id_events_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_locales" ADD CONSTRAINT "_events_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides" ADD CONSTRAINT "guides_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "guides_locales" ADD CONSTRAINT "guides_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v" ADD CONSTRAINT "_guides_v_parent_id_guides_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."guides"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_guides_v" ADD CONSTRAINT "_guides_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_guides_v_locales" ADD CONSTRAINT "_guides_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "bookings" ADD CONSTRAINT "bookings_activity_id_activities_id_fk" FOREIGN KEY ("activity_id") REFERENCES "public"."activities"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payments" ADD CONSTRAINT "payments_booking_id_bookings_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_activities_fk" FOREIGN KEY ("activities_id") REFERENCES "public"."activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_destinations_fk" FOREIGN KEY ("destinations_id") REFERENCES "public"."destinations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_providers_fk" FOREIGN KEY ("providers_id") REFERENCES "public"."providers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_guides_fk" FOREIGN KEY ("guides_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_bookings_fk" FOREIGN KEY ("bookings_id") REFERENCES "public"."bookings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payments_fk" FOREIGN KEY ("payments_id") REFERENCES "public"."payments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_processed_webhook_events_fk" FOREIGN KEY ("processed_webhook_events_id") REFERENCES "public"."processed_webhook_events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "activities_videos_order_idx" ON "activities_videos" USING btree ("_order");
  CREATE INDEX "activities_videos_parent_id_idx" ON "activities_videos" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "activities_videos_locales_locale_parent_id_unique" ON "activities_videos_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "activities_included_order_idx" ON "activities_included" USING btree ("_order");
  CREATE INDEX "activities_included_parent_id_idx" ON "activities_included" USING btree ("_parent_id");
  CREATE INDEX "activities_included_locale_idx" ON "activities_included" USING btree ("_locale");
  CREATE INDEX "activities_not_included_order_idx" ON "activities_not_included" USING btree ("_order");
  CREATE INDEX "activities_not_included_parent_id_idx" ON "activities_not_included" USING btree ("_parent_id");
  CREATE INDEX "activities_not_included_locale_idx" ON "activities_not_included" USING btree ("_locale");
  CREATE INDEX "activities_highlights_order_idx" ON "activities_highlights" USING btree ("_order");
  CREATE INDEX "activities_highlights_parent_id_idx" ON "activities_highlights" USING btree ("_parent_id");
  CREATE INDEX "activities_highlights_locale_idx" ON "activities_highlights" USING btree ("_locale");
  CREATE UNIQUE INDEX "activities_code_idx" ON "activities" USING btree ("code");
  CREATE INDEX "activities_category_idx" ON "activities" USING btree ("category_id");
  CREATE INDEX "activities_destination_idx" ON "activities" USING btree ("destination_id");
  CREATE INDEX "activities_provider_idx" ON "activities" USING btree ("provider_id");
  CREATE INDEX "activities_updated_at_idx" ON "activities" USING btree ("updated_at");
  CREATE INDEX "activities_created_at_idx" ON "activities" USING btree ("created_at");
  CREATE INDEX "activities__status_idx" ON "activities" USING btree ("_status");
  CREATE INDEX "activities_slug_idx" ON "activities_locales" USING btree ("slug","_locale");
  CREATE UNIQUE INDEX "activities_locales_locale_parent_id_unique" ON "activities_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "activities_rels_order_idx" ON "activities_rels" USING btree ("order");
  CREATE INDEX "activities_rels_parent_idx" ON "activities_rels" USING btree ("parent_id");
  CREATE INDEX "activities_rels_path_idx" ON "activities_rels" USING btree ("path");
  CREATE INDEX "activities_rels_media_id_idx" ON "activities_rels" USING btree ("media_id");
  CREATE INDEX "_activities_v_version_videos_order_idx" ON "_activities_v_version_videos" USING btree ("_order");
  CREATE INDEX "_activities_v_version_videos_parent_id_idx" ON "_activities_v_version_videos" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_activities_v_version_videos_locales_locale_parent_id_unique" ON "_activities_v_version_videos_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_activities_v_version_included_order_idx" ON "_activities_v_version_included" USING btree ("_order");
  CREATE INDEX "_activities_v_version_included_parent_id_idx" ON "_activities_v_version_included" USING btree ("_parent_id");
  CREATE INDEX "_activities_v_version_included_locale_idx" ON "_activities_v_version_included" USING btree ("_locale");
  CREATE INDEX "_activities_v_version_not_included_order_idx" ON "_activities_v_version_not_included" USING btree ("_order");
  CREATE INDEX "_activities_v_version_not_included_parent_id_idx" ON "_activities_v_version_not_included" USING btree ("_parent_id");
  CREATE INDEX "_activities_v_version_not_included_locale_idx" ON "_activities_v_version_not_included" USING btree ("_locale");
  CREATE INDEX "_activities_v_version_highlights_order_idx" ON "_activities_v_version_highlights" USING btree ("_order");
  CREATE INDEX "_activities_v_version_highlights_parent_id_idx" ON "_activities_v_version_highlights" USING btree ("_parent_id");
  CREATE INDEX "_activities_v_version_highlights_locale_idx" ON "_activities_v_version_highlights" USING btree ("_locale");
  CREATE INDEX "_activities_v_parent_idx" ON "_activities_v" USING btree ("parent_id");
  CREATE INDEX "_activities_v_version_version_code_idx" ON "_activities_v" USING btree ("version_code");
  CREATE INDEX "_activities_v_version_version_category_idx" ON "_activities_v" USING btree ("version_category_id");
  CREATE INDEX "_activities_v_version_version_destination_idx" ON "_activities_v" USING btree ("version_destination_id");
  CREATE INDEX "_activities_v_version_version_provider_idx" ON "_activities_v" USING btree ("version_provider_id");
  CREATE INDEX "_activities_v_version_version_updated_at_idx" ON "_activities_v" USING btree ("version_updated_at");
  CREATE INDEX "_activities_v_version_version_created_at_idx" ON "_activities_v" USING btree ("version_created_at");
  CREATE INDEX "_activities_v_version_version__status_idx" ON "_activities_v" USING btree ("version__status");
  CREATE INDEX "_activities_v_created_at_idx" ON "_activities_v" USING btree ("created_at");
  CREATE INDEX "_activities_v_updated_at_idx" ON "_activities_v" USING btree ("updated_at");
  CREATE INDEX "_activities_v_snapshot_idx" ON "_activities_v" USING btree ("snapshot");
  CREATE INDEX "_activities_v_published_locale_idx" ON "_activities_v" USING btree ("published_locale");
  CREATE INDEX "_activities_v_latest_idx" ON "_activities_v" USING btree ("latest");
  CREATE INDEX "_activities_v_autosave_idx" ON "_activities_v" USING btree ("autosave");
  CREATE INDEX "_activities_v_version_version_slug_idx" ON "_activities_v_locales" USING btree ("version_slug","_locale");
  CREATE UNIQUE INDEX "_activities_v_locales_locale_parent_id_unique" ON "_activities_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_activities_v_rels_order_idx" ON "_activities_v_rels" USING btree ("order");
  CREATE INDEX "_activities_v_rels_parent_idx" ON "_activities_v_rels" USING btree ("parent_id");
  CREATE INDEX "_activities_v_rels_path_idx" ON "_activities_v_rels" USING btree ("path");
  CREATE INDEX "_activities_v_rels_media_id_idx" ON "_activities_v_rels" USING btree ("media_id");
  CREATE UNIQUE INDEX "categories_code_idx" ON "categories" USING btree ("code");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX "categories__status_idx" ON "categories" USING btree ("_status");
  CREATE INDEX "categories_slug_idx" ON "categories_locales" USING btree ("slug","_locale");
  CREATE UNIQUE INDEX "categories_locales_locale_parent_id_unique" ON "categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_categories_v_parent_idx" ON "_categories_v" USING btree ("parent_id");
  CREATE INDEX "_categories_v_version_version_code_idx" ON "_categories_v" USING btree ("version_code");
  CREATE INDEX "_categories_v_version_version_updated_at_idx" ON "_categories_v" USING btree ("version_updated_at");
  CREATE INDEX "_categories_v_version_version_created_at_idx" ON "_categories_v" USING btree ("version_created_at");
  CREATE INDEX "_categories_v_version_version__status_idx" ON "_categories_v" USING btree ("version__status");
  CREATE INDEX "_categories_v_created_at_idx" ON "_categories_v" USING btree ("created_at");
  CREATE INDEX "_categories_v_updated_at_idx" ON "_categories_v" USING btree ("updated_at");
  CREATE INDEX "_categories_v_snapshot_idx" ON "_categories_v" USING btree ("snapshot");
  CREATE INDEX "_categories_v_published_locale_idx" ON "_categories_v" USING btree ("published_locale");
  CREATE INDEX "_categories_v_latest_idx" ON "_categories_v" USING btree ("latest");
  CREATE INDEX "_categories_v_autosave_idx" ON "_categories_v" USING btree ("autosave");
  CREATE INDEX "_categories_v_version_version_slug_idx" ON "_categories_v_locales" USING btree ("version_slug","_locale");
  CREATE UNIQUE INDEX "_categories_v_locales_locale_parent_id_unique" ON "_categories_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "destinations_code_idx" ON "destinations" USING btree ("code");
  CREATE INDEX "destinations_updated_at_idx" ON "destinations" USING btree ("updated_at");
  CREATE INDEX "destinations_created_at_idx" ON "destinations" USING btree ("created_at");
  CREATE INDEX "destinations__status_idx" ON "destinations" USING btree ("_status");
  CREATE INDEX "destinations_slug_idx" ON "destinations_locales" USING btree ("slug","_locale");
  CREATE UNIQUE INDEX "destinations_locales_locale_parent_id_unique" ON "destinations_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_destinations_v_parent_idx" ON "_destinations_v" USING btree ("parent_id");
  CREATE INDEX "_destinations_v_version_version_code_idx" ON "_destinations_v" USING btree ("version_code");
  CREATE INDEX "_destinations_v_version_version_updated_at_idx" ON "_destinations_v" USING btree ("version_updated_at");
  CREATE INDEX "_destinations_v_version_version_created_at_idx" ON "_destinations_v" USING btree ("version_created_at");
  CREATE INDEX "_destinations_v_version_version__status_idx" ON "_destinations_v" USING btree ("version__status");
  CREATE INDEX "_destinations_v_created_at_idx" ON "_destinations_v" USING btree ("created_at");
  CREATE INDEX "_destinations_v_updated_at_idx" ON "_destinations_v" USING btree ("updated_at");
  CREATE INDEX "_destinations_v_snapshot_idx" ON "_destinations_v" USING btree ("snapshot");
  CREATE INDEX "_destinations_v_published_locale_idx" ON "_destinations_v" USING btree ("published_locale");
  CREATE INDEX "_destinations_v_latest_idx" ON "_destinations_v" USING btree ("latest");
  CREATE INDEX "_destinations_v_autosave_idx" ON "_destinations_v" USING btree ("autosave");
  CREATE INDEX "_destinations_v_version_version_slug_idx" ON "_destinations_v_locales" USING btree ("version_slug","_locale");
  CREATE UNIQUE INDEX "_destinations_v_locales_locale_parent_id_unique" ON "_destinations_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "providers_code_idx" ON "providers" USING btree ("code");
  CREATE INDEX "providers_updated_at_idx" ON "providers" USING btree ("updated_at");
  CREATE INDEX "providers_created_at_idx" ON "providers" USING btree ("created_at");
  CREATE INDEX "providers__status_idx" ON "providers" USING btree ("_status");
  CREATE INDEX "providers_slug_idx" ON "providers_locales" USING btree ("slug","_locale");
  CREATE UNIQUE INDEX "providers_locales_locale_parent_id_unique" ON "providers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_providers_v_parent_idx" ON "_providers_v" USING btree ("parent_id");
  CREATE INDEX "_providers_v_version_version_code_idx" ON "_providers_v" USING btree ("version_code");
  CREATE INDEX "_providers_v_version_version_updated_at_idx" ON "_providers_v" USING btree ("version_updated_at");
  CREATE INDEX "_providers_v_version_version_created_at_idx" ON "_providers_v" USING btree ("version_created_at");
  CREATE INDEX "_providers_v_version_version__status_idx" ON "_providers_v" USING btree ("version__status");
  CREATE INDEX "_providers_v_created_at_idx" ON "_providers_v" USING btree ("created_at");
  CREATE INDEX "_providers_v_updated_at_idx" ON "_providers_v" USING btree ("updated_at");
  CREATE INDEX "_providers_v_snapshot_idx" ON "_providers_v" USING btree ("snapshot");
  CREATE INDEX "_providers_v_published_locale_idx" ON "_providers_v" USING btree ("published_locale");
  CREATE INDEX "_providers_v_latest_idx" ON "_providers_v" USING btree ("latest");
  CREATE INDEX "_providers_v_autosave_idx" ON "_providers_v" USING btree ("autosave");
  CREATE INDEX "_providers_v_version_version_slug_idx" ON "_providers_v_locales" USING btree ("version_slug","_locale");
  CREATE UNIQUE INDEX "_providers_v_locales_locale_parent_id_unique" ON "_providers_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE INDEX "events__status_idx" ON "events" USING btree ("_status");
  CREATE INDEX "events_slug_idx" ON "events_locales" USING btree ("slug","_locale");
  CREATE UNIQUE INDEX "events_locales_locale_parent_id_unique" ON "events_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_events_v_parent_idx" ON "_events_v" USING btree ("parent_id");
  CREATE INDEX "_events_v_version_version_updated_at_idx" ON "_events_v" USING btree ("version_updated_at");
  CREATE INDEX "_events_v_version_version_created_at_idx" ON "_events_v" USING btree ("version_created_at");
  CREATE INDEX "_events_v_version_version__status_idx" ON "_events_v" USING btree ("version__status");
  CREATE INDEX "_events_v_created_at_idx" ON "_events_v" USING btree ("created_at");
  CREATE INDEX "_events_v_updated_at_idx" ON "_events_v" USING btree ("updated_at");
  CREATE INDEX "_events_v_snapshot_idx" ON "_events_v" USING btree ("snapshot");
  CREATE INDEX "_events_v_published_locale_idx" ON "_events_v" USING btree ("published_locale");
  CREATE INDEX "_events_v_latest_idx" ON "_events_v" USING btree ("latest");
  CREATE INDEX "_events_v_autosave_idx" ON "_events_v" USING btree ("autosave");
  CREATE INDEX "_events_v_version_version_slug_idx" ON "_events_v_locales" USING btree ("version_slug","_locale");
  CREATE UNIQUE INDEX "_events_v_locales_locale_parent_id_unique" ON "_events_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "guides_hero_image_idx" ON "guides" USING btree ("hero_image_id");
  CREATE INDEX "guides_updated_at_idx" ON "guides" USING btree ("updated_at");
  CREATE INDEX "guides_created_at_idx" ON "guides" USING btree ("created_at");
  CREATE INDEX "guides__status_idx" ON "guides" USING btree ("_status");
  CREATE INDEX "guides_slug_idx" ON "guides_locales" USING btree ("slug","_locale");
  CREATE UNIQUE INDEX "guides_locales_locale_parent_id_unique" ON "guides_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_guides_v_parent_idx" ON "_guides_v" USING btree ("parent_id");
  CREATE INDEX "_guides_v_version_version_hero_image_idx" ON "_guides_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_guides_v_version_version_updated_at_idx" ON "_guides_v" USING btree ("version_updated_at");
  CREATE INDEX "_guides_v_version_version_created_at_idx" ON "_guides_v" USING btree ("version_created_at");
  CREATE INDEX "_guides_v_version_version__status_idx" ON "_guides_v" USING btree ("version__status");
  CREATE INDEX "_guides_v_created_at_idx" ON "_guides_v" USING btree ("created_at");
  CREATE INDEX "_guides_v_updated_at_idx" ON "_guides_v" USING btree ("updated_at");
  CREATE INDEX "_guides_v_snapshot_idx" ON "_guides_v" USING btree ("snapshot");
  CREATE INDEX "_guides_v_published_locale_idx" ON "_guides_v" USING btree ("published_locale");
  CREATE INDEX "_guides_v_latest_idx" ON "_guides_v" USING btree ("latest");
  CREATE INDEX "_guides_v_autosave_idx" ON "_guides_v" USING btree ("autosave");
  CREATE INDEX "_guides_v_version_version_slug_idx" ON "_guides_v_locales" USING btree ("version_slug","_locale");
  CREATE UNIQUE INDEX "_guides_v_locales_locale_parent_id_unique" ON "_guides_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "bookings_reference_idx" ON "bookings" USING btree ("reference");
  CREATE INDEX "bookings_activity_idx" ON "bookings" USING btree ("activity_id");
  CREATE INDEX "bookings_updated_at_idx" ON "bookings" USING btree ("updated_at");
  CREATE INDEX "bookings_created_at_idx" ON "bookings" USING btree ("created_at");
  CREATE INDEX "payments_booking_idx" ON "payments" USING btree ("booking_id");
  CREATE UNIQUE INDEX "payments_external_payment_id_idx" ON "payments" USING btree ("external_payment_id");
  CREATE INDEX "payments_updated_at_idx" ON "payments" USING btree ("updated_at");
  CREATE INDEX "payments_created_at_idx" ON "payments" USING btree ("created_at");
  CREATE UNIQUE INDEX "processed_webhook_events_external_event_id_idx" ON "processed_webhook_events" USING btree ("external_event_id");
  CREATE INDEX "processed_webhook_events_updated_at_idx" ON "processed_webhook_events" USING btree ("updated_at");
  CREATE INDEX "processed_webhook_events_created_at_idx" ON "processed_webhook_events" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_activities_id_idx" ON "payload_locked_documents_rels" USING btree ("activities_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_destinations_id_idx" ON "payload_locked_documents_rels" USING btree ("destinations_id");
  CREATE INDEX "payload_locked_documents_rels_providers_id_idx" ON "payload_locked_documents_rels" USING btree ("providers_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_locked_documents_rels_guides_id_idx" ON "payload_locked_documents_rels" USING btree ("guides_id");
  CREATE INDEX "payload_locked_documents_rels_bookings_id_idx" ON "payload_locked_documents_rels" USING btree ("bookings_id");
  CREATE INDEX "payload_locked_documents_rels_payments_id_idx" ON "payload_locked_documents_rels" USING btree ("payments_id");
  CREATE INDEX "payload_locked_documents_rels_processed_webhook_events_i_idx" ON "payload_locked_documents_rels" USING btree ("processed_webhook_events_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`);
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "activities_videos" CASCADE;
  DROP TABLE "activities_videos_locales" CASCADE;
  DROP TABLE "activities_included" CASCADE;
  DROP TABLE "activities_not_included" CASCADE;
  DROP TABLE "activities_highlights" CASCADE;
  DROP TABLE "activities" CASCADE;
  DROP TABLE "activities_locales" CASCADE;
  DROP TABLE "activities_rels" CASCADE;
  DROP TABLE "_activities_v_version_videos" CASCADE;
  DROP TABLE "_activities_v_version_videos_locales" CASCADE;
  DROP TABLE "_activities_v_version_included" CASCADE;
  DROP TABLE "_activities_v_version_not_included" CASCADE;
  DROP TABLE "_activities_v_version_highlights" CASCADE;
  DROP TABLE "_activities_v" CASCADE;
  DROP TABLE "_activities_v_locales" CASCADE;
  DROP TABLE "_activities_v_rels" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "categories_locales" CASCADE;
  DROP TABLE "_categories_v" CASCADE;
  DROP TABLE "_categories_v_locales" CASCADE;
  DROP TABLE "destinations" CASCADE;
  DROP TABLE "destinations_locales" CASCADE;
  DROP TABLE "_destinations_v" CASCADE;
  DROP TABLE "_destinations_v_locales" CASCADE;
  DROP TABLE "providers" CASCADE;
  DROP TABLE "providers_locales" CASCADE;
  DROP TABLE "_providers_v" CASCADE;
  DROP TABLE "_providers_v_locales" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "events_locales" CASCADE;
  DROP TABLE "_events_v" CASCADE;
  DROP TABLE "_events_v_locales" CASCADE;
  DROP TABLE "guides" CASCADE;
  DROP TABLE "guides_locales" CASCADE;
  DROP TABLE "_guides_v" CASCADE;
  DROP TABLE "_guides_v_locales" CASCADE;
  DROP TABLE "bookings" CASCADE;
  DROP TABLE "payments" CASCADE;
  DROP TABLE "processed_webhook_events" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_activities_difficulty";
  DROP TYPE "public"."enum_activities_currency";
  DROP TYPE "public"."enum_activities_booking_provider";
  DROP TYPE "public"."enum_activities_status";
  DROP TYPE "public"."enum__activities_v_version_difficulty";
  DROP TYPE "public"."enum__activities_v_version_currency";
  DROP TYPE "public"."enum__activities_v_version_booking_provider";
  DROP TYPE "public"."enum__activities_v_version_status";
  DROP TYPE "public"."enum__activities_v_published_locale";
  DROP TYPE "public"."enum_categories_status";
  DROP TYPE "public"."enum__categories_v_version_status";
  DROP TYPE "public"."enum__categories_v_published_locale";
  DROP TYPE "public"."enum_destinations_status";
  DROP TYPE "public"."enum__destinations_v_version_status";
  DROP TYPE "public"."enum__destinations_v_published_locale";
  DROP TYPE "public"."enum_providers_status";
  DROP TYPE "public"."enum__providers_v_version_status";
  DROP TYPE "public"."enum__providers_v_published_locale";
  DROP TYPE "public"."enum_events_status";
  DROP TYPE "public"."enum__events_v_version_status";
  DROP TYPE "public"."enum__events_v_published_locale";
  DROP TYPE "public"."enum_guides_status";
  DROP TYPE "public"."enum__guides_v_version_status";
  DROP TYPE "public"."enum__guides_v_published_locale";
  DROP TYPE "public"."enum_bookings_status";
  DROP TYPE "public"."enum_payments_currency";
  DROP TYPE "public"."enum_payments_status";
  DROP TYPE "public"."enum_processed_webhook_events_provider";`);
}
