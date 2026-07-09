// src/admin/pages/editors/MetaEditor.tsx
import { useState, useEffect } from 'react';
import { showToast } from '../../components/Toast';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave: (section: string, data: any) => void;
}

export default function MetaEditor({ data, onSave }: Props) {
  const [meta, setMeta] = useState<Record<string, string>>(data.meta || {});

  useEffect(() => {
    setMeta(data.meta || {});
  }, [data]);

  const handleChange = (key: string, value: string) => {
    setMeta(prev => ({ ...prev, [key]: value }));
  };

  const handleAddField = () => {
    const key = prompt('Enter field name (e.g., "motto", "headquarters"):');
    if (key && !meta[key]) {
      setMeta(prev => ({ ...prev, [key]: '' }));
    }
  };

  const handleRemoveField = (key: string) => {
    const next = { ...meta };
    delete next[key];
    setMeta(next);
  };

  const handleSave = () => {
    onSave('meta', meta);
    showToast('Meta information saved', 'success');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: '1rem', fontWeight: 700, color: '#d4a017' }}>
          Unit Meta Information
        </h3>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={handleAddField}>+ Add Field</button>
          <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={handleSave}>💾 Save</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '0.75rem' }}>
        {Object.entries(meta).map(([key, value]) => (
          <div key={key} className="admin-list-item">
            <div className="admin-list-item-header">
              <label className="admin-label" style={{ marginBottom: 0, textTransform: 'capitalize' }}>
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              {!['name', 'shortName'].includes(key) && (
                <button className="admin-btn admin-btn-danger admin-btn-xs" onClick={() => handleRemoveField(key)}>✕</button>
              )}
            </div>
            <input
              type="text"
              className="admin-input"
              value={typeof value === 'string' ? value : JSON.stringify(value)}
              onChange={e => handleChange(key, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
