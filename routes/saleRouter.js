import express from "express";
import {
  createSale,
  deleteSale,
  getAllSales,
  getSingleSale,
  updateSale,
} from "../controllers/saleController.js";
import { validateSaleInput } from "../middlewares/validationMiddleware.js";
const router = express.Router();

router.get("/", getAllSales);

router.post("/", validateSaleInput, createSale);

router.patch("/:id", updateSale);

router.get("/:id", getSingleSale);

router.delete("/:id", deleteSale);

export default router;
