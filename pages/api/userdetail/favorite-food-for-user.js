import {
  connectDb,
  favoriteFoodsDataArrayForUser,
} from "../../../helper/favorite-food-for-user";

async function handler(req, res) {
  const { useEmail } = req.body;

  let client;
  let favoriteData = [];
  if (req.method === "POST") {
    try {
      client = await connectDb();
    } catch (error) {
      throw new Error("connnect fail");
    }

    favoriteData = await favoriteFoodsDataArrayForUser(client, useEmail);

    res.status(200).json({ message: "success", favorites: favoriteData });
  }
}
export default handler;
