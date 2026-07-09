// src/admin/pages/UnitEditor.tsx
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUnitData, updateUnitSection, UNIT_LABELS, UNIT_ICONS, UNIT_COLORS, DEFAULT_SUBUNITS } from '../store/adminStore';
import type { UnitKey } from '../store/adminStore';
import MetaEditor from './editors/MetaEditor';
import HistoryEditor from './editors/HistoryEditor';
import OfficersEditor from './editors/OfficersEditor';
import GalleryEditor from './editors/GalleryEditor';
import VideosEditor from './editors/VideosEditor';
import AchievementsEditor from './editors/AchievementsEditor';
import GaonBurasEditor from './editors/GaonBurasEditor';

const TABS = [
  { id: 'meta', label: 'Meta Info', icon: '📋' },
  { id: 'history', label: 'History', icon: '📜' },
  { id: 'officers', label: 'Officers', icon: '👤' },
  { id: 'gallery', label: 'Gallery', icon: '🖼️' },
  { id: 'videos', label: 'Videos', icon: '🎬' },
  { id: 'achievements', label: 'Awards', icon: '🏆' },
  { id: 'gaonburas', label: 'Gaon Buras', icon: '👳' },
];

export default function UnitEditor() {
  const { unitKey } = useParams<{ unitKey: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('meta');
  const [refreshKey, setRefreshKey] = useState(0);

  const key = unitKey as UnitKey;
  if (!UNIT_LABELS[key]) return <div>Unit not found</div>;

  const data = getUnitData(key);
  const subUnits = DEFAULT_SUBUNITS[key];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSave = (section: string, sectionData: any) => {
    updateUnitSection(key, section, sectionData);
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div key={refreshKey}>
      {/* Unit Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
        <div style={{
          width: 48, height: 48, borderRadius: 14,
          background: `linear-gradient(135deg, ${UNIT_COLORS[key]}, ${UNIT_COLORS[key]}80)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem'
        }}>
          {UNIT_ICONS[key]}
        </div>
        <div>
          <div className="admin-page-title" style={{ marginBottom: 0 }}>{UNIT_LABELS[key]}</div>
          <div style={{ fontSize: '0.72rem', color: '#7a6e58' }}>Parent Unit Editor</div>
        </div>
      </div>

      {/* Sub-units quick access */}
      {subUnits.length > 0 && (
        <div className="admin-card" style={{ marginBottom: '1.5rem', marginTop: '1rem' }}>
          <div style={{ fontSize: '0.72rem', color: '#7a6e58', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem', fontWeight: 600 }}>
            Sub-Units — Click to edit individually
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {subUnits.map(sub => (
              <button
                key={sub.id}
                className="admin-btn admin-btn-secondary admin-btn-sm"
                onClick={() => navigate(`/admin/unit/${key}/sub/${sub.id}`)}
              >
                {sub.shortName}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="admin-tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`admin-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Editor Content */}
      {activeTab === 'meta' && <MetaEditor data={data} onSave={handleSave} />}
      {activeTab === 'history' && <HistoryEditor data={data} onSave={handleSave} />}
      {activeTab === 'officers' && <OfficersEditor data={data} onSave={handleSave} />}
      {activeTab === 'gallery' && <GalleryEditor data={data} onSave={handleSave} />}
      {activeTab === 'videos' && <VideosEditor data={data} onSave={handleSave} />}
      {activeTab === 'achievements' && <AchievementsEditor data={data} onSave={handleSave} />}
      {activeTab === 'gaonburas' && <GaonBurasEditor data={data} onSave={handleSave} />}
    </div>
  );
}
