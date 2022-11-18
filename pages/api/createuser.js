import { createUser, connectDb, findUserInfo } from "../../helper/db-util";
import { signupValidation } from "../../helper/validation-util";

async function handler(req, res) {
  if (req.method === "POST") {
    let client;
    try {
      client = await connectDb();
    } catch (error) {
      res.status(500).json({ message: "데이터베이스 연결 오류" });
      throw new Error("연결 오류");
    }

    const { email, password, name } = req.body;

    if (signupValidation(email, password, name)) {
      res.status(400).json({ message: "정보를 다시 확인해주세요" });
      throw new Error("정보를 다시 확인해주세요");
    }
    const userData = {
      email,
      password,
      name,
    };

    const sameEmailUser = await findUserInfo(client, userData.email);

    if (sameEmailUser) {
      res.status(400).json({ message: "이미 존재하는 이메일 입니다." });
      throw new Error("이미 존재하는 이메일 입니다.");
    }

    try {
      const createResult = await createUser(client, userData);
      res.status(200).json({ message: "회원가입 성공!", data: userData });
    } catch (error) {
      res.status(400).json({ message: "회원가입 실패" });
      throw new Error("회원가입 실패");
    }
  }
}

export default handler;
