import z, { ZodType } from "zod";

export const courseSchema = z.object({
  id: z.string() ,
  title: z.string() ,
  description: z.string() ,
  image: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
})

export type Course = z.infer<typeof courseSchema>;
