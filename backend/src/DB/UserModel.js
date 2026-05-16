import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String }, // optional for Google users
    googleId: { type: String },
    role: { type: String, enum: ["admin", "worker"], default: "worker" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
