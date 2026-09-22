import axios from 'axios';

// Local development goes through Vite's proxy. Production may use a separate API.
export const backendUrl = (import.meta.env.VITE_BACKEND_URL || '').trim().replace(/\/+$/, '');
axios.defaults.timeout = 15000;
axios.interceptors.response.use(response => response, error => {
  error.message = error.response?.data?.message || (error.code === 'ECONNABORTED'
    ? 'The server took too long to respond. Please try again.'
    : !error.response ? 'Cannot reach the server. Check your connection and try again.' : error.message);
  return Promise.reject(error);
});
export default axios;
