import { isValidObjectId } from "../utils/is_valid_objectid";
export const validateSeller = (req, res, next) => {
  const { name, email, phone } = req.body;

  if (typeof name !== "string") {
    return res
      .status(400)
      .json({ status: "error", message: "Name is not a string" });
  }

  if (!name || name.trim() === "") {
    return res
      .status(400)
      .json({ status: "error", message: "Name is required" });
  }

  if (typeof email !== "string") {
    return res
      .status(400)
      .json({ status: "error", message: "Email is not a string" });
  }

  if (!email || email.trim() === "") {
    return res
      .status(400)
      .json({ status: "error", message: "Email is required" });
  }

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ status: "error", message: "Invalid email format" });
  }

  if (typeof phone !== "string") {
    return res
      .status(400)
      .json({ status: "error", message: "Phone is not a string" });
  }

  if (!phone || phone.trim() === "") {
    return res
      .status(400)
      .json({ status: "error", message: "Phone is required" });
  }

  next();
};

export const validateStore = (req, res, next) => {
  const { name, address } = req.body;
  if (typeof name !== "string") {
    return res
      .status(400)
      .json({ status: "error", message: "Name is not a string" });
  }

  if (!name || name.trim() === "") {
    return res
      .status(400)
      .json({ status: "error", message: "Name is required" });
  }
  if (typeof address !== "string") {
    return res
      .status(400)
      .json({ status: "error", message: "Address is not a string" });
  }
  if (!address || address.trim() === "") {
    return res
      .status(400)
      .json({ status: "error", message: "Address is required" });
  }

  next();
};

export const validateSale = (req, res, next) => {
  const { sellerId, storeId, amount, itemsCount, date } = req.body;

  if (!isValidObjectId(sellerId)) {
    return res.status(400).send("Invalid seller ID");
  }
  /*
  if (!sellerId || sellerId.trim() === "") {
    return res
      .status(400)
      .json({ status: "error", message: "Seller ID is required" });
  }
*/
  if (!isValidObjectId(storeId)) {
    return res.status(400).send("Invalid store ID");
  }
  /*
  if (!storeId || storeId.trim() === "") {
    return res
      .status(400)
      .json({ status: "error", message: "Store ID is required" });
  }
*/
  if (amount === undefined || amount === null) {
    return res
      .status(400)
      .json({ status: "error", message: "Amount is required" });
  }
  if (amount % 1 !== 0 && typeof amount === "number") {
    return res
      .status(400)
      .json({ status: "error", message: "Amount must be a whole number" });
  }
  if (typeof amount !== "number" || amount <= 0) {
    return res
      .status(400)
      .json({ status: "error", message: "Amount must be greater than 0" });
  }

  if (itemsCount % 1 !== 0 && typeof itemsCount === "number") {
    return res
      .status(400)
      .json({ status: "error", message: "Items count must be a whole number" });
  }

  if (itemsCount === undefined || itemsCount === null) {
    return res
      .status(400)
      .json({ status: "error", message: "Items count is required" });
  }

  if (typeof itemsCount !== "number" || itemsCount < 1) {
    return res
      .status(400)
      .json({ status: "error", message: "Items count must be at least 1" });
  }

  if (typeof date !== "string") {
    return res
      .status(400)
      .json({ status: "error", message: "Date is not a string" });
  }

  if (!date || date.trim() === "") {
    return res
      .status(400)
      .json({ status: "error", message: "Date is required" });
  }

  next();
};

// Sanitize data to prevent NoSQL injection
export const sanitizeData = (req, res, next) => {
  if (req.body) {
    // Remove $ and . characters from keys to prevent NoSQL injection
    const sanitized = {};
    for (const key in req.body) {
      if (!key.startsWith("$") && !key.includes(".")) {
        sanitized[key] = req.body[key];
      }
    }
    req.body = sanitized;
  }
  next();
};
