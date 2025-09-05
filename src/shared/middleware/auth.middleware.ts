import type {Request , Response, NextFunction } from "express";
import { verifyJWT } from "../../auth/utils/jwt.utils.js";
import { CustomError } from "../exception.js";
import { HttpStatusCode, type PaylaodJWT } from "../utils/util.types.js";
import { userRepository } from "../../users/user.repository.js";
import type { JwtPayload } from "jsonwebtoken";
import type { User } from "../../users/user.entity.js";

export const isAuthenticated = async(
    req:Request , 
    res:Response , 
    next:NextFunction) => {
    
    const authHeader = req.headers.authorization;
    if(authHeader) {
        try {
            const jwt = authHeader.replace('Bearer ','')
            const decoded:JwtPayload|string = verifyJWT(jwt);
            if(typeof decoded === 'string') {
                throw new CustomError("Invalid token" , 'AUTH' , HttpStatusCode.UNAUTHORIZED)
            }
            if (!decoded.sub) {
              throw new CustomError("Token missing subject", 'AUTH', HttpStatusCode.UNAUTHORIZED);
            }

            const user = await userRepository.findById(decoded.sub);
            if (!user) {
                throw new CustomError('User not found' , 'AUTH' , HttpStatusCode.UNAUTHORIZED)
            }
            req.user= user;
            next()
            return
        } catch (error) {
            console.log('jwt is wrong')
        }
    }
    next(
        new CustomError(
            'user is not authenticate' , 
            'AUTH' , 
            HttpStatusCode.UNAUTHORIZED
        )
    ) 
} 

export const isAuthOwnerOrAdmin = (req:Request , res:Response , next:NextFunction) => {

}
export const isAuthorized = (roles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!roles.includes(user.role)) throw new CustomError("Forbidden",  'USER' ,HttpStatusCode.UNAUTHORIZED);
    next();
  };
}