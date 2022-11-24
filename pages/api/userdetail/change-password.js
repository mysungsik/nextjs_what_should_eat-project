import { getSession } from "next-auth/react";
import {
  connectDb,
  getUserInfo,
  checkPassword,
  hashPassword,
  changePassword,
} from "../../../helper/userdetail-db-util";

async function handler(req, res) {
  const session = await getSession({ req: req });
  const { useremail, currentPassword, newPassword } = req.body;

  if (!session) {
    res.status(401).json({ message: "you are not authenticated" });
    return;
  }
  if (req.method !== "PATCH") {
    return;
  }

  let client;
  try {
    client = await connectDb();
  } catch (error) {
    throw new Error("연결 실패");
  }

  const userInfo = await getUserInfo(client, useremail);

  if (!userInfo) {
    client.close();
    res.status(401).json({ message: "유저 정보가 없습니다." });
    throw new Error("유저 정보가 없습니다.");
  }

  const isValidPassword = await checkPassword(
    currentPassword,
    userInfo.password
  );

  if (!isValidPassword) {
    client.close();
    res.status(401).json({ message: "현재 패스워드가 다릅니다" });
    throw new Error("현재 패스워드가 다릅니다");
  }

  const hashedPassword = await hashPassword(newPassword);

  try {
    const patchResult = await changePassword(client, useremail, hashedPassword);
    res.status(200).json({ message: "변경 성공!", data: patchResult });
  } catch (error) {
    res.status(401).json({ message: "서버오류" });
    throw new Error("서버오류");
  }
  client.close();

  // 총 순서 => 1. db에서, email 이 동일한 userinfo 정보 빼옴
  //              2. currentpassword(no hash) 와 userinfo 의 password맞는지확인
  //              3. 맞으면, currentpassword 를 hash 하여, 기존 패스워드를 변경
}
export default handler;
