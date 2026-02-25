export default function Spinner({ size = 42, center = true }) {
  const el = (
    <div
      style={{
        width: size, height: size,
        border: `${size * 0.1}px solid #f0f0f0`,
        borderTopColor: '#cc0000',
        borderRadius: '50%',
        animation: 'spin 0.75s linear infinite',
      }}
    />
  );
  if (!center) return el;
  return (
    <div style={{ display:'flex', justifyContent:'center', alignItems:'center', padding: 60 }}>
      {el}
    </div>
  );
}
