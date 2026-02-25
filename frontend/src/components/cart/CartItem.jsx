import { useCart }  from '../../context/CartContext';
import { formatPrice, getGradient } from '../../utils/helpers';
import styles from './CartItem.module.css';

export default function CartItem({ item }) {
  const { setQty, removeItem } = useCart();
  const { product, quantity }  = item;

  const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
  const imgSrc  = product.image
    ? (product.image.startsWith('http') ? product.image : `${baseURL}${product.image}`)
    : null;

  return (
    <div className={styles.item}>
      {/* Image */}
      <div className={styles.imgWrap} style={{ background: getGradient(product.id) }}>
        {imgSrc
          ? <img src={imgSrc} alt={product.name} className={styles.img} />
          : <span style={{ fontSize:32 }}>📦</span>
        }
      </div>

      {/* Info */}
      <div className={styles.info}>
        <h4 className={styles.name}>{product.name}</h4>
        <p className={styles.unitPrice}>{formatPrice(product.price)} each</p>
      </div>

      {/* Qty controls */}
      <div className={styles.controls}>
        <button className={styles.qtyBtn} onClick={() => setQty(product.id, quantity - 1)}>−</button>
        <span className={styles.qty}>{quantity}</span>
        <button className={styles.qtyBtn} onClick={() => setQty(product.id, quantity + 1)}>+</button>
      </div>

      {/* Subtotal */}
      <div className={styles.subtotal}>
        {formatPrice(parseFloat(product.price) * quantity)}
      </div>

      {/* Remove */}
      <button className={styles.removeBtn} onClick={() => removeItem(product.id)} title="Remove">
        🗑️
      </button>
    </div>
  );
}
