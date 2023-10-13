"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsersRequest,
  getUsersSuccess,
  getUsersFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
} from "../../../GlobalRedux/Features/user/userSlice";
import { getUsers as fetchUsers, deleteUser } from "../../../api";

const Dashboard = () => {
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state?.user);
  const fetchUserData = async () => {
    try {
      dispatch(getUsersRequest());
      const data = await fetchUsers();
      dispatch(getUsersSuccess(data.data));
    } catch (error) {
      dispatch(getUsersFailure(error.message));
    }
  };

  useEffect(() => {

    fetchUserData();
  }, [dispatch]);

  const DeletUser = async (userId) => {
    try{
      dispatch(deleteUserRequest());

      await deleteUser(userId);
      fetchUserData();
      dispatch(deleteUserSuccess());
    }catch(error){
      alert(error)
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <>
      {usersData.loading && <p>Loading....</p>}
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block w-full">
            <div className="overflow-hidden">
              <table className="min-w-full text-center text-sm font-light">
                <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                  <tr>
                    <th scope="col" className=" px-6 py-4">
                      #
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      Name
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      Email
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      Number
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      Delete User
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {usersData &&
                    usersData.users.map((data, index) => {
                      return (
                        <tr
                          key={index}
                          className="border-b dark:border-neutral-500"
                        >
                          <td className="whitespace-nowrap  px-6 py-4 font-medium">
                            {index}
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4">
                            {data.name}
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4">
                            {data.email}
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4">
                            {data.mobileNumber}
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4">
                            <button
                              className="bg-blue-200 px-4 py-2 rounded "
                              onClick={() => DeletUser(data._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
