const Material = require("../models/material");
const Purchase = require("../models/purchase");
const Sales = require("../models/sales");
const excel = require("exceljs");


// Add Post
const addMaterial = (req, res) => {
  console.log("req: ", req.body.userId);
  const addMaterial = new Material({
    userID: req.body.userId,
    name: req.body.name,
    date: req.body.date,
    mname: req.body.mname,
    units: req.body.units,
    quantity: req.body.quantity,
    size: req.body.size,
    thickness: req.body.thickness,
    length: req.body.length,
    cstock: req.body.cstock,
    stock: req.body.stock,
  });

  addMaterial
    .save()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(402).send(err);
    });
};

// Get All Material
const getAllMaterials = async (req, res) => {
  const findAllMaterials = await Material.find({
    userID: req.params.userId,
  }).sort({ _id: -1 }); // -1 for descending;
  res.json(findAllMaterials);
};

// Delete Selected Material
const deleteSelectedMaterial = async (req, res) => {
  const deleteMaterial = await Material.deleteOne({ _id: req.params.id });
  const deletePurchaseMaterial = await Purchase.deleteOne({
    MaterialID: req.params.id,
  });

  const deleteSaleMaterial = await Sales.deleteOne({
    MaterialID: req.params.id,
  });
  res.json({ deleteMaterial, deletePurchaseMaterial, deleteSaleMaterial });
};

// Update Selected Material
const updateSelectedMaterial = async (req, res) => {
  try {
    const updatedResult = await Material.findByIdAndUpdate(
      { _id: req.body.materialID },
      {
        name: req.body.name,
        date: req.body.date,
        mname: req.body.mname,
        units: req.body.units,
        quantity: req.body.quantity,
        size: req.body.size,
        thickness: req.body.thickness,
        length: req.body.length,
        cstock: req.body.cstock,
        stock: req.body.stock,
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

// Search Products
const searchMaterial = async (req, res) => {
  const searchTerm = req.query.searchTerm;
  const materials = await Material.find({
    name: { $regex: searchTerm, $options: "i" },
  });
  res.json(materials);
};

// Get All Products
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
  addMaterial,
  getAllMaterials,
  deleteSelectedMaterial,
  updateSelectedMaterial,
  searchMaterial,
  getExport,
};
