import type { User } from "../users/user.entity.js";

export type RegisterDTO = Pick<User , 'name'|'email'|'password'|'role'>
export type RegisterResponseDTO = Omit<User , 'password'>


export type LoginDTO = Pick<User , 'email'|'password'>
export type LoginResponseDTO = Omit<User , 'password'>

export type LoginResponseDTOWithJWT = {
    date: Omit<User , 'password'> , 
    token :string   
}