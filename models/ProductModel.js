import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    category: String,
    image: String,
    imagePublicId: String,
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
