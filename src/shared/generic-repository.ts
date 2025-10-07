import type { PrismaClient, Prisma } from "@prisma/client";


interface DbEntity {
    id: number;
    createdAt?:Date;
    updatedAt?:Date;
}

interface Repository<T extends DbEntity> {
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T>;
    create(payload: T): Promise<T>;
    update(id: string, payload: Partial<T>): Promise<T>;
    delete(id: string): Promise<boolean>;
}

export class BaseRepository<T extends DbEntity> implements Repository<T> {
 
    constructor(protected model: any) {}

     findAll(): Promise<T[]> {
        return this.model.findMany()
    }

     findById(id: string) {
        return this.model.findUniqueOrThrow({
            where:{id :Number(id)}
        })
    }

     create(payload: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T> {
        const newItem = { ...payload } ; 
         return this.model.create({ data: newItem });
    }

     update(id: string, payload: Partial<T>) {
        return this.model.update({
            where: { id :Number(id)},
            data: payload,
        })
    }

     async delete(id: string) {
        try {
             await this.model.delete({ where: { id :Number(id)} });
              return true;
        } catch {
        return false;
      }
    }
}


