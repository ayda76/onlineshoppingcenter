import { useParams, Link } from 'react-router-dom';
import { useOrderDetail }  from '../hooks/useOrders';
import { formatDate, formatPrice, statusClass } from '../utils/helpers';
import Spinner              from '../components/common/Spinner';
import styles               from './OrderDetailPage.module.css';

export default function OrderDetailPage() {
  const { id }             = useParams();
  const { order, loading, error } = useOrderDetail(id);

  if (loading) return <Spinner />;
  if (error || !order) return (
    <div className="page container">
      <p style={{ color:'#cc0000' }}>Order not found.</p>
      <Link to="/orders" className="btn btn-primary" style={{ marginTop:16 }}>Back to Orders</Link>
    </div>
  );

  const items = order.orderItemsrelated || [];
  const total = items.reduce((s, i) => s + parseFloat(i.item_subtotal || 0), 0);
  const oid   = order.order_id || order.id;

  return (
    <div className="page">
      <div className="container" style={{ maxWidth:760 }}>
        <Link to="/orders" className={styles.back}>← My Orders</Link>

        <div className={styles.header}>
          <div>
            <h1 className="page-title" style={{ marginBottom:4 }}>
              Order #{String(oid).slice(0, 8).toUpperCase()}
            </h1>
            <p style={{ color:'#888', fontSize:14 }}>Placed on {formatDate(order.created_at)}</p>
          </div>
          <span className={`badge ${statusClass(order.status)}`} style={{ fontSize:14, padding:'6px 16px' }}>
            {order.status}
          </span>
        </div>

        <div className={styles.card}>
          <h3 className={styles.secTitle}>🛒 Order Items</h3>
          {items.length === 0
            ? <p style={{ color:'#888' }}>No items found.</p>
            : items.map((item, i) => (
                <div key={i} className={styles.item}>
                  <div className={styles.itemInfo}>
                    <div className={styles.itemName}>{item.product_name || `Product #${item.product}`}</div>
                    <div className={styles.itemMeta}>Qty: {item.quantity}</div>
                  </div>
                  <div className={styles.itemSubtotal}>
                    {item.item_subtotal ? formatPrice(item.item_subtotal) : '—'}
                  </div>
                </div>
              ))
          }
          {total > 0 && (
            <div className={styles.totalRow}>
              <span>Order Total</span>
              <span className={styles.totalVal}>{formatPrice(total)}</span>
            </div>
          )}
        </div>

        <div className={styles.card}>
          <h3 className={styles.secTitle}>📋 Order Info</h3>
          <div className={styles.metaRow}><span>Order ID</span><code>{oid}</code></div>
          <div className={styles.metaRow}><span>Status</span><span className={`badge ${statusClass(order.status)}`}>{order.status}</span></div>
          <div className={styles.metaRow}><span>Created</span><span>{formatDate(order.created_at)}</span></div>
          <div className={styles.metaRow}><span>Profile ID</span><span>{order.profile}</span></div>
        </div>

        <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
      </div>
    </div>
  );
}
