
import { prisma } from "../../services/prisma.service.js";
import { BaseRepository } from "../shared/generic-repository.js";
import { User } from "./user.entity.js";

export class UserRepository extends BaseRepository<User> {
   constructor() {
    super(prisma.user)
   }
   
   findByEmail(email:string) {
     return this.model.findUnique({
        where : {email} , 
     })
   }
}
export const userRepository = new UserRepository();