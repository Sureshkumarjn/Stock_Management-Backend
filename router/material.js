const express = require("express");
const app = express();
const material = require("../controller/material");

// Add material
app.post("/add", material.addMaterial);

// Get All material
app.get("/get/:userId", material.getAllMaterials);

// Delete Selected material Item
app.get("/delete/:id", material.deleteSelectedMaterial);

// Update Selected material
app.post("/update", material.updateSelectedMaterial);

// Search material
app.get("/search", material.searchMaterial);

//Export Data
app.get("/export-users", material.getExport);

// http://localhost:4000/api/material/search?searchTerm=fa

module.exports = app;
