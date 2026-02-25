import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useProducts }          from '../hooks/useProducts';
import ProductCard              from '../components/product/ProductCard';
import ProductFilters           from '../components/product/ProductFilters';
import Pagination               from '../components/common/Pagination';
import Spinner                  from '../components/common/Spinner';
import EmptyState               from '../components/common/EmptyState';
import MockBanner               from '../components/common/MockBanner';
import styles                   from './ProductsPage.module.css';

const LIMIT = 12;

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [offset, setOffset] = useState(0);

  // Build API params from URL search params
  const filters = {
    search:    searchParams.get('search')    || undefined,
    ordering:  searchParams.get('ordering')  || undefined,
    price__lt: searchParams.get('price__lt') || undefined,
    price__gt: searchParams.get('price__gt') || undefined,
    limit:     LIMIT,
    offset,
  };

  // Reset offset when filters change
  useEffect(() => { setOffset(0); }, [
    searchParams.get('search'),
    searchParams.get('ordering'),
    searchParams.get('price__lt'),
    searchParams.get('price__gt'),
  ]);

  const { products, count, loading, isMock, error } = useProducts(
    Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== undefined))
  );

  const updateFilter = (patch) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      Object.entries(patch).forEach(([k, v]) => {
        if (v === undefined || v === '') next.delete(k);
        else next.set(k, v);
      });
      return next;
    });
    setOffset(0);
  };

  const searchQuery = searchParams.get('search') || '';

  return (
    <div className="page">
      {isMock && <MockBanner />}
      <div className="container">
        {searchQuery && (
          <div className={styles.searchBanner}>
            🔍 Results for "<strong>{searchQuery}</strong>" — {count} product{count !== 1 ? 's' : ''} found
          </div>
        )}

        <div className={styles.layout}>
          {/* Sidebar */}
          <ProductFilters filters={filters} onChange={updateFilter} />

          {/* Main */}
          <div style={{ flex:1, minWidth:0 }}>
            {/* Header row */}
            <div className={styles.header}>
              <p className={styles.count}>
                Showing <strong>{Math.min(offset + 1, count)}–{Math.min(offset + LIMIT, count)}</strong> of <strong>{count}</strong> products
              </p>
            </div>

            {loading
              ? <Spinner />
              : error === 'auth_required'
                ? <div style={{ background:'#fff', borderRadius:20, padding:'60px 40px', textAlign:'center', boxShadow:'0 2px 12px rgba(0,0,0,0.07)' }}>
                    <div style={{ fontSize:64, marginBottom:16 }}>🔒</div>
                    <h2 style={{ marginBottom:10 }}>Sign in to view products</h2>
                    <p style={{ color:'#888', marginBottom:24 }}>
                      Your store requires an account to browse products.
                    </p>
                    <div style={{ display:'flex', gap:12, justifyContent:'center' }}>
                      <Link to="/login"    className="btn btn-primary btn-lg">Sign In</Link>
                      <Link to="/register" className="btn btn-outline btn-lg">Create Account</Link>
                    </div>
                  </div>
                : products.length === 0
                  ? <EmptyState
                      icon="🔍"
                      title="No products found"
                      message="Try adjusting your filters or search term."
                      action={
                        <button className="btn btn-primary" onClick={() => setSearchParams({})}>
                          Clear Filters
                        </button>
                      }
                    />
                  : <>
                      <div className="product-grid">
                        {products.map(p => <ProductCard key={p.id} product={p} />)}
                      </div>
                      <Pagination
                        count={count}
                        limit={LIMIT}
                        offset={offset}
                        onPageChange={setOffset}
                      />
                    </>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
