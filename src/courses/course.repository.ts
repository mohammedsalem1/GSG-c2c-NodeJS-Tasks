import { prisma } from "../../services/prisma.service.js";
import { BaseRepository } from "../shared/generic-repository";
import { CreateCourseDTO } from "./course.dto.js";
import { Course } from "./course.entity.js";


export class CourseRepository extends BaseRepository<Course> {
   constructor(){
        super(prisma.course)
    }
 async createCourse(payload: CreateCourseDTO, userId: number) {
    return prisma.course.create({
       data: {
       title: payload.title,
       description: payload.description,
       image: payload.image,
       authorId: userId, 
    },
  });
}

}
export const courseRepository = new CourseRepository();