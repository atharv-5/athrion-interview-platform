import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  History, 
  LogOut, 
  User, 
  Sparkles 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/resume', label: 'Resume Analyzer', icon: FileText },
    { path: '/interview', label: 'Mock Interview', icon: MessageSquare },
    { path: '/history', label: 'Past Interviews', icon: History },
  ];

  return (
    <aside className="sidebar glass-panel">
      {/* Brand Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{
          background: 'var(--primary-gradient)',
          padding: '8px',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-glow)'
        }}>
          <Sparkles size={20} color="#ffffff" />
        </div>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
            Antigravity<span className="gradient-text">AI</span>
          </h2>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
            Interview Pro
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '10px',
              color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
              background: isActive ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
              border: isActive ? '1px solid rgba(37, 99, 235, 0.15)' : '1px solid transparent',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.95rem',
              transition: 'var(--transition-smooth)'
            })}
            className="sidebar-link-hover"
          >
            <item.icon size={18} style={{ color: 'inherit' }} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User profile & Logout */}
      {user && (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '16px', 
          paddingTop: '16px', 
          borderTop: '1px solid var(--border-color)' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--secondary)'
            }}>
              <User size={20} />
            </div>
            <div style={{ overflow: 'hidden' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 600, margin: 0, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                {user.name}
              </h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textOverflow: 'ellipsis', overflow: 'hidden', display: 'block', whiteSpace: 'nowrap' }}>
                {user.email}
              </span>
            </div>
          </div>

          <button 
            onClick={logout} 
            className="btn btn-secondary" 
            style={{ 
              width: '100%', 
              justifyContent: 'flex-start',
              padding: '10px 16px',
              fontSize: '0.9rem',
              gap: '12px' 
            }}
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      )}

      {/* CSS overrides for sidebar link hover */}
      <style>{`
        .sidebar-link-hover:hover {
          background: rgba(30, 41, 59, 0.04) !important;
          color: var(--primary) !important;
          transform: translateX(4px);
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
