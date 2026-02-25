import { useState, useEffect, useCallback } from 'react';
import { getProducts, getProduct } from '../api/productApi';
import { MOCK_PRODUCTS } from '../utils/helpers';

export function useProducts(params = {}) {
  const [products, setProducts] = useState([]);
  const [count,    setCount]    = useState(0);
  const [loading,  setLoading]  = useState(true);
  const [isMock,   setIsMock]   = useState(false);
  const [error,    setError]    = useState(null);
  const paramsKey = JSON.stringify(params);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts(params);
      // DRF LimitOffsetPagination returns { count, next, previous, results }
      const results = Array.isArray(data) ? data : (data.results || []);
      setProducts(results);
      setCount(typeof data.count === 'number' ? data.count : results.length);
      setIsMock(false);
    } catch (err) {
      const status = err?.response?.status;

      if (status === 401 || status === 403) {
        // Backend requires auth for products — show a clear message, don't use mock
        setError('auth_required');
        setProducts([]);
        setCount(0);
        setIsMock(false);
      } else {
        // Network error or backend down — fall back to mock data
        setProducts(MOCK_PRODUCTS);
        setCount(MOCK_PRODUCTS.length);
        setIsMock(true);
      }
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsKey]);

  useEffect(() => { load(); }, [load]);

  return { products, count, loading, isMock, error, reload: load };
}

export function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    getProduct(id)
      .then(setProduct)
      .catch((err) => {
        const status = err?.response?.status;
        if (status === 401 || status === 403) {
          setError('auth_required');
        } else {
          // Try mock fallback
          const mock = MOCK_PRODUCTS.find(p => p.id === Number(id));
          if (mock) setProduct(mock);
          else setError('not_found');
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  return { product, loading, error };
}
