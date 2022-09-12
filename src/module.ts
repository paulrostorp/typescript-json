import { $is_email } from "./functional/$is_email";
import { $is_ipv4 } from "./functional/$is_ipv4";
import { $is_ipv6 } from "./functional/$is_ipv6";
import { $is_url } from "./functional/$is_url";
import { $is_uuid } from "./functional/$is_uuid";
import { $number } from "./functional/$number";
import { $string } from "./functional/$string";
import { $tail } from "./functional/$tail";

import { IJsonApplication } from "./schemas/IJsonApplication";

import { IValidation } from "./IValidation";
import { TypeGuardError } from "./TypeGuardError";

export * from "./schemas/IJsonApplication";
export * from "./schemas/IJsonComponents";
export * from "./schemas/IJsonSchema";
export * from "./TypeGuardError";

/* -----------------------------------------------------------
    VALIDATORS
----------------------------------------------------------- */
/**
 * Asserts a value type in the runtime.
 *
 * Asserts a parametric value type and throws a {@link TypeGuardError} with detailed
 * reason, if the parametric value is not following the type `T`. Otherwise, the
 * value is following the type `T`, just input parameter would be returned.
 *
 * If what you want is not asserting but just knowing whether the parametric value is
 * following the type `T` or not, you can choose the {@link is} function instead.
 * Otherwise you want to know all the errors, {@link validate} is the way to go.
 *
 * @template T Type of the input value
 * @param input A value to be asserted
 * @returns Parametric input value
 * @throws A {@link TypeGuardError} instance with detailed reason
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export function assertType<T>(input: T): T;
export function assertType<T>(input: unknown): T;

/**
 * @internal
 */
export function assertType(): never {
    halt("assertType");
}

/**
 * @internal
 */
export namespace assertType {
    export const is_uuid = $is_uuid;
    export const is_email = $is_email;
    export const is_url = $is_url;
    export const is_ipv4 = $is_ipv4;
    export const is_ipv6 = $is_ipv6;

    export function predicate(
        matched: boolean,
        exceptionable: boolean,
        closure: () => Omit<TypeGuardError.IProps, "method">,
    ): boolean {
        if (matched === false && exceptionable === true)
            throw new TypeGuardError({
                method: "TSON.assertType",
                ...closure(),
            });
        return matched;
    }
}

/**
 * Tests a value type in the runtime.
 *
 * Tests a parametric value type and returns whether it's following the type `T` or not.
 * If the parametric value is matched with the type `T`, `true` value would be returned.
 * Otherwise, the parametric value is not following the type `T`, `false` value would be
 * returned.
 *
 * If what you want is not just knowing whether the parametric value is following the
 * type `T` or not, but throwing an exception with detailed reason, you can choose
 * {@link is} function instead. Also, if you want to know all the errors with detailed
 * reasons, {@link validate} function would be useful.
 *
 * @template T Type of the input value
 * @param input A value to be tested
 * @returns Whether the parametric value is following the type `T` or not
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export function is<T>(input: T): input is T;
export function is<T>(input: unknown): input is T;

/**
 * @internal
 */
export function is(): never {
    halt("is");
}

/**
 * @internal
 */
export namespace is {
    export const is_uuid = $is_uuid;
    export const is_email = $is_email;
    export const is_url = $is_url;
    export const is_ipv4 = $is_ipv4;
    export const is_ipv6 = $is_ipv6;
}

/**
 * Validate a value type in the runtime.
 *
 * Validates a parametric value type and archives all the type errors into an
 * {@link IValidation.errors} array, if the parametric value is not following the
 * type `T`. Of course, if the parametric value is following the type `T`, the
 * {@link IValidation.errors} array would be empty and {@link IValidation.success}
 * would have the `true` value.
 *
 * If what you want is not finding all the error, but asserting the parametric value
 * type with exception throwing, you can choose {@link assertType} function instead.
 * Otherwise, you just want to know whether the parametric value is matched with the
 * type `T`, {@link is} function is the way to go.
 *
 * @template Type of the input value
 * @param input A value to be validated
 * @returns
 */
export function validate<T>(input: T): IValidation;

/**
 * @internal
 */
export function validate(): never {
    halt("validate");
}

/**
 * @internal
 */
export namespace validate {
    export const is_uuid = $is_uuid;
    export const is_email = $is_email;
    export const is_url = $is_url;
    export const is_ipv4 = $is_ipv4;
    export const is_ipv6 = $is_ipv6;

    export const predicate =
        (res: IValidation) =>
        (
            matched: boolean,
            exceptionable: boolean,
            closure: () => IValidation.IError,
        ) => {
            // CHECK FAILURE
            if (matched === false && exceptionable === true)
                (() => {
                    res.success &&= false;

                    // TRACE ERROR
                    const error = closure();
                    if (res.errors.length) {
                        const last = res.errors[res.errors.length - 1]!.path;
                        if (
                            last.length >= error.path.length &&
                            last.substring(0, error.path.length) === error.path
                        )
                            return;
                    }
                    res.errors.push(error);
                    return;
                })();
            return matched;
        };
}

/* -----------------------------------------------------------
    STRINGIFY
----------------------------------------------------------- */
/**
 * 5x faster `JSON.stringify()` function.
 *
 * Converts an input value to a JSON (JavaSript Object Noation) string, about 5x faster
 * than the native `JSON.stringify()` function. The 5x faster principle is because
 * it writes an optmized JSON conversion plan, only for the type `T`.
 *
 * If you want to create a stringify function which is reusable, just assign this function
 * to a (constant) variable like below, with the generic argument `T`. Then the variable
 * would be a stringify fuction reusable.
 *
 * ```typescript
 * const stringify = TSON.stringify<MyType>;
 * stringify(x);
 * stringify(y);
 * stringify(z);
 * ```
 *
 * For reference, this `TSON.stringify()` does not validate the input value type. It
 * just believes that the input value is following the type `T`. Therefore, if you
 * can't ensure the input value type, it would better to call {@link assertType} or
 * {@link is} function before.
 *
 * @template T Type of the input value
 * @param input A value to be converted
 * @return JSON string value
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export function stringify<T>(input: T): string;

/**
 * @internal
 */
export function stringify(): never {
    halt("stringify");
}

/**
 * @internal
 */
export namespace stringify {
    export const number = $number;
    export const string = $string;
    export const tail = $tail;

    export function throws(
        props: Pick<TypeGuardError.IProps, "expected" | "value">,
    ): void {
        throw new TypeGuardError({
            ...props,
            method: "TSON.stringify",
        });
    }
}

/* -----------------------------------------------------------
    APPENDIX FUNCTIONS
----------------------------------------------------------- */
/**
 * 2x faster constant object creator.
 *
 * You know what? `JSON.parse()` is faster than literal object construction, when the
 * object would be constructed only one time.
 *
 * - [Faster apps with JSON.parse (Chrome Dev Summit 2019)](https://www.youtube.com/watch?v=ff4fgQxPaO0)
 * - [The cost of parsing JSON](https://v8.dev/blog/cost-of-javascript-2019#json)
 *
 * `TSON.create()` is a transformer function which converts a literal object construction
 * to a `JSON.parse()` function call expression with JSON string argument. Therefore, if
 * you construct a literal object via this `TSON.create()`, you can get benefit from both
 * type safe and performance tuning at the same time.
 *
 * @template T Type of the input value
 * @param input A value to be converted
 * @return Same with the parametric value
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export function create<T>(input: T): T;

/**
 * @internal
 */
export function create(): never {
    halt("create");
}

/**
 * > You must configure the generic argument `T`.
 *
 * JSON Schema Application.
 *
 * Creates a JSON schema application which contains both main JSON schemas and components.
 * Note that, all of the object types are stored in the {@link IJsonApplication.components}
 * property for the `$ref` referencing.
 *
 * Also, `TSON.application()` has additional generic arguments, *Purpose*.
 * As JSON schema definitions used by `swagger` and `ajv` are different a little bit,
 * you should configure the *Purpose* apprpriately.
 *
 * For an example, `ajv` has an extra property "$recursiveRef" that are not exists
 * in the standard JSON schema definition spec. Otherwise, `swagger` can't identify
 * the tuple definition.
 *
 * @template Types Tuple of target types
 * @template Purpose Purpose of the JSON schema
 * @template Prefix Prefix of the JSON components referenced by `$ref` tag
 * @return JSON schema application
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export function application(): never;

/**
 * JSON Schema Application.
 *
 * Creates a JSON schema application which contains both main JSON schemas and components.
 * Note that, all of the object types are stored in the {@link IJsonApplication.components}
 * property for the `$ref` referencing.
 *
 * Also, `TSON.application()` has additional generic arguments, *Purpose*.
 * As JSON schema definitions used by `swagger` and `ajv` are different a little bit,
 * you should configure the *Purpose* apprpriately.
 *
 * For an example, `ajv` has an extra property "$recursiveRef" that are not exists
 * in the standard JSON schema definition spec. Otherwise, `swagger` can't identify
 * the tuple definition.
 *
 * @template Types Tuple of target types
 * @template Purpose Purpose of the JSON schema
 * @template Prefix Prefix of the JSON components referenced by `$ref` tag
 * @return JSON schema application
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export function application<
    Types extends unknown[],
    Purpose extends "swagger" | "ajv" = "swagger",
    Prefix extends string = Purpose extends "swagger"
        ? "#/components/schemas"
        : "components#/schemas",
>(): IJsonApplication;

/**
 * @internal
 */
export function application(): never {
    halt("application");
}

/**
 * @internal
 */
function halt(name: string): never {
    throw new Error(
        `Error on TSON.${name}(): no transform has been configured. Configure the "tsconfig.json" file following the [README.md#setup](https://github.com/samchon/typescript-json#setup)`,
    );
}
