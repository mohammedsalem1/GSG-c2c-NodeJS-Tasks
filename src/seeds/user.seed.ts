import { faker } from '@faker-js/faker';
import { User } from '../generated/prisma';
export function createRandomUser() {
 const randomUser: Omit<User,'id'> = {
    name: faker.internet.username(),
    email: faker.internet.email(),
    role: 'ADMIN',
    password: faker.internet.password(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.anytime(),
  };
  return randomUser
}
