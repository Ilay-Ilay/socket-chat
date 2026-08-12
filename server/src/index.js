import express from "express";
import "dotenv/config";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import webhook from "./webhooks/verify-webhook.js";
import protectedRouter from "./routes/protected-routes.js";
import connectDB from "./db/db.js";

const app = express();

const PORT = process.env.PORT || 3000;
const allowedOrigins = ["http://localhost:5173"];

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

app.use(
  cors({
    origin: allowedOrigins,
  }),
);

app.use(express.static("public"));

app.use(express.json());

// Health

app.get("/health", (req, res) => {
  res.send("OK");
});

// Protected routes

app.use("/api", protectedRouter);

app.get("/{*any}", (req, res) => {
  res.sendFile("index.html", { root: "public" });
});

app.listen(PORT, () => {
  console.log("APP IS NOW RUNNING ON PORT: ", PORT);
});
