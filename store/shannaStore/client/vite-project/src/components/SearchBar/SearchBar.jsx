import axios from "axios";
import React, { useEffect, useState } from "react";

import { Link, Navigate, useNavigate } from "react-router-dom";
import "./SearchBar.css";
const SearchBar = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setData(res.data);
        setFilteredData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleFilter = (value) => {
    setSearchTerm(value);
    const lowerCaseValue = value.toLowerCase();
    const filtered = data.filter((product) =>
      product.title.toLowerCase().includes(lowerCaseValue)
    );
    setFilteredData(filtered);
    setDropdownVisible(value.length > 0 && filtered.length > 0);
  };

  const handleSuggestionClick = (id) => {
    navigate(`/product-detail/${id}`);

    setSearchTerm("");

    setDropdownVisible(false);
  };
  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <>
      <div className="search-bar-top">
        <div className="search-bar">
          <input
            type="search"
            id="search-input"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => handleFilter(e.target.value)}
          
          />

          {isDropdownVisible && (
            <div className="search-dropdown">
              {filteredData.map((product) => (
                <div
                  key={product.id}
                  className="search-item"
                  onClick={() => handleSuggestionClick(product.id)}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="search-item-image"
                  />
                  <div className="search-item-title">{product.title}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchBar;
