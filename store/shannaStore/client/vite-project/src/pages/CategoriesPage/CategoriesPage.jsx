import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./CategoriesPage.css";
import {CartContext} from "../../context/cartContext";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Mens from "../../Image/photo-1441984904996-e0b6ba687e04.jpeg";
import Womans from "../../Image/gettyimages-854321536-612x612.jpg";
import Electronics from "../../Image/workplace-business-modern-male-accessories-laptop-white_155003-1722.avif";
import Jewelery from "../../Image/premium_photo-1681276170281-cf50a487a1b7.jpeg";

const Category = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  
  const [currentProduct, setCurrentProduct] = useState(null);
  const { category } = useParams(); 
  const { addItem } = useContext(CartContext);
  const isUserSignedIn = localStorage.getItem("token");
  if(isUserSignedIn) {
  const handleAddToCart = () => {
    addItem(currentProduct);
  };
}
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/category/${category}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (category) {
      fetchProducts();
    }
  }, [category]);
  const categoryImages = {
    "men's clothing": Mens,
    "women's clothing": Womans,
    "electronics": Electronics ,
    "jewelery":  Jewelery,
  };

  const handleReadMore = (product) => {
    setCurrentProduct(product);
    setShowModal(true);
  };

  const handleShowLess = () => {
    setShowModal(false);
  };

  return (
    <>
    <div className="container-details">

    <div className={`category-page ${category ? category + "-page" : ""}`}>
      <button onClick={() => navigate("/")} className="back-button">
        Back
      </button>
      {category && (
        <h1 className="category-header-h1">{category.charAt(0).toUpperCase() + category.slice(1)} Products</h1>
      )}
 
           <div className="cat-img">

            {category && categoryImages[category] && (
              <img
              src={categoryImages[category]}
              alt={`${category} banner`}
              className="category-banner-image"
              />
            )}
            </div>
      <div className="category-description">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="category-card">
              <div className="category-card-content">
                <h2 className="category-product-title">{product.title}</h2>
              </div>
              <img
                src={product.image}
                alt={product.title}
                width={400}
                className="category-product-image"
                />

              <p>
                {product.description.slice(0, 50)}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleReadMore(product);
                  }}
                  className="category-read-more-link"
                  >
                  ...ReadMore...
                </a>
              </p>
            </div>
          ))
        ) : (
          <p>No products found for this category.</p>
        )}
      </div>
      <div className="container-cat">
        {showModal && currentProduct && (
          <div className="category-modal">
            <div className="category-modal-content">
              <h2 className="category-modal-title">{currentProduct.title}</h2>
              <span>
                <img src={currentProduct.image} alt={currentProduct.title} />
                <p className="category-product-price">
                  ${currentProduct.price}
                  </p>
                  <button className="category-buy-now-button" >
                    Buy Now
                  </button>
              
              </span>
              <p className="category-modal-description">
                {currentProduct.description}
                <a
                  href="#"
                  onClick={handleShowLess}
                  className="category-read-less-link"
                  >
                  ....Read Less....
                </a>
              </p>
              <div className="category-rating-container">
                <Box sx={{ "& > legend": { mt: 2 } }}>
                  <Typography component="legend">Product Rating</Typography>
                  <Rating
                    value={currentProduct.rating.rate}
                    name="read-only"
                    size="medium"
                    readOnly
                    />
                </Box>
              </div>
              <span className="bottom-add-btn">
                <div className="category-button-container-cart">
                  <span className="span-cart">
                    <button
                      className="category-add-to-cart-button"
                      
                      onClick={() => handleAddToCart(currentProduct)}            >
                      <i
                        class="fas fa-shopping-cart"
                        style={{ color: "#e3a92f" }}
                        ></i>
                      Add to cart
                    </button>
                  </span>
                </div>
                <div className="category-button-container-wishlist">
                  <span className="wishlist">
                     <button className="category-add-to-wishlist-button" >
                    
                    {/* // onClick={navigate('/wishlist')} */}
                      <i class="fas fa-heart" style={{ color: "#7f072f" }}></i>
                      Add to Wishlist
                    </button>
                  </span>
                </div>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
        </div>
        </>
  );
};

export default Category;
