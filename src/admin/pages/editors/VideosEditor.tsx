// src/admin/pages/editors/VideosEditor.tsx
import { useState, useEffect, useRef } from 'react';
import { showToast } from '../../components/Toast';
import ConfirmModal from '../../components/ConfirmModal';

interface VideoItem {
  title: string;
  description: string;
  youtubeId: string;
  thumbnail: string;
  duration: string;
  year: string;
  featured: boolean;
  videoUrl?: string;
}

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
  const [videoSourceType, setVideoSourceType] = useState<'youtube' | 'local'>('youtube');
  const [isUploading, setIsUploading] = useState(false);
  
  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const triggerVideoSelect = () => videoInputRef.current?.click();
  const triggerThumbnailSelect = () => thumbnailInputRef.current?.click();
  const [form, setForm] = useState<VideoItem>({
    title: '',
    description: '',
    youtubeId: '',
    thumbnail: '',
    duration: '',
    year: '',
    featured: false,
    videoUrl: ''
  });

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

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      showToast('Uploading video to MongoDB GridFS, please wait...', 'success');
      try {
        const formData = new FormData();
        formData.append('video', file);

        const res = await fetch('/api/upload-video', {
          method: 'POST',
          body: formData,
        });

        const json = await res.json();
        if (json.success && json.url) {
          setForm(prev => ({
            ...prev,
            videoUrl: json.url,
            youtubeId: ''
          }));
          showToast('Large video file loaded successfully! Click Save in the top right to upload to MongoDB.', 'success');
        } else {
          throw new Error(json.error || 'Upload failed');
        }
      } catch (err: any) {
        console.error(err);
        showToast(`Upload failed: ${err.message || 'Server error'}`, 'error');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      showToast('Uploading custom thumbnail...', 'success');
      try {
        const formData = new FormData();
        formData.append('image', file);

        const res = await fetch('/api/upload-image', {
          method: 'POST',
          body: formData,
        });

        const json = await res.json();
        if (json.success && json.url) {
          setForm(prev => ({
            ...prev,
            thumbnail: json.url
          }));
          showToast('Thumbnail uploaded successfully!', 'success');
        } else {
          throw new Error(json.error || 'Upload failed');
        }
      } catch (err: any) {
        console.error(err);
        showToast(`Failed to upload thumbnail: ${err.message || 'Server error'}`, 'error');
      }
    }
  };

  const startAdd = () => {
    setEditIdx(-1);
    setForm({ title: '', description: '', youtubeId: '', thumbnail: '', duration: '', year: '', featured: false, videoUrl: '' });
    setVideoSourceType('youtube');
  };

  const startEdit = (idx: number) => {
    setEditIdx(idx);
    const video = videos[idx];
    setForm({ ...video });
    setVideoSourceType(video.videoUrl ? 'local' : 'youtube');
  };

  const saveForm = () => {
    if (!form.title.trim()) {
      showToast('Title is required', 'error');
      return;
    }

    const isLocal = videoSourceType === 'local';
    const finalForm = { ...form };

    if (isLocal) {
      if (!finalForm.videoUrl?.trim()) {
        showToast('Video File or Direct Video URL is required', 'error');
        return;
      }
      if (!finalForm.thumbnail.trim()) {
        showToast('Thumbnail is required for local videos', 'error');
        return;
      }
      finalForm.youtubeId = '';
    } else {
      if (!finalForm.youtubeId.trim()) {
        showToast('YouTube ID is required', 'error');
        return;
      }
      finalForm.videoUrl = '';
      if (!finalForm.thumbnail.trim()) {
        finalForm.thumbnail = `https://img.youtube.com/vi/${finalForm.youtubeId}/mqdefault.jpg`;
      }
    }

    let nextVideos;
    if (editIdx === -1) {
      nextVideos = [...videos, finalForm];
    } else if (editIdx !== null) {
      nextVideos = [...videos];
      nextVideos[editIdx] = finalForm;
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
            <label className="admin-label">Video Source Type</label>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', color: '#e4dcc8', fontSize: '0.8rem' }}>
                <input
                  type="radio"
                  name="videoSourceType"
                  checked={videoSourceType === 'youtube'}
                  onChange={() => setVideoSourceType('youtube')}
                />
                YouTube Video
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', color: '#e4dcc8', fontSize: '0.8rem' }}>
                <input
                  type="radio"
                  name="videoSourceType"
                  checked={videoSourceType === 'local'}
                  onChange={() => setVideoSourceType('local')}
                />
                Local Video File / Direct URL
              </label>
            </div>
          </div>

          {videoSourceType === 'youtube' ? (
            <div className="admin-form-group">
              <label className="admin-label">YouTube Link or ID</label>
              <input className="admin-input" value={form.youtubeId} onChange={e => handleYoutubeInput(e.target.value)} placeholder="Paste YouTube URL or video ID" />
              <div style={{ fontSize: '0.65rem', color: '#5a5040', marginTop: '0.25rem' }}>
                Paste a full URL like https://youtube.com/watch?v=xxx or just the ID
              </div>
            </div>
          ) : (
            <div className="admin-form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <label className="admin-label">Direct Video URL or path</label>
                <input
                  className="admin-input"
                  value={form.videoUrl || ''}
                  onChange={e => setForm({ ...form, videoUrl: e.target.value, youtubeId: '' })}
                  placeholder="e.g. /videos/myvideo.mp4 or https://site.com/video.mp4"
                />
                <div style={{ fontSize: '0.65rem', color: '#5a5040', marginTop: '0.25rem' }}>
                  Enter a hosted URL path, or upload a file below.
                </div>
              </div>

              <div style={{ border: '1px dashed rgba(212,160,23,0.3)', padding: '1.25rem', borderRadius: 8, backgroundColor: '#0e140f', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                <label className="admin-label" style={{ marginBottom: '0rem', color: '#d4a017' }}>Upload Local Video File</label>
                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  disabled={isUploading}
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  onClick={triggerVideoSelect}
                  disabled={isUploading}
                  style={{
                    padding: '0.5rem 1.25rem',
                    border: '1px solid #d4a017',
                    borderRadius: '4px',
                    background: 'transparent',
                    color: '#d4a017',
                    cursor: isUploading ? 'not-allowed' : 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s'
                  }}
                >
                  📁 Choose Video File
                </button>
                <div style={{ fontSize: '0.7rem', color: '#8a7a60', textAlign: 'center', wordBreak: 'break-all' }}>
                  {form.videoUrl ? `File Loaded: ${form.videoUrl.startsWith('data:') ? 'Local file ready' : form.videoUrl}` : 'No file chosen'}
                </div>
                {isUploading && (
                  <div style={{ color: '#C69B53', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="spinner-border" style={{ width: '12px', height: '12px', border: '2px solid #C69B53', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'spin 1s linear infinite' }}></span>
                    ⚡ Syncing high-capacity file to MongoDB Atlas...
                  </div>
                )}
              </div>

              {form.videoUrl && (
                <div style={{ border: '1px solid rgba(212,160,23,0.15)', borderRadius: 8, padding: '0.5rem' }}>
                  <div style={{ fontSize: '0.7rem', color: '#d4a017', marginBottom: '0.25rem' }}>Loaded Video Preview:</div>
                  <video src={form.videoUrl} controls style={{ width: '100%', maxHeight: 150, borderRadius: 6 }} />
                </div>
              )}
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
             <div className="admin-form-group" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
               <label className="admin-label">Featured</label>
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                 <label className="admin-toggle">
                   <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} />
                   <span className="admin-toggle-slider" />
                 </label>
                 <span style={{ fontSize: '0.75rem', color: form.featured ? '#d4a017' : '#8a7a60', fontWeight: 600 }}>
                   {form.featured ? 'Yes' : 'No'}
                 </span>
               </div>
             </div>
          </div>

          <div className="admin-form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div>
              <label className="admin-label">Thumbnail URL {videoSourceType === 'youtube' && '(optional)'}</label>
              <input className="admin-input" value={form.thumbnail} onChange={e => setForm({ ...form, thumbnail: e.target.value })} placeholder="Thumbnail image URL (or upload below)" />
              {videoSourceType === 'youtube' && (
                <div style={{ fontSize: '0.65rem', color: '#5a5040', marginTop: '0.25rem' }}>
                  Leave empty to use YouTube default thumbnail.
                </div>
              )}
            </div>

            <div style={{ border: '1px dashed rgba(212,160,23,0.3)', padding: '1.25rem', borderRadius: 8, backgroundColor: '#0e140f', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
              <label className="admin-label" style={{ marginBottom: '0rem', color: '#d4a017' }}>Upload Custom Thumbnail Image</label>
              <input
                ref={thumbnailInputRef}
                type="file"
                accept="image/*"
                onChange={handleThumbnailUpload}
                style={{ display: 'none' }}
              />
              <button
                type="button"
                onClick={triggerThumbnailSelect}
                style={{
                  padding: '0.5rem 1.25rem',
                  border: '1px solid #d4a017',
                  borderRadius: '4px',
                  background: 'transparent',
                  color: '#d4a017',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s'
                }}
              >
                🖼️ Choose Thumbnail Image
              </button>
              <div style={{ fontSize: '0.7rem', color: '#8a7a60', textAlign: 'center', wordBreak: 'break-all' }}>
                {form.thumbnail ? 'Thumbnail Image Loaded' : 'No image chosen'}
              </div>
            </div>
          </div>

          {form.thumbnail && (
            <div style={{ marginBottom: '0.75rem' }}>
              <img src={form.thumbnail} alt="Thumbnail Preview" className="admin-image-preview" style={{ maxHeight: 120, objectFit: 'contain' }} />
            </div>
          )}

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
              <div style={{ fontSize: '0.7rem', color: '#7a6e58' }}>
                {v.duration} · {v.year} · {v.videoUrl ? 'Local / Direct Video' : `YouTube ID: ${v.youtubeId}`}
              </div>
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
