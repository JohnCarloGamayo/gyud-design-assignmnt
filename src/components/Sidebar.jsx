import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart3,
  Package,
  ShoppingCart,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ isOpen, onToggle, onCloseMobile }) => {
  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/' },
    { icon: <BarChart3 size={20} />, label: 'Analytics', path: '/analytics' },
    { icon: <Package size={20} />, label: 'Inventory', path: '/inventory' },
    { icon: <ShoppingCart size={20} />, label: 'Orders', path: '/orders' },
    { icon: <Bell size={20} />, label: 'Alerts', path: '/alerts' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
  ];

  return (
    <>
      {/* Mobile overlay backdrop */}
      <div
        className={`sidebar-overlay ${isOpen ? 'visible' : ''}`}
        onClick={onCloseMobile}
      />

      <aside className={`sidebar ${isOpen ? '' : 'collapsed'}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo-icon"></div>
            {isOpen && (
              <div className="logo-text">
                <h1>Command Center</h1>
                <p>Unified Merchant Analytics</p>
              </div>
            )}
          </div>
          <button className="collapse-btn" onClick={onToggle} aria-label="Toggle sidebar">
            {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {navItems.map((item) => (
              <li key={item.label}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                  title={!isOpen ? item.label : ''}
                  onClick={onCloseMobile}
                >
                  {item.icon}
                  {isOpen && <span>{item.label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">AD</div>
            {isOpen && (
              <div className="user-info">
                <span className="user-name">Admin</span>
                <span className="user-role">Merchant Admin</span>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
