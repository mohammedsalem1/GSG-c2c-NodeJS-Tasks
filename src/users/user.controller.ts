import type { NextFunction, Request , Response } from "express";
import { CustomError } from "../shared/exception.js";
import { userService } from "./user.service.js";
import type { CreateCoachDTO, CreateResponseCoachDTO, UpdateUserDTO } from "./user.dto.js";
import { ZodValidation } from "../shared/utils/zod.utils.js";
import { CreateCoachDTOSchema} from "./utils/user.schema.js";
import { HttpErrorStatus } from "../shared/utils/util.types.js";

export class UsersController {
//    GET /users/me → Get current user profile (protected). 
    async getCurrentUser(req:Request , res:Response , next:NextFunction) {
        const user = await userService.getCurrentUser(req.user!.id)
        res.ok(user)
    }
//    PUT /users/me → Update current profile.
    async updateProfile(req:Request<{}, {},UpdateUserDTO> , res:Response , next:NextFunction) {

    const userId = req.user?.id; 
    if (!userId) {
      throw new CustomError("Unauthorized: user ID missing", 'AUTH', HttpErrorStatus.Unauthorized);
    }

    const user = await userService.updateProfile({
      id: userId,   
      ...req.body,
    });
    res.json({success: true, message:user})
    }
//    POST /users/coach → : create a COACH user 
    async createCoach(req:Request<{},{},CreateCoachDTO> , res:Response<CreateResponseCoachDTO> , next:NextFunction) {
         try {
            const paylaodDate = ZodValidation(CreateCoachDTOSchema , req.body , 'USER');

            const user = await userService.createCoach(paylaodDate);
            res.json(user);

         } catch (error) {
            throw new CustomError('something is error' , 'USER' , HttpErrorStatus.BadRequest)
          }     
       }  
    }
export const userController = new UsersController();