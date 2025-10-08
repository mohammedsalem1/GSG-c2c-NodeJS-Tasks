import { User as UserPrisam} from "../generated/prisma";

export enum Role {
  ADMIN = "ADMIN" , 
  COACH = "COACH" , 
  STUDENT = "STUDENT"
} 

export type User = UserPrisam