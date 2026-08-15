import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
  },
  avatar: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
});

export const User = mongoose.model("User", userSchema);

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: String,

        required: true,
      },
    ],

    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Message",
    },
  },

  {
    timestamps: true,
  },
);

export const Conversation = mongoose.model("Conversation", conversationSchema);

const messageSchema = new mongoose.Schema(
  {
    conversation: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Conversation",

      required: true,
    },

    senderId: {
      type: String,

      required: true,
    },

    content: {
      type: String,
    },
    recipientId: {
      type: String,

      required: true,
    },

    attachments: [
      {
        url: {
          type: String,

          required: true,
        },

        type: {
          type: String,

          enum: ["image", "file", "video"],

          required: true,
        },

        name: String,

        size: Number,
      },
    ],
  },

  {
    timestamps: true,
  },
);

export const Message = mongoose.model("Message", messageSchema);
