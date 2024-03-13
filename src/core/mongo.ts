import { Db, MongoClient } from "mongodb";
import mongodb from "../configs/mongodb.json";

const uri = mongodb.connection_string;

export let db: Db;

export function initializeMongoDB() {
  const client = new MongoClient(uri);

  try {
    client.connect().then((client) => {
      db = client.db(mongodb.database);
    });
  } catch (e) {
    console.error(e);
  } finally {
    client.close();
  }
}
