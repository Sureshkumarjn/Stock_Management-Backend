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
    const users = await Material.find().sort({ createdAt: 1 });

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet("Users");

    worksheet.columns = [
      { header: "Supplier Name", key: "name", width: 20 },
      { header: "Date", key: "date", width: 20 },
      { header: "Material Name", key: "mname", width: 20 },
      { header: "Units", key: "units", width: 20 },
      { header: "Quantity", key: "quantity", width: 20 },
      { header: "Size", key: "size", width: 20 },
      { header: "Thickness", key: "thickness", width: 20 },
      { header: "Length", key: "length", width: 20 },
      { header: "Current Stock", key: "cstock", width: 20 },
      { header: "Stock", key: "stock", width: 20},
      { header: "Created At", key: "createdAt", width: 20 },
    ];

    users.forEach((user) => {
      worksheet.addRow({
        name: user.name,
        date: user.date,
        mname: user.mname,
        units: user.units,
        quantity: user.quantity,
        size: user.size,
        thickness: user.thickness,
        length: user.length,
        cstock: user.cstock,
        stock: user.stock,
        createdAt: user.createdAt.toLocaleDateString(),
      });
    });
    const timestamp = new Date().toISOString().replace(/:/g, "-"); // Generate timestamp for filename
    const fileName = `material_${timestamp}.xlsx`; // Construct filename with timestamp
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
