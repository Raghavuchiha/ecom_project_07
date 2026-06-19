import { createContext, useState, useEffect } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";


// ✅ Create Context
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;

  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();
  
  // ✅ NEW: Authentication state
  const [token, setToken] = useState("");

  // ✅ NEW: Initialize token from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // ✅ NEW: Save token to localStorage whenever it changes
  const [token, setToken] = useState(localStorage.getItem("access_token") || ""); // ← fixed key
const [user, setUser] = useState(null);

// Fetch user info whenever token is available
useEffect(() => {
  if (token) {
    fetch(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Invalid token");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => {
        // Token invalid/expired → clear it
        localStorage.removeItem("access_token");
        setToken("");
        setUser(null);
      });
  }
}, [token]);

const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  setToken("");
  setUser(null);
};

  // ✅ Add to Cart Function
  const addToCart = (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);
    toast.success("Item added to cart");
  };

  // ✅ Get Total Cart Count
  const getCartCount = () => {
    let totalCount = 0;

    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        totalCount += cartItems[itemId][size];
      }
    }

    return totalCount;
  };

  // ✅ Update cart item quantity
  const updateQuantity = (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    
    if (quantity <= 0) {
      delete cartData[itemId][size];
      // If no sizes left for this item, remove the item completely
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][size] = quantity;
    }
    
    setCartItems(cartData);
  };

  // ✅ Get Total Cart Amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const itemInfo = products.find((product) => product._id === itemId);
      
      if (itemInfo) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            totalAmount += itemInfo.price * cartItems[itemId][size];
          }
        }
      }
    }

    return totalAmount;
  };

  // ✅ Context value
  const value = {
    user,
    logout,
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getTotalCartAmount,
    //place order
    navigate,
    // ✅ NEW: Add authentication values
    token,
    setToken
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
