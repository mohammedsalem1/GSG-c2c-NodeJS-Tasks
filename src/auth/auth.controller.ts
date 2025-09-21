import type { NextFunction ,Request , Response } from "express";
import type { LoginDTO, LoginResponseDTO, LoginResponseDTOWithJWT, RegisterDTO, RegisterResponseDTO } from "./auth.dto.js";
import { ZodValidation } from "../shared/utils/zod.utils.js";
import { LoginDTOSchema, RegisterDTOSchema } from "./utils/auth.schema.js";
import { authService, AuthService } from "./auth.service.js";
import { CustomError } from "../shared/exception.js";
import { signJWT } from "./utils/jwt.utils.js";
import { HttpErrorStatus } from "../shared/utils/util.types.js";
import { removeFields } from "../shared/utils/object.utils.js";

export class AuthController {

    public async register(req:Request<{} , {} , RegisterDTO> , res:Response<RegisterResponseDTO|string> , next:NextFunction){

         try {
            const payloadDate = ZodValidation(RegisterDTOSchema , req.body , 'AUTH');
            const user = await authService.register(payloadDate);
            res.ok(user)
            
         } catch (error) {
              console.log(error)
               if (error instanceof Error) {
                  throw new CustomError(error.message, "AUTH", HttpErrorStatus.BadRequest);
          }
            throw new CustomError("Unknown error", "AUTH", HttpErrorStatus.BadRequest);
       }
    }
              
    

    public async login(req:Request<{},{}, LoginDTO> , res:Response<LoginResponseDTO | string> , next:NextFunction) {
         
    const payloadData = ZodValidation(LoginDTOSchema, req.body, 'AUTH');
    const userData = await authService.login(payloadData);
    if (!userData) {
      res.error({message:"validation error" , statusCode:HttpErrorStatus.BadRequest})
      return
    }
    res.ok(userData)              
    }

    public async loginWithJWT(req:Request<{},{}, LoginDTO> , res:Response<LoginResponseDTOWithJWT | string> , next:NextFunction) {
         
    const payloadData = ZodValidation(LoginDTOSchema, req.body, 'AUTH');
    const userData = await authService.login(payloadData);
    if (!userData) {
       res.error({message:"validation error" , statusCode:HttpErrorStatus.BadRequest})
      return;
    }
    const token = signJWT({sub:userData.id , name:userData.name})
    res.ok({date:userData , token})              
    }
}
export const authController = new AuthController()
