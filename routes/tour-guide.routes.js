import express from "express";
import {
  getAllTourGuides,
  getTourGuide,
  createTourGuide,
  updateTourGuide,
  deleteTourGuide,
} from "../controllers/tour-guide.controller.js";

const router = express.Router();

router.route("/").get(getAllTourGuides).post(createTourGuide);

router
  .route("/:id")
  .get(getTourGuide)
  .put(updateTourGuide)
  .delete(deleteTourGuide);

export default router;
