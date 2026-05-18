import Seller from "../models/Seller.js";
import { asyncHandler } from "../middleware/errorHandler.js";

// Create seller
export const createSeller = asyncHandler(async (req, res) => {
  const seller = new Seller({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  });

  await seller.save();

  res.status(201).json({
    status: "success",
    data: seller,
  });
});

// Get all sellers (status = 1 only)
export const getAllSellers = asyncHandler(async (req, res) => {
  const sellers = await Seller.find({ status: 1 });

  res.status(200).json({
    status: "success",
    data: sellers,
  });
});

// Get single seller
export const getSeller = asyncHandler(async (req, res) => {
  const seller = await Seller.findById(req.params.id);

  if (!seller || seller.status === 0) {
    return res.status(404).json({
      status: "error",
      message: "Seller not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: seller,
  });
});

// Update seller
export const updateSeller = asyncHandler(async (req, res) => {
  let seller = await Seller.findById(req.params.id);

  if (!seller || seller.status === 0) {
    return res.status(404).json({
      status: "error",
      message: "Seller not found",
    });
  }

  // Update only provided fields
  if (req.body.name) seller.name = req.body.name;
  if (req.body.email) seller.email = req.body.email;
  if (req.body.phone) seller.phone = req.body.phone;

  await seller.save();

  res.status(200).json({
    status: "success",
    data: seller,
  });
});

// Soft delete seller (set status to 0)
export const deleteSeller = asyncHandler(async (req, res) => {
  let seller = await Seller.findById(req.params.id);

  if (!seller || seller.status === 0) {
    return res.status(404).json({
      status: "error",
      message: "Seller not found",
    });
  }

  seller.status = 0;
  await seller.save();

  res.status(204).json({});
});
