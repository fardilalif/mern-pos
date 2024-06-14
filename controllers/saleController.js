import { StatusCodes } from "http-status-codes";
import Product from "../models/ProductModel.js";
import Sale from "../models/SaleModel.js";
import { NotFoundError } from "./../errors/customErrors.js";

export const getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find({}).populate("createdBy");

    const populatedSales = await Promise.all(
      sales.map(async (sale) => {
        const populatedItems = await Promise.all(
          sale.items.map(async (item) => {
            const product = await Product.findById(item._id).lean();

            return { ...item.toObject(), product };
          })
        );

        return { ...sale.toObject(), items: populatedItems };
      })
    );

    res.status(StatusCodes.OK).json({ sales: populatedSales });
  } catch (error) {
    console.error("Error fetching sales:", error);
    throw new Error("Error fetching sales");
  }
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

  const populatedItems = await Promise.all(
    sale.items.map(async (item) => {
      const product = await Product.findById(item._id).lean();

      return { ...item.toObject(), product };
    })
  );

  console.log(populatedItems);

  res
    .status(StatusCodes.OK)
    .json({ ...sale.toObject(), items: populatedItems });
};

export const deleteSale = async (req, res) => {
  await Sale.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ msg: "sale removed" });
};

export const getTotalSaleData = async (req, res) => {
  const result = await Sale.aggregate([
    {
      $unwind: {
        path: "$items",
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "items._id",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $unwind: {
        path: "$product",
      },
    },
    {
      $group: {
        _id: "$product.name",
        totalSold: {
          $sum: "$items.quantity",
        },
      },
    },
    {
      $project: {
        _id: 0,
        product: "$_id",
        totalSold: 1,
      },
    },
  ]);

  res.status(StatusCodes.OK).json({
    totalSales: result,
  });
};
