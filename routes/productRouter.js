import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/productController.js";
import { authorizePermissions } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";
import {
  validateIdParamProduct,
  validateProductInput,
} from "../middlewares/validationMiddleware.js";
const router = express.Router();

router.get("/", getAllProducts);

router.post(
  "/",
  authorizePermissions("admin"),
  upload.single("image"),
  validateProductInput,
  createProduct
);

router.get("/:id", validateIdParamProduct, getSingleProduct);

router.patch(
  "/:id",
  authorizePermissions("admin"),
  upload.single("image"),
  validateIdParamProduct,
  validateProductInput,
  updateProduct
);

router.delete(
  "/:id",
  authorizePermissions("admin"),
  validateIdParamProduct,
  deleteProduct
);

export default router;
