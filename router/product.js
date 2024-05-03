const express = require("express");
const app = express();
const product = require("../controller/product");

// Add Product
app.post("/add", product.addProduct);

// Get All Products
app.get("/get/:userId", product.getAllProducts);

//Export Data

app.get("/export-users", product.getExport);


// Delete Selected Product Item
app.get("/delete/:id", product.deleteSelectedProduct);

// Update Selected Product
app.post("/update", product.updateSelectedProduct);

// Search Product
app.get("/search", product.searchProduct);

// http://localhost:4000/api/product/search?searchTerm=fa

module.exports = app;
