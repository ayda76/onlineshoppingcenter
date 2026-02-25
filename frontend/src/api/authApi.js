import api from './axiosInstance';

// djoser JWT endpoints
export const login = (username, password) =>
  api.post('/auth/jwt/create/', { username, password }).then(r => r.data);
  // returns { access, refresh }

export const refreshToken = (refresh) =>
  api.post('/auth/jwt/refresh/', { refresh }).then(r => r.data);

// djoser user registration
export const register = (payload) =>
  api.post('/auth/users/', payload).then(r => r.data);
  // payload: { username, email, password, re_password }

// djoser current user
export const getMe = () =>
  api.get('/auth/users/me/').then(r => r.data);

export const updateMe = (data) =>
  api.patch('/auth/users/me/', data).then(r => r.data);

export const setPassword = (data) =>
  api.post('/auth/users/set_password/', data).then(r => r.data);
  // { current_password, new_password, re_new_password }
