import axios from "axios";

const baseURL = "http://localhost:8080";

const api = axios.create({
  baseURL,
});

export const getUsers = async () => {
  const response = await api.get("/user");
  return response.data;
};

export const createUser = async (userData) => {
  const response = await api.post("/user", userData);
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await api.delete(`/user/${userId}`);
  return response.data;
};
