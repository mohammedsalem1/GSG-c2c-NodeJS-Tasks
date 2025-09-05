import type { RegisterDTO } from "../../auth/auth.dto.js";
import { createArgonHash } from "../../auth/utils/argon.utils.js";
import type { Course } from "../../courses/utils/course.schema.js";
import { Role, type User } from "../../users/user.entity.js";

export const users:User[] = [];

export const seedDate  = async () =>{
    users.push({ 
      id: Date.now().toString() , 
      name: 'admin123',
      email: ' admin@no.com',
      password: await createArgonHash('admin123'),
      role: Role.ADMIN,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
 }
 export const courses:Course[] = [];

     