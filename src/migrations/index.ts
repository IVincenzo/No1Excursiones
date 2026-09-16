import * as migration_20260914_114718_initial_payload_schema from "./20260914_114718_initial_payload_schema";
import * as migration_20260914_140000_booking_contacts from "./20260914_140000_booking_contacts";
import * as migration_20260914_215704_add_main_pages from "./20260914_215704_add_main_pages";
import * as migration_20260915_000000_remove_legacy_image_urls from "./20260915_000000_remove_legacy_image_urls";

export const migrations = [
  {
    up: migration_20260914_114718_initial_payload_schema.up,
    down: migration_20260914_114718_initial_payload_schema.down,
    name: "20260914_114718_initial_payload_schema",
  },
  {
    up: migration_20260914_140000_booking_contacts.up,
    down: migration_20260914_140000_booking_contacts.down,
    name: "20260914_140000_booking_contacts",
  },
  {
    up: migration_20260914_215704_add_main_pages.up,
    down: migration_20260914_215704_add_main_pages.down,
    name: "20260914_215704_add_main_pages",
  },
  {
    up: migration_20260915_000000_remove_legacy_image_urls.up,
    down: migration_20260915_000000_remove_legacy_image_urls.down,
    name: "20260915_000000_remove_legacy_image_urls",
  },
];
