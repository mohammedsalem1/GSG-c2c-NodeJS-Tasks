
import { prisma } from "../../services/prisma.service.js";
import { User } from "../generated/prisma/index.js";
import { BaseRepository } from "../shared/generic-repository.js";

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