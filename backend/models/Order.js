const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: { type: String, required: true },
      name: String,
      qty: Number,
      price: Number,
      image: String,
    }
  ],
  totalAmount: { type: Number, required: true },
  shippingAddress: {
    fullName: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
  },
  paymentInfo: {
    razorpay_order_id: String,
    razorpay_payment_id: String,
    razorpay_signature: String,
  },
  isPaid: { type: Boolean, default: false },
  paidAt: Date,
  status: { type: String, default: "Processing" },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
