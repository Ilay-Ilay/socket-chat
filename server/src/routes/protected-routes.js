import express from "express";
import protectRoute from "../middleware/protect-route.js";
import { User } from "../db/mongoose.js";
import getConversation from "../controllers/get-conversation.js";

const router = express.Router();

// Get conversations

router.get("/conversations", getConversations);

// Get conversation

router.get("/conversation/:participantId", getConversation);

// Get auth

router.get("/auth", protectRoute, async (req, res) => {
  res.status(200).json({
    userId: req.userId,

    isAuthorized: true,
  });
});

// Search users by regex

router.get("/users/search", async (req, res) => {
  const { q } = req.query;

  if (!q || q.length < 2) {
    return res.status(400).json({ error: "Search query is too short" });
  }

  try {
    const users = await User.find({
      $or: [
        { firstName: { $regex: q, $options: "i" } },
        { lastName: { $regex: q, $options: "i" } },
        { username: { $regex: q, $options: "i" } },
      ],
    })
      .select("username firstName lastName avatar clerkId")
      .limit(20);

    res.status(200).json(users);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error searching users, please try again",
    });
  }
});

export default router;
