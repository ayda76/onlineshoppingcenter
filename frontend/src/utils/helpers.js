// ── Price formatting ──────────────────────────────────────────────────────────
export const formatPrice = (p) => `$${parseFloat(p || 0).toFixed(2)}`;

// ── Placeholder gradients for products without images ────────────────────────
export const GRADIENTS = [
  'linear-gradient(135deg,#667eea,#764ba2)',
  'linear-gradient(135deg,#f093fb,#f5576c)',
  'linear-gradient(135deg,#4facfe,#00f2fe)',
  'linear-gradient(135deg,#43e97b,#38f9d7)',
  'linear-gradient(135deg,#fa709a,#fee140)',
  'linear-gradient(135deg,#a18cd1,#fbc2eb)',
  'linear-gradient(135deg,#fccb90,#d57eeb)',
  'linear-gradient(135deg,#a1c4fd,#c2e9fb)',
  'linear-gradient(135deg,#fd7043,#ff8a65)',
  'linear-gradient(135deg,#26c6da,#00acc1)',
];

export const getGradient = (id) => GRADIENTS[(id || 0) % GRADIENTS.length];

// ── Truncate text ─────────────────────────────────────────────────────────────
export const truncate = (str, n = 60) =>
  str && str.length > n ? str.slice(0, n) + '…' : str;

// ── Extract error message from axios error ────────────────────────────────────
export const extractError = (err) => {
  const d = err?.response?.data;
  if (!d) return err?.message || 'Something went wrong';
  if (typeof d === 'string') return d;
  // DRF usually returns { field: ['msg'] } or { detail: 'msg' }
  const msgs = Object.values(d).flat();
  return msgs[0] || 'Something went wrong';
};

// ── Date formatting ───────────────────────────────────────────────────────────
export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

// ── Order status badge class ──────────────────────────────────────────────────
export const statusClass = (status) => {
  if (status === 'confirmed') return 'badge-confirmed';
  if (status === 'cancelled') return 'badge-cancelled';
  return 'badge-pending';
};

// ── Mock products used as fallback when backend is unreachable ────────────────
export const MOCK_PRODUCTS = [
  { id: 1,  name: 'Wireless Headphones',   price: '79.99',  stock: 50,  in_stock: true,  image: null, description: 'Premium sound quality with active noise cancellation. 30-hour battery life.' },
  { id: 2,  name: 'Running Shoes',          price: '89.99',  stock: 75,  in_stock: true,  image: null, description: 'Lightweight mesh upper with responsive cushioning for daily training.' },
  { id: 3,  name: 'Non-stick Cookware Set', price: '149.99', stock: 30,  in_stock: true,  image: null, description: '10-piece ceramic-coated set. Oven safe up to 400°F. Dishwasher safe.' },
  { id: 4,  name: 'Smart Watch',            price: '199.99', stock: 25,  in_stock: true,  image: null, description: 'Heart rate, GPS, SpO2. 7-day battery. Water resistant 50m.' },
  { id: 5,  name: 'Yoga Mat',               price: '39.99',  stock: 90,  in_stock: true,  image: null, description: 'Extra-thick 6mm non-slip surface. Includes carrying strap.' },
  { id: 6,  name: 'Coffee Maker',           price: '69.99',  stock: 60,  in_stock: true,  image: null, description: '12-cup programmable drip coffee maker. Built-in burr grinder.' },
  { id: 7,  name: 'Slim Fit T-Shirt',       price: '24.99',  stock: 120, in_stock: true,  image: null, description: '100% soft pima cotton. Available in 12 colors. Machine washable.' },
  { id: 8,  name: 'Vitamin C Serum',        price: '34.99',  stock: 200, in_stock: true,  image: null, description: '20% Vitamin C with hyaluronic acid. Brightens and firms skin.' },
  { id: 9,  name: 'LEGO City Set',          price: '59.99',  stock: 45,  in_stock: true,  image: null, description: '560-piece city-building set. Ages 6+.' },
  { id: 10, name: 'Bluetooth Speaker',      price: '49.99',  stock: 65,  in_stock: true,  image: null, description: '360° surround sound, waterproof IPX7, 20-hour playtime.' },
  { id: 11, name: 'Denim Jacket',           price: '59.99',  stock: 80,  in_stock: true,  image: null, description: 'Classic stonewash denim. Relaxed fit. Sizes XS–3XL.' },
  { id: 12, name: 'Air Fryer',              price: '119.99', stock: 40,  in_stock: true,  image: null, description: '5.8 qt capacity. 8 presets. 80% less fat than deep frying.' },
  { id: 13, name: 'Foundation SPF 30',      price: '29.99',  stock: 150, in_stock: true,  image: null, description: 'Full coverage with broad-spectrum SPF 30. 40 shades available.' },
  { id: 14, name: 'Resistance Bands Set',   price: '22.99',  stock: 130, in_stock: true,  image: null, description: '5 resistance levels. Includes door anchor & exercise guide.' },
  { id: 15, name: 'Board Game Bundle',      price: '44.99',  stock: 35,  in_stock: true,  image: null, description: '4 classic family board games. Ages 8+.' },
  { id: 16, name: 'Electric Kettle',        price: '54.99',  stock: 55,  in_stock: true,  image: null, description: '1.7L stainless steel. 5 temperature presets. Boils in 3 min.' },
];
