const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  shopId: String,
  shopName: String,

  supplierName: String,
  phone: String,
  address: String,
  notes: String,

  totalPurchase: {
    type: Number,
    default: 0,
  },

  totalPaid: {
    type: Number,
    default: 0,
  },

  balance: {
    type: Number,
    default: 0,
  },

  transactions: [
    {
      type: {
        type: String,
        enum: ["purchase", "payment"],
      },
      amount: Number,
      description: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Supplier", supplierSchema);