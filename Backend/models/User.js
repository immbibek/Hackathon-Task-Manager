import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String },
  googleId: { type: String },
  avatar: { type: String },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
