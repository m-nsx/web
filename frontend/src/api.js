import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getAllCards = () => axios.get(`${API_URL}/get-all-cards`);

export const createVote = (voteData) => axios.post(`${API_URL}/vote`, voteData);

export const updateVote = (voteData) => axios.put(`${API_URL}/vote`, voteData);

export const deleteVote = (username) => axios.delete(`${API_URL}/vote`, { data: { username } });

export const getAllCategories = () => axios.get(`${API_URL}/categories`);

export const createCategory = (categoryData) => axios.post(`${API_URL}/category`, categoryData);

export const deleteCategory = (name) => axios.delete(`${API_URL}/category`, { data: { name } });

export const registerUser = (userData) => axios.post(`${API_URL}/register`, userData);

export const loginUser = (userData) => axios.post(`${API_URL}/login`, userData);

export const updatePassword = (passwordData, token) =>
  axios.put(`${API_URL}/account/password`, passwordData, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteAccount = (token) =>
  axios.delete(`${API_URL}/account`, {
    headers: { Authorization: `Bearer ${token}` },
  });


