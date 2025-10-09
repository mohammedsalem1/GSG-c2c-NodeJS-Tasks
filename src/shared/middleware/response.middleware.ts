import type { RequestHandler } from "express";
import type { ApiStatusCode } from "../utils/util.types.js";
import { date } from "zod/v4";
import { calculationTotalPages } from "../utils/api-utils.js";
export type UnifiedApiErrorResponse = {
statusCode:ApiStatusCode , message:string
}
export type PaginationMeta = {
    page:number;
    limit:number;
    totalRecords:number;
    totalPages:number;
}
export type ApiResponseMeta = PaginationMeta;
export type SuccessApiResponse = 
| {success:true , date:object , meta?:ApiResponseMeta}

export type UnSuccessApiResponse = 
 {success:false , error:UnifiedApiErrorResponse}

export type UnifiedApiResponse = 
| SuccessApiResponse
| UnSuccessApiResponse

export const responseEnhancer:RequestHandler = (req , res , next) => {
    res.ok = (date ) => res.status(200).json(formateUnifiedResponse({success:true , date }))
    
    res.paginationResponse = (date , meta) => res.status(200).json(formateUnifiedResponse({success:true , date , meta:calculationTotalPages(meta)}))

    res.create = (date) => res.status(201).json(formateUnifiedResponse(
        {success:true , date}
    ))

    res.error = (err) => res.status(err.statusCode).json(
        formateUnifiedResponse(
        {success:false , error:err}))
    next()    
}
const formateUnifiedResponse = (res:UnifiedApiResponse) => res