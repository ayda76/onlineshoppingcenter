export default function MockBanner() {
  return (
    <div style={{
      background: '#fff3cd', color: '#856404',
      padding: '10px 20px', textAlign: 'center',
      fontSize: 13, borderBottom: '1px solid #ffc107',
      fontWeight: 600,
    }}>
      ⚠️ Demo mode — backend not connected. Showing mock data.
      Set <code style={{ background:'#ffeeba', padding:'1px 5px', borderRadius:4 }}>REACT_APP_API_URL</code> in{' '}
      <code style={{ background:'#ffeeba', padding:'1px 5px', borderRadius:4 }}>.env</code> to your Django server URL.
    </div>
  );
}
