import { Conversation, Message } from "../db/mongoose.js";

export default async function getConversation(req, res) {
  const { participantId } = req.params;
  console.log("CONVERSATIONS REQUESTED");
  const userId = req.userId;

  try {
    const conversation = await Conversation.findOne({
      participants: {
        $all: [userId, participantId],
      },
    });

    if (!conversation) {
      return res.json(null);
    }

    const messages = await Message.find({
      conversation: conversation._id,
    }).sort({ createdAt: 1 });

    return res.json({
      conversation,

      messages,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to get conversation",
    });
  }
}
