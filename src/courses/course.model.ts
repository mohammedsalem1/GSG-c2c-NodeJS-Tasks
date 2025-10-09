import mongoose  from "mongoose";
import { Course } from "./course.entity";

 const courseSchema = new mongoose.Schema<Course>({
  title: {type:String , require:true},
  description:  {type:String , require:true},
  image:  {type:String , required:false },
} , {
    timestamps:true
})

export const CourseModel = mongoose.model<Course>('Course' , courseSchema)