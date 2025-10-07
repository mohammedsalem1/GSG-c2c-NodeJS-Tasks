export enum Role {
  ADMIN = "ADMIN" , 
  COACH = "COACH" , 
  STUDENT = "STUDENT"
} 
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}