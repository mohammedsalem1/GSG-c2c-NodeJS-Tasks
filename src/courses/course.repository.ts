
import { BaseRepository } from "../shared/generic-repository.js";
import { Course } from "./course.entity.js";
import { CourseModel } from "./course.model.js";

export class CourseRepository extends BaseRepository<Course> {
    constructor() {
        super(CourseModel)
    }
}
export const courseRepository = new CourseRepository(); 