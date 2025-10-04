import { Router } from "express";
import { courseController } from "./course.controller";
import { isAuthenticated, isAuthOwnerOrAdmin } from "../shared/middleware/auth.middleware";

export const courseRouter = Router()
   courseRouter.use(isAuthenticated);

   courseRouter.post('/create', isAuthOwnerOrAdmin() , courseController.createCourse);
   
   courseRouter.get('/' , courseController.getAllCourses) 

   courseRouter.get('/:id' , courseController.getCourseById) 

   courseRouter.post('/update/:id', isAuthOwnerOrAdmin() , courseController.updateCourse);
   
   courseRouter.delete('/delete/:id', isAuthOwnerOrAdmin() , courseController.deleteCourse);
