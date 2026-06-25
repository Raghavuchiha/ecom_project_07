import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;

  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(localStorage.getItem("access_token") || "");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // fetch products from backend
  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        const normalized = data.map((p) => ({
          ...p,
          _id: p.id,
          image: [p.image_url],
          subCategory: p.sub_category,
        }));
        setProducts(normalized);
      })
      .catch((err) => console.error("Failed to load products", err));
  }, []);

  // fetch user when token changes
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
          localStorage.removeItem("access_token");
          setToken("");
          setUser(null);
        });
    }
  }, [token]);

  // fetch cart from backend when user is loaded
  useEffect(() => {
    if (token && user) {
      fetch(`${API_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          // convert flat DB rows → nested {productId: {size: qty}} format
          const cartData = {};
          data.forEach((item) => {
            if (!cartData[item.product_id]) cartData[item.product_id] = {};
            cartData[item.product_id][item.size] = item.quantity;
          });
          setCartItems(cartData);
        })
        .catch((err) => console.error("Failed to load cart", err));
    }
  }, [user]);

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setToken("");
    setUser(null);
    setCartItems({});
  };

  // add to cart — calls backend if logged in
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    // update local state immediately (optimistic update)
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }
    setCartItems(cartData);
    toast.success("Item added to cart");

    // sync to backend if logged in
    if (token) {
      try {
        await fetch(`${API_URL}/cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ product_id: itemId, size, quantity: 1 }),
        });
      } catch (err) {
        console.error("Failed to sync cart", err);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        totalCount += cartItems[itemId][size];
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
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

    // sync to backend
    if (token) {
      try {
        if (quantity <= 0) {
          // find cart item id from backend and delete
          const res = await fetch(`${API_URL}/cart`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const items = await res.json();
          const found = items.find(
            (i) => i.product_id === itemId && i.size === size
          );
          if (found) {
            await fetch(`${API_URL}/cart/${found.id}`, {
              method: "DELETE",
              headers: { Authorization: `Bearer ${token}` },
            });
          }
        } else {
          const res = await fetch(`${API_URL}/cart`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const items = await res.json();
          const found = items.find(
            (i) => i.product_id === itemId && i.size === size
          );
          if (found) {
            await fetch(`${API_URL}/cart/${found.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ quantity }),
            });
          }
        }
      } catch (err) {
        console.error("Failed to sync cart update", err);
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const itemInfo = products.find((p) => p._id === itemId);
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

  const value = {
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
    navigate,
    token,
    setToken,
    user,
    logout,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
