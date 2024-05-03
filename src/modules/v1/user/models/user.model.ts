export type User = {
  id: string;
  email: string;
  password: string;

  first_name: string;
  last_name: string;
  photo_url: string;

  google_id?: string;
  github_id?: string;
};

export type RegisterUserForm = {
  email: string;
  password: string;

  first_name: string;
  last_name: string;
  photo_url: string;

  google_id?: string;
  github_id?: string;
};

export type LoginUserForm = {
  email: string;
  password: string;
};
