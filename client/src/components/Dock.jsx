import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  History,
  LogOut,
  User,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dock = () => {
  const { user, logout } = useAuth();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/resume', label: 'Resume Analyzer', icon: FileText },
    { path: '/interview', label: 'Mock Interview', icon: MessageSquare },
    { path: '/history', label: 'Past Interviews', icon: History },
  ];

  return (
    <div className="dock-container">
      <nav className="dock glass-panel">
        {/* Brand / Logo */}
        <div className="dock-brand">
          <TrendingUp size={22} color="#FFF8F0" strokeWidth={2.5} />
        </div>

        <div className="dock-divider"></div>

        {/* Links */}
        <div className="dock-links">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `dock-item ${isActive ? 'active' : ''}`}
              title={item.label}
            >
              <item.icon size={22} />
              <span className="dock-tooltip">{item.label}</span>
            </NavLink>
          ))}
        </div>

        {user && (
          <>
            <div className="dock-divider"></div>
            {/* User Actions */}
            <div className="dock-user-actions">
              <div className="dock-item user-avatar">
                <User size={20} />
                <span className="dock-tooltip">{user.name}</span>
              </div>
              <button onClick={logout} className="dock-item logout-btn" title="Sign Out">
                <LogOut size={20} />
                <span className="dock-tooltip">Sign Out</span>
              </button>
            </div>
          </>
        )}
      </nav>
    </div>
  );
};

export default Dock;