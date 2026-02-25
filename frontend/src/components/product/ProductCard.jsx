import { useNavigate } from 'react-router-dom';
import { useCart }     from '../../context/CartContext';
import { useToast }    from '../../context/ToastContext';
import { formatPrice, getGradient, truncate } from '../../utils/helpers';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, showDeal }) {
  const navigate     = useNavigate();
  const { addItem }  = useCart();
  const { show }     = useToast();

  const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
  const imgSrc  = product.image
    ? (product.image.startsWith('http') ? product.image : `${baseURL}${product.image}`)
    : null;

  const dealPrice = showDeal ? (parseFloat(product.price) * 0.85).toFixed(2) : null;

  const handleAdd = (e) => {
    e.stopPropagation();
    if (!product.in_stock && product.stock === 0) {
      show('This product is out of stock', 'error');
      return;
    }
    addItem(product, 1);
    show(`"${product.name}" added to cart 🛒`);
  };

  return (
    <div className={styles.card} onClick={() => navigate(`/products/${product.id}`)}>
      {/* Image */}
      <div className={styles.imgWrap} style={{ background: getGradient(product.id) }}>
        {imgSrc
          ? <img src={imgSrc} alt={product.name} className={styles.img} />
          : <span className={styles.placeholder}>📦</span>
        }
        {showDeal && <div className={styles.dealBadge}>15% OFF</div>}
        {product.stock === 0 && <div className={styles.outBadge}>Out of Stock</div>}
      </div>

      {/* Info */}
      <div className={styles.body}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.desc}>{truncate(product.description, 65)}</p>

        <div className={styles.footer}>
          <div className={styles.priceRow}>
            {showDeal
              ? <>
                  <span className={styles.priceDeal}>{formatPrice(dealPrice)}</span>
                  <span className={styles.priceOld}>{formatPrice(product.price)}</span>
                </>
              : <span className={styles.price}>{formatPrice(product.price)}</span>
            }
          </div>

          <div className={styles.stockRow}>
            {product.stock > 0
              ? <span className={styles.inStock}>✓ In Stock ({product.stock})</span>
              : <span className={styles.outStock}>✗ Out of Stock</span>
            }
          </div>

          <button
            className={styles.addBtn}
            onClick={handleAdd}
            disabled={product.stock === 0}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
