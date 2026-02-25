import { createContext, useContext, useState, useCallback, useMemo } from 'react';

const Ctx = createContext(null);

export function CartProvider({ children }) {
  // items: [{ product: {...}, quantity: number }]
  const [items, setItems] = useState([]);

  const totalItems = useMemo(() => items.reduce((s, i) => s + i.quantity, 0), [items]);
  const subtotal   = useMemo(() => items.reduce((s, i) => s + parseFloat(i.product.price) * i.quantity, 0), [items]);

  const addItem = useCallback((product, quantity = 1) => {
    setItems(prev => {
      const idx = prev.findIndex(i => i.product.id === product.id);
      if (idx !== -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
        return next;
      }
      return [...prev, { product, quantity }];
    });
  }, []);

  const setQty = useCallback((productId, quantity) => {
    if (quantity < 1) {
      setItems(prev => prev.filter(i => i.product.id !== productId));
    } else {
      setItems(prev => prev.map(i => i.product.id === productId ? { ...i, quantity } : i));
    }
  }, []);

  const removeItem = useCallback((productId) => {
    setItems(prev => prev.filter(i => i.product.id !== productId));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  return (
    <Ctx.Provider value={{ items, totalItems, subtotal, addItem, setQty, removeItem, clearCart }}>
      {children}
    </Ctx.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
};
