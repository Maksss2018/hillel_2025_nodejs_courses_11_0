import Sale from "../models/Sale.js";
import Seller from "../models/Seller.js";
import Store from "../models/Store.js";
import { asyncHandler } from "../middleware/errorHandler.js";
import { isValidObjectId } from "../utils/is_valid_objectid.js";
// Create sale
export const createSale = asyncHandler(async (req, res) => {
  if (!isValidObjectId(req.body.sellerId)) {
    return res.status(400).send("Invalid seller ID");
  }
  if (!isValidObjectId(req.body.storeId)) {
    return res.status(400).send("Invalid store ID");
  }

  const [seller, store] = await Promise.all([
    Seller.findById(req.body.sellerId),
    Store.findById(req.body.storeId),
  ]);

  if (!seller || seller.status === 0) {
    return res.status(404).json({
      status: "error",
      message: "Seller not found",
    });
  }

  if (!store || store.status === 0) {
    return res.status(404).json({
      status: "error",
      message: "Store not found",
    });
  }

  const sale = new Sale({
    sellerId: req.body.sellerId,
    storeId: req.body.storeId,
    amount: req.body.amount,
    itemsCount: req.body.itemsCount,
    date: req.body.date,
  });

  await sale.save();

  res.status(201).json({
    status: "success",
    data: sale,
  });
});

// Get all sales (status = 1 only)
export const getAllSales = asyncHandler(async (req, res) => {
  let query = { status: 1 };

  // Filtering
  if (req.query.storeId && isValidObjectId(req.query.storeId)) {
    query.storeId = req.query.storeId;
  }
  if (req.query.sellerId && isValidObjectId(req.query.sellerId)) {
    query.sellerId = req.query.sellerId;
  }
  if (req.query.dateFrom || req.query.dateTo) {
    query.date = {};
    if (req.query.dateFrom) {
      query.date.$gte = new Date(req.query.dateFrom);
    }
    if (req.query.dateTo) {
      query.date.$lte = new Date(req.query.dateTo);
    }
  }

  let salesQuery = Sale.find(query).populate("sellerId").populate("storeId");

  // Sorting
  if (req.query.sort) {
    const sortFields = req.query.sort.split(",").join(" ");
    salesQuery = salesQuery.sort(sortFields);
  }

  // Pagination
  if (req.query.page && req.query.limit) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    salesQuery = salesQuery.skip(skip).limit(limit);
  }

  const sales = await salesQuery;

  res.status(200).json({
    status: "success",
    data: sales,
  });
});

// Get single sale
export const getSale = asyncHandler(async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid sale ID");
  }
  const sale = await Sale.findById(req.params.id)
    .populate("sellerId")
    .populate("storeId");

  if (!sale || sale.status === 0) {
    return res.status(404).json({
      status: "error",
      message: "Sale not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: sale,
  });
});

// Update sale (PATCH)
export const updateSale = asyncHandler(async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid sale ID");
  }
  let sale = await Sale.findById(req.params.id);

  if (!sale || sale.status === 0) {
    return res.status(404).json({
      status: "error",
      message: "Sale not found",
    });
  }

  // Update only provided fields
  if (req.body.amount !== undefined) {
    if (req.body.amount <= 0) {
      return res.status(400).json({
        status: "error",
        message: "Amount must be greater than 0",
      });
    }
    sale.amount = req.body.amount;
  }

  if (req.body.itemsCount !== undefined) {
    if (req.body.itemsCount < 1) {
      return res.status(400).json({
        status: "error",
        message: "Items count must be at least 1",
      });
    }
    sale.itemsCount = req.body.itemsCount;
  }

  if (req.body.date) sale.date = req.body.date;

  await sale.save();

  res.status(200).json({
    status: "success",
    data: sale,
  });
});

// Soft delete sale (set status to 0)
export const deleteSale = asyncHandler(async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid sale ID");
  }
  let sale = await Sale.findById(req.params.id);

  if (!sale || sale.status === 0) {
    return res.status(404).json({
      status: "error",
      message: "Sale not found",
    });
  }

  sale.status = 0;
  await sale.save();

  res.status(204).json({});
});
