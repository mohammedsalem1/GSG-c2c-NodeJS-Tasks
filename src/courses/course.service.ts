import { CustomError } from "../shared/exception.js";
import { HttpErrorStatus } from "../shared/utils/util.types.js";
import type { CreateCourseDTO, UpdateCourseDTO } from "./course.dto.js";
import { courseRepository } from "./course.repository.js";

export class CourseService {
    async createCourse(payload:CreateCourseDTO) {
        const courseDate = await courseRepository.create(payload);
        return courseDate     
    }
    async getAllCourses(page:number , limit:number) {
        const courses = await courseRepository.findAll(page , limit)
        return courses
    }
    async getCourseById(courseId:string) {
        const course = await courseRepository.findById(courseId)
        if (!course) {
            throw new CustomError("the user don't have course",'COURSE',HttpErrorStatus.BadRequest)
        }
        return course
    }
    async updateCourse(courseId:string , updateDate:UpdateCourseDTO){
    
                const course = await courseRepository.update(courseId , updateDate)
                if (!course) {
                   throw new CustomError('Course is not found','USER',HttpErrorStatus.NotFound)
                }
                return course
    }

    async deleteCourse(courseId:string) {
        const isDeleted = await courseRepository.delete(courseId)
        if (!isDeleted) {
            throw new CustomError("the user don't have course",'COURSE',HttpErrorStatus.NotFound)
        }
        return isDeleted;
    }
}
export const courseService = new CourseService();