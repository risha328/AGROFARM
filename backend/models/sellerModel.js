const mongoose = require("mongoose");

const sellerProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    sellerName: {
      type: String,
      required: true,
    },
    sellerAddress: {
      type: String,
      required: true,
    },
    sellerPhoneNumber: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Seeds", "Fertilizers", "Machinery", "Tools", "Pesticides", "Others"], // Example categories
    },
    imageBase64: {
      type: String,
      required: true,
    },
    
  },
  { timestamps: true }
);

const SellerProduct = mongoose.model("SellerProduct", sellerProductSchema);

module.exports = SellerProduct;

