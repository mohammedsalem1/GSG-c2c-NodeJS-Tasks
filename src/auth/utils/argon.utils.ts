import argon2 from 'argon2'

export const createArgonHash =  (password:string) => {
     return argon2.hash(password);  
}
export async function verifyArgonHash(hash:string, password:string) {
   return  argon2.verify(hash, password) 
}