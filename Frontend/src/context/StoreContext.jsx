import React, { createContext, useState, useEffect } from "react";
// We might not need this static import if all food comes from the DB
// import { food_list as static_food_list } from "../assets/assets"; 
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  
  // Renamed state for clarity
  const [foodList, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      try {
        await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      try {
        await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        // Use the fetched 'foodList' state
        let itemInfo = foodList.find((product) => product._id === item);
        
        // Add check to ensure itemInfo is found
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      if (response.data.success) {
        setFoodList(response.data.data);
      } else {
        console.error("API Error:", response.data.message);
      }
    } catch (error) {
      console.error("Network error fetching food list:", error);
    }
  };

  const loadCartData = async (token) => {
    try {
      // Added await
      const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
      if (response.data.success) {
        setCartItems(response.data.cartData);
      } else {
        console.error("API Error:", response.data.message);
      }
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    }
    loadData();
  }, []); // Empty array is correct for loading once on mount

  const contextValue = {
    food_list: foodList, // <-- Pass the fetched list
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    fetchFoodList, // Expose this in case you need it
    loadCartData // Expose this for login/logout actions
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider> 
  );
};

export default StoreContextProvider;