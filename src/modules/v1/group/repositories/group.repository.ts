import { db } from "@core/mongo";
import { ObjectId } from "mongodb";

export const ListGroups = (user_id: string, page?: number, limit?: number) => {
  const userObjectID = ObjectId.createFromHexString(user_id);

  const query = {
    user_id: userObjectID,
  };

  const _page = page || 1;
  const _limit = limit || 10;

  return db
    .collection("groups")
    .find(query)
    .skip((_page - 1) * _limit)
    .limit(_limit)
    .toArray();
};

export const GetGroup = (group_id: string) => {
  const groupObjectID = ObjectId.createFromHexString(group_id);

  const query = {
    _id: groupObjectID,
  };

  return db.collection("groups").findOne(query);
};

export const CreateGroup = (data: any) => {
  const now = Date.now();

  data.created_at = now;
  data.updated_at = now;

  return db.collection("groups").insertOne(data);
};

export const UpdateGroup = (group_id: string, data: any) => {
  const groupObjectID = ObjectId.createFromHexString(group_id);

  const query = {
    _id: groupObjectID,
  };

  data.updated_at = Date.now();

  delete data.id;

  return db.collection("groups").updateOne(query, { $set: data });
};

export const DeleteGroup = (group_id: string) => {
  const groupObjectID = ObjectId.createFromHexString(group_id);

  const query = {
    _id: groupObjectID,
  };

  return db.collection("groups").deleteOne(query);
};

export default {
  ListGroups,
  GetGroup,
  CreateGroup,
  UpdateGroup,
  DeleteGroup,
};
