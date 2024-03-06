import { some, trim } from "lodash";
import type { ValidationRule } from "vuetify/helpers";

export function required(message: string): ValidationRule {
    return (value: string) => {
        return (value && trim(value).length > 0) || message;
    };
}

export function email(message: string): ValidationRule {
    const emailPattern = /^[A-Z0-9+_.-]+@[A-Z0-9.-]+$/i;
    return regex(emailPattern, message);
}

export function regex(regex: RegExp, message: string): ValidationRule {
    return (value: string) => {
        return regex.test(value) || message;
    };
}
export function exists(message: string, items: string[]): ValidationRule {
    return (value: string) => {
        // operator == is required to ensure it also works for ref<string>
        const valid = value && items && some(items, (i) => i == value);
        return valid || message;
    };
}

export function notExists(message: string, items: string[]): ValidationRule {
    return (value: string) => {
        // operator == is required to ensure it also works for ref<string>
        const valid = value && items && !some(items, (i) => i == value);
        return valid || message;
    };
}

export function hasItems(message: string): ValidationRule {
    return (value: unknown[]) => {
        const valid = value.length > 0;
        return valid || message;
    };
}
