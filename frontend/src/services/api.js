import axios from "axios";

const API_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const registerUser = (data) => api.post("/auth/register", data);
export const loginUser = (data) => api.post("/auth/login", data);

// User endpoints
export const getUsers = () => api.get("/users");
export const getUser = (id) => api.get(`/users/${id}`);

// Project endpoints
export const createProject = (data, userId) =>
  api.post("/projects/", { ...data }, { params: { user_id: userId } });
export const getProjects = (userId) => api.get(`/projects/user/${userId}`);
export const getProject = (projectId) => api.get(`/projects/${projectId}`);

// Prompt endpoints
export const createPrompt = (projectId, data) =>
  api.post(`/prompts/${projectId}`, data);
export const getPrompts = (projectId) => api.get(`/prompts/${projectId}`);
export const getPrompt = (promptId) => api.get(`/prompts/detail/${promptId}`);

// Chat endpoints
export const chatWithProject = (projectId, data) =>
  api.post(`/chat/${projectId}`, data);

export default api;