import { Router } from "express";
import passport from "passport";
import {
  register, login, me, listUsers, updateRole, googleCallback,
} from "../Controllers/authController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";
import { requireRole } from "../Middleware/requireRole.js";

const r = Router();

r.post("/register", register);
r.post("/login", login);
r.get("/me", authMiddleware, me);

r.get("/users", authMiddleware, requireRole("admin"), listUsers);
r.patch("/users/:id/role", authMiddleware, requireRole("admin"), updateRole);

// Google OAuth
r.get("/google", passport.authenticate("google", { scope: ["profile", "email"], session: false }));
r.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  googleCallback
);

export default r;
