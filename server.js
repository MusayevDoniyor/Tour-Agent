import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import bookingRoutes from "./routes/booking.routes.js";
import tourRoutes from "./routes/tour.routes.js";
import tourGuideRoutes from "./routes/tour-guide.routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
connectDB();

app.use("/bookings", bookingRoutes);
app.use("/guides", tourGuideRoutes);
app.use("/tours", tourRoutes);

app.get("/", (req, res) => {
  res.send("Tour Agent API ishga tushdi!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
