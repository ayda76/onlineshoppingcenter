import { createContext, useContext, useState, useCallback } from 'react';

const Ctx = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const show = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(p => [...p, { id, message, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500);
  }, []);

  return (
    <Ctx.Provider value={{ show }}>
      {children}
      {toasts.length > 0 && (
        <div style={{ position:'fixed', top:84, right:18, zIndex:9999, display:'flex', flexDirection:'column', gap:8 }}>
          {toasts.map(t => (
            <div key={t.id} className="slide-right" style={{
              background: t.type === 'error' ? '#b71c1c' : t.type === 'warning' ? '#e65100' : '#1b5e20',
              color: '#fff', padding: '12px 18px', borderRadius: 10,
              fontSize: 14, fontWeight: 700,
              boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
              display: 'flex', alignItems: 'center', gap: 10, maxWidth: 340,
            }}>
              <span style={{ fontSize: 18 }}>
                {t.type === 'error' ? '✕' : t.type === 'warning' ? '⚠' : '✓'}
              </span>
              {t.message}
            </div>
          ))}
        </div>
      )}
    </Ctx.Provider>
  );
}

export const useToast = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useToast must be inside ToastProvider');
  return ctx;
};
