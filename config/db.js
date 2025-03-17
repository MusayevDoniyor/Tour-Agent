import mongoose from "mongoose";

export default function connectDB() {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log(`✅ MongoDB connected successfully`))
    .catch(() => console.log(`❌ MongoDB connection failed`));
}
