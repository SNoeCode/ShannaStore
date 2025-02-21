import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const Signup = () => {
  const [users, setUsers] = useState([]);
  const [data, setData] = useState({});
  const [name, setName] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSignup = async (e) => {
    e.preventDefault();
  
  axios.post("http://localhost:3004/api/signup", { name, email, username, password, cartItems })
 .then((response) => {
   localStorage.setItem("_id", response.data.user.id);
   localStorage.setItem("token", response.data.token);
   navigate("/login");
   alert("User registered successfully");
   console.log("SignUp response:", response);
 })
 .catch((err) => console.error("Unable to sign up:", err));

}
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
                value={name}
                name={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
            </label>
            <label>
              Username
              <input
                placeholder="Create Username"
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                required
              />
            </label>
            <label>
              Email
              <input
                placeholder="email"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </label>
            <label>
              Password
              <input
                placeholder="password"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </label>
            <button type="submit">Submit</button>
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

 