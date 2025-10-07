import type { PrismaClient, Prisma } from "@prisma/client";


interface DbEntity {
    id: number;
    createdAt?:Date;
    updatedAt?:Date;
}

interface Repository<T extends DbEntity> {
    findAll(): Promise<T[]>;
    findById(id: number): Promise<T>;
    create(payload: T): Promise<T>;
    update(id: number, payload: Partial<T>): Promise<T>;
    delete(id: number): Promise<boolean>;
}

export class BaseRepository<T extends DbEntity> implements Repository<T> {
 
    constructor(protected model: any) {}

     findAll(): Promise<T[]> {
        return this.model.findMany()
    }

     findById(id: number) {
        return this.model.findUniqueOrThrow({
            where:{id :Number(id)}
        })
    }

     create(payload: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T> {
        const newItem = { ...payload } ; 
         return this.model.create({ data: newItem });
    }

     update(id: number, payload: Partial<T>) {
        return this.model.update({
            where: { id :Number(id)},
            data: payload,
        })
    }

     async delete(id: number) {
       
       const deleteModle = await this.model.delete({ where: { id :Number(id)} });
       
         return Boolean(deleteModle)

    }
}


