const backendDomin = process.env.REACT_APP_SERVER

const SummaryApi = {
    signUP : {
        url : `${backendDomin}/api/signup`,
        method : "post"
    },
    signIn : {
        url : `${backendDomin}/api/signin`,
        method : "post"
    },
    current_user : {
        url : `${backendDomin}/api/user-details`,
        method : "get"
    },
    logout_user : {
        url : `${backendDomin}/api/userLogout`,
        method : 'get'
    },
    allUser : {
        url : `${backendDomin}/api/all-user`,
        method : 'get'
    },
    updateUser : {
        url : `${backendDomin}/api/update-user`,
        method : "post"
    },
    uploadProduct : {
        url : `${backendDomin}/api/upload-product`,
        method : 'post'
    },
    uploadProductUser : {
        url : `${backendDomin}/api/upload-product-user`,
        method : 'post'
    },
    allProduct : {
        url : `${backendDomin}/api/get-product`,
        method : 'get'
    },
    updateProduct : {
        url : `${backendDomin}/api/update-product`,
        method  : 'post'
    },
    deleteProduct: {
    url: `${backendDomin}/api/products/delete`,
    method: "DELETE"
  },
    updateProductUser : {
        url : `${backendDomin}/api/update-product-user`,
        method  : 'post'
    },
    categoryProduct : {
        url : `${backendDomin}/api/get-categoryProduct`,
        method : 'get'
    },
    categoryWiseProduct : {
        url : `${backendDomin}/api/category-product`,
        method : 'post'
    },
    productDetails : {
        url : `${backendDomin}/api/product-details`,
        method : 'post'
    },
    addToCartProduct : {
        url : `${backendDomin}/api/addtocart`,
        method : 'post'
    },
    addToCartProductCount : {
        url : `${backendDomin}/api/countAddToCartProduct`,
        method : 'get'
    },
    addToCartProductView : {
        url : `${backendDomin}/api/view-card-product`,
        method : 'get'
    },
    updateCartProduct : {
        url : `${backendDomin}/api/update-cart-product`,
        method : 'post'
    },
    deleteCartProduct : {
        url : `${backendDomin}/api/delete-cart-product`,
        method : 'post'
    },
    searchProduct : {
        url : `${backendDomin}/api/search`,
        method : 'get'
    },
    filterProduct : {
        url : `${backendDomin}/api/filter-product`,
        method : 'post'
    },
    payment: {
        url: `${backendDomin}/api/create-order`,
        method: 'post'
    },
    userProducts: {
  url: `${backendDomin}/api/user-products`, // Your backend endpoint for user's products
  method: "GET"
    
},
chatbot: {
    url: `${backendDomin}/api/chat`, // ✅ Correct endpoint for chatbot
    method: "post"
  },
  forgotPassword: {
    url: `${backendDomin}/api/forgot-password`, 
    method: "POST"// ✅ Correct endpoint for chatbot
  },
  resetPassword: {
        url: "/api/auth/reset-password",
        method: "POST"
    },
    signUPAdmin: {
        url: `${backendDomin}/api/admin/signup`, // <-- Make sure this is correct
        method: 'POST',
    },
    signInAdmin: {
        url: `${backendDomin}/api/admin/signin`, // <-- Make sure this is correct
        method: 'POST',
    },
   
    verifyPayment: {
        url: `${backendDomin}/api/verify-payment`,
        method: 'POST'
    },
    placeOrder: {
        url: `${backendDomin}/api/order/place`,
        method: 'POST'
    },
    userOrders: {
  url: `${backendDomin}/api/user/orders`,
  method: 'GET'
},
googleLogin: {
        url: "/api/user/google-login", // 👈 this fixes your error
        method: "POST"
    },
    // ✅ Seller APIs
    sellerAddProduct: {
        url: `${backendDomin}/api/seller-products/add`,
        method: 'POST'
    },
    sellerGetAllProducts: {
        url: `${backendDomin}/api/seller-products/get-product`,
        method: 'GET'
    },
    sellerUpdateProduct: (productId) => ({
        url: `${backendDomin}/api/seller-products/update/${productId}`,
        method: 'PUT'
    }),
    sellerDeleteProduct: (productId) => ({
        url: `${backendDomin}/api/seller-products/delete/${productId}`,
        method: 'DELETE'
    }),
    sellerGetProductById: {
    url: `${backendDomin}/api/seller-products/get-product`, // GET /:id will be appended dynamically
    method: "GET",
  },
sellerProductDetails: {
    url: `${backendDomin}/api/seller/products`, // Endpoint to fetch product details
    method: 'get'               // HTTP method
  },
  sellerGetOrderById: {
  url: `${backendDomin}/api/seller/orders`,
  method: 'get'
},
sellerUpdateOrderStatus: {
  url: `${backendDomin}/api/seller/orders`,
  method: 'patch'
},
  // Create seller order
  createSellerOrder: {
    url: `${backendDomin}/api/seller/orders`,   // Endpoint to create new order
    method: 'post'              // HTTP method
  },
  
  // Additional APIs that might be needed:
  initiatePayment: {            // For online payments
    url: `${backendDomin}/api/payments/initiate`,
    method: 'post'
  },
  
  getShippingOptions: {         // For dynamic shipping options
    url: `${backendDomin}/api/shipping/options`,
    method: 'get'
  },
//   gformResponses: {
//     url: `${backendDomin}/api/gform-responses`,
//     method: "get",
//   },
    
}


export default SummaryApi