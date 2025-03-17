import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
