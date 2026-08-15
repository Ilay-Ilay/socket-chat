import mongoose from "mongoose";
import { Conversation, Message } from "../db/mongoose";

export default function initializeSocket(io) {
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("sendMessage", async (data) => {
      const senderId = socket.userId;
      const { recipientId, content } = data;

      try {
        let conversation = await Conversation.findOne({
          participants: {
            $all: [senderId, recipientId],
          },
        });
        if (!conversation) {
          conversation = await Conversation.create({
            participants: [senderId, recipientId],
          });
        }
        const newMessage = await Message.create({
          conversation: conversation._id,

          senderId,

          recipientId,

          content,
        });
        conversation.lastMessage = newMessage._id;

        await conversation.save();
        const roomId = conversation._id.toString();

        socket.join(roomId);

        io.to(roomId).emit("message", newMessage);
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
}
