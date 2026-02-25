import axios from 'axios';

const BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 12000,
});

// ─────────────────────────────────────────────────────────────────────────────
// IMPORTANT: Your backend uses SIMPLE_JWT with AUTH_HEADER_TYPES = ('JWT',)
// So every authenticated request must use:  Authorization: JWT <access_token>
// NOT "Bearer <token>" — that would be silently ignored by Django.
// ─────────────────────────────────────────────────────────────────────────────
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('sc_access');
  if (token) {
    config.headers.Authorization = `JWT ${token}`;
  }
  return config;
});

// Auto-refresh on 401
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      const refresh = localStorage.getItem('sc_refresh');
      if (refresh) {
        try {
          const { data } = await axios.post(`${BASE}/auth/jwt/refresh/`, { refresh });
          localStorage.setItem('sc_access', data.access);
          original.headers.Authorization = `JWT ${data.access}`;
          return api(original);
        } catch {
          localStorage.removeItem('sc_access');
          localStorage.removeItem('sc_refresh');
          window.dispatchEvent(new Event('sc:logout'));
        }
      }
    }
    return Promise.reject(err);
  }
);

export default api;
