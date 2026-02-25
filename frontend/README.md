# ShopCenter Frontend

A React e-commerce frontend built for the **onlineshoppingcenter** Django + PostgreSQL backend.

---

## Tech Stack
- **React 18** with React Router v6
- **Axios** for API calls
- **CSS Modules** for component-scoped styles
- No heavy UI frameworks — clean custom CSS

---

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── api/                    # Axios API calls
│   │   ├── axiosInstance.js    # Configured axios (JWT headers, auto-refresh)
│   │   ├── authApi.js          # djoser auth endpoints
│   │   ├── productApi.js       # Product endpoints
│   │   ├── orderApi.js         # Order endpoints
│   │   └── profileApi.js       # Profile endpoints
│   │
│   ├── context/                # React Context (global state)
│   │   ├── AuthContext.jsx     # User auth state
│   │   ├── CartContext.jsx     # Shopping cart state
│   │   └── ToastContext.jsx    # Toast notifications
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useProducts.js      # Fetch products/single product
│   │   └── useOrders.js        # Fetch orders
│   │
│   ├── components/
│   │   ├── layout/             # Navbar, Footer
│   │   ├── product/            # ProductCard, ProductFilters
│   │   ├── cart/               # CartItem, OrderSummary
│   │   ├── auth/               # ProtectedRoute
│   │   └── common/             # Spinner, EmptyState, Pagination, MockBanner
│   │
│   ├── pages/                  # Full page components
│   │   ├── HomePage.jsx
│   │   ├── ProductsPage.jsx    # With filters, search, pagination
│   │   ├── ProductDetailPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── CheckoutPage.jsx    # Places order via API
│   │   ├── LoginPage.jsx       # djoser JWT login
│   │   ├── RegisterPage.jsx    # djoser register + auto-login
│   │   ├── OrdersPage.jsx      # User's order history
│   │   ├── OrderDetailPage.jsx
│   │   └── ProfilePage.jsx     # Edit profile + change password
│   │
│   ├── styles/
│   │   └── global.css
│   ├── utils/
│   │   └── helpers.js
│   ├── App.jsx
│   └── index.js
├── .env
└── package.json
```

---

## Setup

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Configure the API URL

Edit `.env`:
```env
REACT_APP_API_URL=http://localhost:8000
```

Change to your Django server address.

### 3. Make sure your Django backend is running

```bash
# In your backend folder:
python manage.py runserver
```

CORS is already configured in your `settings.py` to allow `localhost:3000`.

### 4. Start the React app

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000)

---

## API Endpoints Used

| Method | URL | Description |
|--------|-----|-------------|
| POST | `/auth/jwt/create/` | Login → returns `access` + `refresh` |
| POST | `/auth/jwt/refresh/` | Auto-refresh expired token |
| POST | `/auth/users/` | Register new user |
| GET | `/auth/users/me/` | Get current user |
| POST | `/auth/users/set_password/` | Change password |
| GET | `/api/v1/product/product/` | List products (search, filter, order, paginate) |
| GET | `/api/v1/product/product/:id/` | Get single product |
| GET | `/api/v1/order/order/` | User's orders (JWT required) |
| POST | `/api/v1/order/order/` | Create order (JWT required) |
| GET | `/api/v1/order/order/:id/` | Order detail |
| PATCH | `/api/v1/order/order/:id/` | Update/cancel order |
| GET | `/api/v1/profile/profile/` | List profiles |
| PATCH | `/api/v1/profile/profile/:id/` | Update profile |

### Authentication Header
Your backend uses **`JWT`** prefix (not `Bearer`):
```
Authorization: JWT <access_token>
```
This is already configured in `axiosInstance.js`.

### Product Query Params
```
search=keyword          # searches name, price, description
ordering=price          # sort ascending by price
ordering=-price         # sort descending by price
ordering=name / -name
price__lt=50            # price less than 50
price__gt=100           # price greater than 100
limit=12&offset=0       # pagination
```

---

## Features
- 🏠 **Home page** — hero, category grid, featured products, deals, new arrivals
- 🔍 **Product listing** — search, price filters, sort, pagination (matches your DRF `LimitOffsetPagination`)
- 📄 **Product detail** — full info, quantity picker, add to cart
- 🛒 **Cart** — persists in memory, works without login, quantity management
- 💳 **Checkout** — posts order to `/api/v1/order/order/` with orderItemsrelated
- 🔐 **Auth** — JWT login/register via djoser, auto-refresh on 401
- 📦 **Orders** — list, detail, cancel (sets status to 'cancelled')
- 👤 **Profile** — edit firstname, lastname, phone, address + change password
- 🎭 **Mock mode** — auto-fallback to demo data when backend is unreachable

---

## Build for Production

```bash
npm run build
```

Outputs static files to `build/`. Serve with any web server (nginx, etc.).
