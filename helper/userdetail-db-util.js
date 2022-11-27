import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

const MongodbURI = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.xpihqcv.mongodb.net/?retryWrites=true&w=majority`;
export function connectDb() {
  const client = new MongoClient(MongodbURI);

  return client;
}

export async function findSameArray(client, userEmail, foodId) {
  const findResult = await client
    .db("eating")
    .collection("userFavorite")
    .findOne({ userEmail: userEmail });

  // foodId 는 context.params 에서 오고,

  let sameArray;
  let isSameArray;
  if (findResult) {
    sameArray = findResult.foodArray.find((id) => id === foodId);
  }
  if (!sameArray) {
    isSameArray = false;
  } else {
    isSameArray = true;
  }

  // 초기값만 props로 받으면, page에서, State 에 저장한 다음, 버튼은 누를때마다, 추가나 삭제로 변경
  return isSameArray;
}

export async function favoriteFoodArray(client, userEmail) {
  const findResult = await client
    .db("eating")
    .collection("userFavorite")
    .findOne({ userEmail: userEmail });

  return findResult;
}

export async function getUserInfo(client, userEmail) {
  const findResult = await client
    .db("eating")
    .collection("userInfo")
    .findOne({ email: userEmail });
  return findResult;
}

export async function checkPassword(inputPassword, dbPassword) {
  const checkPassword = await bcrypt.compare(inputPassword, dbPassword);
  return checkPassword;
}

export async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

export async function changePassword(client, userEmail, currentHashedPassword) {
  const patchResult = await client
    .db("eating")
    .collection("userInfo")
    .updateOne(
      { email: userEmail },
      { $set: { password: currentHashedPassword } }
    );
  return patchResult;
}
