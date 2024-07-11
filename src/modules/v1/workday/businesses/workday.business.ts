import workdayRepository from "@workday/repositories/workday.repository";
import { UpdateMemberStatus } from "@group/repositories/group_member.repository";

import { Workday, CreateWorkdayForm } from "@workday/models/workday.model";

import { InsertOneResult } from "mongodb";

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

const getCurrentWorkday = async (user_id: string): Promise<Workday> => {
  const result = await workdayRepository.findCurrentWorkday(user_id);

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

const getWorkdays = async (group_id: string, user_id: string, days: string): Promise<any> => {
  const result = await workdayRepository.findWorkdaysByDate(group_id, user_id, days);
  return result;
};

const getStatisticalWorkdays = async (
  group_id: string,
  user_id: string,
  begin_date: string,
  end_date: string
): Promise<any> => {
  const result = await workdayRepository.findStatisticalWorkdays(
    group_id,
    user_id,
    begin_date,
    end_date
  );
  return result;
};

const addWorkday = async (
  user_id: string,
  createWorkdayForm: CreateWorkdayForm
): Promise<InsertOneResult<Workday>> => {
  const userWorking = await workdayRepository.IsUserWorking(user_id);

  if (userWorking) {
    throw new Error(
      "You are already working in another group. Please check out first or contact your manager."
    );
  }

  const workday = {
    user_id: user_id,
    group_id: createWorkdayForm.group_id,
    status: "CHECKED_IN",
    check_in: new Date(),
    check_out: null,
    created_at: new Date(),
    updated_at: new Date(),
  };

  const result = await workdayRepository.addWorkday(workday);

  await UpdateMemberStatus(createWorkdayForm.group_id, user_id, "WORKING");

  return result;
};

const updateWorkday = async (id: string) => {
  const tempWorkday = await workdayRepository.findWorkday(id);

  if (!tempWorkday) {
    throw new Error("Workday not found");
  }

  if (tempWorkday.check_out !== null) {
    throw new Error("You already checked out");
  }

  const workday: Workday = {
    ...tempWorkday,
    status: "CHECKED_OUT",
    check_out: new Date(),
    updated_at: new Date(),
  };

  const result = await workdayRepository.updateWorkday(id, workday);

  await UpdateMemberStatus(workday.group_id, workday.user_id, "LEFT");

  return result;
};

export default {
  getWorkday,
  getCurrentWorkday,
  getWorkdays,
  getStatisticalWorkdays,
  addWorkday,
  updateWorkday,
};
