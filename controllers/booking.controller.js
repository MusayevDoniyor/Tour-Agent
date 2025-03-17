import Booking from "../models/booking.model.js";
import Tour from "../models/tour.model.js";

export const createBooking = async (req, res) => {
  try {
    const { user_name, tour_id, date } = req.body;

    const tour = await Tour.findById(tour_id);
    if (!tour)
      res.status(404).json({
        status: "failed",
        message: "Tour not found",
      });

    const newBooking = await Booking.create({
      user_name,
      tour_id,
      date,
    });

    await newBooking.populate({
      path: "tour_id",
      select: "_id name location price",
    });

    const response = {
      _id: newBooking._id,
      user_name: newBooking.user_name,
      tour: {
        _id: newBooking.tour_id._id,
        name: newBooking.tour_id.name,
        location: newBooking.tour_id.location,
        price: newBooking.tour_id.price,
      },
      date: newBooking.date,
      createdAt: newBooking.createdAt,
    };

    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate({
      path: "tour_id",
      select: "_id name location price",
    });

    const formattedBookings = bookings.map((booking) => ({
      _id: booking._id,
      user_name: booking.user_name,
      tour: {
        _id: booking.tour_id._id,
        name: booking.tour_id.name,
        location: booking.tour_id.location,
        price: booking.tour_id.price,
      },
      date: booking.date,
      createdAt: booking.createdAt,
    }));

    res.status(200).json({
      status: "success",
      results: bookings.length,
      data: formattedBookings,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate({
      path: "tour_id",
      select: "_id name location price",
    });

    if (!booking)
      res.status(404).json({
        status: "fail",
        message: "Booking not found",
      });

    const response = {
      _id: booking._id,
      user_name: booking.user_name,
      tour: {
        _id: booking.tour_id._id,
        name: booking.tour_id.name,
        location: booking.tour_id.location,
        price: booking.tour_id.price,
      },
      date: booking.date,
      createdAt: booking.createdAt,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const { user_name, tour_id, date } = req.body;

    if (tour_id) {
      const tour = await Tour.findById(tour_id);
      if (!tour)
        res.status(404).json({
          status: "fail",
          message: "Tour not found",
        });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        user_name,
        tour_id,
        date,
      },
      { new: true, runValidators: true }
    ).populate({
      path: "tour_id",
      select: "_id name location price",
    });

    if (!updatedBooking)
      res.status(404).json({
        status: "fail",
        message: "Booking not found",
      });

    const response = {
      _id: updatedBooking._id,
      user_name: updatedBooking.user_name,
      tour: {
        _id: updatedBooking.tour_id._id,
        name: updatedBooking.tour_id.name,
        location: updatedBooking.tour_id.location,
        price: updatedBooking.tour_id.price,
      },
      date: updatedBooking.date,
      createdAt: updatedBooking.createdAt,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking)
      res.status(404).json({
        status: "fail",
        message: "Booking not found",
      });

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
