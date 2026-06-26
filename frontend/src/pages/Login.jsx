import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import API_URL from "../config";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(ShopContext);

  const [currentState, setCurrentState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      if (currentState === "Sign Up") {
        await axios.post(`${API_URL}/signup`, {
          username: name,
          email: email,
          password: password,
        });

        toast.success("Account created! Please login.");
        setCurrentState("Login");   // ← switch to login tab, same page
        setName("");
        setEmail("");
        setPassword("");

      } else {
        const formData = new FormData();
        formData.append("username", email);
        formData.append("password", password);

        const response = await axios.post(`${API_URL}/login`, formData);

        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        setToken(response.data.access_token);  // ← tells ShopContext user is logged in

        toast.success("Welcome back!");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.detail || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center my-20">
      <div className="w-full max-w-md p-6 text-center">
        <h2 className="text-3xl font-light mb-6">
          {currentState === "Login" ? "Login —" : "Sign Up —"}
        </h2>

        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          {currentState === "Sign Up" && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 p-3 rounded"
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-3 rounded"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-3 rounded"
            required
          />

          <div className="flex justify-between text-sm text-gray-600">
            <p className="cursor-pointer hover:underline">Forgot your password?</p>

            {currentState === "Login" ? (
              <p onClick={() => { setCurrentState("Sign Up"); setName(""); setEmail(""); setPassword(""); }}
                className="cursor-pointer hover:underline">
                Create account
              </p>
            ) : (
              <p onClick={() => { setCurrentState("Login"); setName(""); setEmail(""); setPassword(""); }}
                className="cursor-pointer hover:underline">
                Login Here
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="mt-4 bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            {currentState === "Login" ? "Sign In" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
