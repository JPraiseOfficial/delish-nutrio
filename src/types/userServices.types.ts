export interface UserAttributes {
    id: number
    firstname: string;
    lastname: string;
    username: string;
    phone_number: string;
    email: string;
    password: string;
    verifyEmailToken?: string | null;
    verifyEmailTokenExpires?: Date | null;
}

export type CreateNewUser = Omit<UserAttributes, 'id'>
export type UpdateUser = {userId: number} & Partial<UserAttributes>;