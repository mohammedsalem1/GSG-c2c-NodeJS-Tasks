import type { Request , Response , NextFunction } from "express-serve-static-core";
import type { CreateCourseDTO } from "./course.dto.js";
import type { Course } from "./course.entity.js";
import { ZodValidation } from "../shared/utils/zod.utils.js";
import { CreateCourseDTOSchema } from "./utils/course.schema.js";
import { courseService } from "./course.service.js";
import { CustomError } from "../shared/exception.js";
import { HttpStatusCode } from "../shared/utils/util.types.js";

export class CourseController {
  
   async createCourse(req:Request<{},{},CreateCourseDTO> , res:Response<Course> , next:NextFunction){
      try {
        const paylaodDate = ZodValidation(CreateCourseDTOSchema , req.body , 'COURSE')
         
        const course = await courseService.createCourse(paylaodDate)
        
        res.json(course)
      } catch (error) {
        throw new CustomError("the user don't COACH or ADMIN" , 'COURSE' , HttpStatusCode.UNAUTHORIZED)
      }
   }  
   async getAllCourses(req:Request , res:Response){
      const courses = await courseService.getAllCourses()
      res.json({success: true, message:courses})
   }
   async getCourseById(req:Request , res:Response) {
     const courseId  = req.params.id;
     if (!courseId) {
        return null
     }
     const course = await courseService.getCourseById(courseId)
     res.json({success: true, message:course})
   }
   async updateCourse(req:Request , res:Response) {
      const courseId = req.params.id;
       if (!courseId) {
        return null
     }
     const paylaodDate = await courseService.updateCourse(courseId , req.body)
     res.json({success: true, message:paylaodDate})
   }
   async deleteCourse(req:Request , res:Response) {
     const courseId = req.params.id;
     if (!courseId) {
         throw new CustomError("Course ID is required", "COURSE", HttpStatusCode.BAD_REQUEST);
     }
      await courseService.deleteCourse(courseId)
      
     res.json({ success: true, message: "Course deleted successfully" });
   }
}
export const courseController = new CourseController()