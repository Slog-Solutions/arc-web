// src/admin/pages/editors/GalleryEditor.tsx
import { useState, useEffect } from 'react';
import { showToast } from '../../components/Toast';
import { fileToBase64 } from '../../store/adminStore';
import ConfirmModal from '../../components/ConfirmModal';

interface GalleryItem { id: number; src: string; caption: string; category: string; year: string; history?: string; }

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave: (section: string, data: any) => void;
}

export default function GalleryEditor({ data, onSave }: Props) {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);
  const [form, setForm] = useState<GalleryItem>({ id: 0, src: '', caption: '', category: '', year: '', history: '' });

  useEffect(() => {
    setItems(data.gallery || []);
  }, [data]);

  const handleSave = () => {
    onSave('gallery', items);
    showToast('Gallery saved', 'success');
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setForm(prev => ({ ...prev, src: base64 }));
    }
  };

  const startAdd = () => {
    setEditIdx(-1);
    setForm({ id: Date.now(), src: '', caption: '', category: '', year: '', history: '' });
  };

  const startEdit = (idx: number) => {
    setEditIdx(idx);
    setForm({ ...items[idx] });
  };

  const saveForm = () => {
    if (!form.src.trim()) { showToast('Image source is required', 'error'); return; }
    let nextItems;
    if (editIdx === -1) {
      nextItems = [...items, form];
    } else if (editIdx !== null) {
      nextItems = [...items]; nextItems[editIdx] = form;
    }
    if (nextItems) {
      setItems(nextItems);
      onSave('gallery', nextItems);
    }
    setEditIdx(null);
  };

  const confirmDelete = () => {
    if (deleteIdx !== null) {
      const nextItems = items.filter((_, i) => i !== deleteIdx);
      setItems(nextItems);
      onSave('gallery', nextItems);
      setDeleteIdx(null);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: '1rem', fontWeight: 700, color: '#d4a017' }}>
          Gallery ({items.length} images)
        </h3>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={startAdd}>+ Add Image</button>
          <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={handleSave}>💾 Save</button>
        </div>
      </div>

      {/* Edit Form */}
      {editIdx !== null && (
        <div className="admin-card" style={{ marginBottom: '1.25rem', borderColor: 'rgba(212,160,23,0.35)' }}>
          <h4 style={{ fontWeight: 600, color: '#e4dcc8', marginBottom: '1rem', fontSize: '0.9rem' }}>
            {editIdx === -1 ? '✚ Add New Image' : '✎ Edit Image'}
          </h4>
          <div className="admin-form-group">
            <label className="admin-label">Image Source</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input className="admin-input" value={form.src} onChange={e => setForm({ ...form, src: e.target.value })} placeholder="Path like /assami/... or upload" style={{ flex: 1 }} />
              <label className="admin-btn admin-btn-secondary admin-btn-sm" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                📁 Upload
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
              </label>
            </div>
          </div>
          {form.src && (
            <div style={{ marginBottom: '0.75rem' }}>
              <img src={form.src} alt="Preview" className="admin-image-preview" />
            </div>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div className="admin-form-group">
              <label className="admin-label">Caption</label>
              <input className="admin-input" value={form.caption} onChange={e => setForm({ ...form, caption: e.target.value })} placeholder="Image caption" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Category</label>
              <input className="admin-input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="e.g., Ceremonies, Operations" />
            </div>
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Year</label>
            <input className="admin-input" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} placeholder="e.g., 1944, Modern" />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">History / Description</label>
            <textarea className="admin-textarea" value={form.history || ''} onChange={e => setForm({ ...form, history: e.target.value })} placeholder="Background story for this image" />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={saveForm}>
              {editIdx === -1 ? 'Add Image' : 'Update Image'}
            </button>
            <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={() => setEditIdx(null)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Gallery grid */}
      {items.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty-icon">🖼️</div>
          <div className="admin-empty-text">No gallery items yet.</div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '0.75rem' }}>
          {items.map((item, i) => (
            <div key={item.id || i} className="admin-card" style={{ padding: '0', overflow: 'hidden' }}>
              <div style={{ height: 140, background: '#111509', overflow: 'hidden' }}>
                <img src={item.src} alt={item.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '0.75rem' }}>
                <div style={{ fontWeight: 600, fontSize: '0.78rem', color: '#e4dcc8', marginBottom: '0.25rem', lineHeight: 1.3 }}>
                  {item.caption || 'Untitled'}
                </div>
                <div style={{ fontSize: '0.65rem', color: '#7a6e58' }}>
                  {item.category} · {item.year}
                </div>
                <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.5rem' }}>
                  <button className="admin-btn admin-btn-secondary admin-btn-xs" onClick={() => startEdit(i)}>✎</button>
                  <button className="admin-btn admin-btn-danger admin-btn-xs" onClick={() => setDeleteIdx(i)}>✕</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteIdx !== null && (
        <ConfirmModal title="Delete Image" message="Remove this gallery image?" confirmLabel="Delete" confirmDanger onConfirm={confirmDelete} onCancel={() => setDeleteIdx(null)} />
      )}
    </div>
  );
}
