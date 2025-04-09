const backendDomin = "http://localhost:8080"

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
    }
    
}


export default SummaryApi