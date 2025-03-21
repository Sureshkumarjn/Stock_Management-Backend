const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.DB_URL;

async function main() {
  if (!uri) {
    console.error("❌ Error: DB_URL is not defined in environment variables.");
    process.exit(1); // Stop execution if DB_URL is missing
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected Successfully!");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Stop execution on connection failure
  }
}

module.exports = { main };
