// src/admin/pages/editors/VideosEditor.tsx
import { useState, useEffect } from 'react';
import { showToast } from '../../components/Toast';
import ConfirmModal from '../../components/ConfirmModal';

interface VideoItem { title: string; description: string; youtubeId: string; thumbnail: string; duration: string; year: string; featured: boolean; }

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave: (section: string, data: any) => void;
}

function extractYouTubeId(input: string): string {
  // If it's already just an ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;
  // Try to extract from URL
  const match = input.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : input;
}

export default function VideosEditor({ data, onSave }: Props) {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);
  const [form, setForm] = useState<VideoItem>({ title: '', description: '', youtubeId: '', thumbnail: '', duration: '', year: '', featured: false });

  useEffect(() => {
    setVideos(data.videos || []);
  }, [data]);

  const handleSave = () => {
    onSave('videos', videos);
    showToast('Videos saved', 'success');
  };

  const handleYoutubeInput = (val: string) => {
    const id = extractYouTubeId(val);
    setForm(prev => ({
      ...prev,
      youtubeId: id,
      thumbnail: prev.thumbnail || `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
    }));
  };

  const startAdd = () => {
    setEditIdx(-1);
    setForm({ title: '', description: '', youtubeId: '', thumbnail: '', duration: '', year: '', featured: false });
  };

  const startEdit = (idx: number) => {
    setEditIdx(idx);
    setForm({ ...videos[idx] });
  };

  const saveForm = () => {
    if (!form.title.trim() || !form.youtubeId.trim()) {
      showToast('Title and YouTube ID are required', 'error');
      return;
    }
    let nextVideos;
    if (editIdx === -1) {
      nextVideos = [...videos, form];
    } else if (editIdx !== null) {
      nextVideos = [...videos]; nextVideos[editIdx] = form;
    }
    if (nextVideos) {
      setVideos(nextVideos);
      onSave('videos', nextVideos);
    }
    setEditIdx(null);
  };

  const confirmDelete = () => {
    if (deleteIdx !== null) {
      const nextVideos = videos.filter((_, i) => i !== deleteIdx);
      setVideos(nextVideos);
      onSave('videos', nextVideos);
      setDeleteIdx(null);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: '1rem', fontWeight: 700, color: '#d4a017' }}>
          Videos ({videos.length})
        </h3>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={startAdd}>+ Add Video</button>
          <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={handleSave}>💾 Save</button>
        </div>
      </div>

      {/* Edit Form */}
      {editIdx !== null && (
        <div className="admin-card" style={{ marginBottom: '1.25rem', borderColor: 'rgba(212,160,23,0.35)' }}>
          <h4 style={{ fontWeight: 600, color: '#e4dcc8', marginBottom: '1rem', fontSize: '0.9rem' }}>
            {editIdx === -1 ? '✚ Add New Video' : '✎ Edit Video'}
          </h4>
          <div className="admin-form-group">
            <label className="admin-label">Title</label>
            <input className="admin-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Video title" />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">YouTube Link or ID</label>
            <input className="admin-input" value={form.youtubeId} onChange={e => handleYoutubeInput(e.target.value)} placeholder="Paste YouTube URL or video ID" />
            <div style={{ fontSize: '0.65rem', color: '#5a5040', marginTop: '0.25rem' }}>
              Paste a full URL like https://youtube.com/watch?v=xxx or just the ID
            </div>
          </div>
          {form.youtubeId && (
            <div style={{ marginBottom: '0.75rem' }}>
              <img src={`https://img.youtube.com/vi/${form.youtubeId}/mqdefault.jpg`} alt="Thumbnail" className="admin-image-preview" style={{ maxHeight: 150 }} />
            </div>
          )}
          <div className="admin-form-group">
            <label className="admin-label">Description</label>
            <textarea className="admin-textarea" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Video description" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
            <div className="admin-form-group">
              <label className="admin-label">Duration</label>
              <input className="admin-input" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} placeholder="e.g., 4:14" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Year</label>
              <input className="admin-input" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} placeholder="e.g., 2023" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Featured</label>
              <label className="admin-toggle" style={{ marginTop: '0.35rem' }}>
                <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} />
                <span className="admin-toggle-slider" />
              </label>
            </div>
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Custom Thumbnail (optional)</label>
            <input className="admin-input" value={form.thumbnail} onChange={e => setForm({ ...form, thumbnail: e.target.value })} placeholder="Leave empty to use YouTube thumbnail" />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={saveForm}>
              {editIdx === -1 ? 'Add Video' : 'Update Video'}
            </button>
            <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={() => setEditIdx(null)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Videos list */}
      {videos.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty-icon">🎬</div>
          <div className="admin-empty-text">No videos added yet.</div>
        </div>
      ) : (
        videos.map((v, i) => (
          <div key={i} className="admin-list-item" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <img src={v.thumbnail || `https://img.youtube.com/vi/${v.youtubeId}/mqdefault.jpg`} alt={v.title}
              style={{ width: 120, height: 68, borderRadius: 6, objectFit: 'cover', border: '1px solid rgba(212,160,23,0.15)', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: '0.82rem', color: '#e4dcc8' }}>
                {v.title}
                {v.featured && <span className="admin-badge admin-badge-gold" style={{ marginLeft: '0.5rem' }}>Featured</span>}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#7a6e58' }}>{v.duration} · {v.year} · ID: {v.youtubeId}</div>
            </div>
            <div className="admin-list-item-actions">
              <button className="admin-btn admin-btn-secondary admin-btn-xs" onClick={() => startEdit(i)}>✎ Edit</button>
              <button className="admin-btn admin-btn-danger admin-btn-xs" onClick={() => setDeleteIdx(i)}>✕</button>
            </div>
          </div>
        ))
      )}

      {deleteIdx !== null && (
        <ConfirmModal title="Delete Video" message={`Remove "${videos[deleteIdx]?.title}"?`} confirmLabel="Delete" confirmDanger onConfirm={confirmDelete} onCancel={() => setDeleteIdx(null)} />
      )}
    </div>
  );
}
