import { MongoClient } from "mongodb";

const MongodbURI = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.xpihqcv.mongodb.net/?retryWrites=true&w=majority`;

export function connectDb() {
  const client = new MongoClient(MongodbURI);

  return client;
}

export async function favoriteFoodsDataArrayForUser(client, userEmail) {
  const allfoods = await client // 모든 food 데이터찾고
    .db("eating")
    .collection("foodInfo")
    .find({})
    .toArray();

  let favoriteFoodsArray = []; // 유저에 맞는 favoriteFoodsData(찜한 food id로만 이루어진 Array) 가 없을 수 있으므로, 빈배열만들고

  const favoriteFoodsData = await client
    .db("eating")
    .collection("userFavorite")
    .findOne({ userEmail: userEmail });

  if (favoriteFoodsData) {
    favoriteFoodsArray = favoriteFoodsData.foodArray; // 만약 유저에 맞는 favoriteFoodsData 가 있다면, 빈 배열 안에 넣는다.
  }

  let favorites = [];

  //    찜한 food id로만 이루어진 favoriteFoodsArray 이므로,
  //  그 안에 있는 모든 값에 대하여 하나하나씩, 전체 foodData를 filter로 찾아, 하나하나 "새 배열" 안에 push 한다.

  for (const foodid of favoriteFoodsArray) {
    const result = allfoods.filter((food) => food.id === foodid);
    favorites.push(...result);
  }

  return favorites;
}

