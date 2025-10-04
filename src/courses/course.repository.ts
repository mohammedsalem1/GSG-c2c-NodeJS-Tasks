import { BaseRepository } from "../shared/generic-repository";
import { courses } from "../shared/utils/initail-date";
import type { Course } from "./course.entity";

export class CourseRepository extends BaseRepository<Course> {
   constructor(){
        super(courses)
    }
}
export const courseRepository = new CourseRepository();