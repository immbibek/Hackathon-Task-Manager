import dotenv from "dotenv";
dotenv.config();

import express from "express";
import http from "http"; // Required for Socket.IO server
import cors from "cors";
import { Server } from "socket.io";
import passport from "passport";

import "./config/passport.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

connectDB();

const app = express();
const server = http.createServer(app);

// 🧠 Setup Socket.IO
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
  },
});

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use("/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// 🔌 Real-time collaboration logic
io.on("connection", (socket) => {
  console.log("⚡ A user connected:", socket.id);

  // When a user joins a task room
  socket.on("join-task", ({ taskId, userId }) => {
    socket.join(taskId);
    socket.to(taskId).emit("user-joined", { userId });
    console.log(`User ${userId} joined task ${taskId}`);
  });

  // When a user is typing or editing
  socket.on("task-typing", ({ taskId, userId }) => {
    socket.to(taskId).emit("user-typing", { userId });
  });

  // Optional: Leave task
  socket.on("leave-task", ({ taskId, userId }) => {
    socket.leave(taskId);
    socket.to(taskId).emit("user-left", { userId });
    console.log(`User ${userId} left task ${taskId}`);
  });

  socket.on("disconnect", () => {
    console.log("❌ A user disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
