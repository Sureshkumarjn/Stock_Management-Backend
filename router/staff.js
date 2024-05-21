const express = require("express");
const app = express();
const staff = require("../controller/staff");

// Add Staff
app.post("/add", staff.addStaff);

// Get All Staff
app.get("/get/:userId", staff.getAllStaffs);

// Delete Selected Staff Item
app.get("/delete/:id", staff.deleteSelectedStaff);

// Update Selected Staff
app.post("/update", staff.updateSelectedStaff);

// Search Staff
app.get("/search", staff.searchStaff);

//Export Data
app.get("/export-users", staff.getExport);

// http://localhost:4000/api/material/search?searchTerm=fa

module.exports = app;
