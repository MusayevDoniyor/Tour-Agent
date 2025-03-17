import express from "express";
import {
  createTour,
  getAllTours,
  getTour,
  updateTour,
  deleteTour,
} from "../controllers/tour.controller.js";

const router = express.Router();

router.route("/").get(getAllTours).post(createTour);

router.route("/:id").get(getTour).put(updateTour).delete(deleteTour);

export default router;
