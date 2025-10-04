import type { Request , Response , NextFunction } from "express-serve-static-core";
import type { CreateCourseDTO } from "./course.dto";
import type { Course } from "./course.entity";
import { ZodValidation } from "../shared/utils/zod.utils";
import { CreateCourseDTOSchema } from "./utils/course.schema";
import { courseService } from "./course.service";
import { CustomError } from "../shared/exception";
import { HttpErrorStatus } from "../shared/utils/util.types";

export class CourseController {
  
   async createCourse(req:Request<{},{},CreateCourseDTO> , res:Response<Course> , next:NextFunction){
      try {
        const paylaodDate = ZodValidation(CreateCourseDTOSchema , req.body , 'COURSE')
         
        const course = await courseService.createCourse(paylaodDate)
        
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
     const course = await courseService.getCourseById(courseId)
      res.ok(course)
   }
   async updateCourse(req:Request , res:Response) {
      const courseId = req.params.id;
       if (!courseId) {
        return null
     }
     const paylaodDate = await courseService.updateCourse(courseId , req.body)
      res.ok(paylaodDate)
   }
   async deleteCourse(req:Request , res:Response) {
     const courseId = req.params.id;
     if (!courseId) {
         throw new CustomError("Course ID is required", "COURSE", HttpErrorStatus.BadRequest);
     }
      await courseService.deleteCourse(courseId)
      
     res.ok({ success: true, message: "Course deleted successfully" });
   }
}
export const courseController = new CourseController()