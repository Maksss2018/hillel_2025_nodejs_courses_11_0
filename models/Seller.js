import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
    },
    status: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
  },
  {
    collection: "sellers",
    timestamps: { createdAt: true, updatedAt: true },
  },
);

export default mongoose.model("Seller", sellerSchema);
