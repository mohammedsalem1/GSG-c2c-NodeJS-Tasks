import { BaseRepository } from "../shared/generic-repository";
import { users } from "../shared/utils/initail-date";
import type { User } from "./user.entity";

export class UserRepository extends BaseRepository<User> {
   
   constructor(){
        super(users)
    }
    async findByEmail(email:string):Promise<User | null> {
      return  this.items.find(item => item.email === email)|| null
    }
}
export const userRepository = new UserRepository();