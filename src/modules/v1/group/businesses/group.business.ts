// repositories
import {
  GetGroup,
  ListGroups,
  CreateGroup,
  UpdateGroup,
  DeleteGroup,
} from "@group/repositories/group.repository";

import { ListMembers, AddMember } from "@group/repositories/group_member.repository";

//models
import { CreateGroupForm, UpdateGroupForm } from "@group/models/group.model";

const getGroup = async (groupID: string) => {
  if (!groupID) {
    throw new Error("Group ID is required");
  }

  const group = await GetGroup(groupID);

  return group;
};

const listMembers = async (page: number, limit: number, groupID: string) => {
  if (!groupID) {
    throw new Error("Group ID is required");
  }

  const members = await ListMembers(groupID, page, limit);

  return members;
};

const listGroups = async (page: number, limit: number, userID: string) => {
  if (!userID) {
    throw new Error("User ID is required");
  }

  const groups = await ListGroups(userID, page, limit);

  return groups;
};

const createGroup = async (form: CreateGroupForm, owner_id: string) => {
  if (!form) {
    throw new Error("Create group form is required");
  }

  const group = await CreateGroup(form);

  const group_id = group.insertedId.toHexString();

  await AddMember(group_id, owner_id, "owner");

  return group;
};

const updateGroup = async (form: UpdateGroupForm) => {
  if (!form) {
    throw new Error("Update group form is required");
  }

  const group = await UpdateGroup(form.id, form);

  return group;
};

const deleteGroup = async (groupID: string) => {
  if (!groupID) {
    throw new Error("Group ID is required");
  }

  const group = await DeleteGroup(groupID);

  return group;
};

export default {
  getGroup,
  listMembers,
  listGroups,
  createGroup,
  updateGroup,
  deleteGroup,
};
