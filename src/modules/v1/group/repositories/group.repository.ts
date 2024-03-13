import { db } from "@core/mongo";

export const List = (collection: string) => {
  return db.collection(collection).find().toArray();
};
