import type { User } from "../../users/user.entity.js"
import type { ApiResponseMeta, UnifiedApiErrorResponse } from "../middleware/response.middleware.js";
import { MetaParams } from "./api-utils.js";

export type MyEnvs = {
  PORT: string;
  JWT_SECRET: string;
  MONGODB_URL:string
};

declare global {
  namespace NodeJS {
    interface ProcessEnv extends MyEnvs {}
  }
  namespace Express { 
      interface Request {
         user?:User
      } 
      interface Response {
        create: (date:object) => this
        ok: (date:object) => this
        paginationResponse: (data:object , meta:MetaParams) => this
        error: (err:UnifiedApiErrorResponse) => this
      }
    }
}