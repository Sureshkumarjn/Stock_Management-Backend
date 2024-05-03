const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    units: {
      type: String,
      required: true,
    },
    stock: {
      type: String,
      required: true,
    },
    cstock: {
      type: String,
      required: true,
    },
    description: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },

  { timestamps: true }
);

const Product = mongoose.model("product", ProductSchema);
module.exports = Product;
