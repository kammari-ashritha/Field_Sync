import "./env.js";
import express from "express";
import cors from "cors";
import passport from "passport";
import "./Config/passport.js";

import authRoutes from "./Routes/authRoutes.js";
import submissionRoutes from "./Routes/submissionRoutes.js";
import aiRoutes from "./Routes/aiRoutes.js";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(passport.initialize());

app.get("/", (_req, res) => res.json({ ok: true, name: "FieldSync API" }));

app.use("/api/auth", authRoutes);
app.use("/api/submission", submissionRoutes);
app.use("/api/ai", aiRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

export default app;
