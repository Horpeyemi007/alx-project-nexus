export interface SignupInput {
  email: string;
  username: string;
  bio: string;
  role: string;
  password: string;
  confirmPassword?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  id: string;
  email: string;
  username: string;
  token: string;
}
