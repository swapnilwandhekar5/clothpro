const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  shopId: String,
  shopName: String,

  businessCategory: {
    type: String,
    default: "Clothing",
  },

  name: String,
  price: Number,
  costPrice: Number,
  quantity: Number,
  imageUrl: String,
  barcode: String,

  // Clothing / Footwear
  size: String,
  color: String,
  brand: String,

  // Grocery Advanced
  mrp: Number,
  unit: {
    type: String,
    default: "pcs", // pcs, kg, gram, litre, ml, packet
  },
  unitValue: {
    type: Number,
    default: 1,
  },
  expiryDate: String,
  manufacturingDate: String,

  // Medical Advanced
  batchNo: String,
  medicineType: String,
  saltComposition: String,
  prescriptionRequired: {
    type: Boolean,
    default: false,
  },
  rackNumber: String,

  // Mobile / Electronics
  imeiNumber: String,
  serialNumber: String,
  warranty: String,
  modelNumber: String,

  // Restaurant
  itemType: String,
  kitchenCategory: String,

  // Salon
  serviceDuration: String,
  staffCommission: String,

  // Hardware
  unitType: String,
  supplierName: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);