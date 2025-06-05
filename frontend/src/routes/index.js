/*import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ForgotPassowrd from '../pages/ForgotPassowrd'
import SignUp from '../pages/SignUp'
import AdminPanel from '../pages/AdminPanel'
import AllUsers from '../pages/admin/AllUsers'
import AllProducts from '../pages/admin/AllProducts'
import CategoryProduct from '../pages/CategoryProduct'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import SearchProduct from '../pages/SearchProduct'
import UserPanel from '../pages/UserPanel'
import Profile from '../pages/Profile'

import PaymentPage from '../pages/PaymentPage'     // ✅ Added
import ErrorPage from '../pages/ErrorPage'
import Orders from '../pages/Orders'
import Wishlist from '../pages/Wishlist'
import AboutUs from '../pages/AboutUs'
import FarmerSell from '../pages/FarmerSell'
import ContactUs from '../pages/ContactUs'
import Blog from '../pages/Blog'
import AddProduct from '../pages/AddProductUser'
import FetchProductUser from '../pages/FetchProductUser'
import Labour from '../pages/Labour'
import Prime from '../pages/Prime'
import AdminAnalytics from '../pages/admin/AdminAnalytics'
import AdminSettings from '../pages/AdminSettings'
import FarmerAgrosubDash from '../pages/FarmerAgrosubDash'
import MachineryPage from '../pages/MachineryPage'
import UploadPage from '../pages/UploadPage'
import MachineryDetails from '../pages/MachineryDetails'
import EditMachineryForm from '../pages/EditMachineryForm'
import  Layout from '../components/admin/layout/Layout'
import AdminLogin from '../pages/admin/adminLogin'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { path: "", element: <Home /> },
            { path: "login", element: <Login /> },
            { path: "forgot-password", element: <ForgotPassowrd /> },
            {path: "reset-password", element: <ForgotPassowrd />},
            { path: "sign-up", element: <SignUp /> },
            { path: "product-category", element: <CategoryProduct /> },
            { path: "product/:id", element: <ProductDetails /> },
            { path: "cart", element: <Cart /> },
            { path: "search", element: <SearchProduct /> },
            {path: "aboutus", element: <AboutUs/>},
            {path: "farmersell", element: <FarmerSell/>},
            { path: "payment", element: <PaymentPage /> },
            {path: "contactus", element: <ContactUs/>},
            {path: "blog", element: <Blog/>},
            {path: '/add-product', element: <AddProduct/>},
            {path: "/my-product", element:<FetchProductUser/>},
            {path: "/labour", element: <Labour/>},
            {path: '/prime', element: <Prime/>},
            {path: '/farmer-dashboard', element: <FarmerAgrosubDash/>},
            {path:"/machine", element:<MachineryPage />},
            {path: "/up", element: <UploadPage/>},
            {path: '/machinery/:id', element: <MachineryDetails/>},
            {path: '/edit-machinery/:id', element: <EditMachineryForm/>},
            // ✅ Admin Panel Routes
            /*{
                path: "admin-panel",
                element: <AdminPanel />,
                children: [
                    { path: "all-users", element: <AllUsers /> },
                    { path: "all-products", element: <AllProducts /> },
                    {path: 'analytics', element: <AdminAnalytics/>},
                    {path: 'settings', element: <AdminSettings/>}
                   
                ]
            },

            
            // ✅ User Panel Routes
            {
                path: "user-panel",
                element: <UserPanel />,
                children: [
                    { path: "account/profile", element: <Profile /> },
                    {path: "orders", element: <Orders/>},
                    {path: "wishlist", element: <Wishlist/>}
                ]
            }

        ]
    
    },
    {
                path: "/admin",
                element: <Layout/>,
                children: [
                    {path: "adminlogin", element: <AdminLogin/>},
                    { path: "all-users", element: <AllUsers /> },
                    { path: "all-products", element: <AllProducts /> },
                    {path: 'analytics', element: <AdminAnalytics/>},
                ]

            },

])

export default router*/
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ForgotPassowrd from '../pages/ForgotPassowrd'
import SignUp from '../pages/SignUp'
import AdminPanel from '../pages/AdminPanel'
import AllUsers from '../pages/admin/AllUsers'
import AllProducts from '../pages/admin/AllProducts'
import CategoryProduct from '../pages/CategoryProduct'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import SearchProduct from '../pages/SearchProduct'
import UserPanel from '../pages/UserPanel'
import Profile from '../pages/Profile'
import PaymentPage from '../pages/PaymentPage'
import ErrorPage from '../pages/ErrorPage'
import Orders from '../pages/Orders'
import Wishlist from '../pages/Wishlist'
import AboutUs from '../pages/AboutUs'
import FarmerSell from '../pages/FarmerSell'
import ContactUs from '../pages/ContactUs'
import Blog from '../pages/Blog'
//import AddProduct from '../pages/AddProductUser'
import FetchProductUser from '../pages/FetchProductUser'
import Labour from '../pages/Labour'
import Prime from '../pages/Prime'
import AdminAnalytics from '../pages/admin/AdminAnalytics'
import AdminSettings from '../pages/AdminSettings'
import FarmerAgrosubDash from '../pages/FarmerAgrosubDash'
import MachineryPage from '../pages/MachineryPage'
import UploadPage from '../pages/UploadPage'
import MachineryDetails from '../pages/MachineryDetails'
import EditMachineryForm from '../pages/EditMachineryForm'
import Layout from '../components/admin/layout/Layout'
import AdminLogin from '../pages/admin/Adminlogin' // Fixed import path
//import AuthGuard from '../components/AuthGuard' // Add this for protected routes
import AdminSignup from '../pages/admin/AdminSignup'
import AdminOrders from '../pages/admin/AdminOrders'
import FruitsPage from '../pages/FruitsPage'
import FlowersPage from '../pages/FlowersPage'
import VegetablesPage from '../pages/VegetablesPage'
import PaymentSuccess from '../pages/PaymentSuccess'
import ThankYouPage from '../pages/ThankYouPage'
import MachineryListUser from '../pages/MachineryListUser'
//import { Check } from 'lucide-react'
import Checkout from '../pages/Checkout'
import ProfilePage from '../pages/Profile'
import ProductForm from '../pages/ProductForm'
import ProductList from '../pages/ProductList'
import EditProductForm from '../pages/EditProductForm'
import ProductSellerDetails from '../pages/ProductSellerDetails'
import ProductListUserView from '../pages/ProductListUserView'
import CheckoutSeller from '../pages/CheckoutSeller'
import ProductDetailsSeller from '../pages/ProductDetailsSeller'
import GformResponsesPage from '../pages/GformResponsesPage'
import DeliveryPage from '../pages/Delivery'
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { path: "", element: <Home /> },
            { path: "login", element: <Login /> },
            { path: "forgot-password", element: <ForgotPassowrd /> },
            { path: "reset-password", element: <ForgotPassowrd /> },
            { path: "sign-up", element: <SignUp /> },
            { path: "product-category", element: <CategoryProduct /> },
            { path: "product/:id", element: <ProductDetails /> },
            { path: "cart", element: <Cart /> },
            { path: "search", element: <SearchProduct /> },
            { path: "aboutus", element: <AboutUs/> },
            { path: "farmersell", element: <FarmerSell/> },
            { path: "payment", element: <PaymentPage /> },
            {path: "payment-success", element: <PaymentSuccess />},
        {path: "thankyou", element: <ThankYouPage/>},
            { path: "contactus", element: <ContactUs/> },
            { path: "blog", element: <Blog/> },
            { path: 'add-product', element: <ProductForm/> },
            {path: "list-product", element: <ProductList/>},
            {path: "product-details/:id", element: <ProductSellerDetails/> },
            {path:"/edit-product/:productId", element: <EditProductForm/>},
            { path: "my-product", element: <FetchProductUser/> },
            { path: "labour", element: <Labour/> },
            { path: 'prime', element: <Prime/> },
            { path: 'farmer-dashboard', element: <FarmerAgrosubDash/> },
            { path: "machine", element: <MachineryPage /> },
            { path: "up", element: <UploadPage/> },
            { path: 'machinery/:id', element: <MachineryDetails/> },
            { path: 'edit-machinery/:id', element: <EditMachineryForm/> },
            {path: "browse-machine", element:<MachineryListUser/>},
            {path: "products/fruits", element: <FruitsPage/>},
            {path: "products/flowers", element: <FlowersPage/>},
            {path: "products/vegetables", element: <VegetablesPage/>},
            {path: "/checkout/:id", element:<Checkout/>},
            {path: "profile", element: <ProfilePage/>},
            {path: "productlistuserviewpage", element: <ProductListUserView/>},
            {path: "/checkoutseller/:id", element: <CheckoutSeller/>},
            { path: "sellerproduct/:id", element: <ProductDetailsSeller /> },
            {path: "gform", element: <GformResponsesPage/>},
            {path: "delivery", element: <DeliveryPage/>},
            // User Panel Routes
            {
                path: "user-panel",
                element: <UserPanel />,
                children: [
                    { path: "account/profile", element: <Profile /> },
                    { path: "orders", element: <Orders/> },
                    { path: "wishlist", element: <Wishlist/> }
                ]
            }
        ]
    },
    {
        path: "/admin",
       
        children: [
            //{ index: true, element: <Navigate to="login" replace /> },
            // Public admin routes
            { path: "login", element: <AdminLogin /> },
            {path: "signup", element: <AdminSignup/>},
            
           
                   {
      path: "",
      element: <Layout />, // Wrapping the layout in AuthGuard
      children: [
        { path: "dashboard", element: <AdminPanel /> },
        { path: "all-users", element: <AllUsers /> },
        { path: "all-products", element: <AllProducts /> },
        { path: "analytics", element: <AdminAnalytics /> },
        { path: "settings", element: <AdminSettings /> },
        {path: 'orders', element: <AdminOrders/>}
      ]
    }
                ]
            }
        
    
])

export default router
