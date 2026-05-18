import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required: [true, "Seller ID is required"],
  },
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
    required: [true, "Store ID is required"],
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
    min: [0.01, "Amount must be greater than 0"],
  },
  itemsCount: {
    type: Number,
    required: [true, "Items count is required"],
    min: [1, "Items count must be at least 1"],
  },
  status: {
    type: Number,
    enum: [0, 1],
    default: 1,
  },
  date: {
    type: Date,
    required: [true, "Date is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Sale", saleSchema);
