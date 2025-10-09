import { Repository } from "../shared/generic-repository";
import { CourseModel } from "./course.model.js";

export class CourseRepository implements Repository<typeof CourseModel> {
    findAll(page?:number , limit?:number){

     }
    findById(id: string) {}
    create(payload: T){ }
    update(id: string, payload: Partial<T>){}
    delete(id: string) {}

}