export type Workday = {
  id: string;

  user_id: string;
  group_id: string;

  status: WorkdayStatus;

  check_in: Date;
  check_out: Date;

  created_at: Date;
  updated_at: Date;
};

export type WorkdayStatus = "CHECKED_IN" | "CHECKED_OUT";

export type CreateWorkdayForm = {
  group_id: string;
};

export type UpdateWorkdayForm = {
  id: string;
};
