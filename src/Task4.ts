interface DbEntity {
    id: number
}
interface Repository<Type extends DbEntity> { 
          getAllItem(): Promise<Type[]> 
          getById(id : number): Promise<Type | null>  
          createItem(payload : Type): Promise<void> 
          updateItem(payload : Partial<Type>): Promise<Type>
          deleteItem(id: number):Promise<void>
          findItems(payload : Partial<Type>):Promise<Type[]>
}
class BaseRepository <T extends DbEntity> implements Repository<T> {
    private items: T[] = [];
    async getAllItem(): Promise<T[]> {
        return this.items
    }
    async getById(id: number): Promise<T | null>{
        const item = this.items.find(item => item.id === id)
        return item ? item: null;
    }
    async createItem(payload : T):Promise<void>  {
      this.items.push(payload)
    } 
    async updateItem(payload : Partial<T>): Promise<T> {
      if (!payload.id) {
        throw new Error("An 'id' is required to update an item");
      }
      const index = this.items.findIndex(item => item.id == payload.id)
      if (index === -1) {
         throw new Error("this 'id' is not found")
      }
      return this.items[index] = {...this.items[index] , ...payload}
    }
    async deleteItem(id: number):Promise<void>{
        this.items = this.items.filter(item => item.id !== id)
    } 
    async findItems(payload : Partial<T>):Promise<T[]>{
        const newItems = this.items.filter(item =>  {
            for (const key in payload) {
                if (payload[key] !== item[key]){
                    return false
                }
            }
            return true 
       })
       return newItems;
     }
    }

type UserType = {
    id:number , 
    name:string , 
    email:string
}
type CourseType  = {
    id:number , 
    name:string , 
    instructor:string
}
type Booking  = {
    id:number , 
    name:string , 
    author:string
}
class UserRepository extends BaseRepository<UserType> {
    constructor() {
        super()
    }
}
class CourseRepository extends BaseRepository<CourseType> {
    constructor() {
        super()
    }
}
class BookingRepository extends BaseRepository<Booking> {
    constructor() {
        super()
    }
}
const userType1: UserType = {id:1 , name:'mohammedsalem' , email:'m@g'}
const userType2: UserType = {id:2 , name:'ali' , email:'a@g'}
const updateItem: Partial<UserType> = {id:2 , name:'Malak'}
const findItem: Partial<UserType> = {name:'Malak'};


const course1: CourseType = { id: 1, name: 'TypeScript Basics', instructor: 'John' };
const course2: CourseType = { id: 2, name: 'Node.js Mastery', instructor: 'Jane' };

const booking1: Booking = { id: 1, name: 'TS Bootcamp', author: 'Alex' };
const booking2: Booking = { id: 2, name: 'Node Workshop', author: 'Sara' };

(async() => {
    const user = new UserRepository();
    await user.createItem(userType1);
    await user.createItem(userType2);
    console.log(await user.getAllItem())
    console.log(await user.getById(1))
    console.log(await user.updateItem(updateItem))
    console.log(await user.deleteItem(1))
    console.log(await user.getAllItem())
    console.log(await user.findItems(findItem))

    console.log("\n=== COURSE REPOSITORY TEST ===");
    const course = new CourseRepository();
    await course.createItem(course1);
    await course.createItem(course2);
    console.log(await course.getAllItem());
    console.log(await course.findItems({ instructor: 'Jane' }));

    console.log("\n=== BOOKING REPOSITORY TEST ===");
    const booking = new BookingRepository();
    await booking.createItem(booking1);
    await booking.createItem(booking2);
    console.log(await booking.getAllItem());
    console.log(await booking.findItems({ author: 'Sara' }));
})()