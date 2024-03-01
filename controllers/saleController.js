import { StatusCodes } from "http-status-codes";
import Product from "../models/ProductModel.js";
import Sale from "../models/SaleModel.js";
import { NotFoundError } from "./../errors/customErrors.js";

export const getAllSales = async (req, res) => {
  res.send("get all sales");
};
export const createSale = async (req, res) => {
  const { items } = req.body;

  let total = 0;
  let cartItems = [];

  for (const item of items) {
    const productDb = await Product.findById(item.product);
    if (!productDb)
      throw new NotFoundError(`no product with id ${item.product}`);

    const singleProduct = {
      ...item,
      price: productDb.price,
    };

    cartItems = [...cartItems, singleProduct];
    total += item.quantity * productDb.price;
  }

  let data = {
    items: cartItems,
    totalAmount: total,
    createdBy: req.user.userId,
    isPaid: false,
  };

  const sale = await Sale.create(data);

  res.status(StatusCodes.CREATED).json({ sale });
};

export const updateSale = async (req, res) => {
  res.send("update sale");
};

export const getSingleSale = async (req, res) => {
  res.send("get single sale");
};
export const deleteSale = async (req, res) => {
  res.send("delete sale");
};
