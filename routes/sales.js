import express from "express";
import * as saleController from "../controllers/saleController.js";
import { validateSale } from "../middleware/validators.js";

const router = express.Router();

router.post("/", validateSale, saleController.createSale);
router.get("/", saleController.getAllSales);
router.get("/:id", saleController.getSale);
router.patch("/:id", saleController.updateSale);
router.delete("/:id", saleController.deleteSale);

export default router;
