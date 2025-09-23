import { faker } from '@faker-js/faker';
export function createRandomUser() {
  return {

    id: faker.string.uuid(),
    name: faker.internet.username(),
    email: faker.internet.email(),
    role: 'ADMIN',
    password: faker.internet.password(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.anytime(),
  };
}