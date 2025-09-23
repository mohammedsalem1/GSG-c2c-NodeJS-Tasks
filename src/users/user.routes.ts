import { Router } from "express";
import { userController, UsersController } from "./user.controller.js";
import { isAuthenticated, isAuthorized } from "../shared/middleware/auth.middleware.js";
import { Role } from "./user.entity.js";

const router = Router();
router.use(isAuthenticated)
router.get('/', (req, res) => {
  res.status(200).json({ message: 'ok' });
});
// GET /users/me → Get current user profile (protected).
  router.get('/me' , userController.getCurrentUser)

 // // PUT /users/me → Update current profile.
router.put('/me' , userController.updateProfile)

// // POST /users/coach → : create a COACH user.
router.post('/coach', isAuthorized([Role.ADMIN]) , userController.createCoach)

export const usersRouter = router
