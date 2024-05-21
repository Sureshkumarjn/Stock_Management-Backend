const Staff = require("../models/staff");
const Purchase = require("../models/purchase");
const Sales = require("../models/sales");
const excel = require("exceljs");

// Add Post
const addStaff = (req, res) => {
  console.log("req: ", req.body.userId);
  const addStaff = new Staff({
    userID: req.body.userId,
    sname: req.body.sname,
    nodwork: req.body.nodwork,
    festivelh: req.body.festivelh,
    totaldays: req.body.totaldays,
    otdays: req.body.otdays,
    wages: req.body.wages,
    salarytobe: req.body.salarytobe,
    perhour: req.body.perhour,
    ot: req.body.ot,
    month: req.body.month,

    totalsalary: req.body.totalsalary,
    foodadv: req.body.foodadv,
    balanceepay: req.body.balanceepay,
    remark: req.body.remark,
  });

  addStaff
    .save()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(402).send(err);
    });
};

// Get All Staff
const getAllStaffs = async (req, res) => {
  const findAllStaffs = await Staff.find({
    userID: req.params.userId,
  }).sort({ _id: -1 }); // -1 for descending;
  res.json(findAllStaffs);
};

// Delete Selected Staff
const deleteSelectedStaff = async (req, res) => {
  const deleteStaff = await Staff.deleteOne({ _id: req.params.id });
  const deletePurchaseStaff = await Purchase.deleteOne({
    StaffID: req.params.id,
  });

  const deleteSaleStaff = await Sales.deleteOne({
    StaffID: req.params.id,
  });
  res.json({ deleteStaff, deletePurchaseStaff, deleteSaleStaff });
};

// Update Selected Staff
const updateSelectedStaff = async (req, res) => {
  try {
    const updatedResult = await Staff.findByIdAndUpdate(
      { _id: req.body.staffID },
      {
        userID: req.body.userId,
        sname: req.body.sname,
        nodwork: req.body.nodwork,
        festivelh: req.body.festivelh,
        totaldays: req.body.totaldays,
        otdays: req.body.otdays,
        wages: req.body.wages,
        salarytobe: req.body.salarytobe,
        perhour: req.body.perhour,
        ot: req.body.ot,
        month: req.body.month,

        totalsalary: req.body.totalsalary,
        foodadv: req.body.foodadv,
        balanceepay: req.body.balanceepay,
        remark: req.body.remark,
      },
      { new: true }
    );
    console.log(updatedResult);
    res.json(updatedResult);
  } catch (error) {
    console.log(error);
    res.status(402).send("Error");
  }
};

// Search Staff
const searchStaff = async (req, res) => {
  const searchTerm = req.query.searchTerm;
  const staffs = await Staff.find({
    name: { $regex: searchTerm, $options: "i" },
  });
  res.json(staffs);
};

// Get All Staff
const getExport = async (req, res) => {
  try {
    const users = await Staff.find().sort({ createdAt: 1 });

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet("Users");

    worksheet.columns = [
      { header: "Name", key: "sname", width: 20 },
      { header: " No Of Day Working", key: "nodwork", width: 20 },
      { header: "Fesivel Holiday", key: "festivelh", width: 20 },
      { header: " Total Days", key: "totaldays", width: 20 },
      { header: "OT Hours", key: "otdays", width: 20 },
      { header: "PER Day Wages ", key: "size", width: 20 },
      { header: "Salary To Be", key: "salarytobe", width: 20 },
      { header: "PER Hour", key: "perhour", width: 20 },
      { header: " OT", key: "ot", width: 20 },
      { header: " Month", key: "month", width: 20 },
      { header: "   Total Salary ", key: "totalsalary", width: 20 },
      { header: "   Food Advance ", key: "foodadv", width: 20 },
      { header: "   Balance E-Pay ", key: "balanceepay", width: 20 },
      { header: "   Remark ", key: "remark", width: 20 },

      { header: "Created At", key: "createdAt", width: 20 },
    ];

    users.forEach((user) => {
      worksheet.addRow({
        sname: user.sname,
        nodwork: user.nodwork,
        festivelh: user.festivelh,
        totaldays: user.totaldays,
        otdays: user.otdays,
        wages: user.wages,
        salarytobe: user.salarytobe,
        perhour: user.perhour,
        ot: user.ot,
        month: user.month,
        totalsalary: user.totalsalary,

        foodadv: user.foodadv,
        balanceepay: user.balanceepay,
        remark: user.remark,

        createdAt: user.createdAt.toLocaleDateString(),
      });
    });
    const timestamp = new Date().toISOString().replace(/:/g, "-"); // Generate timestamp for filename
    const fileName = `staff_${timestamp}.xlsx`; // Construct filename with timestamp
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(`Content-Disposition`, `attachment; filename="${fileName}"`);
    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addStaff,
  getAllStaffs,
  deleteSelectedStaff,
  updateSelectedStaff,
  searchStaff,
  getExport,
};
