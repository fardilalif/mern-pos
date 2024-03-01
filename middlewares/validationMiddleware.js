import { body, check, param, validationResult } from "express-validator";
import mongoose from "mongoose";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import Product from "../models/ProductModel.js";
import User from "../models/UserModel.js";

const withValidatorErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("no product"))
          throw new NotFoundError(errorMessages);

        throw new BadRequestError(errorMessages);
      }

      next();
    },
  ];
};

export const validateRegisterInput = withValidatorErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("name is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) throw new BadRequestError("email is already exist");
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 5 })
    .withMessage("password must be at least 5 characters"),
]);

export const validateLoginInput = withValidatorErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password is required"),
]);

export const validateProductInput = withValidatorErrors([
  body("name").notEmpty().withMessage("product name is required"),
  body("description").notEmpty().withMessage("product description is required"),
  body("price").notEmpty().withMessage("product price is required"),
  body("category").notEmpty().withMessage("product category is required"),
]);

export const validateIdParam = withValidatorErrors([
  param("id").custom(async (productId) => {
    const isValidId = mongoose.Types.ObjectId.isValid(productId);
    if (!isValidId) throw new BadRequestError("invalid mongodb id");

    const product = await Product.findById(productId);
    if (!product) throw new NotFoundError(`no product with id ${productId}`);
  }),
]);

export const validateSaleInput = withValidatorErrors([
  body("items")
    .custom((items) => {
      if (items.length < 1) return false;
      else return true;
    })
    .withMessage("items are required"),
]);
