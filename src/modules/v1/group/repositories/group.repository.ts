import { db } from "@core/mongo";
import { ObjectId } from "mongodb";

export const ListGroups = async (user_id: string, page?: number, limit?: number) => {
  const userObjectID = ObjectId.createFromHexString(user_id);

  const _page = page || 1;
  const _limit = limit || 5;

  const countPipeline = [
    {
      $count: "total",
    },
  ];

  const dataPipeline = [
    {
      $lookup: {
        from: "groups",
        localField: "group_id",
        foreignField: "_id",
        as: "group",
      },
    },
    {
      $unwind: "$group",
    },
    {
      $lookup: {
        from: "group_members",
        let: {
          group_id: "$group._id",
        },
        // get the owner of the group, by matching the group_id and the role
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$group_id", "$$group_id"],
                  },
                  {
                    $eq: ["$role", "owner"],
                  },
                ],
              },
            },
          },
        ],
        as: "owner",
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
        id: "$group._id",
        name: "$group.name",
        description: "$group.description",
        created_at: "$group.created_at",
        updated_at: "$group.updated_at",
        owner: {
          $arrayElemAt: ["$owner", 0],
        },
      },
    },
  ];

  //return the total and the groups
  const pipeline = [
    {
      $match: {
        user_id: userObjectID,
      },
    },
    {
      $facet: {
        total: countPipeline,
        groups: dataPipeline,
      },
    },
    {
      $project: {
        total: {
          $arrayElemAt: ["$total.total", 0],
        },
        groups: 1,
      },
    },
  ];

  const cursor = db.collection("group_members").aggregate(pipeline);
  return await cursor.next();
};

export const GetGroup = (group_id: string) => {
  const groupObjectID = ObjectId.createFromHexString(group_id);

  const query = {
    _id: groupObjectID,
  };

  //change _id to id
  const projection = {
    _id: 0,
    id: "$_id",
    name: 1,
    description: 1,
    created_at: 1,
    updated_at: 1,
  };

  return db.collection("groups").findOne(query, { projection });
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
