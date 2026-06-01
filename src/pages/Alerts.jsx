import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  Heart, 
  AlertCircle, 
  Cpu, 
  RefreshCw, 
  Info,
  ChevronRight,
  User
} from 'lucide-react';
import './Alerts.css';

const historyData = [
  { time: 'Oct 24, 11:42:04', platform: 'Shopify', action: 'Inventory Update', status: 'SUCCESS', result: '1,244 Items Synced' },
  { time: 'Oct 24, 11:38:12', platform: 'TikTok', action: 'Order Pull', status: 'DELAYED', result: 'Pending API Response...' },
  { time: 'Oct 24, 11:35:45', platform: 'TikTok', action: 'Inventory Sync', status: 'RETRYING', result: 'Attempt #2 of 5' },
  { time: 'Oct 24, 11:30:00', platform: 'Shopify', action: 'Fulfillment Update', status: 'SUCCESS', result: '45 Trackings Sent' },
  { time: 'Oct 24, 11:15:22', platform: 'Shopify', action: 'Price Sync', status: 'SUCCESS', result: 'Completed' },
  { time: 'Oct 24, 11:00:10', platform: 'TikTok', action: 'Daily Sales Report', status: 'SUCCESS', result: 'Report Generated' },
];

const Alerts = () => {
  const { showToast } = useOutletContext();

  return (
    <div className="alerts-page">
      <div className="alerts-header">
        <div className="breadcrumb">Command Center &gt; <span className="active">Alerts & System Health</span></div>
        <div className="header-main">
          <div>
            <h1>System Health</h1>
            <p>Real-time transparency on platform API connectivity and data flow.</p>
          </div>
          <div className="header-btns">
            <button className="btn btn-secondary" onClick={() => showToast('Connecting to live support agent...')}><User size={16} /> Contact Support</button>
            <button className="btn btn-primary" onClick={() => showToast('Force re-sync initiated. Checking all platform heartbeats...')}>
               <RefreshCw size={16} /> Force Re-sync
            </button>
          </div>
        </div>
      </div>

      <div className="health-cards grid-3">
        <div className="health-card card">
           <div className="card-top">
              <div className="platform-icon shopify">🛍️</div>
              <span className="badge badge-success">ACTIVE</span>
           </div>
           <h3>Shopify API</h3>
           <p>Continuous bi-directional sync is functioning normally. Last verified heartbeat 2 minutes ago.</p>
           <div className="card-footer">
              <span>Latency: 142ms</span>
              <span>99.9% Uptime</span>
           </div>
        </div>

        <div className="health-card card">
           <div className="card-top">
              <div className="platform-icon tiktok">🎵</div>
              <span className="badge badge-error">API DELAY</span>
           </div>
           <h3>TikTok Shop</h3>
           <p>TikTok API is currently processing a high volume of requests. Last successful sync: 14m ago.</p>
           <div className="card-footer alert">
              Potential data freshness delay of 15-20 mins expected for next 2 hours.
           </div>
        </div>

        <div className="health-card card primary">
           <div className="infra-header">
              <Cpu size={24} />
              <span>INFRASTRUCTURE</span>
           </div>
           <div className="infra-value">94.2%</div>
           <p>Total operational efficiency across all integrated nodes.</p>
           <div className="infra-progress">
              <div className="progress-bar">
                 <div className="p-fill" style={{width: '94%'}}></div>
              </div>
           </div>
           <div className="infra-footer">
              <div>Current Load: <span>High</span></div>
              <div>Estimated Recovery: <span>2:00 PM</span></div>
           </div>
        </div>
      </div>

      <div className="alerts-body-grid">
         <div className="sync-history card">
            <div className="section-header">
               <h3>Sync Attempt History</h3>
               <div className="tab-buttons">
                  <button className="small-tab active" onClick={() => showToast('Showing sync attempts for Today')}>Today</button>
                  <button className="small-tab" onClick={() => showToast('Showing sync attempts for Yesterday')}>Yesterday</button>
               </div>
            </div>
            <table className="history-table">
               <thead>
                  <tr>
                     <th>Timestamp</th>
                     <th>Platform</th>
                     <th>Action Type</th>
                     <th>Status</th>
                     <th>Result</th>
                  </tr>
               </thead>
               <tbody>
                  {historyData.map((row, idx) => (
                    <tr key={idx}>
                       <td className="time-col">{row.time}</td>
                       <td>{row.platform}</td>
                       <td>{row.action}</td>
                       <td>
                          <span className={`status-tag ${row.status.toLowerCase()}`}>
                            {row.status}
                          </span>
                       </td>
                       <td className="result-col">{row.result}</td>
                    </tr>
                  ))}
               </tbody>
            </table>
            <button className="view-more" onClick={() => showToast('Loading historical event records...')}>View All History (1,240 events)</button>
         </div>

         <div className="alerts-sidebar">
            <div className="info-card card">
               <div className="info-title">
                  <Info size={18} />
                  <h3>Understanding Delays</h3>
               </div>
               <div className="info-content">
                  <div className="info-section">
                     <h4>Platform Throttling</h4>
                     <p>During peak shopping hours, TikTok may throttle API requests to ensure platform stability.</p>
                  </div>
                  <div className="info-section">
                     <h4>Conflict Resolution</h4>
                     <p>If a product is edited simultaneously on two platforms, the system defaults to Shopify master data.</p>
                  </div>
               </div>
            </div>

            <div className="log-card card">
               <h3>Live System Log</h3>
               <div className="log-list">
                  <LogItem type="success" title="Sync Completed" desc="Shopify Inventory successfully pushed to 4 regions." time="JUST NOW" />
                  <LogItem type="error" title="API Warning" desc="TikTok endpoint /v2/orders returning 429 (Too Many Requests)." time="4M AGO" />
                  <LogItem type="info" title="Automatic Retry" desc="System initiating scheduled retry for failed SKU: BLU-994." time="12M AGO" />
                  <LogItem type="muted" title="Periodic Cleanup" desc="Cache flushed and optimized for current session." time="45M AGO" />
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

const LogItem = ({ type, title, desc, time }) => (
  <div className={`log-item ${type}`}>
    <div className="log-dot"></div>
    <div className="log-content">
       <span className="log-title">{title}</span>
       <p className="log-desc">{desc}</p>
       <span className="log-time">{time}</span>
    </div>
  </div>
);

export default Alerts;
