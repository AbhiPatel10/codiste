"use client";

import React, { useState } from "react";
import Navbar from "../components/navbar";
import { useDispatch } from "react-redux";
import { createUser } from "../../api";
import {
  createUserRequest,
  createUserSuccess,
  createUserFailure,
} from "../../GlobalRedux/Features/user/userSlice";

const Registration = () => {
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    password: '',
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleCreateUser = async (e) => {
    try {
      e.preventDefault(); 
      dispatch(createUserRequest());
      const response = await createUser(userData);
      dispatch(createUserSuccess(response));
      alert("User created successfully")
      setUserData({
        name: '',
        email: '',
        mobileNumber: '',
        password: '',
      })
    } catch (error) {
      alert(error?.response?.data?.message);
      setUserData({
        name: '',
        email: '',
        mobileNumber: '',
        password: '',
      })
      if (error.response && error.response.status === 409) {
        dispatch(createUserFailure("Email is already in use"));
      } else {
        dispatch(createUserFailure("An error occurred."));
      }
    }
  };
  return (
    <>
      <Navbar />
      <div class="flex justify-center items-center mt-10">
        <form class="bg-while shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-gray-400"  onSubmit={handleCreateUser}>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Name
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              name="name"  // Add name attribute to link to userData
              value={userData.name}  // Link the value to userData
              onChange={handleInputChange}  
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="email"
            >
              Email
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Email"
              name="email"  // Add name attribute to link to userData
              value={userData.email}  // Link the value to userData
              onChange={handleInputChange}  
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="number"
            >
              Mobile Number
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="number"
              placeholder="number"
              name="mobileNumber"  // Add name attribute to link to userData
              value={userData.mobileNumber}  // Link the value to userData
              onChange={handleInputChange}  
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <input
              class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Your password"
              name="password"  // Add name attribute to link to userData
              value={userData.password}  // Link the value to userData
              onChange={handleInputChange} 
            />
            <p class="text-red-500 text-xs italic">Please choose a password.</p>
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Registration;
