const express = require("express");
const {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductById,
} = require("../controller/sellerProductController");

const router = express.Router();


router.post("/add", addProduct);

router.get("/get-product", getAllProducts);
// Add the new route for fetching product by ID
router.get("/get-product/:id", getProductById);


router.put("/update/:id", updateProduct);

router.delete("/delete/:id", deleteProduct);

module.exports = router;
