import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getUserById = (id) => axios.get(`${API_URL}/get-user/${id}`);
export const addUser = (user) => axios.post(`${API_URL}/add-user`, user);
export const getUsers = () => axios.get(`${API_URL}/users`);
export const deleteUser = (id) => axios.delete(`${API_URL}/user/${id}`);