const express = require("express");
const app = express();
const employee = require("../controller/employee");

// Add Product
app.post("/add", employee.addEmployee);

// Get All Products
app.get("/get/:userId", employee.getAllEmployees);

//Employee Active

app.put("/:id", employee.putActive);


//Export Data

app.get("/export-users", employee.getExport);

// Delete Selected Product Item
app.get("/delete/:id", employee.deleteSelectedEmployee);

// Update Selected Product
app.post("/update", employee.updateSelectedEmployee);

// Search Product
app.get("/search", employee.searchEmployee);

// http://localhost:4000/api/product/search?searchTerm=fa

module.exports = app;
