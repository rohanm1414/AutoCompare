import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : '/api',
  timeout: 10000,
});

export const searchCars = (params) => api.get('/cars', { params }).then((r) => r.data);
export const getCarById = (id) => api.get(`/cars/${id}`).then((r) => r.data);
export const getSimilarCars = (id) => api.get(`/cars/${id}/similar`).then((r) => r.data);
export const getVideos = (q) => api.get('/videos', { params: { q } }).then((r) => r.data);

export default api;
