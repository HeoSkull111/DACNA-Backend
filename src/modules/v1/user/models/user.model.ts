export type User = {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
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
