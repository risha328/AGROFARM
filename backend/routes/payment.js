// const express = require('express');
// const Razorpay = require('razorpay');
// const crypto = require('crypto');

// const router = express.Router();
// const Payment = require('../models/Payment'); // Ad
// //const { default: payments } = require('razorpay/dist/types/payments');
// // Razorpay instance
// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // -------- Create Order --------
// router.post('/create-order', async (req, res) => {
//     try {
//         const { amount, currency } = req.body;

//         const options = {
//             amount: amount * 100, // Razorpay needs paise
//             currency: currency || 'INR',
//             receipt: `receipt_order_${Date.now()}`,
//         };

//         const order = await razorpay.orders.create(options);

//         return res.json({ success: true, order ,
//             key: process.env.RAZORPAY_KEY_ID
//         });
//     } catch (error) {
//         console.error('Order creation error:', error);
//         return res.status(500).json({ success: false, message: "Error creating order" });
//     }
// });

// // -------- Payment Verification --------
// router.post('/verify-payment', async (req, res) => {
//     try {
//         const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount, currency } = req.body;
//         console.log('Received payment data:', { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount, currency });
//         // Check if all required fields are present
//         if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !amount) {
//             return res.status(400).json({ success: false, message: "Missing fields" });
//         }
//         const generated_signature = crypto
//             .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//             .update(razorpay_order_id + '|' + razorpay_payment_id)
//             .digest('hex');
//             console.log('Generated signature:', generated_signature);
//             console.log('Received signature:', razorpay_signature);
//             console.log('Signature verification successful');
//         if (generated_signature === razorpay_signature) {
            
//             // Update the order status to paid
//             const order = await Order.findOneAndUpdate(
//                 { razorpay_order_id },
//                 { 
//                     isPaid: true, 
//                     paidAt: new Date(), 
//                     paymentInfo: { razorpay_order_id, razorpay_payment_id, razorpay_signature } 
//                 },
//                 { new: true }
//             );

//             if (!order) {
//                 return res.status(404).json({ success: false, message: "Order not found" });
//             }
            
//             const payment = new Payment({
//                 razorpay_order_id,
//                 razorpay_payment_id,
//                 razorpay_signature,
//                 amount,
//                 currency: currency || 'INR',
//                 status: 'paid'
//             });

//             const savedPayment = await payment.save();
//             console.log('Payment saved:', savedPayment);
//             return res.json({ success: true, message: "Payment verified successfully" });


            
//         } else {
//             return res.status(400).json({ success: false, message: "Invalid signature" });
//         }

//     } catch (error) {
//         console.error('Verification error:', error);
//         return res.status(500).json({ success: false, message: "Error verifying payment" });
//     }
// });

// module.exports = router;



const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const router = express.Router();
const Payment = require('../models/Payment');

// Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// -------- Create Order --------
router.post('/create-order', async (req, res) => {
    try {
        const { amount, currency } = req.body;

        const options = {
            amount: amount * 100, // Convert to paise
            currency: currency || 'INR',
            receipt: `receipt_order_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        return res.json({
            success: true,
            order,
            key: process.env.RAZORPAY_KEY_ID
        });
    } catch (error) {
        console.error('Order creation error:', error);
        return res.status(500).json({ success: false, message: "Error creating order" });
    }
});

// -------- Payment Verification --------
router.post('/verify-payment', async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount, currency } = req.body;
        console.log('Received payment data:', { razorpay_order_id, razorpay_payment_id, razorpay_signature });

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !amount) {
            return res.status(400).json({ success: false, message: "Missing fields" });
        }

        const generated_signature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        if (generated_signature !== razorpay_signature) {
            return res.status(400).json({ success: false, message: "Invalid signature" });
        }

        const payment = new Payment({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            amount,
            currency: currency || 'INR',
            status: 'paid',
            paidAt: new Date(),
        });

        const savedPayment = await payment.save();
        console.log('Payment saved:', savedPayment);

        return res.json({ success: true, message: "Payment verified and saved successfully" });

    } catch (error) {
        console.error('Verification error:', error);
        return res.status(500).json({ success: false, message: "Error verifying payment" });
    }
});

module.exports = router;
