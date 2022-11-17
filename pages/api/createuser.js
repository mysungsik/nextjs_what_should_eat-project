import { createUser, connectDb } from "../../helper/db-util";

async function handler(req, res) {
  if (req.method === "POST") {
    const client = await connectDb();

    const { email, password, name } = req.body;

    const userData = {
      email,
      password,
      name,
    };

    const createResult = await createUser(client, userData);

    res.status(200).json({ message: "success to create", data: userData });
  }
}

export default handler;
