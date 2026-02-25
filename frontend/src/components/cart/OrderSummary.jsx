import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/helpers';
import styles from './OrderSummary.module.css';

export default function OrderSummary({ showCheckout = true, showItems = false }) {
  const { items, subtotal } = useCart();
  const tax      = subtotal * 0.08;
  const total    = subtotal + tax;

  return (
    <div className={styles.summary}>
      <h3 className={styles.title}>Order Summary</h3>

      {showItems && items.map(({ product, quantity }) => (
        <div key={product.id} className={styles.lineItem}>
          <span className={styles.lineItemName}>{product.name} × {quantity}</span>
          <span>{formatPrice(parseFloat(product.price) * quantity)}</span>
        </div>
      ))}

      {showItems && <hr className={styles.divider} />}

      <div className={styles.row}><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
      <div className={styles.row}><span>Shipping</span><span style={{ color:'#2e7d32', fontWeight:700 }}>FREE</span></div>
      <div className={styles.row}><span>Tax (8%)</span><span>{formatPrice(tax)}</span></div>

      <hr className={styles.divider} />

      <div className={styles.total}>
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>

      {showCheckout && (
        <Link to="/checkout" className={`btn btn-primary btn-lg btn-block ${styles.checkoutBtn}`}>
          Proceed to Checkout →
        </Link>
      )}
    </div>
  );
}
