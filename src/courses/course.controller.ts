import type { Request , Response , NextFunction } from "express-serve-static-core";
import type { CreateCourseDTO } from "./course.dto.js";
import type { Course } from "./course.entity.js";
import { ZodValidation } from "../shared/utils/zod.utils.js";
import { CreateCourseDTOSchema } from "./utils/course.schema.js";
import { courseService } from "./course.service.js";
import { CustomError } from "../shared/exception.js";
import { HttpErrorStatus } from "../shared/utils/util.types.js";

export class CourseController {
  
   async createCourse(req:Request<{},{},CreateCourseDTO> , res:Response<Course> , next:NextFunction){
      try {
        const userId = req.user?.id 
        console.log(userId)
        if (!userId) {
          throw new CustomError ('The user is not authenticated' , 'COURSE' , HttpErrorStatus.Unauthorized)
        }
        const paylaodDate = ZodValidation(CreateCourseDTOSchema , req.body , 'COURSE')
         
        const course = await courseService.createCourse(paylaodDate , userId)
        
        res.create(course)
      } catch (error) {
        throw new CustomError("the user don't COACH or ADMIN" , 'COURSE' , HttpErrorStatus.Forbidden)
      }
   }  
   async getAllCourses(req:Request , res:Response){
      const courses = await courseService.getAllCourses()
      res.ok(courses)
   }
   async getCourseById(req:Request , res:Response) {
     const courseId  = req.params.id;
     if (!courseId) {
        return null 
     }
     const course = await courseService.getCourseById(Number(courseId))
      res.ok(course)
   }
   async updateCourse(req:Request , res:Response) {
      const courseId = req.params.id;
       if (!courseId) {
        return null
     }
     const paylaodDate = await courseService.updateCourse(Number(courseId) , req.body)
      res.ok(paylaodDate)
   }
   async deleteCourse(req:Request , res:Response) {
     const courseId = req.params.id;
     if (!courseId) {
         throw new CustomError("Course ID is required", "COURSE", HttpErrorStatus.BadRequest);
     }
      await courseService.deleteCourse(Number(courseId))
      
     res.ok({ message: "Course deleted successfully" });
   }
}
export const courseController = new CourseController()