// src/admin/pages/AdminLogin.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, isAuthenticated } from '../store/authStore';
import '../admin.css';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // If already logged in, redirect
  if (isAuthenticated()) {
    navigate('/admin/dashboard', { replace: true });
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (login(username, password)) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials. Access denied.');
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-badge">🏛️</div>
        <div className="admin-login-title">ARC Admin</div>
        <div className="admin-login-subtitle">Authorized Personnel Only</div>

        {error && <div className="admin-login-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label className="admin-label">Username</label>
            <input
              type="text"
              className="admin-input"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter username"
              autoComplete="username"
              autoFocus
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Password</label>
            <input
              type="password"
              className="admin-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter password"
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="admin-btn admin-btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
            🔐 Access Control Panel
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.65rem', color: '#3a3528', letterSpacing: '0.1em' }}>
          ASSAM REGIMENTAL CENTRE · DIGITAL MUSEUM
        </div>
      </div>
    </div>
  );
}
