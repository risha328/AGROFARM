const mongoose = require("mongoose");

const MachinerySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  rentPerDay: { type: Number, required: true },
  location: { type: String, required: true },
  ownerName: { type: String, required: true },
  contactEmail: { type: String, required: true },
  imageBase64: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Machinery", MachinerySchema);
