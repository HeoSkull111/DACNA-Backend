import { db } from "@core/mongo";

import { Document, InsertOneResult, ObjectId, UpdateResult, WithId } from "mongodb";

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

const findWorkdaysByDate = async (
  group_id: string,
  user_id: string,
  days: string | number
): Promise<Document[]> => {
  if (typeof days === "string") {
    days = parseInt(days);
  }

  const pipeline = [
    {
      $match: {
        group_id,
        user_id,
        check_in: {
          $gte: new Date(new Date().setDate(new Date().getDate() - days)),
        },
      },
    },
    {
      $project: {
        _id: 0,
        user_id: 1,
        group_id: 1,
        status: 1,
        check_in: 1,
        check_out: 1,
        created_at: 1,
        updated_at: 1,
        date: {
          $dateToString: {
            format: "%d-%m-%Y",
            date: "$check_in",
            timezone: "+07:00",
          },
        },
      },
    },
    {
      $group: {
        _id: "$date",
        total: {
          $sum: {
            $subtract: ["$check_out", "$check_in"],
          },
        },
        workdays: {
          $push: "$$ROOT",
        },
      },
    },
    {
      $project: {
        _id: 0,
        date: "$_id",
        total: {
          hour: {
            $floor: {
              $divide: ["$total", 1000 * 60 * 60],
            },
          },
          minute: {
            $mod: [
              {
                $floor: {
                  $divide: ["$total", 1000 * 60],
                },
              },
              60,
            ],
          },
        },
        workdays: 1,
      },
    },
    {
      $sort: {
        date: -1,
      },
    },
  ];

  return await db.collection<Workday>("workdays").aggregate(pipeline).toArray();
};

const findStatisticalWorkdays = async (
  group_id: string,
  user_id: string,
  begin_date?: string,
  end_date?: string
): Promise<Document[]> => {
  let match: any = {
    group_id,
    user_id,
  };

  if (begin_date && end_date) {
    match.check_in = {
      $gte: new Date(begin_date),
      $lte: new Date(end_date),
    };
  }

  if (begin_date && !end_date) {
    match.check_in = {
      $gte: new Date(begin_date),
    };
  }

  if (!begin_date && end_date) {
    match.check_in = {
      $lte: new Date(end_date),
    };
  }

  const pipeline = [
    {
      $match: match,
    },
    {
      $lookup: {
        from: "users",
        let: { uid: { $toObjectId: "$user_id" } },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$uid"],
              },
            },
          },
          {
            $project: {
              _id: 0,
              username: 1,
              email: 1,
            },
          },
        ],
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $lookup: {
        from: "user_profiles",
        let: { uid: { $toObjectId: "$user_id" } },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$user_id", "$$uid"],
              },
            },
          },
          {
            $project: {
              _id: 0,
              first_name: 1,
              last_name: 1,
              phone: 1,
            },
          },
        ],
        as: "profile",
      },
    },
    {
      $unwind: "$profile",
    },
    {
      $project: {
        _id: 0,
        group_id: 1,
        check_in: 1,
        check_out: 1,
        username: "$user.username",
        email: "$user.email",
        first_name: "$profile.first_name",
        last_name: "$profile.last_name",
        total: {
          $subtract: ["$check_out", "$check_in"],
        },
        date: {
          $dateToString: {
            format: "%d-%m-%Y",
            date: "$check_in",
            timezone: "+07:00",
          },
        },
      },
    },
    {
      $sort: {
        date: -1,
      },
    },
  ];

  return await db.collection<Workday>("workdays").aggregate(pipeline).toArray();
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
  findWorkdaysByDate,
  findStatisticalWorkdays,
  IsUserWorking,
};
