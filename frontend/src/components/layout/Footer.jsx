import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background:'#1a1a1a', color:'#ccc', marginTop:80 }}>
      <div className="container" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:40, padding:'48px 24px 32px' }}>
        <div>
          <div style={{ fontSize:22, fontWeight:900, color:'#fff', marginBottom:10 }}>⊕ ShopCenter</div>
          <p style={{ color:'#888', fontSize:13, lineHeight:1.7 }}>
            Your one-stop online shopping destination. Great prices, fast delivery, easy returns.
          </p>
        </div>
        <div>
          <h4 style={{ color:'#fff', fontSize:13, fontWeight:800, textTransform:'uppercase', letterSpacing:1, marginBottom:14 }}>Shop</h4>
          {[['All Products','/products'],['New Arrivals','/products?ordering=-id'],['Best Sellers','/products?ordering=-stock']].map(([l,to]) => (
            <Link key={l} to={to} style={{ display:'block', color:'#888', fontSize:14, marginBottom:8 }}>{l}</Link>
          ))}
        </div>
        <div>
          <h4 style={{ color:'#fff', fontSize:13, fontWeight:800, textTransform:'uppercase', letterSpacing:1, marginBottom:14 }}>Account</h4>
          {[['Sign In','/login'],['Register','/register'],['My Orders','/orders'],['My Profile','/profile']].map(([l,to]) => (
            <Link key={l} to={to} style={{ display:'block', color:'#888', fontSize:14, marginBottom:8 }}>{l}</Link>
          ))}
        </div>
        <div>
          <h4 style={{ color:'#fff', fontSize:13, fontWeight:800, textTransform:'uppercase', letterSpacing:1, marginBottom:14 }}>Help</h4>
          {['FAQ','Returns & Refunds','Shipping Info','Contact Us'].map(l => (
            <div key={l} style={{ color:'#888', fontSize:14, marginBottom:8, cursor:'pointer' }}>{l}</div>
          ))}
        </div>
      </div>
      <div style={{ borderTop:'1px solid #333', textAlign:'center', padding:'16px 24px', fontSize:13, color:'#555' }}>
        © {new Date().getFullYear()} ShopCenter. Built with React + Django REST Framework.
      </div>
    </footer>
  );
}
