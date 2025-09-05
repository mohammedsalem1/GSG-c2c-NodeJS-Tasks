   import type { User } from "../../users/user.entity.js"

export type MyEnvs = {
  PORT: string;
  JWT_SECRET: string;
};

declare global {
  namespace NodeJS {
    interface ProcessEnv extends MyEnvs {}
  }
    namespace Express { 
      interface Request {
         user?:User
      }
    }
}