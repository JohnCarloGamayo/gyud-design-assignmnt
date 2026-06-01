import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Download,
  Calendar,
  Activity
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import Modal from '../components/Modal';
import './Analytics.css';

const revenueData = [
  { name: 'Mon', shopify: 4500, tiktok: 3200 },
  { name: 'Tue', shopify: 3200, tiktok: 4100 },
  { name: 'Wed', shopify: 6200, tiktok: 2800 },
  { name: 'Thu', shopify: 4800, tiktok: 5200 },
  { name: 'Fri', shopify: 5500, tiktok: 4500 },
  { name: 'Sat', shopify: 7200, tiktok: 6100 },
  { name: 'Sun', shopify: 5800, tiktok: 7200 },
];

const ordersData = [
  { name: 'Jun 01', orders: 1200 },
  { name: 'Jun 07', orders: 1800 },
  { name: 'Jun 14', orders: 1400 },
  { name: 'Jun 21', orders: 2400 },
  { name: 'Jun 30', orders: 1900 },
];

const Analytics = () => {
  const { showToast } = useOutletContext();
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="analytics">
      <div className="page-header">
        <div>
          <h1>Analytics Deep Dive</h1>
          <p>Real-time performance metrics across unified platforms.</p>
        </div>
        <div className="header-actions">
          <div className="tab-group">
            <button className="tab active" onClick={() => showToast('Switched to Daily view')}>Daily</button>
            <button className="tab" onClick={() => showToast('Switched to Weekly view')}>Weekly</button>
            <button className="tab" onClick={() => showToast('Switched to Monthly view')}>Monthly</button>
            <button className="tab flex items-center gap-2" onClick={() => showToast('Opening date picker...')}>
              Custom <Calendar size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="analytics-metrics grid-3">
        <MetricCard 
          title="Shopify AOV" 
          value="$142.80" 
          change="+4.2%" 
          trend="up" 
          subValue="vs $120 Goal"
          progress={75}
        />
        <MetricCard 
          title="TikTok ROI" 
          value="3.2x" 
          change="-1.8%" 
          trend="down" 
          subValue="vs 4.0x Goal"
          progress={60}
        />
        <MetricCard 
          title="Overall Conversion" 
          value="4.82%" 
          subValue="Top 10% of merchants in your niche this month."
          isComplex
        />
      </div>

      <div className="analytics-grid">
        <div className="chart-section card">
          <div className="chart-header">
            <h3>Revenue Distribution</h3>
            <div className="chart-legend">
              <span className="legend-item"><span className="dot shopify"></span> Shopify</span>
              <span className="legend-item"><span className="dot tiktok"></span> TikTok</span>
            </div>
          </div>
          <div className="chart-body">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                <YAxis hide />
                <Tooltip cursor={{fill: '#F8FAFC'}} />
                <Bar dataKey="shopify" fill="#004AC6" radius={[4, 4, 0, 0]} barSize={35} />
                <Bar dataKey="tiktok" fill="#D1E4FF" radius={[4, 4, 0, 0]} barSize={35} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="top-products card">
          <div className="section-header">
            <h3>Top Selling Products</h3>
          </div>
          <div className="products-list">
            <ProductItem name="Luxe Performance Hoodie" amount="$14,200" percentage={100} color="#004AC6" onClick={() => setSelectedProduct({ name: 'Luxe Performance Hoodie', image: '👕', category: 'Apparel', sku: 'LPH-001', shopify: 450, tiktok: 120 })} />
            <ProductItem name="Minimalist Canvas Tote" amount="$9,850" percentage={70} color="#3B82F6" onClick={() => setSelectedProduct({ name: 'Minimalist Canvas Tote', image: '👜', category: 'Accessories', sku: 'MCT-002', shopify: 310, tiktok: 95 })} />
            <ProductItem name="Tech-Fit Joggers" amount="$7,200" percentage={55} color="#60A5FA" onClick={() => setSelectedProduct({ name: 'Tech-Fit Joggers', image: '👖', category: 'Apparel', sku: 'TFJ-003', shopify: 210, tiktok: 45 })} />
            <ProductItem name="Oversized Boxy Tee" amount="$5,900" percentage={45} color="#93C5FD" onClick={() => setSelectedProduct({ name: 'Oversized Boxy Tee', image: '👕', category: 'Apparel', sku: 'OBT-004', shopify: 180, tiktok: 30 })} />
          </div>
          <button className="view-all-btn" onClick={() => showToast('Navigating to full inventory...')}>View Full Inventory →</button>
        </div>
      </div>

      <Modal
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        title="Product Performance"
        footer={<button className="btn btn-primary" onClick={() => setSelectedProduct(null)}>Close</button>}
      >
        {selectedProduct && (
          <div className="product-modal-content">
            <div className="pm-header">
              <div className="pm-img">{selectedProduct.image}</div>
              <div className="pm-meta">
                <h4>{selectedProduct.name}</h4>
                <p>{selectedProduct.category}</p>
                <code>{selectedProduct.sku}</code>
              </div>
            </div>
            
            <div className="pm-stats">
              <div className="pm-stat">
                <span>Total Revenue</span>
                <p>${(Math.random() * 20000).toFixed(0)}</p>
              </div>
              <div className="pm-stat">
                <span>Conversion</span>
                <p>{(Math.random() * 5 + 2).toFixed(2)}%</p>
              </div>
              <div className="pm-stat">
                <span>Refund Rate</span>
                <p>{(Math.random() * 2).toFixed(1)}%</p>
              </div>
            </div>

            <div className="analytics-details">
               <h5>Channel Breakdown</h5>
               <div className="channel-velocity">
                  <div className="c-item">
                    <span>Shopify Sales</span>
                    <div className="c-bar-bg"><div className="c-bar-fill" style={{width: '75%', background: '#004AC6'}}></div></div>
                  </div>
                  <div className="c-item">
                    <span>TikTok Sales</span>
                    <div className="c-bar-bg"><div className="c-bar-fill" style={{width: '25%', background: '#93C5FD'}}></div></div>
                  </div>
               </div>
            </div>
          </div>
        )}
      </Modal>

      <div className="orders-volume card">
        <div className="chart-header">
          <div>
            <h3>Orders Volume</h3>
            <p>Transactional volume tracking (30 days)</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="avg-badge">
               <Activity size={14} /> 2.4k Avg. Orders
             </div>
             <Download size={18} className="icon-btn" onClick={() => showToast('Preparing CSV export of order volume...')} />
          </div>
        </div>
        <div className="chart-body">
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={ordersData}>
              <defs>
                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#004AC6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#004AC6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
              <YAxis hide />
              <Tooltip />
              <Area type="monotone" dataKey="orders" stroke="#004AC6" strokeWidth={3} fillOpacity={1} fill="url(#colorOrders)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, change, trend, subValue, progress, isComplex }) => (
  <div className="metric-card card">
    <div className="metric-header">
      <span className="metric-title">{title}</span>
      {change && (
        <span className={`metric-badge ${trend}`}>
          {change}
        </span>
      )}
    </div>
    <div className="metric-value">{value}</div>
    {isComplex ? (
      <div className="metric-complex">
        <p>{subValue}</p>
        <div className="platform-bars">
           <div className="platform-bar">
             <div className="bar-fill" style={{height: '100%', background: '#004AC6'}}></div>
             <span>SHP</span>
           </div>
           <div className="platform-bar">
             <div className="bar-fill" style={{height: '60%', background: '#94A3B8'}}></div>
             <span>TTK</span>
           </div>
        </div>
      </div>
    ) : (
      <div className="metric-footer">
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill" style={{width: `${progress}%`}}></div>
          </div>
          <span className="sub-value">{subValue}</span>
        </div>
      </div>
    )}
  </div>
);

const ProductItem = ({ name, amount, percentage, color, onClick }) => (
  <div className="product-item clickable" onClick={onClick}>
    <div className="product-info">
      <span className="product-name">{name}</span>
      <span className="product-amount">{amount}</span>
    </div>
    <div className="product-progress-bg">
      <div className="product-progress-fill" style={{ width: `${percentage}%`, backgroundColor: color }}></div>
    </div>
  </div>
);

export default Analytics;
