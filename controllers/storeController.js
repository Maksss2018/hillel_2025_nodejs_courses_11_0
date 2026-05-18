import Store from "../models/Store.js";
import { asyncHandler } from "../middleware/errorHandler.js";

// Create store
export const createStore = asyncHandler(async (req, res) => {
  const store = new Store({
    name: req.body.name,
    address: req.body.address,
  });

  await store.save();

  res.status(201).json({
    status: "success",
    data: store,
  });
});

// Get all stores (status = 1 only)
export const getAllStores = asyncHandler(async (req, res) => {
  const stores = await Store.find({ status: 1 });

  res.status(200).json({
    status: "success",
    data: stores,
  });
});

// Get single store
export const getStore = asyncHandler(async (req, res) => {
  const store = await Store.findById(req.params.id);

  if (!store || store.status === 0) {
    return res.status(404).json({
      status: "error",
      message: "Store not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: store,
  });
});

// Update store
export const updateStore = asyncHandler(async (req, res) => {
  let store = await Store.findById(req.params.id);

  if (!store || store.status === 0) {
    return res.status(404).json({
      status: "error",
      message: "Store not found",
    });
  }

  // Update only provided fields
  if (req.body.name) store.name = req.body.name;
  if (req.body.address) store.address = req.body.address;

  await store.save();

  res.status(200).json({
    status: "success",
    data: store,
  });
});

// Soft delete store (set status to 0)
export const deleteStore = asyncHandler(async (req, res) => {
  let store = await Store.findById(req.params.id);

  if (!store || store.status === 0) {
    return res.status(404).json({
      status: "error",
      message: "Store not found",
    });
  }

  store.status = 0;
  await store.save();

  res.status(204).json({});
});
