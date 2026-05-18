import express from "express";
import * as storeController from "../controllers/storeController.js";
import { validateStore } from "../middleware/validators.js";

const router = express.Router();

router.post("/", validateStore, storeController.createStore);
router.get("/", storeController.getAllStores);
router.get("/:id", storeController.getStore);
router.put("/:id", validateStore, storeController.updateStore);
router.delete("/:id", storeController.deleteStore);

export default router;
