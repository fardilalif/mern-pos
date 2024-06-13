import express from "express";
import {
  createSale,
  deleteSale,
  getAllSales,
  getSingleSale,
  getTotalSaleData,
  updateSale,
} from "../controllers/saleController.js";
import { authorizePermissions } from "../middlewares/authMiddleware.js";
import {
  validateIdParamSale,
  validateSaleInput,
} from "../middlewares/validationMiddleware.js";
const router = express.Router();

router.get("/", authorizePermissions("admin"), getAllSales);

router.get("/total-sales", getTotalSaleData);

router.post("/", validateSaleInput, createSale);

router.patch("/:id", validateIdParamSale, updateSale);

router.get("/:id", validateIdParamSale, getSingleSale);

router.delete("/:id", validateIdParamSale, deleteSale);

export default router;
