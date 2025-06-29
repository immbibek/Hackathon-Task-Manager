// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // Backend URL
});

// Automatically attach token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchTasks = () => API.get("/api/tasks");
export const createTask = (taskData) => API.post("/api/tasks", taskData);
export const updateTask = (id, data) => API.put(`/api/tasks/${id}`, data);
export const deleteTask = (id) => API.delete(`/api/tasks/${id}`);
export const shareTask = (id, email) => API.post(`/api/tasks/share/${id}`, { email });

export default API;
