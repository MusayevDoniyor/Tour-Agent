import mongoose from "mongoose";

const tourGuideSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Guide name is required"],
      trim: true,
    },
    experience: {
      type: Number,
      required: [true, "Experience years are required"],
      min: 0,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    tours: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tour",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const TourGuide = mongoose.model("TourGuide", tourGuideSchema);

export default TourGuide;
