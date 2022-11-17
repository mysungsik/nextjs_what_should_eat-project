import { MongoClient } from "mongodb";

export function connectDb() {
  const client = new MongoClient(
    "mongodb+srv://audtlr:lNbip9a0o2BUm0u2@eating.xpihqcv.mongodb.net/?retryWrites=true&w=majority"
  );

  return client;
}

export async function createUser(client, data) {
  const insertResult = await client
    .db("eating")
    .collection("userInfo")
    .insertOne(data);

  return insertResult;
}
