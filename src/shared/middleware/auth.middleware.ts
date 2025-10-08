import type {Request , Response, NextFunction } from "express";
import { verifyJWT } from "../../auth/utils/jwt.utils.js";
import { CustomError } from "../exception.js";
import { userRepository } from "../../users/user.repository.js";
import type { JwtPayload } from "jsonwebtoken";
import { HttpErrorStatus } from "../utils/util.types.js";

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
                throw new CustomError("Invalid token" , 'AUTH' , HttpErrorStatus.Unauthorized)
            }
            if (!decoded.sub) {
              throw new CustomError("Token missing subject", 'AUTH', HttpErrorStatus.Unauthorized);
            }

            const user = await userRepository.findById(Number(decoded.sub));
            if (!user) {
                throw new CustomError('User not found' , 'AUTH' , HttpErrorStatus.Unauthorized)
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
            HttpErrorStatus.Unauthorized
        )
    ) 
} 

export const isAuthOwnerOrAdmin = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const checkRole = req.user?.role;
  const allowedRoles = ["COACH", "ADMIN"];

  if (!checkRole || !allowedRoles.includes(checkRole)) {
    throw new CustomError("Access denied: user must be a COACH or ADMIN", "USER", HttpErrorStatus.Forbidden);
  }
  next()
  }  
};

export const isAuthorized = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const cheakRole = req.user?.role; 
    if (!cheakRole || !roles.includes(cheakRole)) {
       throw new CustomError("Forbidden: insufficient role",  'USER' ,HttpErrorStatus.Forbidden);
    }
    next();
  };
}