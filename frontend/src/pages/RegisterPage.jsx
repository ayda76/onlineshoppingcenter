import { useState }           from 'react';
import { Link, useNavigate }  from 'react-router-dom';
import { useAuth }            from '../context/AuthContext';
import { useToast }           from '../context/ToastContext';
import { extractError }       from '../utils/helpers';
import styles                 from './AuthPage.module.css';

export default function RegisterPage() {
  const { register } = useAuth();
  const { show }     = useToast();
  const navigate     = useNavigate();

  const [form, setForm]       = useState({ username:'', email:'', password:'', re_password:'' });
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password) { show('Fill in all fields', 'error'); return; }
    if (form.password !== form.re_password) { show('Passwords do not match', 'error'); return; }
    setLoading(true);
    try {
      await register(form);
      show('Account created! Welcome to ShopCenter 🎉');
      navigate('/');
    } catch (err) {
      show(extractError(err) || 'Registration failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>⊕</div>
        <h2 className={styles.title}>Create Account</h2>
        <p className={styles.sub}>Join ShopCenter — it's free!</p>

        <form onSubmit={handleSubmit}>
          {[
            ['username',    'Username',         'text',     'Choose a username'],
            ['email',       'Email',            'email',    'your@email.com'],
            ['password',    'Password',         'password', 'At least 8 characters'],
            ['re_password', 'Confirm Password', 'password', 'Repeat your password'],
          ].map(([k, label, type, placeholder]) => (
            <div key={k} className={styles.group}>
              <label className="label">{label}</label>
              <input className="input" type={type} placeholder={placeholder} value={form[k]} onChange={set(k)} />
            </div>
          ))}
          <button type="submit" className={`btn btn-primary btn-lg btn-block ${styles.submit}`} disabled={loading}>
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className={styles.switch}>
          Already have an account?{' '}
          <Link to="/login" style={{ color:'#cc0000', fontWeight:800 }}>Sign in →</Link>
        </p>
      </div>
    </div>
  );
}
