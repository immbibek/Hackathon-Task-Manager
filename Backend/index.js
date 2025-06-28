import dotenv from "dotenv";
dotenv.config(); // ✅ Load .env variables first

import express from "express";
import cors from "cors";
import passport from "passport";
import "./config/passport.js"; // ✅ Now safe to import
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use("/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
