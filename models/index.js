const mongoose = require("mongoose");
// const uri = "mongodb+srv://adminhamza:adminhamza123&@cluster0.pzcviot.mongodb.net/InventoryManagementApp?retryWrites=true&w=majority";
// const uri = "mongodb://localhost:27017/InventoryManagement";

const uri =
  "mongodb+srv://iamsureshkumar2001:suresh2001@cluster0.cp0vnz3.mongodb.net/InventoryManagement?retryWrites=true&w=majority&appName=Cluster0";

mongodb: function main() {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("Succesfull");
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
}

module.exports = { main };
