import type {Request , Response, NextFunction } from "express";
import { verifyJWT } from "../../auth/utils/jwt.utils.js";
import { CustomError } from "../exception.js";
import { HttpStatusCode, type PaylaodJWT } from "../utils/util.types.js";
import { userRepository } from "../../users/user.repository.js";
import type { JwtPayload } from "jsonwebtoken";

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

export const isAuthOwnerOrAdmin = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const checkRole = req.user?.role;
  const allowedRoles = ["COACH", "ADMIN"];

  if (!checkRole || !allowedRoles.includes(checkRole)) {
    throw new CustomError("Access denied: user must be a COACH or ADMIN", "USER", HttpStatusCode.FORBIDDEN);
  }
  next()
  }  
};

export const isAuthorized = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const cheakRole = req.user?.role; 
    if (!cheakRole || !roles.includes(cheakRole)) {
       throw new CustomError("Forbidden: insufficient role",  'USER' ,HttpStatusCode.FORBIDDEN);
    }
    next();
  };
}