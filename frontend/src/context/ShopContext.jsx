import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";

// Create Context
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;

  const navigate = useNavigate();

  // Search
  const [search, setSearch] = useState("");

  // Cart
  const [cartItems, setCartItems] = useState({});

  // Products (Fetched from Backend)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Authentication
  const [token, setToken] = useState(
    localStorage.getItem("access_token") || ""
  );

  const [user, setUser] = useState(null);

  // Fetch Products
  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        const normalized = data.map((p) => ({
          ...p,
          _id: String(p.id),
          image: [p.image_url],
          subCategory: p.sub_category,
        }));

        setProducts(normalized);
      })
      .catch((err) => {
        console.error("Failed to load products:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Fetch current user whenever token changes
  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }

    fetch(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Invalid token");
        return res.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.error(err);

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        setToken("");
        setUser(null);
      });
  }, [token]);

  // Logout
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    setToken("");
    setUser(null);

    toast.success("Logged out successfully");
  };

  // Add To Cart
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

  // Cart Count
  const getCartCount = () => {
    let totalCount = 0;

    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        totalCount += cartItems[itemId][size];
      }
    }

    return totalCount;
  };

  // Update Quantity
  const updateQuantity = (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    if (quantity <= 0) {
      delete cartData[itemId][size];

      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][size] = quantity;
    }

    setCartItems(cartData);
  };

  // Total Amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const itemInfo = products.find(
        (product) => String(product._id) === String(itemId)
      );

      if (itemInfo) {
        for (const size in cartItems[itemId]) {
          totalAmount += itemInfo.price * cartItems[itemId][size];
        }
      }
    }

    return totalAmount;
  };

  // Context Value
  const value = {
    products,
    loading,

    currency,
    delivery_fee,

    search,
    setSearch,

    cartItems,
    addToCart,
    updateQuantity,

    getCartCount,
    getTotalCartAmount,

    navigate,

    // Auth
    token,
    setToken,
    user,
    setUser,
    logout,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
