const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  shopId: String,
  shopName: String,
  businessCategory: String,

  invoiceNumber: String,

  customerName: {
    type: String,
    default: "Walk-in",
  },

  customerPhone: String,

  orderType: String,
  tableNumber: String,

  items: [
    {
      productId: String,
      productName: String,
      barcode: String,

      price: Number,
      costPrice: Number,
      quantity: Number,

      unit: String,
      unitValue: Number,

      total: Number,
      profit: Number,

      size: String,
      color: String,
      brand: String,
      batchNo: String,
      expiryDate: String,
      imeiNumber: String,
      serialNumber: String,
    },
  ],

  subtotal: Number,
  gst: Number,
  discount: Number,
  finalTotal: Number,
  totalProfit: Number,

  paymentMode: {
    type: String,
    default: "Cash",
  },

  paymentStatus: {
    type: String,
    default: "Paid",
  },

  upiId: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Invoice", invoiceSchema);