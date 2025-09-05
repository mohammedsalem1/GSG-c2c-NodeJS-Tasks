import type { User } from "./user.entity.js";

    export type UpdateUserDTO = Partial<Pick<
    User, 'name' | 'email' | 'password'|'role'>>
