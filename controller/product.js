const Product = require("../models/product");
const Purchase = require("../models/purchase");
const Sales = require("../models/sales");
const excel = require("exceljs");

// Add Post
const addProduct = (req, res) => {
  console.log("req: ", req.body.userId);
  const addProduct = new Product({
    userID: req.body.userId,
    name: req.body.name,
    date: req.body.date,
    category: req.body.category,
    quantity: req.body.quantity,
    units: req.body.units,
    stock: req.body.stock,
    cstock: req.body.cstock,
    description: req.body.description,
  });

  addProduct
    .save()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(402).send(err);
    });
};

// Get All Products
const getAllProducts = async (req, res) => {
  const findAllProducts = await Product.find({
    userID: req.params.userId,
  }).sort({ _id: -1 }); // -1 for descending;
  res.json(findAllProducts);
};

// Delete Selected Product
const deleteSelectedProduct = async (req, res) => {
  const deleteProduct = await Product.deleteOne({ _id: req.params.id });
  const deletePurchaseProduct = await Purchase.deleteOne({
    ProductID: req.params.id,
  });

  const deleteSaleProduct = await Sales.deleteOne({ ProductID: req.params.id });
  res.json({ deleteProduct, deletePurchaseProduct, deleteSaleProduct });
};

// Update Selected Product
const updateSelectedProduct = async (req, res) => {
  try {
    const updatedResult = await Product.findByIdAndUpdate(
      { _id: req.body.productID },
      {
        name: req.body.name,
        date: req.body.date,
        category: req.body.category,
        quantity: req.body.quantity,
        units: req.body.units,
        stock: req.body.stock,
        cstock: req.body.cstock,
        description: req.body.description,
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
const searchProduct = async (req, res) => {
  const searchTerm = req.query.searchTerm;
  const products = await Product.find({
    name: { $regex: searchTerm, $options: "i" },
  });
  res.json(products);
};

// Get All Products
const getExport = async (req, res) => {
  try {
    const users = await Product.find().sort({ createdAt: 1 });

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet("Users");

    worksheet.columns = [
      { header: "Supplier Name", key: "name", width: 20 },
      { header: "Date", key: "date", width: 20 },
      { header: "Category", key: "category", width: 20 },
      { header: "Quantity", key: "quantity", width: 20 },
      { header: "Units", key: "units", width: 20 },
      { header: "Stock", key: "stock", width: 20 },
      { header: "Current Stock", key: "cstock", width: 20 },
      { header: "Description Of Good", key: "description", width: 40 },
      { header: "Created At", key: "createdAt", width: 20 },
    ];

    users.forEach((user) => {
      worksheet.addRow({
        name: user.name,
        date: user.date,
        category: user.category,
        quantity: user.quantity,
        units: user.units,
        stock: user.stock,
        cstock: user.cstock,
        description: user.description,
        createdAt: user.createdAt.toLocaleDateString(),
      });
    });
    const timestamp = new Date().toISOString().replace(/:/g, "-"); // Generate timestamp for filename
    const fileName = `users_${timestamp}.xlsx`; // Construct filename with timestamp
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
  addProduct,
  getAllProducts,
  deleteSelectedProduct,
  updateSelectedProduct,
  searchProduct,
  getExport,
};
