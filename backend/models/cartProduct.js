const mongoose = require('mongoose')

const addToCart = mongoose.Schema({
   productId : {
    type: mongoose.Schema.Types.ObjectId,
        ref : 'product',
        type : String,
   },
   quantity : Number,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true  // Ensure userId is mandatory
    },
},{
    timestamps : true
})


const addToCartModel = mongoose.model("addToCart",addToCart)

module.exports = addToCartModel