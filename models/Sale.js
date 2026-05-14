const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  productName: String,
  price: Number,
  quantity: Number,
  total: Number,
  profit: Number,
  shopName: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Sale", saleSchema);