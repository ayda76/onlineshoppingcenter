import { useState, useEffect, useCallback } from 'react';
import { getOrders, getOrder, cancelOrder } from '../api/orderApi';

export function useOrders() {
  const [orders,  setOrders]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getOrders();
      setOrders(Array.isArray(data) ? data : (data.results || []));
    } catch (e) {
      setError('Could not load orders');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const cancel = useCallback(async (id) => {
    await cancelOrder(id);
    setOrders(prev => prev.map(o =>
      (o.order_id === id || o.id === id) ? { ...o, status: 'cancelled' } : o
    ));
  }, []);

  return { orders, loading, error, reload: load, cancel };
}

export function useOrderDetail(id) {
  const [order,   setOrder]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getOrder(id)
      .then(setOrder)
      .catch(() => setError('Order not found'))
      .finally(() => setLoading(false));
  }, [id]);

  return { order, loading, error };
}
