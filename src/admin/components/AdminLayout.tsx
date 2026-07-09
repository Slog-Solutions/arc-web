// src/admin/components/AdminLayout.tsx
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { logout, getUsername } from '../store/authStore';
import { ALL_UNIT_KEYS, UNIT_LABELS, UNIT_SHORT, UNIT_ICONS, UNIT_COLORS, DEFAULT_SUBUNITS } from '../store/adminStore';
import type { UnitKey } from '../store/adminStore';
import ToastContainer from './Toast';
import { useState } from 'react';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const username = getUsername();
  const [expandedUnit, setExpandedUnit] = useState<UnitKey | null>(null);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const isActive = (path: string) => location.pathname === path;
  const isUnitActive = (key: UnitKey) => location.pathname.startsWith(`/admin/unit/${key}`);

  const toggleUnit = (key: UnitKey) => {
    if (expandedUnit === key) {
      setExpandedUnit(null);
    } else {
      setExpandedUnit(key);
    }
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-logo">🏛️</div>
          <div>
            <div className="admin-sidebar-title">ARC Admin</div>
            <div className="admin-sidebar-subtitle">Museum Control Panel</div>
          </div>
        </div>

        <nav className="admin-sidebar-nav">
          {/* Dashboard */}
          <div className="admin-nav-group">
            <div className="admin-nav-group-label">Navigation</div>
            <div
              className={`admin-nav-link ${isActive('/admin/dashboard') ? 'active' : ''}`}
              onClick={() => navigate('/admin/dashboard')}
            >
              <span className="nav-icon">📊</span>
              <span>Dashboard</span>
            </div>
          </div>

          {/* Units */}
          <div className="admin-nav-group">
            <div className="admin-nav-group-label">Units</div>
            {ALL_UNIT_KEYS.map(key => {
              const subUnits = DEFAULT_SUBUNITS[key];
              const hasSubUnits = subUnits.length > 0;
              const isExpanded = expandedUnit === key;

              return (
                <div key={key}>
                  <div
                    className={`admin-nav-link ${isUnitActive(key) ? 'active' : ''}`}
                    onClick={() => {
                      navigate(`/admin/unit/${key}`);
                      if (hasSubUnits) toggleUnit(key);
                    }}
                  >
                    <span className="nav-icon">{UNIT_ICONS[key]}</span>
                    <span style={{ flex: 1 }}>{UNIT_SHORT[key]}</span>
                    {hasSubUnits && (
                      <span style={{ fontSize: '0.6rem', color: '#5a5040', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▼</span>
                    )}
                  </div>
                  {/* Sub-units */}
                  {hasSubUnits && isExpanded && (
                    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                      {subUnits.map(sub => (
                        <div
                          key={sub.id}
                          className={`admin-nav-sublink ${isActive(`/admin/unit/${key}/sub/${sub.id}`) ? 'active' : ''}`}
                          onClick={() => navigate(`/admin/unit/${key}/sub/${sub.id}`)}
                        >
                          <span style={{ 
                            width: 6, height: 6, borderRadius: '50%', 
                            background: isActive(`/admin/unit/${key}/sub/${sub.id}`) ? UNIT_COLORS[key] : '#3a3528',
                            flexShrink: 0 
                          }} />
                          {sub.shortName}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Settings */}
          <div className="admin-nav-group">
            <div className="admin-nav-group-label">System</div>
            <div
              className={`admin-nav-link ${isActive('/admin/settings') ? 'active' : ''}`}
              onClick={() => navigate('/admin/settings')}
            >
              <span className="nav-icon">⚙️</span>
              <span>Settings</span>
            </div>
          </div>
        </nav>

        {/* User info at bottom */}
        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(212,160,23,0.1)', fontSize: '0.72rem', color: '#5a5040' }}>
          <div style={{ color: '#c0ad90', fontWeight: 600, marginBottom: 2 }}>⬤ {username}</div>
          <div>Logged in</div>
        </div>
      </aside>

      {/* Main content */}
      <div className="admin-main">
        <div className="admin-topbar">
          <div className="admin-topbar-title">
            {getPageTitle(location.pathname)}
          </div>
          <div className="admin-topbar-actions">
            <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={() => window.open('/', '_blank')}>
              🌐 View Museum
            </button>
            <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
        <div className="admin-content">
          <Outlet />
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

function getPageTitle(pathname: string): string {
  if (pathname === '/admin/dashboard') return 'Dashboard';
  if (pathname === '/admin/settings') return 'Settings';

  // Check for sub-unit pattern
  const subMatch = pathname.match(/\/admin\/unit\/([^/]+)\/sub\/([^/]+)/);
  if (subMatch) {
    const parentKey = subMatch[1] as UnitKey;
    const subId = subMatch[2];
    const subUnits = DEFAULT_SUBUNITS[parentKey];
    const sub = subUnits?.find(s => s.id === subId);
    return sub ? `${sub.shortName} — ${UNIT_LABELS[parentKey]}` : 'Sub-Unit Editor';
  }

  // Check for parent unit pattern
  const unitMatch = pathname.match(/\/admin\/unit\/([^/]+)/);
  if (unitMatch) {
    const key = unitMatch[1] as UnitKey;
    return UNIT_LABELS[key] || 'Unit Editor';
  }

  return 'Admin Panel';
}
