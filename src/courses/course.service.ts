import { CustomError } from "../shared/exception.js";
import { HttpStatusCode } from "../shared/utils/util.types.js";
import type { CreateCourseDTO, UpdateCourseDTO } from "./course.dto.js";
import type { Course } from "./course.entity.js";
import { courseRepository } from "./course.repository.js";

export class CourseService {
    async createCourse(payload:CreateCourseDTO) {
        const courseDate = await courseRepository.create(payload);
        return courseDate     
    }
    async getAllCourses() {
        const courses = await courseRepository.findAll()
        return courses
    }
    async getCourseById(courseId:string) {
        const course = await courseRepository.findById(courseId)
        if (!course) {
            throw new CustomError("the user don't have course",'COURSE',HttpStatusCode.BAD_REQUEST)
        }
        return course
    }
    async updateCourse(courseId:string , updateDate:UpdateCourseDTO){
    
                const course = await courseRepository.update(courseId , updateDate)
                if (!course) {
                   throw new CustomError('user not found','USER',HttpStatusCode.BAD_REQUEST)
                }
                return course
    }

    async deleteCourse(courseId:string) {
        const isDeleted = await courseRepository.delete(courseId)
        if (!isDeleted) {
            throw new CustomError("the user don't have course",'COURSE',HttpStatusCode.NOT_FOUND)
        }
        return isDeleted;
    }
}
export const courseService = new CourseService();