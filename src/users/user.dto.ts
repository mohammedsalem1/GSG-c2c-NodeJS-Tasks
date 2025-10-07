import { User } from "./user.entity";

export type UpdateUserDTO = Partial<Pick<
    User, 'name' | 'email' | 'password'|'role'>>

export type CreateCoachDTO = Pick<User , 'name' | 'email' | 'password'>;    
export type CreateResponseCoachDTO = Omit<User ,'password'>