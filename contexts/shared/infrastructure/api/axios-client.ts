import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add the access token if it is passed in config.headers._accessToken
axiosClient.interceptors.request.use((config) => {
  // If the token is passed as a special header, we add it as Authorization
  const accessToken = (config.headers as any)?._accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
    // We remove the temporary header so it doesn't travel to the backend
    delete config.headers._accessToken;
  }
  return config;
});

export default axiosClient;
