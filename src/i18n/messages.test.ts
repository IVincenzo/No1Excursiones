import { describe, expect, it } from "vitest";
import messages from "@/i18n/messages.json";

describe("interface translations", () => {
  it("preserves all 165 keys in every language", () => {
    const englishKeys = Object.keys(messages.en).sort();
    expect(englishKeys).toHaveLength(165);
    for (const locale of ["es", "fr", "de"] as const)
      expect(Object.keys(messages[locale]).sort()).toEqual(englishKeys);
  });
});
