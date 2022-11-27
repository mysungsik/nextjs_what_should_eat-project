import { connectDb } from "../../../helper/userdetail-db-util";

async function handler(req, res) {
  if (req.method === "POST") {
    const client = await connectDb();

    const { userEmail, foodId } = req.body;

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

      res.status(200).json({ message: "success", insertResult });
      client.close();
      return;
    }

    // 이미 같은 useEmail 을 사용한 data가 존재하는가?
    // 그렇다면, 그 data 안에 있는 foodArray를 꺼낸 후,
    // 현재 넣으려고 하는 foodId가 있는지 확인한다..

    const oldFoodArray = findResult.foodArray;

    const sameInArray = oldFoodArray.find((id) => id === foodId);

    // "userEmail 이 이미 존재", "foodArray는 존재하지 않는다면"
    // foodArray에 새로운 foodId를 추가하여, newFoodArray를 만들어서 다시 넣어준다.

    if (!sameInArray) {
      let newFoodArray = oldFoodArray.push(String(foodId));

      const updateResult = await client
        .db("eating")
        .collection("userFavorite")
        .updateOne(
          { userEmail: userEmail },
          { $set: { foodArray: oldFoodArray } }
        );

      res.status(200).json({ message: "success", updateResult });
      client.close();
      return;
    }

    // "userEmail 이 이미 존재," "foodArray 도 이미 존재한다면"
    // foodArray에서, 이미 존재하는 foodId를 제거하고, newFoodArray를 만들어서 다시 넣어준다.

    const newFoodArray = oldFoodArray.filter((id) => id !== String(foodId));

    const updateResult = await client
      .db("eating")
      .collection("userFavorite")
      .updateOne(
        { userEmail: userEmail },
        { $set: { foodArray: newFoodArray } }
      );

    res.status(200).json({ message: "ghjghjghj", updateResult });
    client.close();
  }
}

export default handler;

// db에 넣는 로직은 완성했다.

//  추가되었는거 누르면, 삭제되었습니다 되게 만들고
// "클라이언트로 넣은 값을 보내
//  [넣고나면, 생기고]      [없애고나면, 사라지니까]
//  [ db에서 찾은 데이터 중, foodid 가 있다면, (getServerSideProp 로 미리 사전에 db에서 땡겨와서)]
//  [ 버튼이 "추가" 가 아니고, "삭제"] 로 보이게 하기
