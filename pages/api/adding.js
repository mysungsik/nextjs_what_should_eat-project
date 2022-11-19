import { addingHandler, connectDb } from "../../helper/db-util";

async function handler(req, res) {
  if (req.method === "POST") {
    let client;
    try {
      client = await connectDb();
    } catch (error) {
      throw new Error("연결 실패");
    }

    const inputData = req.body;

    inputData.alt = req.body.name;

    const insertResult = await addingHandler(client, inputData);

    res.status(200).json({
      message: "등록되었습니다",
      data: inputData,
    });
  }
}

export default handler;
