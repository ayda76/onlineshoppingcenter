import { useState }         from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart }           from '../context/CartContext';
import { useToast }          from '../context/ToastContext';
import { createOrder }       from '../api/orderApi';
import { extractError }      from '../utils/helpers';
import OrderSummary          from '../components/cart/OrderSummary';
import styles                from './CheckoutPage.module.css';

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const { show }    = useToast();
  const navigate    = useNavigate();
  const [placing, setPlacing] = useState(false);

  // We use the product list from cart; the backend only needs product IDs + quantities
  const handlePlaceOrder = async () => {
    if (items.length === 0) { show('Your cart is empty', 'error'); return; }
    setPlacing(true);
    try {
      const payload = {
        orderItemsrelated: items.map(({ product, quantity }) => ({
          product: product.id,
          quantity,
        })),
      };
      const order = await createOrder(payload);
      clearCart();
      show('Order placed successfully! 🎉');
      navigate(`/orders/${order.order_id || order.id}`);
    } catch (e) {
      show(extractError(e), 'error');
    } finally {
      setPlacing(false);
    }
  };

  if (items.length === 0) return (
    <div className="page container">
      <div className="empty-state">
        <div className="icon">🛒</div>
        <h3>Nothing to checkout</h3>
        <Link to="/products" className="btn btn-primary btn-lg">Go Shopping</Link>
      </div>
    </div>
  );

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Checkout</h1>

        <div className={styles.layout}>
          {/* Left: shipping info (display only – real shipping info lives in Profile) */}
          <div>
            <div className={styles.section}>
              <h3 className={styles.secTitle}>📦 Shipping</h3>
              <p className={styles.secNote}>
                Your delivery address is taken from your <Link to="/profile" style={{ color:'#cc0000', fontWeight:700 }}>profile</Link>.
                Make sure it's up to date before placing your order.
              </p>
            </div>

            <div className={styles.section}>
              <h3 className={styles.secTitle}>🛒 Your Items</h3>
              {items.map(({ product, quantity }) => (
                <div key={product.id} className={styles.lineItem}>
                  <div>
                    <div style={{ fontWeight:700, fontSize:14 }}>{product.name}</div>
                    <div style={{ color:'#888', fontSize:13 }}>Qty: {quantity}</div>
                  </div>
                  <div style={{ fontWeight:800, color:'#cc0000' }}>
                    ${(parseFloat(product.price) * quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.section}>
              <h3 className={styles.secTitle}>💳 Payment</h3>
              <div className={styles.payNote}>
                <span style={{ fontSize:24 }}>🔒</span>
                <div>
                  <div style={{ fontWeight:700, marginBottom:2 }}>Secure Checkout</div>
                  <div style={{ fontSize:13, color:'#888' }}>
                    This is a demo — no real payment is processed.
                    In production, integrate Stripe or another payment gateway here.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: order summary */}
          <div>
            <OrderSummary showCheckout={false} showItems />
            <button
              className={`btn btn-primary btn-lg btn-block ${styles.placeBtn}`}
              onClick={handlePlaceOrder}
              disabled={placing}
            >
              {placing ? 'Placing Order…' : '🎉 Place Order'}
            </button>
            <Link to="/cart" className={styles.backLink}>← Back to Cart</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
