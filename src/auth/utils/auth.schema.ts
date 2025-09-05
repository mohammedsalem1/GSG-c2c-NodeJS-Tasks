import type { ZodType } from "zod";
import { userSchema } from "../../users/utils/user.schema.js";
import type { LoginDTO, RegisterDTO } from "../auth.dto.js";
import { xid } from "zod/v4";

export const RegisterDTOSchema = userSchema.pick({
    
    name:true , 
    email:true , 
    password:true ,
    role:true

})satisfies ZodType<RegisterDTO>

export const LoginDTOSchema = userSchema.pick({
    
    email:true , 
    password:true ,

})satisfies ZodType<LoginDTO>

