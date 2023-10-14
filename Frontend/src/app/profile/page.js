"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Navbar from "../components/navbar";
import { userProfile, updateUserdata } from "../../api";
import "../../../src/styles/global.css";
import {
  fetchProfileStart,
  fetchProfileSuccess,
  fetchProfileFailure,
  selectProfile,
} from "../../GlobalRedux/Features/profile/profileSlice";
import {
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
} from "../../GlobalRedux/Features/user/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(selectProfile);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
  });
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    mobileNumber: Yup.number().required("Mobile number is required"),
    password: Yup.string().required("Password is required"),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchProfileStart());
        const token = localStorage.getItem("jwtToken");
        const config = {
          headers: {
            Authorization: token,
          },
        };

        const data = await userProfile(config);
        setUserData({
          name: data.data.name,
          email: data.data.email,
          mobileNumber: data.data.mobileNumber,
          password: data.data.password,
        });
        dispatch(fetchProfileSuccess(data.data));
      } catch (error) {
        console.error(error);
        dispatch(fetchProfileFailure("Error fetching user profile."));
      }
    };

    fetchData();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const UpdateUser = async (e) => {
    try {
      e.preventDefault();

      dispatch(updateUserRequest());
      const Update = await updateUserdata(user._id, userData);
      setUserData({
        name: Update.data.name,
        email: Update.data.email,
        mobileNumber: Update.data.mobileNumber,
        password: Update.data.password,
      });
      dispatch(updateUserSuccess(Update.data));
      alert("User Updated Successfully")
    } catch (error) {
      console.log(error);
      dispatch(updateUserFailure("Error updating user profile."));
    }
  };

  return (
    <>
      <Navbar />
      <h1 className="m-auto flex text-center justify-center text-3xl mt-5">Profile</h1>
      <div
        className="flex justify-center items-center mt-10"
        onSubmit={UpdateUser}
      >
        <Formik>
          <form className="bg-while shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-gray-400">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Name
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                name="name" // Add name attribute to link to userData
                value={userData.name} // Link the value to userData
                onChange={handleInputChange}
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-xs italic" />
            </div>
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
                type="text"
                placeholder="Email"
                name="email" // Add name attribute to link to userData
                value={userData.email} // Link the value to userData
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="number"
              >
                Mobile Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="number"
                placeholder="number"
                name="mobileNumber" // Add name attribute to link to userData
                value={userData.mobileNumber} // Link the value to userData
                onChange={handleInputChange}
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Your password"
                name="password" // Add name attribute to link to userData
                value={userData.password} // Link the value to userData
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Update
              </button>
            </div>
          </form>
        </Formik>
      </div>
    </>
  );
};

export default Profile;
