import { faker } from "@faker-js/faker";
import { PrismaClient } from "../../src/generated/prisma/index.js";
import { createRandomUser } from "../../src/seeds/user.seed.js";
import { createRandomCourses } from "../../src/seeds/course.seed.js";

const prisma = new PrismaClient ()

async function main() {
  // delete all tables db
  await prisma.user.deleteMany({});

  const users = faker.helpers.multiple(createRandomUser, { count: 10 });
  for (const userData of users) {
    await prisma.user.create({
      data: {
        ...userData,
        courses: {
          createMany: {
            data: faker.helpers.multiple(createRandomCourses, { count: 5 })
          }
        }
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });   
