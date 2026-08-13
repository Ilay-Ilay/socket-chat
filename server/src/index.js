import express from "express";
import "dotenv/config";
import cors from "cors";
import { clerkMiddleware, verifyToken } from "@clerk/express";
import webhook from "./webhooks/verify-webhook.js";
import protectedRouter from "./routes/protected-routes.js";
import connectDB from "./db/db.js";
import { createServer } from "http";
import { Server } from "socket.io";
import initializeSocket from "./socket/socket.js";

const app = express();

const httpServer = createServer(app);

const PORT = process.env.PORT || 3000;
const allowedOrigins = ["http://localhost:5173"];

const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
  },
});

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    console.log("TOKEN????////////////////////////");
    console.log(token);

    console.log("Socket auth attempt");

    // Verify Clerk token

    const userId = await verifyToken(token);

    socket.userId = userId;

    next();
  } catch (error) {
    console.error("Socket auth failed:", error);
    next(new Error("Unauthorized"));
  }
});

// DB

await connectDB();

// Run socket

initializeSocket(io);

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

httpServer.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
