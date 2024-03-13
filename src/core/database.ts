import { MongoClient } from "mongodb";
import mongodb from "../configs/mongodb.json";

const uri = mongodb.connection_string;

export function initializeMongoDB() {
  const client = new MongoClient(uri);
  return client.db("ChamCong");
}
