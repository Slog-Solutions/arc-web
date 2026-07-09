// src/admin/pages/editors/AchievementsEditor.tsx
import { useState, useEffect } from 'react';
import { showToast } from '../../components/Toast';
import ConfirmModal from '../../components/ConfirmModal';

interface Achievement { category: string; title: string; description: string; year: string; icon: string; }

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave: (section: string, data: any) => void;
}

const ICON_SUGGESTIONS = ['🎖️', '⭐', '🏔️', '🌏', '🛡️', '⚡', '🏥', '🚁', '🇮🇳', '⚔️', '🏆', '🎗️'];

export default function AchievementsEditor({ data, onSave }: Props) {
  const [items, setItems] = useState<Achievement[]>([]);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);
  const [form, setForm] = useState<Achievement>({ category: '', title: '', description: '', year: '', icon: '🎖️' });

  useEffect(() => {
    setItems(data.achievements || []);
  }, [data]);

  const handleSave = () => {
    onSave('achievements', items);
    showToast('Achievements saved', 'success');
  };

  const startAdd = () => {
    setEditIdx(-1);
    setForm({ category: '', title: '', description: '', year: '', icon: '🎖️' });
  };

  const startEdit = (idx: number) => {
    setEditIdx(idx);
    setForm({ ...items[idx] });
  };

  const saveForm = () => {
    if (!form.title.trim()) { showToast('Title is required', 'error'); return; }
    let nextItems;
    if (editIdx === -1) {
      nextItems = [...items, form];
    } else if (editIdx !== null) {
      nextItems = [...items]; nextItems[editIdx] = form;
    }
    if (nextItems) {
      setItems(nextItems);
      onSave('achievements', nextItems);
    }
    setEditIdx(null);
  };

  const confirmDelete = () => {
    if (deleteIdx !== null) {
      const nextItems = items.filter((_, i) => i !== deleteIdx);
      setItems(nextItems);
      onSave('achievements', nextItems);
      setDeleteIdx(null);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: '1rem', fontWeight: 700, color: '#d4a017' }}>
          Awards & Achievements ({items.length})
        </h3>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={startAdd}>+ Add</button>
          <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={handleSave}>💾 Save</button>
        </div>
      </div>

      {editIdx !== null && (
        <div className="admin-card" style={{ marginBottom: '1.25rem', borderColor: 'rgba(212,160,23,0.35)' }}>
          <h4 style={{ fontWeight: 600, color: '#e4dcc8', marginBottom: '1rem', fontSize: '0.9rem' }}>
            {editIdx === -1 ? '✚ Add Achievement' : '✎ Edit Achievement'}
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div className="admin-form-group">
              <label className="admin-label">Title</label>
              <input className="admin-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Achievement title" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Category</label>
              <input className="admin-input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="e.g., Battle Honours, Gallantry" />
            </div>
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Description</label>
            <textarea className="admin-textarea" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Describe the achievement" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div className="admin-form-group">
              <label className="admin-label">Year</label>
              <input className="admin-input" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} placeholder="e.g., 1944 or 1990s" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Icon</label>
              <input className="admin-input" value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} placeholder="Emoji icon" />
              <div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.35rem', flexWrap: 'wrap' }}>
                {ICON_SUGGESTIONS.map(ic => (
                  <button key={ic} onClick={() => setForm({ ...form, icon: ic })} style={{
                    background: form.icon === ic ? 'rgba(212,160,23,0.2)' : 'transparent',
                    border: '1px solid rgba(212,160,23,0.15)',
                    borderRadius: 6, padding: '0.2rem 0.4rem', cursor: 'pointer', fontSize: '1rem'
                  }}>
                    {ic}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={saveForm}>
              {editIdx === -1 ? 'Add' : 'Update'}
            </button>
            <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={() => setEditIdx(null)}>Cancel</button>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty-icon">🏆</div>
          <div className="admin-empty-text">No achievements added yet.</div>
        </div>
      ) : (
        items.map((a, i) => (
          <div key={i} className="admin-list-item" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{a.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: '0.82rem', color: '#e4dcc8' }}>{a.title}</div>
              <div style={{ fontSize: '0.7rem', color: '#7a6e58' }}>{a.category} · {a.year}</div>
            </div>
            <div className="admin-list-item-actions">
              <button className="admin-btn admin-btn-secondary admin-btn-xs" onClick={() => startEdit(i)}>✎</button>
              <button className="admin-btn admin-btn-danger admin-btn-xs" onClick={() => setDeleteIdx(i)}>✕</button>
            </div>
          </div>
        ))
      )}

      {deleteIdx !== null && (
        <ConfirmModal title="Delete Achievement" message={`Remove "${items[deleteIdx]?.title}"?`} confirmLabel="Delete" confirmDanger onConfirm={confirmDelete} onCancel={() => setDeleteIdx(null)} />
      )}
    </div>
  );
}
