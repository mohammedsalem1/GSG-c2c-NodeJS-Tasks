import type { Course } from "./course.entity.js";

export type CreateCourseDTO = Pick<Course , 'title' | 'description'|'image'>

export type UpdateCourseDTO = Partial<Pick<
    Course, 'title' | 'description'|'image'>>