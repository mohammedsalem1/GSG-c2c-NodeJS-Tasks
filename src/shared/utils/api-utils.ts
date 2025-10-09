import { ApiResponseMeta, PaginationMeta } from "../middleware/response.middleware";
export type MetaParams =  {
     page:number; 
     limit:number ; 
     totalRecords:number;
}

export const calculationTotalPages = ({page , limit , totalRecords}:MetaParams): ApiResponseMeta => {
    const totalPages = Math.ceil(totalRecords / limit)
    return {
      page , 
      limit , 
      totalRecords, 
      totalPages
    }
}