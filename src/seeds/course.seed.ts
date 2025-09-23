import { faker } from "@faker-js/faker";

export function createRandomCourses() {
    return {
         id: faker.string.uuid(),
         title: faker.lorem.sentence(),
         description: faker.lorem.sentence(),
         image: faker.string.sample(),
         createdAt: faker.date.past(),
         updatedAt: faker.date.anytime(),
    }
}