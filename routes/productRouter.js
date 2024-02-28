import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/productController.js";
import {
  validateIdParam,
  validateProductInput,
} from "../middlewares/validationMiddleware.js";
const router = express.Router();

router.get("/", getAllProducts);

router.post("/", validateProductInput, createProduct);

router.get("/:id", validateIdParam, getSingleProduct);

router.patch("/:id", validateIdParam, validateProductInput, updateProduct);

router.delete("/:id", validateIdParam, deleteProduct);

export default router;
