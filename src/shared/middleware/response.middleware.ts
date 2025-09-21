import type { RequestHandler } from "express";
import type { ApiStatusCode } from "../utils/util.types.js";
export type UnifiedApiErrorResponse = {
statusCode:ApiStatusCode , message:string
}
export type SuccessApiResponse = 
| {success:true , date:object}

export type UnSuccessApiResponse = 
 {success:false , error:UnifiedApiErrorResponse}

export type UnifiedApiResponse = 
| SuccessApiResponse
| UnSuccessApiResponse

export const responseEnhancer:RequestHandler = (req , res , next) => {
    res.ok = (date) => res.status(200).json(formateUnifiedResponse({success:true , date}))

    res.create = (date) => res.status(201).json(formateUnifiedResponse(
        {success:true , date}
    ))

    res.error = (err) => res.status(err.statusCode).json(
        formateUnifiedResponse(
        {success:false , error:err}))
    next()    
}
const formateUnifiedResponse = (res:UnifiedApiResponse) => res