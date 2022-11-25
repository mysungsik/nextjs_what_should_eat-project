import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

const MongodbURI = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.xpihqcv.mongodb.net/?retryWrites=true&w=majority`;
export function connectDb() {
  const client = new MongoClient(MongodbURI);

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

export async function findFoodDetail(client, foodid) {
  let findResult = await client
    .db("eating")
    .collection("foodInfo")
    .findOne({ id: foodid });

  return findResult;
}

export async function findAllFoodsForCalorie(client) {
  const findResult = await client
    .db("eating")
    .collection("foodInfo")
    .find({}, { name: 1, category: 1, calorie: 1 })
    .toArray();

  return findResult;
}
