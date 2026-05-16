import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import { connectDB } from "./DB/db.js";

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
});
