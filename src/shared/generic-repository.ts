import { Model } from "mongoose";


export interface Repository<T> {
    findAll(page:number , limit:number): Promise<{data:T[]; totalRecords:number}>;
    findById(id: string): Promise<T | null>;
    create(payload: T): Promise<T>;
    update(id: string, payload: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<boolean>;
}

export class BaseRepository<T> implements Repository<T> {
    constructor(protected model: Model<T>) {}
    
     async findAll(page: number, limit: number) {
         const data = await this.model
           .find()
           .skip((page - 1) * limit)
           .limit(limit)
          .exec();

         const totalRecords = await this.model.countDocuments();

         return { data: data as T[], totalRecords };
  }

     findById(id: string) {
        return this.model.findById(id).exec()
     }
    async create(payload: Omit<T, 'id' | 'createdAt' | 'updatedAt'>) {
        return this.model.create(payload)
    }

     update(id: string, payload: Partial<T>) {
        return this.model.findByIdAndUpdate(id , payload , {new:true}).exec()
    }

    async delete(id: string){
        const result = await this.model.findByIdAndDelete(id).exec()
        return Boolean(result)
    }
}


