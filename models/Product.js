const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  costPrice: Number,
  quantity: Number,
  shopName: String,
  shopId: String,

  imageUrl: String,
  barcode: String,
});

module.exports = mongoose.model("Product", productSchema);