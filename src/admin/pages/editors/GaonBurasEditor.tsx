// src/admin/pages/editors/GaonBurasEditor.tsx
import { useState, useEffect } from 'react';
import { showToast } from '../../components/Toast';
import ConfirmModal from '../../components/ConfirmModal';

interface GaonBura { name: string; tribe: string; era: string; role: string; contribution: string; }

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave: (section: string, data: any) => void;
}

export default function GaonBurasEditor({ data, onSave }: Props) {
  const [items, setItems] = useState<GaonBura[]>([]);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);
  const [form, setForm] = useState<GaonBura>({ name: '', tribe: '', era: '', role: '', contribution: '' });

  useEffect(() => {
    setItems(data.gaonBuras || []);
  }, [data]);

  const handleSave = () => {
    onSave('gaonBuras', items);
    showToast('Gaon Buras saved', 'success');
  };

  const startAdd = () => {
    setEditIdx(-1);
    setForm({ name: '', tribe: '', era: '', role: '', contribution: '' });
  };

  const startEdit = (idx: number) => {
    setEditIdx(idx);
    setForm({ ...items[idx] });
  };

  const saveForm = () => {
    if (!form.name.trim()) { showToast('Name is required', 'error'); return; }
    let nextItems;
    if (editIdx === -1) {
      nextItems = [...items, form];
    } else if (editIdx !== null) {
      nextItems = [...items]; nextItems[editIdx] = form;
    }
    if (nextItems) {
      setItems(nextItems);
      onSave('gaonBuras', nextItems);
    }
    setEditIdx(null);
  };

  const confirmDelete = () => {
    if (deleteIdx !== null) {
      const nextItems = items.filter((_, i) => i !== deleteIdx);
      setItems(nextItems);
      onSave('gaonBuras', nextItems);
      setDeleteIdx(null);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: '1rem', fontWeight: 700, color: '#d4a017' }}>
          Gaon Buras ({items.length})
        </h3>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={startAdd}>+ Add</button>
          <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={handleSave}>💾 Save</button>
        </div>
      </div>

      {editIdx !== null && (
        <div className="admin-card" style={{ marginBottom: '1.25rem', borderColor: 'rgba(212,160,23,0.35)' }}>
          <h4 style={{ fontWeight: 600, color: '#e4dcc8', marginBottom: '1rem', fontSize: '0.9rem' }}>
            {editIdx === -1 ? '✚ Add Gaon Bura' : '✎ Edit Gaon Bura'}
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div className="admin-form-group">
              <label className="admin-label">Name</label>
              <input className="admin-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Full name" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Tribe</label>
              <input className="admin-input" value={form.tribe} onChange={e => setForm({ ...form, tribe: e.target.value })} placeholder="e.g., Naga Community" />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div className="admin-form-group">
              <label className="admin-label">Era</label>
              <input className="admin-input" value={form.era} onChange={e => setForm({ ...form, era: e.target.value })} placeholder="e.g., 1942 – 1950" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Role</label>
              <input className="admin-input" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} placeholder="Community role" />
            </div>
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Contribution</label>
            <textarea className="admin-textarea" value={form.contribution} onChange={e => setForm({ ...form, contribution: e.target.value })} placeholder="Key contribution" />
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
          <div className="admin-empty-icon">👳</div>
          <div className="admin-empty-text">No Gaon Buras added yet.</div>
        </div>
      ) : (
        items.map((gb, i) => (
          <div key={i} className="admin-list-item">
            <div className="admin-list-item-header">
              <div>
                <div className="admin-list-item-title">{gb.name}</div>
                <div style={{ fontSize: '0.7rem', color: '#7a6e58' }}>{gb.tribe} · {gb.era}</div>
              </div>
              <div className="admin-list-item-actions">
                <button className="admin-btn admin-btn-secondary admin-btn-xs" onClick={() => startEdit(i)}>✎</button>
                <button className="admin-btn admin-btn-danger admin-btn-xs" onClick={() => setDeleteIdx(i)}>✕</button>
              </div>
            </div>
          </div>
        ))
      )}

      {deleteIdx !== null && (
        <ConfirmModal title="Delete Gaon Bura" message={`Remove "${items[deleteIdx]?.name}"?`} confirmLabel="Delete" confirmDanger onConfirm={confirmDelete} onCancel={() => setDeleteIdx(null)} />
      )}
    </div>
  );
}
