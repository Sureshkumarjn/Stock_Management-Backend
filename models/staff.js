const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    sname: {
      type: String,
      required: true,
    },
    nodwork: {
      type: String,
      required: true,
    },
    festivelh: {
      type: String,
      required: true,
    },
    totaldays: {
      type: String,
      required: true,
    },
    otdays: {
      type: String,
      required: true,
    },
    wages: {
      type: String,
      required: true,
    },
    salarytobe: {
      type: String,
      required: true,
    },
    perhour: {
      type: String,
      required: true,
    },
    ot: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    totalsalary: {
        type: String,
        required: true,
      },
      foodadv: {
        type: String,
        required: true,
      },
      balanceepay: {
        type: String,
        required: true,
      },
      remark: {
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

const Staff = mongoose.model("staff", StaffSchema);
module.exports = Staff;
