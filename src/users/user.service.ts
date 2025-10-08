import { createArgonHash } from "../auth/utils/argon.utils.js";
import { Role } from "../generated/prisma/index.js";
import { CustomError } from "../shared/exception.js"
import { removeFields } from "../shared/utils/object.utils.js";
import { HttpErrorStatus } from "../shared/utils/util.types.js";
import type {  CreateCoachDTO, CreateResponseCoachDTO, UpdateUserDTO } from "./user.dto.js";
import {  type User } from "./user.entity.js"
import { userRepository  } from "./user.repository.js";

export class UserService {
    //    GET /users/me → Get current user profile (protected). 
        async getCurrentUser(userId: number) {
           const user = await userRepository.findById(userId)
           if (!user) {
              throw new CustomError("The user is not found" , 'USER' , HttpErrorStatus.BadRequest)
           }
           return user;
        }
       
         async updateProfile(paylaodDate:{id:number}& UpdateUserDTO){

            const user = await userRepository.update(paylaodDate.id , paylaodDate)
            if (!user) {
               throw new CustomError('user not found','USER',HttpErrorStatus.BadRequest)
            }
            return user
         }
    async createCoach(payload:CreateCoachDTO): Promise<CreateResponseCoachDTO> {
        // hashsed password  
        const hashedValue = await createArgonHash(payload.password)

        const userDate = await userRepository.create(
         {...payload , password:hashedValue , role:Role.COACH})

        // return date without user
        return removeFields(userDate , ['password']);
         //  return userDate;
   }
   create(payload: Omit<User, 'id' | 'createdAt' | 'updatedAt'>):Promise<User> {
     return userRepository.create(payload)
   }  
   findByEmail(email:string):Promise<User | null> {
     return userRepository.findByEmail(email)
   } 
}
export const userService = new UserService()