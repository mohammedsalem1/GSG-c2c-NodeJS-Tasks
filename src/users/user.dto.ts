import type { User } from "./user.entity.js";

export type UpdateUserDTO = Partial<Pick<
    User, 'name' | 'email' | 'password'|'role'>>

export type CreateCoachDTO = Pick<User , 'name' | 'email' | 'password'>;    export type CreateResponseCoachDTO = {
    success: true, 
    message:Omit<User ,'password'>
}    