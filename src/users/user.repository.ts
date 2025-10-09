import { BaseRepository } from "../shared/generic-repository";
import type { User } from "./user.entity";
import { UserModel } from "./user.model";

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(UserModel);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.model.findOne({ email }).exec();
  }
}

export const userRepository = new UserRepository();
