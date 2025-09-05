import { Router } from "express";
import { authController} from "./auth.controller.js";

const router = Router()

// Authentication (/auth)
// POST /auth/register →Register as a (default role).
 router.post('/register' , authController.register.bind(authController))
   
// POST /auth/login → Authenticate and issue JWT token.
 router.post('/login' , authController.login.bind(authController));

  router.post('/login-jwt' , authController.loginWithJWT.bind(authController))  
  

export const authRouter = router