import { prisma } from "../../services/prisma.service.js";
import { BaseRepository } from "../shared/generic-repository.js";
import type { Course } from "./course.entity.js";

export class CourseRepository extends BaseRepository<Course> {
   constructor(){
        super(prisma.course)
    }
}
export const courseRepository = new CourseRepository();