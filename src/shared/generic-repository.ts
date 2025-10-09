



export interface Repository<T> {
    findAll(page?:number , limit?:number): Promise<{T:T[]; totalRecords:number}>;
    findById(id: string): Promise<T | null>;
    create(payload: T): Promise<T>;
    update(id: string, payload: Partial<T>): Promise<T>;
    delete(id: string): Promise<boolean>;
}

// export class BaseRepository<T extends DbEntity> implements Repository<T> {
//     constructor(protected model: T[]) {}

//     async findAll(page?:number , limit?:number){
//         const users = mo
//     }

//     async findById(id: string): Promise<T | null> {
//         return this.items.find(item => item.id === id) ?? null;
//     }

//     async create(payload: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T> {
//         const newItem = { 
//              ...payload, 
//              id: Date.now().toString() ,
//              createdAt:new Date(),
//              updatedAt:new Date()
//             } as T ; 
//         this.items.push(newItem);
//         return newItem;
//     }

//     async update(id: string, payload: Partial<T>): Promise<T> {
//         const index = this.items.findIndex(item => item.id === id);
//         if (index === -1) {
//             throw new Error("Item not found");
//         }
//         this.items[index] = { ...this.items[index], ...payload } as T;
//         return this.items[index];
//     }

//     async delete(id: string): Promise<boolean> {
//         const initialLength = this.items.length;
//         this.items = this.items.filter(item => item.id !== id);
//         return this.items.length < initialLength;
//     }
// }


