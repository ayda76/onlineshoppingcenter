import api from './axiosInstance';

// GET /api/v1/product/product/
// Supports: search, ordering, price__lt, price__gt, name__icontains, limit, offset
export const getProducts = (params = {}) =>
  api.get('/api/v1/product/product/', { params }).then(r => r.data);
  // Returns { count, next, previous, results: [...] }

// GET /api/v1/product/product/:id/
export const getProduct = (id) =>
  api.get(`/api/v1/product/product/${id}/`).then(r => r.data);

// Product fields: id, name, description, price, stock, image, in_stock
// No separate categories endpoint – categories are implied by product data
// Filters available: name__icontains, price__lt, price__gt, search, ordering
