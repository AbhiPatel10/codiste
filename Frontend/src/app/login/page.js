"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
} from "../../GlobalRedux/Features/auth/authSlice";
import { loginUser } from "../../api";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar";
import "../../styles/global.css"

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      dispatch(loginRequest());
      const response = await loginUser(email, password);
      dispatch(loginSuccess(response));
      localStorage.setItem('jwtToken', response.accessToken);
      router.push("/profile"); // Redirect to profile page after successful login
    } catch (error) {
      alert(error.message);
      dispatch(loginFailure(error.message));
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center mt-10">
        <form className="bg-while shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-gray-400">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
