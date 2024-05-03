const mongoose = require("mongoose");

const MaterialSchema = new mongoose.Schema(
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
    mname: {
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
    length: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    thickness: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Material = mongoose.model("material", MaterialSchema);
module.exports = Material;
