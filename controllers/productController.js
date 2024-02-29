import { v2 as cloudinary } from "cloudinary";
import { StatusCodes } from "http-status-codes";
import { formatImage } from "../middlewares/multerMiddleware.js";
import Product from "../models/ProductModel.js";
import User from "../models/UserModel.js";

export const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products });
};

export const createProduct = async (req, res) => {
  let product = { ...req.body };

  if (req.file) {
    const file = formatImage(req.file);

    const response = await cloudinary.uploader.upload(file);
    product.image = response.secure_url;
    product.imagePublicId = response.public_id;
  }

  product = await Product.create(product);

  res.status(StatusCodes.CREATED).json({ product });
};

export const getSingleProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.status(StatusCodes.OK).json({ product });
};

export const updateProduct = async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(StatusCodes.OK).json({ msg: "product modified", updatedProduct });
};

export const deleteProduct = async (req, res) => {
  const removedProduct = await Product.findByIdAndDelete(req.params.id);

  res.status(StatusCodes.OK).json({ msg: "product deleted" });
};
