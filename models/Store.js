import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    status: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
  },
  {
    collection: "stores",
    timestamps: { createdAt: true, updatedAt: true },
  },
);

export default mongoose.model("Store", storeSchema);
