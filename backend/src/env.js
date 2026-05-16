// backend/src/env.js
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// This calculates the absolute path to your .env file relative to this file's location
dotenv.config({ path: path.resolve(__dirname, "../.env") });