export type Group = {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
};

export type GroupMember = {
  id: string;
  user_id: string;
  group_id: string;
  role: string;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
};

export type CreateGroupForm = {
  name: string;
  description: string;
};

export type UpdateGroupForm = {
  id: string;
  name: string;
  description: string;
};
