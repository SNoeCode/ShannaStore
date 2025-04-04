import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { CartContext } from "../../context/cartContext";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { getProducts } from "../../config/api";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isAdded, setIsAdded] = useState({});
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const [authedUser, setAuthedUser] = useState(null);
  const { addItem, addToCart, cartItems, dispatch,saveCartToBackend, fetchCart } = useContext(CartContext);
  const token = localStorage.getItem("token");

 

  useEffect(() => {
  
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");

    const storedData = localStorage.getItem("cartItems");
let parsedData = [];
try {
  parsedData = storedData && storedData !== "undefined" ? JSON.parse(storedData) : [];
} catch (error) {
  console.error("Error parsing cartItems:", error);
  parsedData = [];
}
    if (userId && username) {
      setAuthedUser({
        userId: userId,
        username: username,
        cartItems: cartItems,
      });
    }
  
  }, []);

  useEffect(() => {
    getProducts()
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);


  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");
    
    // ✅ Define `storedData` first
    const storedData = localStorage.getItem("cartItems");
    
    // ✅ Ensure `parsedData` is initialized properly
    let parsedData = [];
    try {
      parsedData = storedData && storedData !== "undefined" ? JSON.parse(storedData) : [];
    } catch (error) {
      console.error("Error parsing cartItems:", error);
      parsedData = [];
    }
  
    if (userId && username) {
      setAuthedUser({
        userId: userId,
        username: username
      });
    }
  }, []);



useEffect(() => {
  getProducts()
    .then((res) => {
      setProducts(res.data);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}, []);


const handleAddToCart = (product) => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please Login to add to cart");
    console.error("No token found. Please log in.");
    return;
  }
  const userId = localStorage.getItem("userId");
  if (!userId) {
    console.error("No user ID found. Please log in.");
    return;
  }

  const newItem = {
    productId: Number(product.id),
    id: product.id,
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category,
    image: product.image,
    quantity: 1,
  };

  console.log("Request Data:", newItem);

  axios
    .post(`http://localhost:3004/api/${userId}/addToCart`, newItem, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    .then((response) => {
      setData(response.data); // ← ⚠️ make sure `setData` is defined if you use it
      dispatch({ type: "UPDATE_CART", payload: { cartItems: response.data.cartItems } });
      dispatch({ type: "ADD_ITEM", payload: newItem });
      localStorage.setItem("cartItems", JSON.stringify(response.data.cartItems));
    })
    .catch((error) => {
      console.log(error);
    });
};


  const navigateToNewPage = (id) => {
    console.log("Navigating to product details:", id);
    navigate(`/product-detail/${id}`);
  };

  return (
    <div className="home-page">
      <div className="banner">
        <h1>Welcome to Our Online Store</h1>
        <p>Find the best products here</p>
      </div>
      <div className="container">
        {products.map((product, index) => (
          <div key={product.id} className="card">
            <h1>
              <b>{product.title}</b>
            </h1>
            <img src={product.image} alt={product.title} className="img" />
            <h2>
              <b>Price: ${product.price}</b>
            </h2>
            <div className="rating-container">
              <Box
                sx={{
                  "& > legend": {
                    mt: 2,
                    width: "auto",
                    color: "#cd74a0",
                    textAlign: "center",
                    fontSize: "14px",
                  },
                }}
              >
                <Typography component="legend">Product Rating</Typography>
                <Rating
                  name="read-only"
                  value={product.rating.rate}
                  size="small"
                  readOnly
                />
              </Box>
              <button
                onClick={() => navigateToNewPage(product.id)}
                className="button-1"
              >
                More Details
              </button>
            </div>
            <button
  id="add-to-cart" 
  className={`btn ${isAdded[product.id] ? "added" : ""}`}
  onClick={() => handleAddToCart((product.id, product))}
>
  {isAdded[product.id] ? "Added" : "Add to cart"}
</button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;





