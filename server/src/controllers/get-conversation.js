import mongoose from "mongoose";
import { Conversation, Message, User } from "../db/mongoose.js";

export default async function getConversation(req, res) {
  const { recipientId } = req.params;

  try {
    const user = await User.findOne({
      clerkId: req.userId,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const conversation = await Conversation.findOne({
      participants: {
        $all: [user.clerkId, recipientId],
      },
    });

    if (!conversation) {
      return res.json(null);
    }

    const messages = await Message.find({
      conversationId: conversation._id,
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
