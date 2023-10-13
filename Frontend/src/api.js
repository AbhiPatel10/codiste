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

export const updateUserdata = async (id, updatedData) => {
  const response = await api.put(`/user/${id}`, updatedData);
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await api.delete(`/user/${userId}`);
  return response.data;
};

export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'An error occurred during login.');
  }
};

export const userProfile = async (config) =>{
  const response = await api.get('/user/profile', config);
  return response.data;
}