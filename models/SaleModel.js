import mongoose from "mongoose";

const saleSchema = new mongoose.Schema(
  {
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        name: String,
        description: String,
        quantity: Number,
        price: Number,
      },
    ],
    totalAmount: Number,
    isPaid: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Sale", saleSchema);
