import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tour name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Tour description is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Tour price is required"],
      min: 0,
    },
    location: {
      type: String,
      required: [true, "Tour location is required"],
      trim: true,
    },
    guides: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TourGuide",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual("bookings", {
  ref: "Booking",
  foreignField: "tour_id",
  localField: "_id",
});

const Tour = mongoose.model("Tour", tourSchema);

export default Tour;
