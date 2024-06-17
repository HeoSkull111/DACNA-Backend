import { db } from "@core/mongo";
import { User } from "@user/models/user.model";
import { InsertOneResult, Document, ObjectId } from "mongodb";

const addUser = async (user: any): Promise<InsertOneResult<Document>> => {
  const result = await db.collection("users").insertOne(user);
  return result;
};

const updateUser = async (id: ObjectId | string, user: any) => {
  if (typeof id === "string") {
    id = new ObjectId(id);
  }

  const result = await db.collection("users").updateOne(
    {
      _id: id,
    },
    {
      $set: user,
    }
  );

  return result;
};

const findUser = async (id: ObjectId | string) => {
  if (typeof id === "string") {
    id = new ObjectId(id);
  }

  const result = await db.collection<User>("users").findOne({
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

const findUserByUsername = async (username: string) => {
  const result = await db.collection("users").findOne({
    username,
  });

  return result;
};

export default {
  addUser,
  updateUser,
  findUser,
  findUserByEmail,
  findUserByUsername,
};
