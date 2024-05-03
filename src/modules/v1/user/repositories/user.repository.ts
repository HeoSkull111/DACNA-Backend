import { db } from "@core/mongo";
import { InsertOneResult, Document, ObjectId } from "mongodb";

const addUser = async (user: any): Promise<InsertOneResult<Document>> => {
  const result = await db.collection("users").insertOne(user);
  return result;
};

const findUser = async (id: ObjectId | string) => {
  if (typeof id === "string") {
    id = new ObjectId(id);
  }

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
