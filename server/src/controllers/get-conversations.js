import { Conversation } from "../db/mongoose.js";

export default async function getConversations(req, res) {
  const userId = req.userId;

  try {
    const conversations = await Conversation.aggregate([
      // 1. Find conversations where the current user participates

      {
        $match: {
          participants: userId,
        },
      },

      // 2. Get the other participant's User document

      {
        $lookup: {
          from: "users",

          localField: "participants",

          foreignField: "clerkId",

          as: "participants",
        },
      },
    ]);

    res.json(conversations);
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Failed to get conversations" });
  }
}
