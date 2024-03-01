import express from "express";
import {
  createSale,
  deleteSale,
  getAllSales,
  getSingleSale,
  updateSale,
} from "../controllers/saleController.js";
import {
  validateIdParamSale,
  validateSaleInput,
} from "../middlewares/validationMiddleware.js";
const router = express.Router();

router.get("/", getAllSales);

router.post("/", validateSaleInput, createSale);

router.patch("/:id", validateIdParamSale, updateSale);

router.get("/:id", validateIdParamSale, getSingleSale);

router.delete("/:id", validateIdParamSale, deleteSale);

export default router;
