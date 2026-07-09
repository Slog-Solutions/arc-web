// src/admin/pages/AdminSettings.tsx
import { useState, useRef } from 'react';
import { changePassword } from '../store/authStore';
import { resetAllData, exportAllData, importAllData } from '../store/adminStore';
import { showToast } from '../components/Toast';
import ConfirmModal from '../components/ConfirmModal';

export default function AdminSettings() {
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPw !== confirmPw) {
      showToast('Passwords do not match', 'error');
      return;
    }
    if (newPw.length < 4) {
      showToast('Password must be at least 4 characters', 'error');
      return;
    }
    if (changePassword(currentPw, newPw)) {
      showToast('Password changed successfully', 'success');
      setCurrentPw('');
      setNewPw('');
      setConfirmPw('');
    } else {
      showToast('Current password is incorrect', 'error');
    }
  };

  const handleExport = () => {
    const data = exportAllData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `arc-museum-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Data exported successfully', 'success');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      if (importAllData(text)) {
        showToast('Data imported successfully! Refresh to see changes.', 'success');
      } else {
        showToast('Invalid JSON file', 'error');
      }
    };
    reader.readAsText(file);
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleReset = () => {
    resetAllData();
    setShowResetModal(false);
    showToast('All data reset to defaults', 'success');
  };

  return (
    <div>
      <div className="admin-page-title">Settings</div>
      <div className="admin-page-subtitle">Manage your credentials and museum data</div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1.5rem' }}>
        {/* Change Password */}
        <div className="admin-card">
          <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: '1rem', fontWeight: 700, color: '#d4a017', marginBottom: '1.25rem' }}>
            🔐 Change Password
          </h3>
          <form onSubmit={handleChangePassword}>
            <div className="admin-form-group">
              <label className="admin-label">Current Password</label>
              <input type="password" className="admin-input" value={currentPw} onChange={e => setCurrentPw(e.target.value)} placeholder="Enter current password" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">New Password</label>
              <input type="password" className="admin-input" value={newPw} onChange={e => setNewPw(e.target.value)} placeholder="Enter new password" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Confirm New Password</label>
              <input type="password" className="admin-input" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} placeholder="Confirm new password" />
            </div>
            <button type="submit" className="admin-btn admin-btn-primary">Update Password</button>
          </form>
        </div>

        {/* Data Management */}
        <div className="admin-card">
          <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: '1rem', fontWeight: 700, color: '#d4a017', marginBottom: '1.25rem' }}>
            💾 Data Management
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.78rem', color: '#c0ad90', marginBottom: '0.5rem' }}>
                Export all museum data as a JSON backup file.
              </div>
              <button className="admin-btn admin-btn-secondary" onClick={handleExport}>
                📥 Export Data
              </button>
            </div>

            <div className="admin-divider" />

            <div>
              <div style={{ fontSize: '0.78rem', color: '#c0ad90', marginBottom: '0.5rem' }}>
                Import museum data from a JSON backup file.
              </div>
              <input type="file" ref={fileInputRef} accept=".json" onChange={handleImport} style={{ display: 'none' }} />
              <button className="admin-btn admin-btn-secondary" onClick={() => fileInputRef.current?.click()}>
                📤 Import Data
              </button>
            </div>

            <div className="admin-divider" />

            <div>
              <div style={{ fontSize: '0.78rem', color: '#e88', marginBottom: '0.5rem' }}>
                ⚠️ Reset all data to factory defaults. This cannot be undone.
              </div>
              <button className="admin-btn admin-btn-danger" onClick={() => setShowResetModal(true)}>
                🗑️ Reset All Data
              </button>
            </div>
          </div>
        </div>
      </div>

      {showResetModal && (
        <ConfirmModal
          title="Reset All Data"
          message="This will permanently delete all custom data and revert to the original defaults. This action cannot be undone."
          confirmLabel="Reset Everything"
          confirmDanger
          onConfirm={handleReset}
          onCancel={() => setShowResetModal(false)}
        />
      )}
    </div>
  );
}
