import { Role } from "./role";

export class User {
    constructor(
        public id: number,
        public name: string,
        public surname: string,
        public email: string,
        public role: Role,

    ) {}
}