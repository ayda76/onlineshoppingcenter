import api from './axiosInstance';

// GET    /api/v1/profile/profile/      – list (admin) or own
// GET    /api/v1/profile/profile/:id/  – retrieve
// PATCH  /api/v1/profile/profile/:id/  – update
// Profile fields: id, user, firstname, lastname, phone, address, email

export const getProfiles = () =>
  api.get('/api/v1/profile/profile/').then(r => r.data);

export const getProfile = (id) =>
  api.get(`/api/v1/profile/profile/${id}/`).then(r => r.data);

export const updateProfile = (id, data) =>
  api.patch(`/api/v1/profile/profile/${id}/`, data).then(r => r.data);

export const createProfile = (data) =>
  api.post('/api/v1/profile/profile/', data).then(r => r.data);
