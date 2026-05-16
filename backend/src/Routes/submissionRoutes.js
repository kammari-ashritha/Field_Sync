import { Router } from "express";
import {
  createSubmission, myReports, getAllReports, getStats,
} from "../Controllers/submissionController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";
import { requireRole } from "../Middleware/requireRole.js";

const r = Router();

r.post("/", authMiddleware, createSubmission);
r.get("/mine", authMiddleware, myReports);
r.get("/", authMiddleware, requireRole("admin"), getAllReports);
r.get("/stats", authMiddleware, requireRole("admin"), getStats);

export default r;
