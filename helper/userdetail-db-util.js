import { MongoClient } from "mongodb";

export function connectDb() {
  const client = new MongoClient(
    "mongodb+srv://audtlr:lNbip9a0o2BUm0u2@eating.xpihqcv.mongodb.net/?retryWrites=true&w=majority"
  );

  return client;
}

// 이 아이디로 된, Favorite Array 가 하나라도 있다면,
//  또한, 그렇게 찾은 foodArray 안에, 입력한 foodId가 존재한다면, 그 foodId를 "제거하고" 업데이트
//                                   입력한 foodId가 존재하지 않는다면, 그 foodId를 "추가시켜" 업데이트

export async function saveUserFavorite(client, userEmail, foodId) {
  // userEmail 이 이미 존재하는 데이터인가?
  const findResult = await client
    .db("eating")
    .collection("userFavorite")
    .findOne({ userEmail: userEmail });

  // "만약 없다면" Array 형태로, foodId 를 집어넣어준다.
  if (!findResult) {
    const foodArray = [foodId];

    const insertResult = await client
      .db("eating")
      .collection("userFavorite")
      .insertOne({ userEmail, foodArray });

    return insertResult;
  }

  // 이미 같은 useEmail 을 사용한 data가 존재하는가??
  // 그렇다면, 그 data 안에 있는 foodArray를 꺼낸 후,
  // 현재 넣으려고 하는 foodId가 있는지 확인한다..

  const oldFoodArray = findResult.foodArray;

  const sameInArray = oldFoodArray.find((id) => id === foodId);

  // "userEmail 이 이미 존재", "foodArray는 존재하지 않는다면"
  // foodArray에 새로운 foodId를 추가하여, newFoodArray를 만들어서 다시 넣어준다.

  if (!sameInArray) {
    const newFoodArray = oldFoodArray.push(foodId);

    const updateResult = await client
      .db("eating")
      .collection("userFavorite")
      .updateOne(
        { userEmail: userEmail },
        { set: { foodArray: newFoodArray } }
      );

    return updateResult;
  }

  // "userEmail 이 이미 존재," "foodArray 도 이미 존재한다면"
  // foodArray에서, 이미 존재하는 foodId를 제거하고, newFoodArray를 만들어서 다시 넣어준다.

  const newFoodArray = oldFoodArray.filter((id) => id !== foodId);

  const updateResult = await client
    .db("eating")
    .collection("userFavorite")
    .updateOne({ userEmail: userEmail }, { set: { foodArray: newFoodArray } });

  return updateResult;
}
