import workdayRepository from "@workday/repositories/workday.repository";

import { Workday, CreateWorkdayForm, UpdateWorkdayForm } from "@workday/models/workday.model";

import { InsertOneResult } from "mongodb";

const addWorkday = async (
  createWorkdayForm: CreateWorkdayForm
): Promise<InsertOneResult<Workday>> => {
  const workday = {
    user_id: createWorkdayForm.user_id,
    group_id: createWorkdayForm.group_id,
    status: "CHECKED_IN",
    created_at: new Date(),
    updated_at: new Date(),
  };

  const result = await workdayRepository.addWorkday(workday);
  return result;
};

const updateWorkday = async (updateWorkdayForm: UpdateWorkdayForm) => {
  const tempWorkday = await workdayRepository.findWorkday(updateWorkdayForm.id);

  if (!tempWorkday) {
    throw new Error("Workday not found");
  }

  if (tempWorkday.status === "CHECKED_OUT") {
    throw new Error("You already checked out");
  }

  const workday = {
    ...tempWorkday,
    user_id: updateWorkdayForm.user_id,
    group_id: updateWorkdayForm.group_id,
    status: "CHECKED_OUT",
    updated_at: new Date(),
  };

  const result = await workdayRepository.updateWorkday(updateWorkdayForm.id, workday);
  return result;
};

const getWorkday = async (id: string): Promise<Workday> => {
  const result = await workdayRepository.findWorkday(id);

  if (!result) {
    throw new Error("Workday not found");
  }

  return {
    id: result._id.toHexString(),
    user_id: result.user_id,
    group_id: result.group_id,
    status: result.status,
    check_in: result.check_in,
    check_out: result.check_out,
    created_at: result.created_at,
    updated_at: result.updated_at,
  };
};

export default {
  addWorkday,
  updateWorkday,
  getWorkday,
};
