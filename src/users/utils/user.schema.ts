import z , {ZodType} from 'zod'
import { Role, type User,   } from '../user.entity.js'
import type { CreateCoachDTO, UpdateUserDTO } from '../user.dto.js'

export const userSchema = z.object({
   id: z.number(),
   name: z.string(),
   email: z.string(),
   password: z.string().min(8),
   role: z.enum([Role.ADMIN , Role.COACH , Role.STUDENT]),
   createdAt: z.date() , 
   updatedAt: z.date() 
}) satisfies ZodType<User>

export const CreateCoachDTOSchema = userSchema.pick({
    name: true,
    email :true,
    password:true
}) satisfies ZodType<CreateCoachDTO>