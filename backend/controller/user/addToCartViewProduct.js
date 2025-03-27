const addToCartModel = require("../../models/cartProduct")

/**const addToCartViewProduct = async(req,res)=>{
    try{
        const currentUser = req.userId

        const allProduct = await addToCartModel.find({
            userId : currentUser
        }).populate("productId")

        res.setHeader("Content-Type", "application/json");

        // Clear any potential console logs that might corrupt JSON data
        console.log("Data Fetched Successfully");

        res.json({
            data : allProduct,
            success : true,
            error : false
        })

    }catch(err){
        res.json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports =  addToCartViewProduct**/



const addToCartViewProduct = async (req, res) => {
    try {
        const currentUser = req.userId;

        const allProduct = await addToCartModel
            .find({ userId: currentUser })
            .populate("productId");

        if (!allProduct || allProduct.length === 0) {
            return res.status(200).json({
                data: [],
                message: "No products found in the cart.",
                success: true,
                error: false
            });
        }

        res.status(200).json({
            data: allProduct,
            success: true,
            error: false
        });

    } catch (err) {
        res.status(500).json({
            message: err.message || "Server error",
            error: true,
            success: false
        });
    }
};
module.exports = addToCartViewProduct