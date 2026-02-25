import { Link }        from 'react-router-dom';
import { useCart }      from '../context/CartContext';
import { useAuth }      from '../context/AuthContext';
import CartItem         from '../components/cart/CartItem';
import OrderSummary     from '../components/cart/OrderSummary';
import EmptyState       from '../components/common/EmptyState';
import styles           from './CartPage.module.css';

export default function CartPage() {
  const { items, clearCart } = useCart();
  const { user }             = useAuth();

  if (items.length === 0) return (
    <div className="page container">
      <EmptyState
        icon="🛒"
        title="Your cart is empty"
        message="Looks like you haven't added anything yet."
        action={<Link to="/products" className="btn btn-primary btn-lg">Start Shopping</Link>}
      />
    </div>
  );

  return (
    <div className="page">
      <div className="container">
        <div className={styles.header}>
          <h1 className="page-title" style={{ marginBottom:0 }}>
            Shopping Cart <span style={{ color:'#888', fontWeight:600, fontSize:20 }}>({items.length} item{items.length !== 1 ? 's' : ''})</span>
          </h1>
          <button className="btn btn-ghost" onClick={clearCart} style={{ fontSize:13 }}>
            🗑️ Clear Cart
          </button>
        </div>

        <div className={styles.layout}>
          {/* Items */}
          <div className={styles.items}>
            {items.map(item => <CartItem key={item.product.id} item={item} />)}

            {!user && (
              <div className={styles.loginPrompt}>
                <span>💡 <Link to="/login" style={{ color:'#cc0000', fontWeight:700 }}>Sign in</Link> to save your cart and checkout faster.</span>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className={styles.summary}>
            <OrderSummary showCheckout={!!user} />
            {!user && (
              <Link
                to="/login"
                state={{ from: { pathname: '/checkout' } }}
                className="btn btn-primary btn-lg btn-block"
                style={{ display:'block', textAlign:'center', marginTop:12 }}
              >
                Sign In to Checkout
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
