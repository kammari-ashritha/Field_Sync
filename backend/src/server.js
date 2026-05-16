// 1. Initialize dotenv immediately at the absolute top of the entry file
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// This must run before importing any other custom files
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// 2. NOW safely import your express application instance
import app from "./app.js";
import { connectDB } from "./DB/db.js";

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
});