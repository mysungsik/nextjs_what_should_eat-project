import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

export function connectDb() {
  const client = new MongoClient(
    "mongodb+srv://audtlr:lNbip9a0o2BUm0u2@eating.xpihqcv.mongodb.net/?retryWrites=true&w=majority"
  );

  return client;
}

export async function createUser(client, data) {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  data.password = hashedPassword;
  const insertResult = await client
    .db("eating")
    .collection("userInfo")
    .insertOne(data);

  return insertResult;
}

export async function findUserInfo(client, email) {
  const findResult = await client
    .db("eating")
    .collection("userInfo")
    .findOne({ email: email });

  return findResult;
}

export async function contactHandler(client, data) {
  const insertResult = await client
    .db("eating")
    .collection("contact")
    .insertOne(data);
  return insertResult;
}

export async function addingHandler(client, data) {
  const insertResult = await client
    .db("eating")
    .collection("foodInfo")
    .insertOne(data);
  return insertResult;
}

export async function findAllFoods(client) {
  const findResult = await client
    .db("eating")
    .collection("foodInfo")
    .find({})
    .toArray();

  return findResult;
}
