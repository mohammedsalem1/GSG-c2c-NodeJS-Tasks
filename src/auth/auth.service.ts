import { removeFields } from "../shared/utils/object.utils";
import { userService } from "../users/user.service";
import type { LoginDTO, RegisterDTO, RegisterResponseDTO } from "./auth.dto";
import { createArgonHash, verifyArgonHash } from "./utils/argon.utils";

export class AuthService {

      public async register(payload:RegisterDTO):Promise<RegisterResponseDTO> {
         // hash Password   
        const hashedValue = await createArgonHash(payload.password)
        // save date in db
        const userDate = await userService.create({
            ...payload,
            password: hashedValue , 
       })
       // return date without user
       return removeFields(userDate , ['password']);
      }

      public async login(payload:LoginDTO) {
         // cheak Email
          const foundUser = await userService.findByEmail(payload.email)
          if(!foundUser) {
            return null
          } 
          // cheak password with use argon2
            const isPasswordMatched = await verifyArgonHash(foundUser.password, payload.password);
           
            if (!isPasswordMatched) {
               return null;
            }
        

         // return LoginResponseDTO & JWT
        return removeFields(foundUser , ['password']);
            
      }
}
export const authService = new AuthService()
