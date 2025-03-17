import Tour from "../models/tour.model.js";
import TourGuide from "../models/tour-guide.model.js";

export const createTour = async (req, res) => {
  try {
    const { name, description, price, location, guides } = req.body;

    const newTour = await Tour.create({
      name,
      description,
      price,
      location,
      guides,
    });

    if (guides && guides.length > 0) {
      await Promise.all(
        guides.map((guideId) =>
          TourGuide.findByIdAndUpdate(
            guideId,
            { $addToSet: { tours: newTour._id } },
            { new: true }
          )
        )
      );
    }

    res.status(201).json(newTour);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find().populate("guides");

    res.status(200).json({
      status: "success",
      results: tours.length,
      data: tours,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id).populate("guides");

    if (!tour) {
      return res.status(404).json({
        status: "fail",
        message: "Tour not found",
      });
    }

    res.status(200).json(tour);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const updateTour = async (req, res) => {
  try {
    const { guides, ...otherData } = req.body;
    const tour = await Tour.findById(req.params.id);

    if (!tour) {
      return res.status(404).json({
        status: "fail",
        message: "Tour not found",
      });
    }

    Object.keys(otherData).forEach((key) => {
      tour[key] = otherData[key];
    });

    if (guides) {
      const removedGuides = tour.guides.filter(
        (guideId) => !guides.includes(guideId.toString())
      );

      await Promise.all(
        removedGuides.map((guideId) =>
          TourGuide.findByIdAndUpdate(
            guideId,
            { $pull: { tours: tour._id } },
            { new: true }
          )
        )
      );

      const newGuides = guides.filter(
        (guideId) => !tour.guides.map((g) => g.toString()).includes(guideId)
      );

      await Promise.all(
        newGuides.map((guideId) =>
          TourGuide.findByIdAndUpdate(
            guideId,
            { $addToSet: { tours: tour._id } },
            { new: true }
          )
        )
      );

      tour.guides = guides;
    }

    await tour.save();

    res.status(200).json(tour);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    if (!tour) {
      return res.status(404).json({
        status: "fail",
        message: "Tour not found",
      });
    }

    await Promise.all(
      tour.guides.map((guideId) =>
        TourGuide.findByIdAndUpdate(
          guideId,
          { $pull: { tours: tour._id } },
          { new: true }
        )
      )
    );

    await Tour.findByIdAndDelete(req.params.id);

    console.log("Deleted");

    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
