import { List } from "@group/repositories/group.repository";

const listMembers = async (page: number, limit: number, groupID: string) => {
  if (!groupID) {
    throw new Error("Group ID is required");
  }

  const members = await List("members");

  return members;
};

export default {
  listMembers,
};
