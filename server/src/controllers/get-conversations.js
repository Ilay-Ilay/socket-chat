import { Conversation } from "../db/mongoose.js";

export default async function getConversations(req, res) {
  const userId = req.userId;

  try {
    const conversations = await Conversation.aggregate([
      {
        $match: {
          participants: userId,
        },
      },

      // join with users

      {
        $lookup: {
          from: "users",

          localField: "participants",

          foreignField: "clerkId",

          as: "participants",
        },
      },

      //   filter out recipients

      {
        $set: {
          recipient: {
            $arrayElemAt: [
              {
                $filter: {
                  input: "$participants",

                  cond: { $ne: ["$$this.clerkId", userId] },
                },
              },

              0,
            ],
          },
        },
      },

      {
        $lookup: {
          from: "messages",

          localField: "lastMessage",

          foreignField: "_id",

          as: "lastMessage",
        },
      },

      {
        $unwind: {
          path: "$lastMessage",

          preserveNullAndEmptyArrays: true,
        },
      },
      //   sort by last message
      {
        $sort: {
          "lastMessage.createdAt": -1,
        },
      },
    ]);

    res.json(conversations);
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Failed to get conversations" });
  }
}
