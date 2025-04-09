import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState, useCallback } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import FloatingChatbot from './components/FloatingChatBot';

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  const fetchUserDetails = useCallback(async () => {
    try {
      const response = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: 'include'
      });
      const data = await response.json();
      if (data.success) {
        dispatch(setUserDetails(data.data));
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }, [dispatch]);

  const fetchUserAddToCart = useCallback(async () => {
    try {
      const response = await fetch(SummaryApi.addToCartProductCount.url, {
        method: SummaryApi.addToCartProductCount.method,
        credentials: 'include'
      });
      const data = await response.json();
      setCartProductCount(data?.data?.count || 0);
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  }, []);

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  }, [fetchUserDetails, fetchUserAddToCart]);

  return (
    <Context.Provider value={{
      fetchUserDetails,
      cartProductCount,
      fetchUserAddToCart
    }}>
      {/* Responsive Toast Container */}
      <ToastContainer
        position='top-center'
        className="text-sm md:text-base" // Responsive text size
        toastClassName="!rounded-lg !min-h-[40px] md:!min-h-[50px]"
      />
     
      <Header />
      
      {/* Responsive Main Content */}
      <main className='min-h-[calc(100vh-120px)] pt-16 bg-green-50 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <Outlet />
        </div>
      </main>
      
      <Footer />
      
      {/* Responsive Floating Chatbot */}
      <FloatingChatbot className="bottom-4 right-4 sm:bottom-6 sm:right-6" />
    </Context.Provider>
  );
}

export default App;

