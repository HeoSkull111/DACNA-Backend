import { db } from "@core/mongo";
import { ObjectId } from "mongodb";

export const IsMember = (groupID: string, userID: string) => {
  const groupObjectID = ObjectId.createFromHexString(groupID);
  const userObjectID = ObjectId.createFromHexString(userID);

  const query = {
    group_id: groupObjectID,
    user_id: userObjectID,
  };

  return db.collection("group_members").findOne(query);
};

export const ListMembers = (groupID: string, page?: number, limit?: number) => {
  const groupObjectID = ObjectId.createFromHexString(groupID);

  const query = {
    group_id: groupObjectID,
  };

  const _page = page || 1;
  const _limit = limit || 10;

  return db
    .collection("group_members")
    .find(query)
    .skip((_page - 1) * _limit)
    .limit(_limit)
    .toArray();
};

export const AddMember = (groupID: string, userID: string, role: string) => {
  const groupObjectID = ObjectId.createFromHexString(groupID);
  const userObjectID = ObjectId.createFromHexString(userID);

  const now = Date.now();

  const query = {
    group_id: groupObjectID,
    user_id: userObjectID,
    role,
    created_at: now,
    updated_at: now,
  };

  return db.collection("group_members").insertOne(query);
};
