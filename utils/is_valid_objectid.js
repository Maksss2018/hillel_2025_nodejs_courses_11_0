import mongoose from "mongoose";
// Validation middleware
export const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
