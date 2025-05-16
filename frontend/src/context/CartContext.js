// In your CartContext.js
import { useContext } from "react";
import { CartContext } from "./CartProvider"; // Adjust the path as necessary

const useClearCart = () => {
  const { dispatch } = useContext(CartContext); // Access dispatch from context
  return () => {
    dispatch({ type: "CLEAR_CART" });
    localStorage.removeItem("cartItems"); // clear from localStorage too
  };
};
