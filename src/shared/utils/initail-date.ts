import { faker } from "@faker-js/faker";
import { createArgonHash } from "../../auth/utils/argon.utils";
import type { Course } from "../../courses/course.entity";
import { createRandomCourses } from "../../seeds/course.seed";
import { Role, type User } from "../../users/user.entity";

export const users:User[] = [];

export const seedDate  = async () =>{
   await users.push({ 
      id: '1', 
      name: 'admin123',
      email: ' admin@no.com',
      password: await createArgonHash('admin123'),
      role: Role.ADMIN,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
 }
 export const courses:Course[] = faker.helpers.multiple(createRandomCourses , {count:5});

     