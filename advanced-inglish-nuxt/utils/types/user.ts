export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}
export interface AuthResponse extends User {
  accessToken: string;
  refreshToken: string;
}
export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
