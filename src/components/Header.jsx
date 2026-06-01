import React, { useState } from 'react';
import { Search, Bell, RefreshCw, Zap, CheckCircle2, Loader2, Menu } from 'lucide-react';
import Modal from './Modal';
import './Header.css';

const Header = ({ title, onToggleSidebar }) => {
  const [syncStatus, setSyncStatus] = useState(null);
  const [platform, setPlatform] = useState('');

  const handleSync = (p) => {
    setPlatform(p);
    setSyncStatus('syncing');
    setTimeout(() => {
      setSyncStatus('success');
    }, 2000);
  };

  const closeSync = () => {
    setSyncStatus(null);
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="sidebar-toggle" onClick={onToggleSidebar} aria-label="Toggle sidebar">
          <Menu size={20} />
        </button>
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search analytics..." />
        </div>
      </div>

      <div className="header-right">
        <button className="btn btn-secondary sync-btn" onClick={() => handleSync('Shopify')}>
          <RefreshCw size={16} />
          <span className="sync-label">Shopify Sync</span>
        </button>
        <button className="btn btn-primary sync-btn" onClick={() => handleSync('TikTok Shop')}>
          <Zap size={16} />
          <span className="sync-label">TikTok Sync</span>
        </button>
        <div className="notification-btn">
          <Bell size={20} />
          <span className="dot"></span>
        </div>
      </div>

      <Modal
        isOpen={syncStatus !== null}
        onClose={closeSync}
        title={`${platform} Synchronization`}
        footer={
          syncStatus === 'success' && (
            <button className="btn btn-primary" onClick={closeSync}>Done</button>
          )
        }
      >
        <div className="sync-progress-content">
          {syncStatus === 'syncing' ? (
            <div className="sync-loading">
              <Loader2 className="animate-spin" size={48} color="var(--primary)" />
              <p>Fetching latest data from {platform}...</p>
              <span>This may take a few moments.</span>
            </div>
          ) : (
            <div className="sync-success">
              <div className="success-icon">
                <CheckCircle2 size={48} color="var(--success)" />
              </div>
              <p>Synchronization Complete!</p>
              <span>Your dashboard has been updated with the latest {platform} records.</span>
            </div>
          )}
        </div>
      </Modal>
    </header>
  );
};

export default Header;
