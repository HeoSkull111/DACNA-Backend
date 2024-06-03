import { db } from "@core/mongo";

import { InsertOneResult, ObjectId, UpdateResult, WithId } from "mongodb";

import { Workday } from "@workday/models/workday.model";

const addWorkday = async (workday: any): Promise<InsertOneResult<Workday>> => {
  const result = await db.collection<Workday>("workdays").insertOne(workday);
  return result;
};

const updateWorkday = async (
  id: ObjectId | string,
  workday: any
): Promise<UpdateResult<Workday>> => {
  if (typeof id === "string") {
    id = new ObjectId(id);
  }

  const result = await db.collection<Workday>("workdays").updateOne(
    {
      _id: id,
    },
    {
      $set: workday,
    }
  );

  return result;
};

const findWorkday = async (id: ObjectId | string): Promise<WithId<Workday> | null> => {
  if (typeof id === "string") {
    id = new ObjectId(id);
  }

  const result = await db.collection<Workday>("workdays").findOne({
    _id: id,
  });

  return result;
};

const findCurrentWorkday = async (user_id: string): Promise<WithId<Workday> | null> => {
  const result = await db.collection<Workday>("workdays").findOne({
    user_id: user_id,
    status: "CHECKED_IN",
  });

  return result;
};

const IsUserWorking = async (user_id: string): Promise<WithId<Workday> | null> => {
  const result = await db.collection<Workday>("workdays").findOne({
    user_id: user_id,
    status: "CHECKED_IN",
  });

  return result;
};

export default {
  addWorkday,
  updateWorkday,
  findWorkday,
  findCurrentWorkday,
  IsUserWorking,
};
