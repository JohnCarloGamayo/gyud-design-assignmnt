import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  User,
  Mail,
  Bell,
  ShieldCheck,
  Image as ImageIcon,
  Plus,
  Settings as SettingsIcon,
  ExternalLink,
  Trash2,
  FileText,
  Download,
  MoreVertical
} from 'lucide-react';
import Modal from '../components/Modal';
import './Settings.css';

const Settings = () => {
  const { showToast } = useOutletContext();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isIntegrationModalOpen, setIsIntegrationModalOpen] = useState(false);
  const [newStoreType, setNewStoreType] = useState('shopify');
  return (
    <div className="settings">
      <div className="settings-header">
        <h1>Settings & Branding</h1>
        <p>Manage your command center identity and connection ecosystems.</p>
      </div>

      <div className="settings-grid">
        <div className="settings-left-col">
          <div className="profile-card card">
            <div className="profile-img-container">
              <div className="profile-img">AD</div>
            </div>
            <div className="profile-details">
              <h3>Admin</h3>
              <p>admin@enterprise.com</p>
              <button className="btn btn-secondary edit-btn" onClick={() => setIsProfileModalOpen(true)}>Edit Personal Info</button>
            </div>
            <div className="security-info">
              <div className="security-item">
                <span className="s-label">Two-Factor Auth</span>
                <span className="badge badge-success">ACTIVE</span>
              </div>
              <div className="security-item">
                <span className="s-label">Last Login</span>
                <span className="s-value">2 hours ago</span>
              </div>
            </div>
          </div>

          <div className="notifications-card card">
            <div className="section-title">
              <Bell size={18} />
              <h3>Notifications</h3>
            </div>
            <div className="toggle-list">
              <ToggleItem title="Email Alerts" desc="Daily digest of sales performance" active={true} />
              <ToggleItem title="Stock Alerts" desc="Instant push for low inventory" active={true} />
              <ToggleItem title="Web Notifications" desc="Browser badges and alerts" active={false} />
            </div>
          </div>
        </div>

        <div className="settings-right-col">
          <div className="branding-section card">
            <div className="section-title">
              <SettingsIcon size={18} />
              <h3>Branding & Identity</h3>
            </div>
            <div className="branding-form">
              <div className="logo-upload">
                <label>ORGANIZATION LOGO</label>
                <div className="upload-box">
                  <Download size={24} />
                  <span>Click to upload</span>
                  <p>SVG, PNG, or JPG (max. 5MB)</p>
                </div>
              </div>
              <div className="color-pickers">
                <div className="color-field">
                  <label>PRIMARY COLOR</label>
                  <div className="picker-input">
                    <div className="color-preview" style={{ background: '#004AC6' }}></div>
                    <input type="text" value="#004AC6" readOnly />
                  </div>
                </div>
                <div className="color-field">
                  <label>SECONDARY COLOR</label>
                  <div className="picker-input">
                    <div className="color-preview" style={{ background: '#505F76' }}></div>
                    <input type="text" value="#505F76" readOnly />
                  </div>
                </div>
              </div>
            </div>
            <button className="btn btn-primary save-btn" onClick={() => showToast('Branding settings updated successfully!')}>Save Changes</button>
          </div>

          <div className="integrations-section card">
            <div className="section-header">
              <div className="title-with-icon">
                <ExternalLink size={18} />
                <h3>Integrations</h3>
              </div>
              <button className="text-btn" onClick={() => setIsIntegrationModalOpen(true)}>+ Add New Store</button>
            </div>
            <div className="integration-list">
              <IntegrationItem name="Shopify Storefront" url="sterling-vibe.myshopify.com" status="Connected" icon="🛍️" />
              <IntegrationItem name="TikTok Shop" url="@sterling_official_uk" status="Connected" icon="🎵" />
              <IntegrationItem name="Meta Ads Manager" url="Connect your ad account" status="Disconnected" icon="📱" />
            </div>
          </div>

          <div className="data-privacy card">
            <div className="section-title">
              <ShieldCheck size={18} />
              <h3>Data & Privacy</h3>
            </div>
            <p className="section-desc">Manage how your merchant data is stored and exported for external analysis.</p>
            <div className="action-grid">
              <button className="action-btn" onClick={() => showToast('Starting full merchant data audit export...')}><Download size={16} /> Export Merchant Audit</button>
              <button className="action-btn" onClick={() => showToast('Retrieving system access logs...')}>
                <FileText size={16} /> View Access Logs
              </button>
              <button className="action-btn danger" onClick={() => showToast('Cache purged. System performance optimized!')}>
                <Trash2 size={16} /> Purge Stale Cache
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Edit Modal */}
      <Modal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        title="Edit Personal Information"
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setIsProfileModalOpen(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={() => setIsProfileModalOpen(false)}>Save Changes</button>
          </>
        }
      >
        <div className="settings-form">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" defaultValue="Alex Sterling" />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" defaultValue="alex.sterling@enterprise.com" />
          </div>
          <div className="form-group">
            <label>Role</label>
            <input type="text" defaultValue="Administrator" readOnly />
          </div>
        </div>
      </Modal>

      {/* Integration Modal */}
      <Modal
        isOpen={isIntegrationModalOpen}
        onClose={() => setIsIntegrationModalOpen(false)}
        title="Connect New Platform"
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setIsIntegrationModalOpen(false)}>Back</button>
            <button className="btn btn-primary" onClick={() => setIsIntegrationModalOpen(false)}>Authorize Connection</button>
          </>
        }
      >
        <div className="integration-modal">
          <p>Choose the platform you want to unify with your dashboard.</p>
          <div className="store-selector">
            <div
              className={`store-option ${newStoreType === 'shopify' ? 'active' : ''}`}
              onClick={() => setNewStoreType('shopify')}
            >
              <div className="s-icon">🛍️</div>
              <span>Shopify</span>
            </div>
            <div
              className={`store-option ${newStoreType === 'tiktok' ? 'active' : ''}`}
              onClick={() => setNewStoreType('tiktok')}
            >
              <div className="s-icon">🎵</div>
              <span>TikTok Shop</span>
            </div>
          </div>
          <div className="form-group mt-6">
            <label>{newStoreType === 'shopify' ? 'STORE URL (e.g. store.myshopify.com)' : 'SHOP ID'}</label>
            <input type="text" placeholder={newStoreType === 'shopify' ? 'https://...' : 'Enter your TikTok Shop ID'} />
          </div>
          <p className="integration-hint">
            You will be redirected to the platform's OAuth page to grant read/write permissions for orders and inventory.
          </p>
        </div>
      </Modal>
    </div>
  );
};

const ToggleItem = ({ title, desc, active }) => (
  <div className="toggle-item">
    <div className="toggle-info">
      <span className="t-title">{title}</span>
      <span className="t-desc">{desc}</span>
    </div>
    <div className={`toggle-switch ${active ? 'active' : ''}`}>
      <div className="toggle-thumb"></div>
    </div>
  </div>
);

const IntegrationItem = ({ name, url, status, icon }) => (
  <div className="integration-item">
    <div className="int-icon">{icon}</div>
    <div className="int-details">
      <span className="int-name">{name}</span>
      <span className="int-url">{url}</span>
    </div>
    <div className="int-status">
      {status === 'Connected' ? (
        <span className="status-connected"><CheckCircle2 size={14} /> Connected</span>
      ) : (
        <button className="btn-small">Connect</button>
      )}
    </div>
    <button className="icon-btn"><SettingsIcon size={16} /></button>
  </div>
);

const CheckCircle2 = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="m9 12 2 2 4-4" /></svg>
);

export default Settings;
