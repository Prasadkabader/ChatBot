import axios from "axios";

const API_URL = "http://localhost:8000/api"; // Update if backend runs elsewhere

const api = axios.create({
  baseURL: API_URL,
});

export const registerUser = (data) => api.post("/auth/register", data);
export const loginUser = (data) => api.post("/auth/login", data);

export const getUsers = () => api.get("/users");
export const getUser = (id) => api.get(`/users/${id}`);

export const createProject = (data, userId) =>
  api.post("/projects/", { ...data, user_id: userId });
export const getProjects = (userId) => api.get(`/projects/user/${userId}`);
export const getProject = (projectId) => api.get(`/projects/${projectId}`);

export const createPrompt = (projectId, data) =>
  api.post(`/prompts/${projectId}`, data);
export const getPrompts = (projectId) => api.get(`/prompts/${projectId}`);

export const chatWithProject = (projectId, data) =>
  api.post(`/chat/${projectId}`, data);
