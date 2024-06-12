import { StatusCodes } from "http-status-codes";
import Product from "../models/ProductModel.js";
import Sale from "../models/SaleModel.js";
import { NotFoundError } from "./../errors/customErrors.js";

export const getAllSales = async (req, res) => {
  const sales = await Sale.find({})
    .populate({
      path: "items",
      populate: { path: "product", model: "Product" },
    })
    .populate("createdBy");

  res.status(StatusCodes.OK).json({ sales });
};

export const createSale = async (req, res) => {
  const { items } = req.body;
  let total = 0;
  let cartItems = [];

  for (const item of items) {
    const productDb = await Product.findById(item._id);
    if (!productDb) throw new NotFoundError(`no product with id ${item._id}`);

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
    isPaid: true,
  };

  const sale = await Sale.create(data);

  res.status(StatusCodes.CREATED).json({ sale });
};

export const updateSale = async (req, res) => {
  const sale = await Sale.findByIdAndUpdate(
    req.params.id,
    { isPaid: true },
    {
      new: true,
    }
  );

  res.status(StatusCodes.OK).json({ msg: "sale updated", sale });
};

export const getSingleSale = async (req, res) => {
  const sale = await Sale.findById(req.params.id);
  res.status(StatusCodes.OK).json({ sale });
};

export const deleteSale = async (req, res) => {
  await Sale.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ msg: "sale removed" });
};
