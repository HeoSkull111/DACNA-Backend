import { db } from "@core/mongo";
import { Filter, ObjectId } from "mongodb";

const addUser = async (user: any) => {
  const result = await db.collection("users").insertOne(user);
  return result;
};

const findUser = async (id: ObjectId) => {
  const result = await db.collection("users").findOne({
    _id: id,
  });

  return result;
};

const findUserByEmail = async (email: string) => {
  const result = await db.collection("users").findOne({
    email,
  });

  return result;
};

export default {
  addUser,
  findUser,
  findUserByEmail,
};
