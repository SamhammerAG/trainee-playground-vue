import { ref } from "vue";
import { useI18n } from "vue-i18n";

const visible = ref(false);
const translation = ref("");
const notificationColor = ref("");

export default function useNotification() {
    const i18n = useI18n();

    const success = (translationOrKey: string, alreadyTranslated = false, namedParameters?: Record<string, unknown>) => {
        show(translationOrKey, "success", alreadyTranslated, namedParameters);
    };

    const warning = (translationOrKey: string, alreadyTranslated = false, namedParameters?: Record<string, unknown>) => {
        show(translationOrKey, "warning", alreadyTranslated, namedParameters);
    };

    const error = (translationOrKey: string, alreadyTranslated = false, namedParameters?: Record<string, unknown>) => {
        show(translationOrKey, "error", alreadyTranslated, namedParameters);
    };

    const info = (translationOrKey: string, alreadyTranslated = false, namedParameters?: Record<string, unknown>) => {
        show(translationOrKey, "info", alreadyTranslated, namedParameters);
    };

    const show = (translationOrKey: string, color: string, alreadyTranslated: boolean, named?: Record<string, unknown>) => {
        notificationColor.value = color ?? "";
        translation.value = alreadyTranslated ? translationOrKey : i18n.t(translationOrKey, named ?? {});
        visible.value = true;
    };

    return { visible, translation, color: notificationColor, show, success, warning, error, info };
}
