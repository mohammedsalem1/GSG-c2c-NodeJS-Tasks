import type { ModuleNameType } from "./constant.js";
import type { Response } from "express";
import type { ErrorStatusCode, HttpErrorStatusType } from "./utils/util.types.js";
export class CustomError extends Error {
    constructor(
        message:string , 
        public moduleName:ModuleNameType , 
        public statusCode:ErrorStatusCode){
        super(message)
    }
}
// 
export const handleError = (error:unknown , res:Response)=> {
   if (error instanceof CustomError) {
      console.log('Custome Error:' , error);
      res.status(error.statusCode).send(error.message);  
      return
   }
   console.log(error)
   res.status(500).send('internal server')
}