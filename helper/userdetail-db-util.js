import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

const MongodbURI = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.xpihqcv.mongodb.net/?retryWrites=true&w=majority`;
export function connectDb() {
  const client = new MongoClient(MongodbURI);

  return client;
}

//  찜한 음식 디테일에, 유저들마다 다른, 버튼의 이름(삭제 혹은 추가) 를 위해, samefoodId가 찜한 음식에 잇는지 확인하는 함수
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

// 모든 유저의 FavoritesData
export async function allFavoriteFoodArray(client) {
  const findResult = await client
    .db("eating")
    .collection("userFavorite")
    .find({})
    .toArray();

  return findResult;
}

// 한 유저의 FavoritesData
export async function favoriteFoodArray(client, userEmail) {
  const findResult = await client
    .db("eating")
    .collection("userFavorite")
    .findOne({ userEmail: userEmail });

  return findResult;
}

// 한 유저의 상세정보
export async function getUserInfo(client, userEmail) {
  const findResult = await client
    .db("eating")
    .collection("userInfo")
    .findOne({ email: userEmail });
  return findResult;
}

// 비밀번호 변경시, 패스워드 체크
export async function checkPassword(inputPassword, dbPassword) {
  const checkPassword = await bcrypt.compare(inputPassword, dbPassword);
  return checkPassword;
}

// 비밀번호 생성/변경시, hash 패스워드
export async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

// 비밀번호 변경 Query
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
