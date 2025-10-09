import { BaseRepository } from "../shared/generic-repository.js";
import { users } from "../shared/utils/initail-date.js";
import type { User } from "./user.entity.js";

export class UserRepository implements BaseRepository<User> {
   
   constructor(){
        super(users)
    }
    async findByEmail(email:string):Promise<User | null> {
      return  this.items.find(item => item.email === email)|| null
    }
}
export const userRepository = new UserRepository();