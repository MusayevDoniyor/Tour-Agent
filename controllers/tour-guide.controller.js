import TourGuide from "../models/tour-guide.model.js";
import Tour from "../models/tour.model.js";

export const createTourGuide = async (req, res) => {
  try {
    const { name, experience, phone, tours } = req.body;

    const newTourGuide = await TourGuide.create({
      name,
      experience,
      phone,
      tours,
    });

    if (tours && tours.length > 0) {
      await Promise.all(
        tours.map((tourId) =>
          Tour.findByIdAndUpdate(
            tourId,
            { $addToSet: { guides: newTourGuide._id } },
            { new: true }
          )
        )
      );
    }

    res.status(201).json(newTourGuide);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const getAllTourGuides = async (req, res) => {
  try {
    const tourGuides = await TourGuide.find().populate("tours");

    res.status(200).json({
      status: "success",
      results: tourGuides.length,
      data: tourGuides,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const getTourGuide = async (req, res) => {
  try {
    const tourGuide = await TourGuide.findById(req.params.id).populate("tours");

    if (!tourGuide) {
      return res.status(404).json({
        status: "fail",
        message: "Tour Guide not found",
      });
    }

    res.status(200).json(tourGuide);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const updateTourGuide = async (req, res) => {
  try {
    const { tours, ...otherData } = req.body;
    const tourGuide = await TourGuide.findById(req.params.id);

    if (!tourGuide) {
      return res.status(404).json({
        status: "fail",
        message: "Tour Guide not found",
      });
    }

    Object.keys(otherData).forEach((key) => {
      tourGuide[key] = otherData[key];
    });

    if (tours) {
      const removedTours = tourGuide.tours.filter(
        (tourId) => !tours.includes(tourId.toString())
      );

      await Promise.all(
        removedTours.map((tourId) =>
          Tour.findByIdAndUpdate(
            tourId,
            { $pull: { guides: tourGuide._id } },
            { new: true }
          )
        )
      );

      const newTours = tours.filter(
        (tourId) => !tourGuide.tours.map((t) => t.toString()).includes(tourId)
      );

      await Promise.all(
        newTours.map((tourId) =>
          Tour.findByIdAndUpdate(
            tourId,
            { $addToSet: { guides: tourGuide._id } },
            { new: true }
          )
        )
      );

      tourGuide.tours = tours;
    }

    await tourGuide.save();

    res.status(200).json(tourGuide);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const deleteTourGuide = async (req, res) => {
  try {
    const tourGuide = await TourGuide.findById(req.params.id);

    if (!tourGuide) {
      return res.status(404).json({
        status: "fail",
        message: "Tour Guide not found",
      });
    }

    await Promise.all(
      tourGuide.tours.map((tourId) =>
        Tour.findByIdAndUpdate(
          tourId,
          { $pull: { guides: tourGuide._id } },
          { new: true }
        )
      )
    );

    await TourGuide.findByIdAndDelete(req.params.id);

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
