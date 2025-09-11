import { BaseRepository } from "../shared/generic-repository.js";
import { courses } from "../shared/utils/initail-date.js";
import type { Course } from "./course.entity.js";

export class CourseRepository extends BaseRepository<Course> {
   constructor(){
        super(courses)
    }
}
export const courseRepository = new CourseRepository();