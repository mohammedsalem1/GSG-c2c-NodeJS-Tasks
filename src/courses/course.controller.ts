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
        const paylaodDate = ZodValidation(CreateCourseDTOSchema , req.body , 'COURSE')
         
        const course = await courseService.createCourse(paylaodDate)
        
        res.create(course)
      } catch (error) {
        throw new CustomError("the user don't COACH or ADMIN" , 'COURSE' , HttpErrorStatus.Forbidden)
      }
   }  
   async getAllCourses(req:Request<{} , {} , {} , {page?:string , limit?:string}> , res:Response){
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || 10
      const {data , totalRecords} = await courseService.getAllCourses(page , limit)
      res.paginationResponse(data ,{page , limit , totalRecords} )
   }
   async getCourseById(req:Request , res:Response) {
     const courseId  = req.params.id;
     if (!courseId) {
        return null
     }
     const course = await courseService.getCourseById(courseId)
      res.ok(course)
   }
    updateCourse(req:Request , res:Response) {
      const courseId = req.params.id;
       if (!courseId) {
        return null
     }
     const paylaodDate =  courseService.updateCourse(courseId , req.body)
      res.ok(paylaodDate)
   }
    deleteCourse(req:Request , res:Response) {
     const courseId = req.params.id;
     if (!courseId) {
         throw new CustomError("Course ID is required", "COURSE", HttpErrorStatus.BadRequest);
     }
       courseService.deleteCourse(courseId)
      
     res.ok({ message: "Course deleted successfully" });
   }
}
export const courseController = new CourseController()