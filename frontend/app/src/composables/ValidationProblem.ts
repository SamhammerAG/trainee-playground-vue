import type { AxiosError } from "axios";
import { lowerFirst, keys, first } from "lodash";
import { useI18n } from "vue-i18n";
import { useNotificationStore } from "@/stores/notificationStore";
import type { ErrorInfoContract } from "@/contracts/ErrorInfoContract";

export interface ValidationProblemDetails {
    status?: number;
    title: string;
    detail: string;
    errors: ValidationError;
}

export interface ValidationError {
    [key: string]: string[];
}

export default function useValidationProblem(globalPrefix: string, fallbackKey: string) {
    const i18n = useI18n();
    const notify = useNotificationStore();

    const getErrorTranslations = (error: AxiosError) => {
        const record: Record<string, string[]> = {};

        const validationProblem = error?.response?.data as ValidationProblemDetails;

        const errors = validationProblem?.errors;
        if (errors) {
            keys(errors).forEach((fieldKey) => {
                const errorKeys = errors[fieldKey];
                record[lowerFirst(fieldKey)] = errorKeys.map((errorKey) => {
                    const translationKey = getErrorTranslationKey(fieldKey, errorKey);
                    return i18n.t(translationKey);
                });
            });
        }

        const apiErrorInfo: ErrorInfoContract = error?.response?.data as ErrorInfoContract;
        if (apiErrorInfo) {
            const { fieldName, errorCode } = apiErrorInfo;

            if (fieldName && errorCode) {
                const translationKey = getErrorTranslationKey(fieldName, errorCode);
                const errorMessage = i18n.t(translationKey, { field: fieldName });
                record[lowerFirst(fieldName)] = [errorMessage];
            }
        }

        return record;
    };

    const getFirstErrorTranslation = (error: AxiosError) => {
        const apiErrorInfo: ErrorInfoContract = error?.response?.data as ErrorInfoContract;
        const validationProblem = error?.response?.data as ValidationProblemDetails;

        if (validationProblem?.errors) {
            const firstFieldKey = first(keys(validationProblem.errors))!;
            const firstError = first(validationProblem.errors[firstFieldKey])!;

            const translationKey = getErrorTranslationKey(firstFieldKey, firstError);
            return i18n.t(translationKey);
        }

        if (apiErrorInfo?.errorCode) {
            const translationKey = getErrorTranslationKey(apiErrorInfo.errorCode);
            return i18n.t(translationKey, { field: apiErrorInfo.fieldName });
        }

        return i18n.t(fallbackKey);
    };

    const getErrorTranslationKey = (prefix: string, value?: string): string => {
        const key = [globalPrefix, lowerFirst(prefix), lowerFirst(value)].filter((i) => i != "").join(".");

        return translationKeyExists(key) ? key : fallbackKey;
    };

    const translationKeyExists = (translationKey: string) => {
        return i18n.t(translationKey) !== translationKey;
    };

    const showErrorMessage = (error: AxiosError) => {
        notify.error(getFirstErrorTranslation(error), true);
    };

    const showWarningMessage = (error: AxiosError) => {
        notify.warning(getFirstErrorTranslation(error), true);
    };

    const showInfoMessage = (error: AxiosError) => {
        notify.info(getFirstErrorTranslation(error), true);
    };

    return {
        getErrorTranslations,
        getFirstErrorTranslation,
        showErrorMessage,
        showWarningMessage,
        showInfoMessage,
        getErrorTranslationKey
    };
}
