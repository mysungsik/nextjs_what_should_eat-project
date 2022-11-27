import { connectDb, findSameArray } from "../../helper/userdetail-db-util";

async function handler(req, res) {
  const { userEmail, foodID } = req.body;
  let client;

  if (req.method === "POST") {
    client = await connectDb();
    const isSameArray = await findSameArray(client, userEmail, foodID);

    res
      .status(200)
      .json({ message: "found same array", sameArray: isSameArray });
  }
}

export default handler;
