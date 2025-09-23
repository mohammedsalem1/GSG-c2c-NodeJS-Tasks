   import type { User } from "../../users/user.entity.js"
import type { UnifiedApiErrorResponse } from "../middleware/response.middleware.js";

export type MyEnvs = {
  PORT: string;
  JWT_SECRET: string;
  NODE_ENV: "development" | "production" | "test"
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
        error: (err:UnifiedApiErrorResponse) => this
      }
    }
}