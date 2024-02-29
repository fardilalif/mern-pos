import express from "express";
import {
  createSale,
  deleteSale,
  getAllSales,
  getSingleSale,
} from "../controllers/saleController.js";
const router = express.Router();

router.get("/", getAllSales);

router.post("/", createSale);

router.get("/:id", getSingleSale);

router.delete("/:id", deleteSale);

export default router;
