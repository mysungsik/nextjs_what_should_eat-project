import { connectDb, contactHandler } from "../../helper/db-util";
import { contactValidation } from "../../helper/validation-util";

let client;

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      client = await connectDb();
    } catch (error) {
      throw new Error("연결 오류");
    }

    const { email, name, content } = req.body;

    if (contactValidation(email, name, content)) {
      throw new Error("잘못된 양식입니다.");
    }

    const inputData = {
      email,
      name,
      content,
    };

    const contactResult = await contactHandler(client, inputData);

    res
      .status(200)
      .json({ message: "contact success", status: "success", data: inputData });
  }
}

export default handler;
