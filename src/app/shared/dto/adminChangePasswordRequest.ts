export class AdminChangePasswordRequest  {
    constructor(
        public email: string,
        public newPassword: string,
    ) {}
}