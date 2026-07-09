// src/admin/pages/editors/OfficersEditor.tsx
import { useState, useEffect } from 'react';
import { showToast } from '../../components/Toast';
import { fileToBase64 } from '../../store/adminStore';
import ConfirmModal from '../../components/ConfirmModal';

interface Officer { name: string; rank: string; tenure: string; bio: string; contribution: string; image: string; }

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave: (section: string, data: any) => void;
}

export default function OfficersEditor({ data, onSave }: Props) {
  const [officers, setOfficers] = useState<Officer[]>([]);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);
  const [form, setForm] = useState<Officer>({ name: '', rank: '', tenure: '', bio: '', contribution: '', image: '' });

  useEffect(() => {
    setOfficers(data.commandingOfficers || []);
  }, [data]);

  const handleSave = () => {
    onSave('commandingOfficers', officers);
    showToast('Officers saved', 'success');
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setForm(prev => ({ ...prev, image: base64 }));
    }
  };

  const startEdit = (idx: number) => {
    setEditIdx(idx);
    setForm({ ...officers[idx] });
  };

  const startAdd = () => {
    setEditIdx(-1);
    setForm({ name: '', rank: '', tenure: '', bio: '', contribution: '', image: '' });
  };

  const saveForm = () => {
    if (!form.name.trim()) { showToast('Name is required', 'error'); return; }
    if (editIdx === -1) {
      setOfficers([...officers, form]);
    } else if (editIdx !== null) {
      const next = [...officers];
      next[editIdx] = form;
      setOfficers(next);
    }
    setEditIdx(null);
    setForm({ name: '', rank: '', tenure: '', bio: '', contribution: '', image: '' });
  };

  const confirmDelete = () => {
    if (deleteIdx !== null) {
      setOfficers(officers.filter((_, i) => i !== deleteIdx));
      setDeleteIdx(null);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: '1rem', fontWeight: 700, color: '#d4a017' }}>
          Commanding Officers ({officers.length})
        </h3>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={startAdd}>+ Add Officer</button>
          <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={handleSave}>💾 Save</button>
        </div>
      </div>

      {/* Edit Form */}
      {editIdx !== null && (
        <div className="admin-card" style={{ marginBottom: '1.25rem', borderColor: 'rgba(212,160,23,0.35)' }}>
          <h4 style={{ fontWeight: 600, color: '#e4dcc8', marginBottom: '1rem', fontSize: '0.9rem' }}>
            {editIdx === -1 ? '✚ Add New Officer' : `✎ Edit: ${form.name}`}
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div className="admin-form-group">
              <label className="admin-label">Name</label>
              <input className="admin-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Full name" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Rank</label>
              <input className="admin-input" value={form.rank} onChange={e => setForm({ ...form, rank: e.target.value })} placeholder="e.g., Colonel" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Tenure</label>
              <input className="admin-input" value={form.tenure} onChange={e => setForm({ ...form, tenure: e.target.value })} placeholder="e.g., 2010 – 2014" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Image</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input className="admin-input" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="Path or upload" style={{ flex: 1 }} />
                <label className="admin-btn admin-btn-secondary admin-btn-sm" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  📁 Upload
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                </label>
              </div>
            </div>
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Bio</label>
            <textarea className="admin-textarea" value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} placeholder="Brief biography" />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Key Contribution</label>
            <textarea className="admin-textarea" value={form.contribution} onChange={e => setForm({ ...form, contribution: e.target.value })} placeholder="Key contribution to the regiment" style={{ minHeight: 60 }} />
          </div>
          {form.image && (
            <div style={{ marginBottom: '0.75rem' }}>
              <img src={form.image} alt="Preview" className="admin-image-preview" style={{ maxHeight: 150, width: 'auto' }} />
            </div>
          )}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={saveForm}>
              {editIdx === -1 ? 'Add Officer' : 'Update Officer'}
            </button>
            <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={() => setEditIdx(null)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Officers list */}
      {officers.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty-icon">👤</div>
          <div className="admin-empty-text">No commanding officers added yet.</div>
        </div>
      ) : (
        officers.map((o, i) => (
          <div key={i} className="admin-list-item" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {o.image && (
              <img src={o.image} alt={o.name} style={{ width: 56, height: 56, borderRadius: 8, objectFit: 'cover', border: '1px solid rgba(212,160,23,0.15)', flexShrink: 0 }} />
            )}
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, color: '#e4dcc8', fontSize: '0.85rem' }}>{o.name}</div>
              <div style={{ fontSize: '0.72rem', color: '#7a6e58' }}>{o.rank} · {o.tenure}</div>
            </div>
            <div className="admin-list-item-actions">
              <button className="admin-btn admin-btn-secondary admin-btn-xs" onClick={() => startEdit(i)}>✎ Edit</button>
              <button className="admin-btn admin-btn-danger admin-btn-xs" onClick={() => setDeleteIdx(i)}>✕</button>
            </div>
          </div>
        ))
      )}

      {deleteIdx !== null && (
        <ConfirmModal
          title="Delete Officer"
          message={`Remove ${officers[deleteIdx]?.name}?`}
          confirmLabel="Delete"
          confirmDanger
          onConfirm={confirmDelete}
          onCancel={() => setDeleteIdx(null)}
        />
      )}
    </div>
  );
}
