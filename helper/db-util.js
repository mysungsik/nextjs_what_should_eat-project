import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

const MongodbURI = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.xpihqcv.mongodb.net/?retryWrites=true&w=majority`;
export function connectDb() {
  const client = new MongoClient(MongodbURI);

  return client;
}

// 유저 생성
export async function createUser(client, data) {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  data.password = hashedPassword;
  const insertResult = await client
    .db("eating")
    .collection("userInfo")
    .insertOne(data);

  return insertResult;
}

// 유저의 상세정보
export async function findUserInfo(client, email) {
  const findResult = await client
    .db("eating")
    .collection("userInfo")
    .findOne({ email: email });

  return findResult;
}

// 컨택트 DB
export async function contactHandler(client, data) {
  const insertResult = await client
    .db("eating")
    .collection("contact")
    .insertOne(data);
  return insertResult;
}

// 음식 추가기 의 DB
export async function addingHandler(client, data) {
  const insertResult = await client
    .db("eating")
    .collection("foodInfo")
    .insertOne(data);
  return insertResult;
}

// 모든 음식 데이터
export async function findAllFoods(client) {
  const findResult = await client
    .db("eating")
    .collection("foodInfo")
    .find({})
    .toArray();

  return findResult;
}

// 한 음식 디테일 데이터
export async function findFoodDetail(client, foodid) {
  let findResult = await client
    .db("eating")
    .collection("foodInfo")
    .findOne({ id: foodid });

  return findResult;
}

// 칼로리만 뽑는 데이터
export async function findAllFoodsForCalorie(client) {
  const findResult = await client
    .db("eating")
    .collection("foodInfo")
    .find({}, { name: 1, category: 1, calorie: 1 })
    .toArray();

  return findResult;
}
