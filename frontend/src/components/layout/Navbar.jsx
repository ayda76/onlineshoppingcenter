import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import styles from './Navbar.module.css';

export default function Navbar({ onSearch }) {
  const { user, logout } = useAuth();
  const { totalItems }   = useCart();
  const navigate         = useNavigate();
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>⊕</span>
          <span className={styles.logoText}>ShopCenter</span>
        </Link>

        {/* Search */}
        <form className={styles.searchForm} onSubmit={handleSearch}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            className={styles.searchInput}
            placeholder="Search products by name, price, description…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button type="submit" className={styles.searchBtn}>Search</button>
        </form>

        {/* Actions */}
        <div className={styles.actions}>
          {user ? (
            <div className={styles.userMenu}>
              <button className={styles.userBtn} onClick={() => setMenuOpen(o => !o)}>
                👤 {user.username}
                <span style={{ fontSize:10, marginLeft:4 }}>▼</span>
              </button>
              {menuOpen && (
                <div className={styles.dropdown}>
                  <Link to="/profile"  className={styles.dropItem} onClick={() => setMenuOpen(false)}>My Profile</Link>
                  <Link to="/orders"   className={styles.dropItem} onClick={() => setMenuOpen(false)}>My Orders</Link>
                  <hr style={{ margin:'4px 0', border:'none', borderTop:'1px solid #eee' }} />
                  <button className={styles.dropItem} onClick={handleLogout} style={{ color:'#cc0000' }}>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login"    className={styles.navLink}>Sign In</Link>
              <Link to="/register" className={styles.navLinkPrimary}>Register</Link>
            </>
          )}

          <Link to="/cart" className={styles.cartBtn}>
            🛒
            {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
          </Link>
        </div>
      </div>

      {/* Bottom category bar */}
      <div className={styles.catBar}>
        <div className="container" style={{ display:'flex', gap:8, overflowX:'auto', paddingBottom:2 }}>
          <Link to="/products"                     className={styles.catLink}>All Products</Link>
          <Link to="/products?ordering=price"      className={styles.catLink}>💰 Price: Low→High</Link>
          <Link to="/products?ordering=-price"     className={styles.catLink}>💎 Price: High→Low</Link>
          <Link to="/products?ordering=name"       className={styles.catLink}>🔤 Name A–Z</Link>
          <Link to="/products?ordering=-stock"     className={styles.catLink}>📦 Most Stock</Link>
          <Link to="/products?price__lt=50"        className={styles.catLink}>🏷️ Under $50</Link>
          <Link to="/products?price__gt=100"       className={styles.catLink}>✨ Premium ($100+)</Link>
        </div>
      </div>
    </nav>
  );
}
