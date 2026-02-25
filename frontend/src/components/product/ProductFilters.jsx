import { useState } from 'react';
import styles from './ProductFilters.module.css';

export default function ProductFilters({ filters, onChange }) {
  const [priceMin, setPriceMin] = useState(filters.price__gt || '');
  const [priceMax, setPriceMax] = useState(filters.price__lt || '');

  const applyPrice = () => {
    onChange({
      price__gt: priceMin || undefined,
      price__lt: priceMax || undefined,
    });
  };

  const clearPrice = () => {
    setPriceMin('');
    setPriceMax('');
    onChange({ price__gt: undefined, price__lt: undefined });
  };

  return (
    <aside className={styles.sidebar}>
      <h3 className={styles.title}>Filter & Sort</h3>

      {/* Sort */}
      <div className={styles.section}>
        <div className={styles.sectionLabel}>Sort By</div>
        {[
          ['',        '✦ Default'],
          ['price',   '💰 Price: Low → High'],
          ['-price',  '💎 Price: High → Low'],
          ['name',    '🔤 Name A → Z'],
          ['-name',   '🔤 Name Z → A'],
          ['-stock',  '📦 Most Available'],
        ].map(([val, label]) => (
          <button
            key={val}
            className={filters.ordering === val ? styles.itemActive : styles.item}
            onClick={() => onChange({ ordering: val || undefined })}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Price range */}
      <div className={styles.section}>
        <div className={styles.sectionLabel}>Price Range</div>
        <div style={{ display:'flex', gap:8, marginBottom:8 }}>
          <input
            className={styles.priceInput}
            placeholder="Min $"
            type="number"
            value={priceMin}
            onChange={e => setPriceMin(e.target.value)}
          />
          <input
            className={styles.priceInput}
            placeholder="Max $"
            type="number"
            value={priceMax}
            onChange={e => setPriceMax(e.target.value)}
          />
        </div>
        <button className={styles.applyBtn} onClick={applyPrice}>Apply</button>
        {(priceMin || priceMax) && (
          <button className={styles.clearBtn} onClick={clearPrice}>Clear</button>
        )}
      </div>

      {/* Quick price filters */}
      <div className={styles.section}>
        <div className={styles.sectionLabel}>Quick Filters</div>
        {[
          ['Under $25',     { price__lt: 25,  price__gt: undefined }],
          ['$25 – $50',     { price__gt: 25,  price__lt: 50 }],
          ['$50 – $100',    { price__gt: 50,  price__lt: 100 }],
          ['$100 – $200',   { price__gt: 100, price__lt: 200 }],
          ['Over $200',     { price__gt: 200, price__lt: undefined }],
        ].map(([label, vals]) => (
          <button
            key={label}
            className={styles.item}
            onClick={() => { setPriceMin(''); setPriceMax(''); onChange(vals); }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Availability */}
      <div className={styles.section}>
        <div className={styles.sectionLabel}>Availability</div>
        <p style={{ fontSize:12, color:'#888', lineHeight:1.5 }}>
          Only in-stock products are shown by default (backend filter).
        </p>
      </div>

      {/* Clear all */}
      <button
        className={styles.clearAllBtn}
        onClick={() => { setPriceMin(''); setPriceMax(''); onChange({ ordering: undefined, price__gt: undefined, price__lt: undefined }); }}
      >
        Clear All Filters
      </button>
    </aside>
  );
}
