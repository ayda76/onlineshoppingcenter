import { Link, useNavigate } from 'react-router-dom';
import { useProducts }        from '../hooks/useProducts';
import { useAuth }            from '../context/AuthContext';
import ProductCard             from '../components/product/ProductCard';
import Spinner                 from '../components/common/Spinner';
import MockBanner              from '../components/common/MockBanner';
import styles                  from './HomePage.module.css';

const HERO_EMOJIS = ['🎧','👟','🏠','💄','🎮','💻'];

const CATEGORIES = [
  { label: 'Electronics',    icon: '💻', query: { search: 'headphones' },    color: '#1a1a2e' },
  { label: 'Fashion',        icon: '👗', query: { search: 'shirt' },         color: '#6d2b7e' },
  { label: 'Home & Kitchen', icon: '🏠', query: { search: 'cookware' },      color: '#0f3460' },
  { label: 'Sports',         icon: '⚽', query: { search: 'shoes' },         color: '#1b4332' },
  { label: 'Beauty',         icon: '✨', query: { search: 'serum' },         color: '#7b2d8b' },
  { label: 'Deals',          icon: '🔥', query: { ordering: 'price' },       color: '#b30000' },
];

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { products: featured, loading, isMock, error } = useProducts({ limit: 8 });
  const deals = featured.slice(0, 4);
  const newArr = featured.slice(4, 8);

  // Products need auth — show sign-in prompt instead of empty page
  const needsLogin = error === 'auth_required';

  return (
    <div>
      {isMock && <MockBanner />}

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>New arrivals every week</p>
          <h1 className={styles.heroTitle}>Shop Everything<br />You Love</h1>
          <p className={styles.heroSub}>Unbeatable prices · Free returns · Fast delivery</p>
          <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            <Link to="/products" className={`btn btn-lg ${styles.heroCTA}`}>Shop Now →</Link>
            <Link to="/register" className={`btn btn-lg ${styles.heroCTASecondary}`}>Join Free</Link>
          </div>
        </div>
        <div className={styles.heroFloats}>
          {HERO_EMOJIS.map((e, i) => (
            <div key={i} className={styles.floatBubble} style={{ animationDelay:`${i * 0.3}s` }}>{e}</div>
          ))}
        </div>
      </div>

      {/* ── Categories ───────────────────────────────────────────────── */}
      <div className="container">
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Shop by Category</h2>
          <div className={styles.catGrid}>
            {CATEGORIES.map(c => (
              <div
                key={c.label}
                className={styles.catCard}
                style={{ background: c.color }}
                onClick={() => navigate(`/products?${new URLSearchParams(c.query)}`)}
              >
                <span className={styles.catIcon}>{c.icon}</span>
                <span className={styles.catLabel}>{c.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Featured ─────────────────────────────────────────────── */}
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Featured Products</h2>
            <Link to="/products" className={styles.seeAll}>See All →</Link>
          </div>
          {loading
            ? <Spinner />
            : needsLogin
              ? <div className={styles.loginPrompt}>
                  <span style={{ fontSize:48 }}>🔒</span>
                  <h3>Sign in to browse products</h3>
                  <p>Your store requires an account to view products.</p>
                  <div style={{ display:'flex', gap:12, marginTop:8 }}>
                    <Link to="/login"    className="btn btn-primary btn-lg">Sign In</Link>
                    <Link to="/register" className="btn btn-outline btn-lg">Create Account</Link>
                  </div>
                </div>
              : <div className="product-grid">
                  {featured.slice(0, 8).map(p => <ProductCard key={p.id} product={p} />)}
                </div>
          }
        </section>

        {/* ── Today's Deals banner ─────────────────────────────────── */}
        {!needsLogin && (
        <div className={styles.dealsBanner}>
          <div>
            <h2 className={styles.dealsTitle}>🔥 Today's Deals</h2>
            <p className={styles.dealsSub}>Limited time offers. Prices drop at midnight.</p>
          </div>
          <Link to="/products?ordering=price" className={`btn btn-lg ${styles.dealsBtn}`}>
            View All Deals
          </Link>
        </div>
        )}

        {/* ── Deals grid ───────────────────────────────────────────── */}
        {!loading && !needsLogin && (
          <section className={styles.section}>
            <div className="product-grid">
              {deals.map(p => <ProductCard key={p.id} product={p} showDeal />)}
            </div>
          </section>
        )}

        {/* ── New Arrivals ─────────────────────────────────────────── */}
        {!loading && !needsLogin && newArr.length > 0 && (
          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>✨ New Arrivals</h2>
              <Link to="/products?ordering=-id" className={styles.seeAll}>See All →</Link>
            </div>
            <div className="product-grid">
              {newArr.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}

        {/* ── CTA banner ───────────────────────────────────────────── */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaText}>
            <h3>Save even more with a free account</h3>
            <p>Track orders, manage returns, get exclusive deals.</p>
          </div>
          <Link to="/register" className="btn btn-primary btn-lg">Create Account →</Link>
        </div>
      </div>
    </div>
  );
}
