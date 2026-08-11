import express from "express";
import "dotenv/config";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import webhook from "./webhooks/verify-webhook.js";
import protectedRouter from "./routes/protected-routes.js";
import connectDB from "./db/db.js";

const app = express();

const PORT = process.env.PORT || 3000;
const APP_URL = process.env.APP_URL;

// DB

await connectDB();

// Webhooks

app.post(
  "/api/webhooks/clerk",

  express.raw({ type: "application/json" }),

  webhook,
);

// Middleware

app.use(clerkMiddleware());

app.use(cors({ origin: APP_URL }));

app.use(express.static("public"));

app.use(express.json());

app.use("/api", protectedRouter);

app.get("*", (req, res) => {
  res.sendFile("index.html", { root: "public" });
});

// Protected routes

// Health

app.get("/health", (req, res) => {
  res.send("OK");
});

app.listen(PORT, () => {
  console.log("APP IS NOW RUNNING ON PORT: ", PORT);
});
