import api from './axiosInstance';

// GET /api/v1/order/order/        – list user's own orders
// POST /api/v1/order/order/       – create order
// GET /api/v1/order/order/:id/    – retrieve order detail
// PATCH /api/v1/order/order/:id/  – update status etc.
// DELETE /api/v1/order/order/:id/ – delete order

export const getOrders = (params = {}) =>
  api.get('/api/v1/order/order/', { params }).then(r => r.data);

export const getOrder = (id) =>
  api.get(`/api/v1/order/order/${id}/`).then(r => r.data);

// payload: { orderItemsrelated: [{ product: id, quantity: n }, ...] }
export const createOrder = (payload) =>
  api.post('/api/v1/order/order/', payload).then(r => r.data);

export const updateOrder = (id, payload) =>
  api.patch(`/api/v1/order/order/${id}/`, payload).then(r => r.data);

export const cancelOrder = (id) =>
  api.patch(`/api/v1/order/order/${id}/`, { status: 'cancelled' }).then(r => r.data);

// OrderItem endpoints
export const getOrderItems = () =>
  api.get('/api/v1/order/orderItem/').then(r => r.data);
