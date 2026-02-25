import { useState, useEffect } from 'react';
import { useAuth }             from '../context/AuthContext';
import { useToast }            from '../context/ToastContext';
import { getProfiles, updateProfile } from '../api/profileApi';
import { updateMe, setPassword }      from '../api/authApi';
import { extractError }        from '../utils/helpers';
import Spinner                 from '../components/common/Spinner';
import styles                  from './ProfilePage.module.css';

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();
  const { show }  = useToast();

  const [profile,    setProfile]    = useState(null);
  const [loadingP,   setLoadingP]   = useState(true);
  const [savingP,    setSavingP]    = useState(false);
  const [savingPwd,  setSavingPwd]  = useState(false);

  const [pForm, setPForm] = useState({ firstname:'', lastname:'', phone:'', address:'', email:'' });
  const [pwdForm, setPwdForm] = useState({ current_password:'', new_password:'', re_new_password:'' });

  // Load existing profile
  useEffect(() => {
    getProfiles()
      .then(data => {
        const list = Array.isArray(data) ? data : (data.results || []);
        // Find profile belonging to current user
        const mine = list.find(p => p.user === user?.id) || list[0] || null;
        if (mine) {
          setProfile(mine);
          setPForm({
            firstname: mine.firstname || '',
            lastname:  mine.lastname  || '',
            phone:     mine.phone     || '',
            address:   mine.address   || '',
            email:     mine.email     || '',
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoadingP(false));
  }, [user]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!profile) { show('Profile not found', 'error'); return; }
    setSavingP(true);
    try {
      await updateProfile(profile.id, pForm);
      show('Profile updated! ✓');
    } catch (err) {
      show(extractError(err), 'error');
    } finally {
      setSavingP(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (pwdForm.new_password !== pwdForm.re_new_password) { show('Passwords do not match', 'error'); return; }
    setSavingPwd(true);
    try {
      await setPassword(pwdForm);
      setPwdForm({ current_password:'', new_password:'', re_new_password:'' });
      show('Password changed successfully! ✓');
    } catch (err) {
      show(extractError(err), 'error');
    } finally {
      setSavingPwd(false);
    }
  };

  if (loadingP) return <Spinner />;

  return (
    <div className="page">
      <div className="container" style={{ maxWidth:720 }}>
        <h1 className="page-title">My Profile</h1>

        {/* Account info (from djoser) */}
        <div className={styles.card}>
          <h3 className={styles.secTitle}>👤 Account</h3>
          <div className={styles.infoRow}><span>Username</span><strong>{user?.username}</strong></div>
          <div className={styles.infoRow}><span>Email</span><strong>{user?.email || '—'}</strong></div>
          <div className={styles.infoRow}><span>User ID</span><code>{user?.id}</code></div>
        </div>

        {/* Profile details */}
        <div className={styles.card}>
          <h3 className={styles.secTitle}>📋 Personal Details</h3>
          {!profile && <p style={{ color:'#888', marginBottom:16, fontSize:14 }}>No profile record found. You may need to create one via the admin panel.</p>}
          <form onSubmit={handleSaveProfile}>
            <div className={styles.grid2}>
              {[['firstname','First Name'],['lastname','Last Name']].map(([k,l]) => (
                <div key={k} className={styles.group}>
                  <label className="label">{l}</label>
                  <input className="input" value={pForm[k]} onChange={e => setPForm(f => ({ ...f, [k]: e.target.value }))} placeholder={l} />
                </div>
              ))}
            </div>
            <div className={styles.group}>
              <label className="label">Phone</label>
              <input className="input" value={pForm.phone} onChange={e => setPForm(f => ({ ...f, phone: e.target.value }))} placeholder="+1 555 000 0000" />
            </div>
            <div className={styles.group}>
              <label className="label">Email</label>
              <input className="input" type="email" value={pForm.email} onChange={e => setPForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" />
            </div>
            <div className={styles.group}>
              <label className="label">Delivery Address</label>
              <textarea className="input" rows={3} value={pForm.address} onChange={e => setPForm(f => ({ ...f, address: e.target.value }))} placeholder="123 Main St, City, State, ZIP" style={{ resize:'vertical' }} />
            </div>
            <button type="submit" className="btn btn-primary" disabled={savingP || !profile}>
              {savingP ? 'Saving…' : 'Save Changes'}
            </button>
          </form>
        </div>

        {/* Change password */}
        <div className={styles.card}>
          <h3 className={styles.secTitle}>🔒 Change Password</h3>
          <form onSubmit={handleChangePassword}>
            {[
              ['current_password',  'Current Password'],
              ['new_password',      'New Password'],
              ['re_new_password',   'Confirm New Password'],
            ].map(([k,l]) => (
              <div key={k} className={styles.group}>
                <label className="label">{l}</label>
                <input className="input" type="password" value={pwdForm[k]} onChange={e => setPwdForm(f => ({ ...f, [k]: e.target.value }))} placeholder={l} />
              </div>
            ))}
            <button type="submit" className="btn btn-primary" disabled={savingPwd}>
              {savingPwd ? 'Changing…' : 'Change Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
