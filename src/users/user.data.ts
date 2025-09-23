import { faker } from '@faker-js/faker';
import { createRandomUser } from '../seeds/user.seed.js';



export const users = faker.helpers.multiple(createRandomUser, {
  count: 5,
});