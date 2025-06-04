export interface CreateNewUser {
    firstname: string;
    lastname: string;
    username: string;
    phone_number: string;
    email: string;
    password: string;
    verifyEmailToken: string;
    verifyEmailTokenExpires: Date;
}

