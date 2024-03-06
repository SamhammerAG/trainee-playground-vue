import { getLocale } from "@/plugins/DateAdapter";
import { describe, it, expect, vi } from "vitest";
import { enUS, de } from "date-fns/locale";

describe("getLocale", () => {
    it("uses browser language", () => {
        vi.spyOn(window.navigator, "language", "get").mockReturnValue("de-DE");
        const locale = getLocale();
        expect(locale).toBe(de);
    });

    it("fallback to default language", () => {
        vi.spyOn(window.navigator, "language", "get").mockReturnValue("");
        vi.stubEnv("VITE_DEFAULT_LANGUAGE", "en");
        const locale = getLocale();
        expect(locale).toBe(enUS);
    });

    it("fallback to en-US", () => {
        vi.spyOn(window.navigator, "language", "get").mockReturnValue("");
        vi.stubEnv("VITE_DEFAULT_LANGUAGE", "");
        const locale = getLocale();
        expect(locale).toBe(enUS);
    });
});
