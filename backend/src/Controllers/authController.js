import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../DB/UserModel.js";

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

const isAdminEmail = (email) =>
  email.toLowerCase() === (process.env.ADMIN_EMAIL || "").toLowerCase();

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) return res.status(400).json({ message: "Email already registered" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password: hashed,
    role: isAdminEmail(email) ? "admin" : "worker",
  });

  res.json({ token: signToken(user), user: { id: user._id, name, email, role: user.role } });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user || !user.password) return res.status(400).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ message: "Invalid credentials" });

  // upgrade to admin if hardcoded email matches
  if (isAdminEmail(user.email) && user.role !== "admin") {
    user.role = "admin";
    await user.save();
  }

  res.json({
    token: signToken(user),
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
};

export const me = async (req, res) => res.json({ user: req.user });

// Admin: list users, change roles
export const listUsers = async (_req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.json({ users });
};

export const updateRole = async (req, res) => {
  const { role } = req.body;
  if (!["admin", "worker"].includes(role)) return res.status(400).json({ message: "Bad role" });
  const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select("-password");
  res.json({ user });
};

// Google callback handler — issues JWT and redirects to client
export const googleCallback = (req, res) => {
  const token = signToken(req.user);
  const url = `${process.env.CLIENT_URL}/auth/callback?token=${token}`;
  res.redirect(url);
};
