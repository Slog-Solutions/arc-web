// src/admin/pages/AdminDashboard.tsx
import { useNavigate } from 'react-router-dom';
import { ALL_UNIT_KEYS, UNIT_LABELS, UNIT_SHORT, UNIT_ICONS, UNIT_COLORS, getUnitStats, DEFAULT_SUBUNITS } from '../store/adminStore';

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="admin-page-title">Museum Dashboard</div>
      <div className="admin-page-subtitle">Overview of all units and their content</div>

      {/* Unit cards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '1.25rem' }}>
        {ALL_UNIT_KEYS.map(key => {
          const stats = getUnitStats(key);
          const subUnits = DEFAULT_SUBUNITS[key];

          return (
            <div key={key} className="admin-card" style={{ cursor: 'pointer' }} onClick={() => navigate(`/admin/unit/${key}`)}>
              <div className="admin-card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: `linear-gradient(135deg, ${UNIT_COLORS[key]}, ${UNIT_COLORS[key]}80)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem'
                  }}>
                    {UNIT_ICONS[key]}
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: '0.95rem', color: '#f0ebe0' }}>
                      {UNIT_SHORT[key]}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#7a6e58' }}>{UNIT_LABELS[key]}</div>
                  </div>
                </div>
                {subUnits.length > 0 && (
                  <span className="admin-badge admin-badge-gold">{subUnits.length} Sub-Units</span>
                )}
              </div>

              {/* Stats row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginTop: '0.75rem' }}>
                <div className="admin-stat-card">
                  <div className="admin-stat-value">{stats.gallery}</div>
                  <div className="admin-stat-label">Gallery</div>
                </div>
                <div className="admin-stat-card">
                  <div className="admin-stat-value">{stats.videos}</div>
                  <div className="admin-stat-label">Videos</div>
                </div>
                <div className="admin-stat-card">
                  <div className="admin-stat-value">{stats.officers}</div>
                  <div className="admin-stat-label">Officers</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginTop: '0.5rem' }}>
                <div className="admin-stat-card">
                  <div className="admin-stat-value">{stats.achievements}</div>
                  <div className="admin-stat-label">Awards</div>
                </div>
                <div className="admin-stat-card">
                  <div className="admin-stat-value">{stats.timelineEntries}</div>
                  <div className="admin-stat-label">Timeline</div>
                </div>
                <div className="admin-stat-card">
                  <div className="admin-stat-value">{stats.gaonBuras}</div>
                  <div className="admin-stat-label">Gaon Buras</div>
                </div>
              </div>

              {/* Sub-units preview */}
              {subUnits.length > 0 && (
                <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(212,160,23,0.08)' }}>
                  <div style={{ fontSize: '0.65rem', color: '#5a5040', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>
                    Sub-Units
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {subUnits.slice(0, 8).map(sub => (
                      <span key={sub.id} className="admin-badge admin-badge-gold" style={{ fontSize: '0.6rem' }}>
                        {sub.shortName}
                      </span>
                    ))}
                    {subUnits.length > 8 && (
                      <span className="admin-badge admin-badge-gold" style={{ fontSize: '0.6rem' }}>
                        +{subUnits.length - 8} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div style={{ marginTop: '1rem', textAlign: 'right' }}>
                <span className="admin-btn admin-btn-secondary admin-btn-sm">Edit Unit →</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
