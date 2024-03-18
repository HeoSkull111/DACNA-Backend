export type User = {
  id: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
};

export type RegisterUserForm = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
};

export type LoginUserForm = {
  email: string;
  password: string;
};

//declare user in session
declare module "express-session" {
  export interface SessionData {
    user: Omit<User, "password"> | null;
  }
}
