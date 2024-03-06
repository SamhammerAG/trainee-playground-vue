import type { AxiosError } from "axios";
import type { Ref } from "vue";
import useValidationProblem from "./ValidationProblem";

export default function useFieldValidation(value: Ref, prefix: string, fallbackKey: string) {
    const validationProblem = useValidationProblem(prefix, fallbackKey);
    const errors = ref<Record<string, string[]>>({});

    watch(
        value,
        () => {
            errors.value = {};
        },
        { deep: true }
    );

    const setErrors = (error: AxiosError) => {
        errors.value = validationProblem.getErrorTranslations(error);
    };

    return { errors, setErrors };
}
