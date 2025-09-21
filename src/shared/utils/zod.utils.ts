import { ZodError, ZodType } from "zod";
import type { ModuleNameType } from "../constant.js";
import { CustomError } from "../exception.js";
import { HttpErrorStatus } from "./util.types.js";

export const ZodValidation = <T>(schema:ZodType<T> , payload:T , moduleName:ModuleNameType) => {
     try {
       // validate
        const safeDate = schema.parse(payload);
        // return value
        return safeDate
     } catch (error) {
        if (error instanceof ZodError) {
            throw new CustomError(error.message , moduleName , HttpErrorStatus.BadRequest)
        }
        throw error
     }
}