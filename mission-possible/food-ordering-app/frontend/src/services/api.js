import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

// Auth
export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);

// Restaurants
export const getRestaurants = () => API.get('/restaurants');
export const getRestaurant = (id) => API.get(`/restaurants/${id}`);
export const searchRestaurants = (query) => API.get(`/restaurants/search?query=${query}`);
export const getRestaurantsByCuisine = (cuisine) => API.get(`/restaurants/cuisine/${cuisine}`);

// Orders
export const placeOrder = (data) => API.post('/orders', data);
export const getUserOrders = () => API.get('/orders');
export const getOrder = (id) => API.get(`/orders/${id}`);
export const cancelOrder = (id) => API.put(`/orders/${id}/cancel`);

export default API;
