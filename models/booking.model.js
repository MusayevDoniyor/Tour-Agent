import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: [true, "UserName is reqired"],
      trim: true,
    },
    tour_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tour",
      required: [true, "Booking id is required"],
    },
    date: {
      type: Date,
      required: [true, "Booking date is required"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

bookingSchema.virtual("tour", {
  ref: "Tour",
  localField: "tour_id",
  foreignField: "_id",
  justOne: true,
});

const Booking = new mongoose.model("Booking", bookingSchema);

export default Booking;
