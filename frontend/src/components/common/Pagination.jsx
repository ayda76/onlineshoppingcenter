export default function Pagination({ count, limit, offset, onPageChange }) {
  const totalPages = Math.ceil(count / limit);
  const currentPage = Math.floor(offset / limit) + 1;
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div style={{ display:'flex', justifyContent:'center', gap:8, marginTop:36, flexWrap:'wrap' }}>
      <button
        className="btn btn-ghost"
        style={{ padding:'8px 16px' }}
        disabled={currentPage === 1}
        onClick={() => onPageChange(offset - limit)}
      >
        ← Prev
      </button>

      {pages.map(p => (
        <button
          key={p}
          onClick={() => onPageChange((p - 1) * limit)}
          style={{
            width: 38, height: 38, borderRadius: 8, fontWeight: 700, fontSize: 14,
            background: p === currentPage ? '#cc0000' : '#f0f0f0',
            color:      p === currentPage ? '#fff'    : '#444',
            border: 'none', cursor: 'pointer',
          }}
        >
          {p}
        </button>
      ))}

      <button
        className="btn btn-ghost"
        style={{ padding:'8px 16px' }}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(offset + limit)}
      >
        Next →
      </button>
    </div>
  );
}
