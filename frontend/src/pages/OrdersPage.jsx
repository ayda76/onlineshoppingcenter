import { Link }          from 'react-router-dom';
import { useOrders }     from '../hooks/useOrders';
import { formatDate, formatPrice, statusClass } from '../utils/helpers';
import Spinner            from '../components/common/Spinner';
import EmptyState         from '../components/common/EmptyState';
import styles             from './OrdersPage.module.css';

export default function OrdersPage() {
  const { orders, loading, error, cancel } = useOrders();

  if (loading) return <Spinner />;
  if (error)   return <div className="page container"><p style={{ color:'#cc0000' }}>{error}</p></div>;

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">My Orders</h1>

        {orders.length === 0
          ? <EmptyState
              icon="📦"
              title="No orders yet"
              message="When you place an order, it will appear here."
              action={<Link to="/products" className="btn btn-primary btn-lg">Start Shopping</Link>}
            />
          : <div className={styles.list}>
              {orders.map(order => {
                const oid = order.order_id || order.id;
                const items = order.orderItemsrelated || [];
                const total = items.reduce((s, i) => s + parseFloat(i.item_subtotal || 0), 0);

                return (
                  <div key={oid} className={styles.card}>
                    {/* Header */}
                    <div className={styles.cardHead}>
                      <div>
                        <div className={styles.orderId}>Order #{String(oid).slice(0, 8).toUpperCase()}</div>
                        <div className={styles.orderDate}>{formatDate(order.created_at)}</div>
                      </div>
                      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                        <span className={`badge ${statusClass(order.status)}`}>
                          {order.status || 'pending'}
                        </span>
                        {order.status === 'pending' && (
                          <button
                            className="btn btn-ghost"
                            style={{ fontSize:12, padding:'5px 12px', color:'#cc0000' }}
                            onClick={() => cancel(oid)}
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Items */}
                    {items.length > 0 && (
                      <div className={styles.items}>
                        {items.map((item, i) => (
                          <div key={i} className={styles.item}>
                            <span className={styles.itemName}>
                              {item.product_name || `Product #${item.product}`}
                            </span>
                            <span className={styles.itemQty}>× {item.quantity}</span>
                            <span className={styles.itemSubtotal}>
                              {item.item_subtotal ? formatPrice(item.item_subtotal) : '—'}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Footer */}
                    <div className={styles.cardFoot}>
                      {total > 0 && (
                        <span className={styles.total}>Total: <strong>{formatPrice(total)}</strong></span>
                      )}
                      <Link to={`/orders/${oid}`} className="btn btn-outline" style={{ fontSize:13, padding:'6px 16px' }}>
                        View Details
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
        }
      </div>
    </div>
  );
}
