// src/admin/pages/SubUnitEditor.tsx
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getMergedSubUnitData, getSubUnitData, updateSubUnitSection, resetSubUnitData,
  UNIT_LABELS, UNIT_ICONS, UNIT_COLORS, DEFAULT_SUBUNITS,
} from '../store/adminStore';
import type { UnitKey } from '../store/adminStore';
import { showToast } from '../components/Toast';
import ConfirmModal from '../components/ConfirmModal';
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
  { id: 'gaonburas', label: 'Gaon Buras Commanding Officer', icon: '👳' },
];

export default function SubUnitEditor() {
  const { unitKey, subUnitId } = useParams<{ unitKey: string; subUnitId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('meta');
  const [refreshKey, setRefreshKey] = useState(0);
  const [showResetModal, setShowResetModal] = useState(false);

  const key = unitKey as UnitKey;
  if (!UNIT_LABELS[key] || !subUnitId) return <div>Unit not found</div>;

  const subUnits = DEFAULT_SUBUNITS[key];
  const subUnit = subUnits.find(s => s.id === subUnitId);
  if (!subUnit) return <div>Sub-unit not found</div>;

  // Merged data: sub-unit overrides on top of parent
  const data = getMergedSubUnitData(key, subUnitId);
  const subData = getSubUnitData(key, subUnitId);
  const hasCustomData = Object.keys(subData).length > 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSave = (section: string, sectionData: any) => {
    updateSubUnitSection(key, subUnitId, section, sectionData);
    setRefreshKey(prev => prev + 1);
  };

  const handleReset = () => {
    resetSubUnitData(key, subUnitId);
    setShowResetModal(false);
    setRefreshKey(prev => prev + 1);
    showToast(`${subUnit.shortName} reset to parent data`, 'success');
  };

  return (
    <div key={refreshKey}>
      {/* Sub-unit Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
        <div style={{
          width: 48, height: 48, borderRadius: 14,
          background: `linear-gradient(135deg, ${UNIT_COLORS[key]}, ${UNIT_COLORS[key]}80)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem'
        }}>
          {UNIT_ICONS[key]}
        </div>
        <div style={{ flex: 1 }}>
          <div className="admin-page-title" style={{ marginBottom: 0 }}>{subUnit.shortName}</div>
          <div style={{ fontSize: '0.72rem', color: '#7a6e58' }}>
            {subUnit.name} · Sub-Unit of {UNIT_LABELS[key]}
          </div>
        </div>
        <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={() => navigate(`/admin/unit/${key}`)}>
          ← Back to {UNIT_LABELS[key]}
        </button>
      </div>

      {/* Info banner */}
      <div className="admin-card" style={{ marginBottom: '1.25rem', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '0.78rem', color: '#c0ad90' }}>
            {hasCustomData ? (
              <><span className="admin-badge admin-badge-green">Custom Data</span> This sub-unit has custom overrides.</>
            ) : (
              <><span className="admin-badge admin-badge-gold">Inheriting</span> Using parent unit data. Edit here to create custom overrides.</>
            )}
          </div>
          <div style={{ fontSize: '0.65rem', color: '#5a5040', marginTop: '0.25rem' }}>
            Est. {subUnit.established} · {subUnit.location}
          </div>
        </div>
        {hasCustomData && (
          <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => setShowResetModal(true)}>
            Reset to Parent
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`admin-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon} {tab.label}
            {subData[tab.id === 'officers' ? 'commandingOfficers' : tab.id === 'gaonburas' ? 'gaonBuras' : tab.id] && (
              <span style={{ marginLeft: '0.35rem', fontSize: '0.5rem', color: '#84ad54' }}>●</span>
            )}
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

      {showResetModal && (
        <ConfirmModal
          title="Reset Sub-Unit Data"
          message={`This will remove all custom data for ${subUnit.shortName} and revert to the parent unit (${UNIT_LABELS[key]}) data.`}
          confirmLabel="Reset"
          confirmDanger
          onConfirm={handleReset}
          onCancel={() => setShowResetModal(false)}
        />
      )}
    </div>
  );
}
