import { createArgonHash } from "../auth/utils/argon.utils.js";
import { CustomError } from "../shared/exception.js"
import { removeFields } from "../shared/utils/object.utils.js";
import { HttpStatusCode } from "../shared/utils/util.types.js"
import type {  CreateCoachDTO, CreateResponseCoachDTO, UpdateUserDTO } from "./user.dto.js";
import { Role, type User } from "./user.entity.js"
import { userRepository, UserRepository } from "./user.repository.js";
import { CreateCoachDTOSchema } from "./utils/user.schema.js";

export class UserService {
    //    GET /users/me → Get current user profile (protected). 
        async getCurrentUser(userId: string) {
           const user = await userRepository.findById(userId)
           if (!user) {
              throw new CustomError("don't have user" , 'USER' , HttpStatusCode.BAD_REQUEST)
           }
           return user;
        }
       
         async updateProfile(paylaodDate:{id:string}& UpdateUserDTO){

            const user = await userRepository.update(paylaodDate.id , paylaodDate)
            if (!user) {
               throw new CustomError('user not found','USER',HttpStatusCode.BAD_REQUEST)
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