import { ObjectId } from "mongodb";

export type User = {
  id: string;
  email: string;
  username: string;
  password: string;
  photo_url: string;
};

export type UserProfile = {
  id: string;
  user_id: string | ObjectId;
  last_name: string;
  first_name: string;
  phone: string | undefined;
};

export type FullUser = Omit<User, "password"> & Omit<UserProfile, "user_id">;

export type AssociatedAccount = {
  id: string;
  user_id: string;
  platform: string;
  account_id: string;
  account_name: string;
};

export type UpdateUserForm = Partial<{
  username: string;
  email: string;
  password: string;
  photo_url: string;
  first_name: string;
  last_name: string;
  phone: string;
}>;

export type RegisterUserForm = {
  username: string;
  email: string;
  password: string;

  first_name: string;
  last_name: string;
  phone: string | undefined;

  photo_url: string;
};

export type LoginUserForm = {
  username: string;
  password: string;
};
