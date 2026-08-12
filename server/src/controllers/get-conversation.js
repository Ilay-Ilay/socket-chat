import mongoose from "mongoose";
import { Conversation, Message, User } from "../db/mongoose.js";

export default async function getConversation(req, res) {
  const { participantId } = req.params;
  if (!mongoose.isValidObjectId(participantId)) {
    return res.status(400).json({
      message: "Invalid participant ID",
    });
  }

  try {
    const currentUser = await User.findOne({
      clerkId: req.userId,
    });

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const conversation = await Conversation.findOne({
      participants: {
        $all: [currentUser._id, participantId],
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
