import type { NextFunction, Request , Response } from "express";
import { CustomError } from "../shared/exception.js";
import { HttpStatusCode } from "../shared/utils/util.types.js";
import type { User } from "./user.entity.js";
import { userService } from "./user.service.js";
import type { UpdateUserDTO } from "./user.dto.js";
import { ZodValidation } from "../shared/utils/zod.utils.js";
import { UpdateUserDTOSchema } from "./utils/user.schema.js";

export class UsersController {
//    GET /users/me → Get current user profile (protected). 
    async getCurrentUser(req:Request , res:Response , next:NextFunction) {
        const user = await userService.getCurrentUser(req.user!.id)
        console.log(user)
        res.json(user)
    }
//    PUT /users/me → Update current profile.
    async updateProfile(req:Request<{}, {},UpdateUserDTO> , res:Response , next:NextFunction) {
    const payloadData = ZodValidation(UpdateUserDTOSchema , req.body ,'USER') 

    const userId = req.user?.id; 
    if (!userId) {
      throw new CustomError("Unauthorized: user ID missing", 'AUTH', HttpStatusCode.UNAUTHORIZED);
    }

    const user = await userService.updateProfile({
      id: userId,   
      ...payloadData,
    });
    res.json(user)
    }
//    POST /users/coach → : create a COACH user 
    async createCoach(paylaod:User) {
        //create
    }  
}
export const userController = new UsersController();
