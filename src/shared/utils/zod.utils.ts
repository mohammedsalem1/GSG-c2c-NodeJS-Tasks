import { ZodError, ZodType } from "zod";
import type { ModuleNameType } from "../constant.js";
import { CustomError } from "../exception.js";
import { HttpStatusCode } from "./util.types.js";

export const ZodValidation = <T>(schema:ZodType<T> , payload:T , moduleName:ModuleNameType) => {
     try {
       // validate
        const safeDate = schema.parse(payload);
        // return value
        return safeDate
     } catch (error) {
        if (error instanceof ZodError) {
            throw new CustomError(error.message , moduleName , HttpStatusCode.BAD_REQUEST)
        }
        throw error
     }
}