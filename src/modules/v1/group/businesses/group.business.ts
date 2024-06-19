// repositories
import {
  GetGroup,
  ListGroups,
  CreateGroup,
  UpdateGroup,
  DeleteGroup,
} from "@group/repositories/group.repository";

import {
  ListMembers,
  GetMember,
  AddMember,
  AddMembers,
  IsMember,
  DeleteMember,
} from "@group/repositories/group_member.repository";

//models
import type { CreateGroupForm, UpdateGroupForm } from "@group/models/group.model";

const getGroup = async (groupID: string) => {
  if (!groupID) {
    throw new Error("Group ID is required");
  }

  const group = await GetGroup(groupID);

  return group;
};

const getMember = async (groupID: string, memberID: string) => {
  if (!groupID) {
    throw new Error("Group ID is required");
  }

  if (!memberID) {
    throw new Error("Member ID is required");
  }

  const member = await GetMember(groupID, memberID);

  return member;
};

const listMembers = async (page: number | string, limit: number | string, groupID: string) => {
  if (!groupID) {
    throw new Error("Group ID is required");
  }

  page = parseInt(page as string);
  limit = parseInt(limit as string);

  const members = await ListMembers(groupID, page, limit);

  return members;
};

const isMember = async (groupID: string, memberID: string) => {
  if (!groupID) {
    throw new Error("Group ID is required");
  }

  if (!memberID) {
    throw new Error("Member ID is required");
  }

  const member = await IsMember(groupID, memberID);

  if (!member) {
    return false;
  }

  return true;
};

const addMembers = async (groupID: string, members: string[]) => {
  if (!groupID) {
    throw new Error("Group ID is required");
  }

  if (!members || members.length === 0) {
    throw new Error("Members are required");
  }

  const group = await AddMembers(groupID, members);

  return group;
};

const deleteMember = async (userID: string, groupID: string, memberID: string) => {
  if (!groupID) {
    throw new Error("Group ID is required");
  }

  if (!memberID) {
    throw new Error("Member ID is required");
  }

  if (userID === memberID) {
    throw new Error("You can't delete yourself");
  }

  const member = await DeleteMember(groupID, memberID);

  return member;
};

const listGroups = async (page: number | string, limit: number | string, userID: string) => {
  if (!userID) {
    throw new Error("User ID is required");
  }

  page = parseInt(page as string);
  limit = parseInt(limit as string);

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
  getMember,
  isMember,
  listMembers,
  addMembers,
  deleteMember,
  listGroups,
  createGroup,
  updateGroup,
  deleteGroup,
};
