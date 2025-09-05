import type { NextFunction ,Request , Response } from "express";
import type { LoginDTO, LoginResponseDTO, LoginResponseDTOWithJWT, RegisterDTO, RegisterResponseDTO } from "./auth.dto.js";
import { ZodValidation } from "../shared/utils/zod.utils.js";
import { LoginDTOSchema, RegisterDTOSchema } from "./utils/auth.schema.js";
import { authService, AuthService } from "./auth.service.js";
import { CustomError } from "../shared/exception.js";
import { HttpStatusCode } from "../shared/utils/util.types.js";
import { signJWT } from "./utils/jwt.utils.js";

export class AuthController {

    public async register(req:Request<{} , {} , RegisterDTO> , res:Response<RegisterResponseDTO|string> , next:NextFunction){

         try {
            const payloadDate = ZodValidation(RegisterDTOSchema , req.body , 'AUTH');
            const user = await authService.register(payloadDate);
            res.json(user)
         } catch (error) {
              console.log(error)
              throw new CustomError('something is error' , 'AUTH' , HttpStatusCode.BAD_REQUEST)
         }      
    }

    public async login(req:Request<{},{}, LoginDTO> , res:Response<LoginResponseDTO | string> , next:NextFunction) {
         
    const payloadData = ZodValidation(LoginDTOSchema, req.body, 'AUTH');
    const userData = await authService.login(payloadData);
    if (!userData) {
      res.status(HttpStatusCode.BAD_REQUEST).send('wrong credentials');
      return;
    }
   
    res.json(userData)              
    }

    public async loginWithJWT(req:Request<{},{}, LoginDTO> , res:Response<LoginResponseDTOWithJWT | string> , next:NextFunction) {
         
    const payloadData = ZodValidation(LoginDTOSchema, req.body, 'AUTH');
    const userData = await authService.login(payloadData);
    if (!userData) {
      res.status(HttpStatusCode.BAD_REQUEST).send('wrong credentials');
      return;
    }
    const token = signJWT({sub:userData.id , name:userData.name})
    res.json({date:userData , token})              
    }
}
export const authController = new AuthController()
