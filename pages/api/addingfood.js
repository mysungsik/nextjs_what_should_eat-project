import { addingHandler, connectDb } from "../../helper/db-util";
import { getSession } from "next-auth/react";

async function handler(req, res) {
  const session = await getSession({ req: req });

  if (session.user.email !== "admin@admin.com") {
    res.json({ message: "you are not authenicated" });
    return;
  }
  if (req.method === "POST") {
    let client;
    try {
      client = await connectDb();
    } catch (error) {
      throw new Error("연결 실패");
    }

    const inputData = req.body;

    inputData.alt = req.body.name;

    if (
      !inputData.name ||
      !inputData.image ||
      !inputData.category ||
      !inputData.price ||
      !inputData.calorie ||
      !inputData.nutri
    ) {
      throw new Error("무언가 덜적었따.");
    }

    const insertResult = await addingHandler(client, inputData);

    res.status(200).json({
      message: "등록되었습니다",
      data: inputData,
    });
  }
}

export default handler;
