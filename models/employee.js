const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    empnumber: {
      type: Number,
      required: true,
    },
    empname: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    empcategory: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    empdate: {
      type: Number,
      required: true,
    },
    empot: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },

  { timestamps: true }
);

const Employee = mongoose.model("employee", EmployeeSchema);
module.exports = Employee;
