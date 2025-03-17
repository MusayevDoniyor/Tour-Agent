import express from "express";
import {
  createBooking,
  deleteBooking,
  getAllBookings,
  getBooking,
  updateBooking,
} from "../controllers/booking.controller.js";

const router = express.Router();

router.route("/").get(getAllBookings).post(createBooking);
router.route("/:id").get(getBooking).put(updateBooking).delete(deleteBooking);

export default router;
