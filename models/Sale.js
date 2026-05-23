const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    invoiceNumber: String,

    shopId: String,
    shopName: String,
    businessCategory: String,

    productId: String,
    productName: String,

    barcode: String,
    hsnCode: String,

    price: Number,
    costPrice: Number,

    quantity: Number,
    total: Number,
    profit: Number,

    customerName: String,
    customerPhone: String,

    paymentMode: String,
    paymentStatus: String,

    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Sale ||
  mongoose.model("Sale", saleSchema);