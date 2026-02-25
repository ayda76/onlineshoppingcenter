import { useState }                  from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider }   from './context/AuthContext';
import { CartProvider }   from './context/CartContext';
import { ToastProvider }  from './context/ToastContext';

import Navbar             from './components/layout/Navbar';
import Footer             from './components/layout/Footer';
import ProtectedRoute     from './components/auth/ProtectedRoute';

import HomePage           from './pages/HomePage';
import ProductsPage       from './pages/ProductsPage';
import ProductDetailPage  from './pages/ProductDetailPage';
import CartPage           from './pages/CartPage';
import CheckoutPage       from './pages/CheckoutPage';
import LoginPage          from './pages/LoginPage';
import RegisterPage       from './pages/RegisterPage';
import OrdersPage         from './pages/OrdersPage';
import OrderDetailPage    from './pages/OrderDetailPage';
import ProfilePage        from './pages/ProfilePage';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ToastProvider>
            <div style={{ display:'flex', flexDirection:'column', minHeight:'100vh' }}>
              <Navbar onSearch={setSearchQuery} />

              <div style={{ flex:1 }}>
                <Routes>
                  {/* Public routes */}
                  <Route path="/"               element={<HomePage />} />
                  <Route path="/products"       element={<ProductsPage />} />
                  <Route path="/products/:id"   element={<ProductDetailPage />} />
                  <Route path="/cart"           element={<CartPage />} />
                  <Route path="/login"          element={<LoginPage />} />
                  <Route path="/register"       element={<RegisterPage />} />

                  {/* Protected routes – require login */}
                  <Route path="/checkout" element={
                    <ProtectedRoute><CheckoutPage /></ProtectedRoute>
                  } />
                  <Route path="/orders" element={
                    <ProtectedRoute><OrdersPage /></ProtectedRoute>
                  } />
                  <Route path="/orders/:id" element={
                    <ProtectedRoute><OrderDetailPage /></ProtectedRoute>
                  } />
                  <Route path="/profile" element={
                    <ProtectedRoute><ProfilePage /></ProtectedRoute>
                  } />

                  {/* 404 fallback */}
                  <Route path="*" element={
                    <div className="page container" style={{ textAlign:'center', paddingTop:80 }}>
                      <div style={{ fontSize:72 }}>🤔</div>
                      <h2 style={{ marginTop:16 }}>Page not found</h2>
                      <a href="/" className="btn btn-primary" style={{ marginTop:20, display:'inline-block' }}>Go Home</a>
                    </div>
                  } />
                </Routes>
              </div>

              <Footer />
            </div>
          </ToastProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
