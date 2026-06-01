import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Percent,
  AlertTriangle,
  Activity,
  ArrowUpRight,
  CloudLightning
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useDashboard } from '../hooks/useDashboard';
import Modal from '../components/Modal';
import './Dashboard.css';

const Dashboard = () => {
  const { data: dashboardData, loading, error } = useDashboard();
  const { showToast } = useOutletContext();
  const [selectedAlert, setSelectedAlert] = useState(null);

  if (loading) return <div className="loading-state">Loading Command Center...</div>;
  if (error) return <div className="error-state">{error}</div>;

  const { metrics, salesData, lastSync, merchant } = dashboardData;

  return (
    <div className="dashboard">
      <div className="welcome-section">
        <h1>Good morning, {merchant.name}</h1>
        <p>Your multi-channel sales are up 12% today. Everything is looking healthy.</p>
        <div className="last-sync">
          <span className="dot"></span>
          Last synced: {lastSync}
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Total Revenue"
          value={metrics.revenue.value}
          change={metrics.revenue.change}
          trend={metrics.revenue.trend}
          icon={<DollarSign size={20} />}
        />
        <StatCard
          title="Orders"
          value={metrics.orders.value}
          change={metrics.orders.change}
          trend={metrics.orders.trend}
          icon={<Package size={20} />}
        />
        <StatCard
          title="Conversion"
          value={metrics.conversion.value}
          change={metrics.conversion.change}
          trend={metrics.conversion.trend}
          icon={<Percent size={20} />}
        />
        <StatCard
          title="Low Stock"
          value={metrics.lowStock.value}
          change={metrics.lowStock.change}
          trend={metrics.lowStock.trend}
          icon={<AlertTriangle size={20} />}
        />
        <StatCard
          title="Sync Health"
          value={metrics.syncHealth.value}
          change={metrics.syncHealth.change}
          trend={metrics.syncHealth.trend}
          icon={<Activity size={20} />}
        />
      </div>

      <div className="dashboard-main-grid">
        <div className="chart-section card">
          <div className="chart-header">
            <div>
              <h3>Multi-Channel Sales</h3>
              <p>Comparing Shopify vs TikTok Shop Performance</p>
            </div>
            <div className="chart-legend">
              <span className="legend-item"><span className="dot shopify"></span> Shopify</span>
              <span className="legend-item"><span className="dot tiktok"></span> TikTok</span>
            </div>
          </div>
          <div className="chart-body">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                <YAxis hide />
                <Tooltip
                  cursor={{fill: '#F8FAFC'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="shopify" fill="#004AC6" radius={[4, 4, 0, 0]} barSize={40} />
                <Bar dataKey="tiktok" fill="#EEF4FF" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="recent-alerts-section card">
          <div className="section-header">
            <h3>Recent Alerts</h3>
            <span className="badge badge-info">Live</span>
          </div>
          <div className="alerts-list">
            <AlertItem 
              type="warning" 
              title="Low Stock Warning" 
              desc="Cargo Utility Jogger is below threshold (20 units remaining)." 
              time="Today, 09:42 AM" 
              onClick={() => setSelectedAlert({ type: 'warning', title: 'Low Stock Warning', desc: 'Cargo Utility Jogger is below threshold (20 units remaining).', time: 'Today, 09:42 AM' })}
            />
            <AlertItem 
              type="success" 
              title="Shopify Sync Success" 
              desc="All 142 orders successfully pushed to fulfillment center." 
              time="Today, 09:15 AM" 
              onClick={() => setSelectedAlert({ type: 'success', title: 'Shopify Sync Success', desc: 'All 142 orders successfully pushed to fulfillment center.', time: 'Today, 09:15 AM' })}
            />
            <AlertItem 
              type="error" 
              title="TikTok API Delay" 
              desc="TikTok server is responding slowly. Retrying sync in 45s." 
              time="Today, 09:02 AM" 
              onClick={() => setSelectedAlert({ type: 'error', title: 'TikTok API Delay', desc: 'TikTok server is responding slowly. Retrying sync in 45s.', time: 'Today, 09:02 AM' })}
            />
          </div>
          <button className="view-all-btn" onClick={() => showToast('Opening comprehensive audit log...')}>View Audit Log</button>
        </div>
      </div>

      <Modal
        isOpen={selectedAlert !== null}
        onClose={() => setSelectedAlert(null)}
        title="Alert Details"
        footer={<button className="btn btn-primary" onClick={() => setSelectedAlert(null)}>Acknowledge</button>}
      >
        {selectedAlert && (
          <div className="alert-modal-content">
            <div className={`am-icon ${selectedAlert.type}`}>
               {selectedAlert.type === 'warning' && <AlertTriangle size={32} />}
               {selectedAlert.type === 'success' && <Activity size={32} />}
               {selectedAlert.type === 'error' && <CloudLightning size={32} />}
            </div>
            <div className="am-details">
              <h4>{selectedAlert.title}</h4>
              <p className="am-time">{selectedAlert.time}</p>
              <div className="am-desc">
                {selectedAlert.desc}
              </div>
              <div className="am-recommendation">
                <h5>Recommended Action:</h5>
                <p>
                  {selectedAlert.type === 'warning' && "Review your current stock levels and consider placing a restock order for this SKU to avoid fulfillment delays."}
                  {selectedAlert.type === 'success' && "No action needed. All systems are operating within normal parameters for this integration."}
                  {selectedAlert.type === 'error' && "Manual sync is disabled during platform instability. The system will automatically resume once TikTok API responds."}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <div className="inventory-summary card">
        <div className="section-header">
          <h3>Inventory Health</h3>
          <button className="text-btn">View All Inventory</button>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>SKU</th>
              <th>Shopify Stock</th>
              <th>TikTok Stock</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <InventoryRow name="Luxe Cotton Crew Tee" sku="LCT-BLK-SM" shopify={42} tiktok={42} status="HEALTHY" />
            <InventoryRow name="Cargo Utility Jogger" sku="CUJ-GRY-MD" shopify={12} tiktok={12} status="LOW STOCK" />
            <InventoryRow name="Minimalist Tote Bag" sku="MTB-CREAM" shopify={84} tiktok={72} status="SYNCING..." />
            <InventoryRow name="Essential Beanie" sku="EB-NAVY-UN" shopify={156} tiktok={156} status="HEALTHY" />
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change, trend, icon }) => (
  <div className="stat-card card">
    <div className="stat-header">
      <span className="stat-title">{title}</span>
      <div className="stat-icon">{icon}</div>
    </div>
    <div className="stat-value">{value}</div>
    <div className={`stat-change ${trend}`}>
      {trend === 'up' && <TrendingUp size={14} />}
      {trend === 'down' && <TrendingDown size={14} />}
      {change}
    </div>
  </div>
);

const AlertItem = ({ type, title, desc, time, onClick }) => (
  <div className={`alert-item ${type} clickable`} onClick={onClick}>
    <div className="alert-icon">
      {type === 'warning' && <AlertTriangle size={16} />}
      {type === 'success' && <Activity size={16} />}
      {type === 'error' && <CloudLightning size={16} />}
    </div>
    <div className="alert-content">
      <div className="alert-title">{title}</div>
      <div className="alert-desc">{desc}</div>
      <div className="alert-time">{time}</div>
    </div>
  </div>
);

const InventoryRow = ({ name, sku, shopify, tiktok, status }) => (
  <tr>
    <td>{name}</td>
    <td>{sku}</td>
    <td>{shopify}</td>
    <td>{tiktok}</td>
    <td>
      <span className={`status-badge ${status.toLowerCase().replace(' ', '-').replace('...', '')}`}>
        {status}
      </span>
    </td>
  </tr>
);

export default Dashboard;
