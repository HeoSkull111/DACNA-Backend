import { db } from "@core/mongo";
import { InsertOneResult, Document, ObjectId, WithId, UpdateResult } from "mongodb";

// Model
import { UserProfile } from "@user/models/user.model";

const addUserProfile = async (
  user_profile: Omit<UserProfile, "id">
): Promise<InsertOneResult<Document>> => {
  const userObjectID =
    typeof user_profile.user_id !== "string"
      ? user_profile.user_id
      : ObjectId.createFromHexString(user_profile.user_id);

  const _user_profile = {
    user_id: userObjectID,
    first_name: user_profile.first_name,
    last_name: user_profile.last_name,
    phone: user_profile.phone || "",
  };

  const result = await db.collection("user_profiles").insertOne(_user_profile);
  return result;
};

const updateUserProfile = async (
  user_id: ObjectId | string,
  user_profile: Omit<UserProfile, "id">
): Promise<UpdateResult<Document>> => {
  if (typeof user_id === "string") {
    user_id = ObjectId.createFromHexString(user_id);
  }

  const _user_profile = {
    first_name: user_profile.first_name,
    last_name: user_profile.last_name,
    phone: user_profile.phone || "",
  };

  const result = await db.collection("user_profiles").updateOne(
    {
      user_id: user_id,
    },
    {
      $set: _user_profile,
    }
  );
  return result;
};

const findUserProfile = async (user_id: string): Promise<WithId<UserProfile> | null> => {
  const userObjectID = ObjectId.createFromHexString(user_id);
  const result = await db
    .collection<UserProfile>("user_profiles")
    .findOne({ user_id: userObjectID });
  return result;
};

export default {
  addUserProfile,
  updateUserProfile,
  findUserProfile,
};
