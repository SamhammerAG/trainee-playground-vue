import { createI18n } from "vue-i18n";

export default function mockI18n(translations: Record<string, string>) {
    return createI18n({
        locale: "en",
        legacy: false,
        warnHtmlMessage: false,
        messages: {
            en: translations
        }
    });
}
