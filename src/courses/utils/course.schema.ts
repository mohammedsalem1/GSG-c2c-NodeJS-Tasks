import z, { ZodType } from "zod";
import type { CreateCourseDTO } from "../course.dto.js";

export const courseSchema = z.object({
  id: z.string() ,
  title: z.string() ,
  description: z.string() ,
  image: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
})
export const CreateCourseDTOSchema = courseSchema.pick({
  title: true ,
  description: true ,
  image: true,
}) satisfies ZodType<CreateCourseDTO>