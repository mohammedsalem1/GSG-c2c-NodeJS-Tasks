import { CustomError } from "../shared/exception.js";
import { HttpErrorStatus } from "../shared/utils/util.types.js";
import type { CreateCourseDTO, UpdateCourseDTO } from "./course.dto.js";
import { CourseModel } from "./course.model.js";
import { courseRepository } from "./course.repository.js";

CourseModel
export class CourseService {
     createCourse(payload:CreateCourseDTO) {
        return courseRepository.create(payload);
    }
     getAllCourses(page:number , limit:number) {
        return courseRepository.findAll(page , limit)
    }
    async getCourseById(courseId:string) {
        const course = await courseRepository.findById(courseId)
        if (!course) {
            throw new CustomError("the user don't have course",'COURSE',HttpErrorStatus.BadRequest)
        }
        return course
    }
     updateCourse(courseId:string , updateDate:UpdateCourseDTO){
    
                const course =  courseRepository.update(courseId , updateDate)
                if (!course) {
                   throw new CustomError('Course is not found','USER',HttpErrorStatus.NotFound)
                }
                return course
    }

     deleteCourse(courseId:string) {
        const isDeleted =  courseRepository.delete(courseId)
        if (!isDeleted) {
            throw new CustomError("the user don't have course",'COURSE',HttpErrorStatus.NotFound)
        }
        return isDeleted;
    }
}
export const courseService = new CourseService();