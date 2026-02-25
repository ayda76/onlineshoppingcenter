import { useState }                    from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth }                     from '../context/AuthContext';
import { useToast }                    from '../context/ToastContext';
import { extractError }                from '../utils/helpers';
import styles                          from './AuthPage.module.css';

export default function LoginPage() {
  const { login }    = useAuth();
  const { show }     = useToast();
  const navigate     = useNavigate();
  const location     = useLocation();
  const from         = location.state?.from?.pathname || '/';

  const [form, setForm]   = useState({ username:'', password:'' });
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) { show('Fill in all fields', 'error'); return; }
    setLoading(true);
    try {
      await login(form.username, form.password);
      show('Welcome back! 👋');
      navigate(from, { replace: true });
    } catch (err) {
      show(extractError(err) || 'Invalid username or password', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>⊕</div>
        <h2 className={styles.title}>Sign In</h2>
        <p className={styles.sub}>Welcome back to ShopCenter</p>

        <form onSubmit={handleSubmit}>
          <div className={styles.group}>
            <label className="label">Username</label>
            <input className="input" placeholder="Enter your username" value={form.username} onChange={set('username')} autoFocus />
          </div>
          <div className={styles.group}>
            <label className="label">Password</label>
            <input className="input" type="password" placeholder="Enter your password" value={form.password} onChange={set('password')} />
          </div>
          <button type="submit" className={`btn btn-primary btn-lg btn-block ${styles.submit}`} disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className={styles.switch}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color:'#cc0000', fontWeight:800 }}>Create one free →</Link>
        </p>
      </div>
    </div>
  );
}
