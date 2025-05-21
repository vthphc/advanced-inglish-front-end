export interface User {
    id: number;
    username: string;
    name: string;
    email: string;
    gender: string;
    dob: string;
    image: string;
}
export interface AuthResponse extends User {
    accessToken: string;
    refreshToken: string;
}
