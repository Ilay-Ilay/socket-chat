import express from "express";
import protectRoute from "../middleware/protect-route.js";

const router = express.Router();

router.get("/auth", protectRoute, async (req, res) => {
  res.status(200).json({
    userId: req.userId,

    isAuthorized: true,
  });
});

export default router;
