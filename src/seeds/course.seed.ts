import { faker } from "@faker-js/faker";
import { Course } from "../generated/prisma";

export function createRandomCourses() {
      const randomCourse: Omit<Course, 'authorId' | 'id'> = {
         title: faker.lorem.sentence(),
         description: faker.lorem.sentence(),
         image: faker.string.sample(),
         createdAt: faker.date.past(),
         updatedAt: faker.date.anytime(),
    }
    return randomCourse;
}
