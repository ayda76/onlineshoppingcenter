import { useState }         from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProduct }       from '../hooks/useProducts';
import { useCart }          from '../context/CartContext';
import { useToast }         from '../context/ToastContext';
import { formatPrice, getGradient } from '../utils/helpers';
import Spinner              from '../components/common/Spinner';
import styles               from './ProductDetailPage.module.css';

export default function ProductDetailPage() {
  const { id }       = useParams();
  const { product, loading, error } = useProduct(id);
  const { addItem }  = useCart();
  const { show }     = useToast();
  const [qty, setQty] = useState(1);

  if (loading) return <Spinner />;
  if (error === 'auth_required') return (
    <div className="page container" style={{ textAlign:'center', paddingTop:60 }}>
      <div style={{ fontSize:64, marginBottom:16 }}>🔒</div>
      <h2 style={{ marginBottom:10 }}>Sign in to view this product</h2>
      <p style={{ color:'#888', marginBottom:24 }}>You need an account to browse the store.</p>
      <div style={{ display:'flex', gap:12, justifyContent:'center' }}>
        <Link to="/login"    className="btn btn-primary btn-lg">Sign In</Link>
        <Link to="/register" className="btn btn-outline btn-lg">Create Account</Link>
      </div>
    </div>
  );
  if (error || !product) return (
    <div className="page container">
      <div className="empty-state">
        <div className="icon">😕</div>
        <h3>Product not found</h3>
        <Link to="/products" className="btn btn-primary" style={{ marginTop:8 }}>Back to Products</Link>
      </div>
    </div>
  );

  const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
  const imgSrc  = product.image
    ? (product.image.startsWith('http') ? product.image : `${baseURL}${product.image}`)
    : null;

  const handleAdd = () => {
    if (product.stock === 0) { show('Out of stock', 'error'); return; }
    addItem(product, qty);
    show(`${product.name} × ${qty} added to cart 🛒`);
  };

  return (
    <div className="page">
      <div className="container">
        <Link to="/products" className={styles.back}>← Back to Products</Link>

        <div className={styles.grid}>
          {/* Image */}
          <div className={styles.imgSide}>
            <div className={styles.imgWrap} style={{ background: getGradient(product.id) }}>
              {imgSrc
                ? <img src={imgSrc} alt={product.name} className={styles.img} />
                : <span className={styles.placeholder}>📦</span>
              }
            </div>
          </div>

          {/* Info */}
          <div className={styles.infoSide}>
            <h1 className={styles.name}>{product.name}</h1>
            <div className={styles.price}>{formatPrice(product.price)}</div>

            <div className={styles.stockRow}>
              {product.stock > 0
                ? <span className={styles.inStock}>✓ In Stock · {product.stock} available</span>
                : <span className={styles.outStock}>✗ Out of Stock</span>
              }
            </div>

            <p className={styles.desc}>{product.description || 'No description available.'}</p>

            <hr className={styles.divider} />

            {/* Qty + Add */}
            <div className={styles.qtyRow}>
              <label className={styles.qtyLabel}>Quantity</label>
              <div className={styles.qtyControls}>
                <button className={styles.qtyBtn} onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span className={styles.qtyVal}>{qty}</span>
                <button className={styles.qtyBtn} onClick={() => setQty(q => Math.min(product.stock, q + 1))}>+</button>
              </div>
            </div>

            <button
              className={`btn btn-primary btn-lg btn-block ${styles.addBtn}`}
              onClick={handleAdd}
              disabled={product.stock === 0}
            >
              🛒 Add to Cart — {formatPrice(parseFloat(product.price) * qty)}
            </button>

            <Link to="/cart" className={`btn btn-outline btn-lg btn-block ${styles.viewCart}`}>
              View Cart
            </Link>

            {/* Meta */}
            <div className={styles.meta}>
              <div className={styles.metaRow}><span>Product ID</span><span>#{product.id}</span></div>
              <div className={styles.metaRow}><span>Stock</span><span>{product.stock} units</span></div>
              <div className={styles.metaRow}><span>Availability</span><span>{product.in_stock ? 'In Stock' : 'Out of Stock'}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
