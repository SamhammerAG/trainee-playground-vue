import type { ValidationProblemDetails } from "@/composables/ValidationProblem";
import { AxiosError, type AxiosResponse } from "axios";
import { describe, it, expect } from "vitest";
import useValidationProblem from "@/composables/ValidationProblem";
import pinia from "@/pinia";
import mockI18n from "./helper/i18nMockHelper";
import type { ErrorCode, ErrorInfoContract } from "@/contracts/ErrorInfoContract";

function getComposable() {
    let result;
    const app = createApp({
        setup() {
            result = useValidationProblem("test", "error.default");
            return () => {};
        }
    });

    const translations = {
        "error.default": "An error has occurred",
        "test.name": "An error occurred in the name field",
        "test.name.required": "The name is required",
        "test.name.alreadyExisting": "The name is already existing",
        "test.type.notExisting": "The type is not existing",
        "test.type.tooLong": "The type is too long",
        "test.myErrorCode": "The api action failed",
        "test.myErrorCodeWithFieldInfo": "The api action failed for field {field}"
    };

    app.use(mockI18n(translations));
    app.use(pinia);

    app.mount(document.createElement("div"));

    if (result) {
        return result as ReturnType<typeof useValidationProblem>;
    } else {
        throw Error("The composable could not be built");
    }
}

function buildAxiosError(data?: ValidationProblemDetails | ErrorInfoContract) {
    return new AxiosError(undefined, undefined, undefined, undefined, { data } as AxiosResponse);
}

describe("ValidationProblem", () => {
    const composable = getComposable();

    describe("getErrorTranslations", () => {
        it("one field with one error - should return translated errors per field", () => {
            const axiosError = buildAxiosError({
                title: "TestError",
                detail: "This is only a test",
                errors: {
                    name: ["required"]
                }
            } as ValidationProblemDetails);

            const result = composable.getErrorTranslations(axiosError);

            const expected = {
                name: [
                    "The name is required" // test.name.required
                ]
            };

            expect(result).toMatchObject(expected);
        });

        it("one field with multiple errors - should return translated errors per field", () => {
            const axiosError = buildAxiosError({
                title: "TestError",
                detail: "This is only a test",
                errors: {
                    name: ["required", "alreadyExisting"]
                }
            } as ValidationProblemDetails);

            const result = composable.getErrorTranslations(axiosError);

            const expected = {
                name: [
                    "The name is required", // test.name.required
                    "The name is already existing" // test.name.alreadyExisting
                ]
            };

            expect(result).toMatchObject(expected);
        });

        it("multiple fields with multiple errors - should return translated errors per field", () => {
            const axiosError = buildAxiosError({
                title: "TestError",
                detail: "This is only a test",
                errors: {
                    name: ["required", "alreadyExisting"],
                    type: ["notExisting", "tooLong"]
                }
            } as ValidationProblemDetails);

            const result = composable.getErrorTranslations(axiosError);

            const expected = {
                name: [
                    "The name is required", // test.name.required
                    "The name is already existing" // test.name.alreadyExisting
                ],
                type: [
                    "The type is not existing", // test.type.notExisting
                    "The type is too long" //  test.type.tooLong
                ]
            };

            expect(result).toMatchObject(expected);
        });

        it("with ErrorInfo - should return translation for the errorCode", () => {
            const axiosError = buildAxiosError({
                errorCode: "alreadyExisting" as ErrorCode,
                fieldName: "name"
            } as ErrorInfoContract);

            const result = composable.getErrorTranslations(axiosError);

            const expected = {
                name: [
                    "The name is already existing" // test.name.alreadyExisting
                ]
            };

            expect(result).toMatchObject(expected);
        });

        it("no error - should return empty object", () => {
            const axiosError = buildAxiosError({
                title: "TestError",
                detail: "This is only a test",
                errors: {}
            } as ValidationProblemDetails);

            const result = composable.getErrorTranslations(axiosError);

            const expected = {};

            expect(result).toMatchObject(expected);
        });

        it("no error - should return empty object", () => {
            const axiosError = buildAxiosError({} as ValidationProblemDetails);

            const result = composable.getErrorTranslations(axiosError);

            const expected = {};

            expect(result).toMatchObject(expected);
        });
    });

    describe("getFirstErrorTranslation", () => {
        it("with ValidationProblemDetails multiple errors - should return translation for first field and first error ", () => {
            const axiosError = buildAxiosError({
                title: "TestError",
                detail: "This is only a test",
                errors: {
                    name: ["required", "alreadyExisting"],
                    type: ["notExisting", "tooLong"]
                }
            } as ValidationProblemDetails);

            const result = composable.getFirstErrorTranslation(axiosError);

            const expected = "The name is required"; // test.name.required

            expect(result).toMatchObject(expected);
        });

        it("with ErrorInfo - should return translation for the errorCode", () => {
            const axiosError = buildAxiosError({
                errorCode: "MyErrorCode" as ErrorCode
            } as ErrorInfoContract);

            const result = composable.getFirstErrorTranslation(axiosError);

            const expected = "The api action failed"; // test.myErrorCode

            expect(result).toMatchObject(expected);
        });

        it("with ErrorInfo - should return translation for the errorCode with parameters", () => {
            const axiosError = buildAxiosError({
                errorCode: "MyErrorCodeWithFieldInfo" as ErrorCode,
                fieldName: "MyField"
            } as ErrorInfoContract);

            const result = composable.getFirstErrorTranslation(axiosError);

            const expected = "The api action failed for field MyField"; // test.myErrorCodeWithFieldInfo

            expect(result).toMatchObject(expected);
        });

        it("with ValidationProblemDetails no error - should return the translation for fallbackKey", () => {
            const axiosError = buildAxiosError({
                title: "TestError",
                detail: "This is only a test",
                errors: {}
            } as ValidationProblemDetails);

            const result = composable.getFirstErrorTranslation(axiosError);

            const expected = "An error has occurred"; // error.default

            expect(result).toMatchObject(expected);
        });

        it("not ErrorInfo or ValidationProblem - should return the translation for fallbackKey", () => {
            const axiosError = buildAxiosError();

            const result = composable.getFirstErrorTranslation(axiosError);

            const expected = "An error has occurred"; // error.default

            expect(result).toMatchObject(expected);
        });
    });

    describe("getErrorTranslationKey", () => {
        it("translation not existing - should use fallbackKey", () => {
            const prefix = "Not";
            const value = "Existing";

            const result = composable.getErrorTranslationKey(prefix, value);

            const expected = "error.default";

            expect(result).toMatch(expected);
        });

        it("Uppercase prefix and value - should change first characters to lower", () => {
            const prefix = "Name";
            const value = "AlreadyExisting";

            const result = composable.getErrorTranslationKey(prefix, value);

            const expected = "test.name.alreadyExisting";

            expect(result).toMatch(expected);
        });

        it("Undefined value - should not be part of the key", () => {
            const prefix = "name";
            const value = undefined;

            const result = composable.getErrorTranslationKey(prefix, value);

            const expected = "test.name";

            expect(result).toMatch(expected);
        });
    });
});
