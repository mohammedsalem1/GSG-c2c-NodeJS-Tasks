
import { CourseModel } from "./course.model.js";

export class CourseRepository {
 
    async findAll(page: number, limit: number) {
        const courses = CourseModel.find()
         .skip((page - 1) * limit)
         .limit(limit)
         .exec()

         const totalRecords = await CourseModel.countDocuments();
         return {courses , totalRecords}
    }
}
export const courseRepository = new CourseRepository(); 