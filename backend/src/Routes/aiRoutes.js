import { Router } from "express";
import { generateSummary } from "../Controllers/aiController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";
import { requireRole } from "../Middleware/requireRole.js";

const r = Router();
r.post("/generate-summary", authMiddleware, requireRole("admin"), generateSummary);
export default r;
