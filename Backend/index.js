import dotenv from "dotenv";
dotenv.config(); // ✅ Load .env variables first

import express from "express";
import http from "http"
import { Server } from "socket.io";
import cors from "cors";
import passport from "passport";
import "./config/passport.js"; // ✅ Now safe to import
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";

connectDB();

const app = express();
const server=http.createServer(app);
const io=new Server(server,{
  cors:{
    origin:"http://localhost:3000",
    methods:["GET","POST"]
  }
});

app.use(cors());
app.use(express.json());
app.use(passport.initialize());


app.use("/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Socket.IO Setup
io.on("connnection",(socket)=>{
   console.log("🟢 A user connected", socket.id);

   socket.on("disconnect", () => {
    console.log("🔴 User disconnected", socket.id);
  });
});

export {io};

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
