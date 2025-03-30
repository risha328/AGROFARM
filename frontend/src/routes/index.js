import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ForgotPassowrd from '../pages/ForgotPassowrd'
import SignUp from '../pages/SignUp'
import AdminPanel from '../pages/AdminPanel'
import AllUsers from '../pages/AllUsers'
import AllProducts from '../pages/AllProducts'
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
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { path: "", element: <Home /> },
            { path: "login", element: <Login /> },
            { path: "forgot-password", element: <ForgotPassowrd /> },
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

            // ✅ Admin Panel Routes
            {
                path: "admin-panel",
                element: <AdminPanel />,
                children: [
                    { path: "all-users", element: <AllUsers /> },
                    { path: "all-products", element: <AllProducts /> }
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
    }
])

export default router
