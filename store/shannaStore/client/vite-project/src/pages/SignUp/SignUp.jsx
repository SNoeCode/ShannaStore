import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const Signup = () => {
  const [users, setUsers] = useState([]);
  const [data, setData] = useState({});
 
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    console.log("reg", formData);
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
 
  const handleSignup = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3004/api/signup", formData)
      .then((response) => {
        console.log(response);
        setData(response.data);
      
        alert("User registered successfully");
        console.log("SignUp response:", response);

        navigate("/login");
      })
      .catch((err) => console.error("Unable to sign up:", err));
  };
  return (
    <>
      <div className="signup-container">
        <h2 className="signup-h2">Thank you for signing up</h2>
        <div className="signup">
          <form onSubmit={handleSignup} className="form-control">
            <br />
            <label>
              Please Enter Name
              <input
                placeholder="Name"
                type="text"
                id="name"
              
                value={formData.name}
                onChange={(e) => handleChange(e)}
                required
              />
            </label>
            <label>
              Username
              <input
                placeholder="Create Username"
                type="text"
                id="username"
              
                value={formData.username}
                onChange={(e) => handleChange(e)}
                required
              />
            </label>
            <label>
              Email
              <input
                placeholder="email"
                type="email"
                id="email"
               
                value={formData.email}
                onChange={(e) => handleChange(e)}
                required
              />
            </label>
            <label>
              Password
              <input
                placeholder="password"
                type="password"
                id="password"
              
                value={formData.password}
                onChange={(e) => handleChange(e)}
                required
              />
            </label>
            <button type="submit" onClick={(e) => handleSignup(e)}>
              Submit
            </button>
          </form>
          <br />
        </div>
        <br />
        <div>
          <br />
        </div>
        <br />
      </div>
    </>
  );
};

export default Signup;

