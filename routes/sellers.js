import express from "express";
import * as sellerController from "../controllers/sellerController.js";
import { validateSeller } from "../middleware/validators.js";

const router = express.Router();

router.post("/", validateSeller, sellerController.createSeller);
router.get("/", sellerController.getAllSellers);
router.get("/:id", sellerController.getSeller);
router.put("/:id", validateSeller, sellerController.updateSeller);
router.delete("/:id", sellerController.deleteSeller);

export default router;
