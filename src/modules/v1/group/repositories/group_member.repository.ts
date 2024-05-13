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

export const GetMember = async (groupID: string, memberID: string) => {
  const groupObjectID = ObjectId.createFromHexString(groupID);
  const memberObjectID = ObjectId.createFromHexString(memberID);

  const matchPipeline = {
    $match: {
      group_id: groupObjectID,
      user_id: memberObjectID,
    },
  };

  const lookupPipeline = {
    $lookup: {
      from: "users",
      localField: "user_id",
      foreignField: "_id",
      as: "user",
    },
  };

  const removeFieldsPipeline = {
    $project: {
      _id: 0,
      user_id: 0,
      group_id: 0,
      created_at: 0,
      updated_at: 0,
    },
  };

  const selectFieldsPipeline = {
    $project: {
      id: "$user._id",
      firstName: "$user.first_name",
      lastName: "$user.last_name",
      email: "$user.email",
      photoUrl: "$user.photo_url",
      role: 1,
    },
  };

  const pipeline = [
    matchPipeline,
    lookupPipeline,
    {
      $unwind: "$user",
    },
    removeFieldsPipeline,
    selectFieldsPipeline,
  ];

  const cursor = db.collection("group_members").aggregate(pipeline);
  return await cursor.next();
};

export const ListMembers = async (groupID: string, page?: number, limit?: number) => {
  const groupObjectID = ObjectId.createFromHexString(groupID);

  const _page = page || 1;
  const _limit = limit || 10;

  const countPipeline = [
    {
      $match: {
        group_id: groupObjectID,
      },
    },
    {
      $count: "total",
    },
  ];

  const dataPipeline = [
    {
      $match: {
        group_id: groupObjectID,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $skip: (_page - 1) * _limit,
    },
    {
      $limit: _limit,
    },
    {
      $project: {
        _id: 0,
        user_id: 0,
        group_id: 0,
        created_at: 0,
        updated_at: 0,
      },
    },
    {
      $unwind: "$user",
    },
    {
      $project: {
        id: "$user._id",
        firstName: "$user.first_name",
        lastName: "$user.last_name",
        email: "$user.email",
        photoUrl: "$user.photo_url",
        role: 1,
      },
    },
  ];

  //return the total and the groups
  const pipeline = [
    {
      $match: {
        group_id: groupObjectID,
      },
    },
    {
      $facet: {
        total: countPipeline,
        members: dataPipeline,
      },
    },
    {
      $project: {
        total: {
          $arrayElemAt: ["$total.total", 0],
        },
        members: 1,
      },
    },
  ];

  const cursor = db.collection("group_members").aggregate(pipeline);
  return await cursor.next();
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
