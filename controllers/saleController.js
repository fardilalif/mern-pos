import { StatusCodes } from "http-status-codes";
import Sale from "../models/SaleModel.js";

export const getAllSales = async (req, res) => {
  res.send("get all sales");
};
export const createSale = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const sale = await Sale.create(req.body);

  res.status(StatusCodes.CREATED).json({ sale });
};
export const getSingleSale = async (req, res) => {
  res.send("get single sale");
};
export const deleteSale = async (req, res) => {
  res.send("delete sale");
};
