import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { login as apiLogin, register as apiRegister, getMe } from '../api/authApi';

const Ctx = createContext(null);

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    const token = localStorage.getItem('sc_access');
    if (token) {
      getMe()
        .then(setUser)
        .catch(() => {
          localStorage.removeItem('sc_access');
          localStorage.removeItem('sc_refresh');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }

    // Listen for auto-logout from axios interceptor
    const handleLogout = () => { setUser(null); };
    window.addEventListener('sc:logout', handleLogout);
    return () => window.removeEventListener('sc:logout', handleLogout);
  }, []);

  const login = useCallback(async (username, password) => {
    const { access, refresh } = await apiLogin(username, password);
    localStorage.setItem('sc_access',  access);
    localStorage.setItem('sc_refresh', refresh);
    const me = await getMe();
    setUser(me);
    return me;
  }, []);

  const register = useCallback(async (payload) => {
    // djoser register endpoint: POST /auth/users/
    // Required fields: username, password, re_password (must match)
    // Does NOT return tokens by default — we auto-login after
    await apiRegister(payload);
    // Auto-login after successful registration
    const { access, refresh } = await apiLogin(payload.username, payload.password);
    localStorage.setItem('sc_access',  access);
    localStorage.setItem('sc_refresh', refresh);
    const me = await getMe();
    setUser(me);
    return me;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('sc_access');
    localStorage.removeItem('sc_refresh');
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    const me = await getMe();
    setUser(me);
    return me;
  }, []);

  return (
    <Ctx.Provider value={{ user, loading, login, register, logout, refreshUser, setUser }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};
