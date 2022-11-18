import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { findUserInfo, connectDb } from "../../../helper/db-util";
import bcrypt from "bcrypt";

export const authOptions = {
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = connectDb();

        const userInfo = await findUserInfo(client, credentials.email);

        if (!userInfo) {
          throw new Error("정보를 확인하세요");
        }

        const passwordValidation = await bcrypt.compare(
          credentials.password,
          userInfo.password
        );

        if (!passwordValidation) {
          throw new Error("비밀번호를 확인하세요");
        }

        return {
          email: credentials.email,
          name: userInfo.name,
        };
      },
    }),
  ],
};
export default NextAuth(authOptions);
