import { CustomError } from "../shared/exception.js"
import { HttpStatusCode } from "../shared/utils/util.types.js"
import type { UpdateUserDTO } from "./user.dto.js";
import type { Role, User } from "./user.entity.js"
import { userRepository, UserRepository } from "./user.repository.js";

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
            console.log(user)
            return user
      }

   create(payload: Omit<User, 'id' | 'createdAt' | 'updatedAt'>):Promise<User> {
     return userRepository.create(payload)
   }  
   findByEmail(email:string):Promise<User | null> {
     return userRepository.findByEmail(email)
   } 
}
export const userService = new UserService()