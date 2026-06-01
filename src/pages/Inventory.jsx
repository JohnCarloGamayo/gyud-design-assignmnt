import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  Download,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Package,
  CheckCircle2
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import Modal from '../components/Modal';
import './Inventory.css';

const trendData = [
  { name: '01', stock: 1200 },
  { name: '05', stock: 1100 },
  { name: '10', stock: 1300 },
  { name: '15', stock: 1250 },
  { name: '20', stock: 1400 },
  { name: '25', stock: 1350 },
  { name: '30', stock: 1284 },
];

const inventoryItems = [
  { 
    id: 1, 
    name: 'Nike Rogue Runner Red', 
    category: "Footwear · Men's", 
    sku: 'NRR-2024-01', 
    shopify: 142, 
    tiktok: 138, 
    status: 'Healthy',
    image: '👟' 
  },
  { 
    id: 2, 
    name: 'Minimalist White Watch', 
    category: "Accessories · Unisex", 
    sku: 'MWW-99-ALPHA', 
    shopify: 12, 
    tiktok: 8, 
    status: 'Low Stock',
    image: '⌚' 
  },
  { 
    id: 3, 
    name: 'Wireless Pro Headphones', 
    category: "Electronics · Audio", 
    sku: 'WPH-PRO-BLK', 
    shopify: 452, 
    tiktok: '--', 
    status: 'Awaiting sync',
    image: '🎧' 
  },
  { 
    id: 4, 
    name: 'Matte Ceramic Set', 
    category: "Home · Kitchen", 
    sku: 'CER-MAT-SET-04', 
    shopify: 2104, 
    tiktok: 2098, 
    status: 'Healthy',
    image: '🍶' 
  },
];

const Inventory = () => {
  const { showToast } = useOutletContext();
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="inventory">
      <div className="inventory-top-grid">
        <div className="chart-section card">
          <div className="chart-header">
            <div>
              <h3>Inventory Trends</h3>
              <p>Rolling 30-day stock fluctuations across platforms</p>
            </div>
            <div className="chart-legend">
              <span className="legend-item"><span className="dot shopify"></span> Shopify</span>
              <span className="legend-item"><span className="dot tiktok"></span> TikTok</span>
            </div>
          </div>
          <div className="chart-body">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorStock" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip />
                <Area type="monotone" dataKey="stock" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorStock)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="summary-cards">
          <div className="mini-card card">
            <div className="mini-info">
              <span className="mini-title">Total SKUs</span>
              <span className="mini-value">1,284</span>
            </div>
            <div className="mini-icon blue">
              <Package size={20} />
            </div>
          </div>
          <div className="mini-card card">
            <div className="mini-info">
              <span className="mini-title">Healthy Stock</span>
              <span className="mini-value">94.2%</span>
            </div>
            <div className="mini-icon green">
              <CheckCircle2 size={20} />
            </div>
          </div>
        </div>
      </div>

      <div className="inventory-table-container card">
        <div className="table-filters">
          <div className="filter-tabs">
            <button className="filter-tab active" onClick={() => showToast('Showing all inventory')}>All Inventory</button>
            <button className="filter-tab" onClick={() => showToast('Filtered by Low Stock')}>Low Stock</button>
            <button className="filter-tab" onClick={() => showToast('Filtered by Delayed Sync')}>Delayed Sync</button>
          </div>
          
          <div className="filter-actions">
            <div className="platform-toggle">
              <button className="toggle-btn active" onClick={() => showToast('Viewing Shopify stock')}>Shopify</button>
              <button className="toggle-btn" onClick={() => showToast('Viewing TikTok stock')}>TikTok</button>
            </div>
            <button className="btn btn-secondary" onClick={() => showToast('Advanced filtering options...')}>
              <Filter size={16} /> Filter
            </button>
            <button className="btn btn-secondary" onClick={() => showToast('Generating inventory report...')}>
              <Download size={16} /> Export
            </button>
          </div>
        </div>

        <table className="inventory-table">
          <thead>
            <tr>
              <th>PRODUCT</th>
              <th>SKU</th>
              <th>SHOPIFY STOCK</th>
              <th>TIKTOK STOCK</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {inventoryItems.map((item) => (
              <tr key={item.id} className="clickable-row" onClick={() => setSelectedProduct(item)}>
                <td>
                  <div className="product-cell">
                    <div className="product-img">{item.image}</div>
                    <div className="product-meta">
                      <span className="p-name">{item.name}</span>
                      <span className="p-cat">{item.category}</span>
                    </div>
                  </div>
                </td>
                <td><code className="sku-code">{item.sku}</code></td>
                <td className="stock-count">{item.shopify}</td>
                <td className="stock-count">{item.tiktok}</td>
                <td>
                  <span className={`status-badge ${item.status.toLowerCase().replace(' ', '-')}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <button className="icon-btn" onClick={(e) => { e.stopPropagation(); /* actions */ }}>
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="table-footer">
          <p>Showing 1 to 4 of 1,284 products</p>
          <div className="pagination">
            <button className="page-btn" onClick={() => showToast('Previously page (simulated)')}><ChevronLeft size={16} /></button>
            <button className="page-btn" onClick={() => showToast('Next page (simulated)')}><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        title="Product Insights"
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
                <span>Shopify Stock</span>
                <p>{selectedProduct.shopify}</p>
              </div>
              <div className="pm-stat">
                <span>TikTok Stock</span>
                <p>{selectedProduct.tiktok}</p>
              </div>
              <div className="pm-stat">
                <span>Total Value</span>
                <p>${(Math.random() * 10000).toFixed(2)}</p>
              </div>
            </div>

            <div className="pm-chart-placeholder">
              <h5>Stock Velocity (Last 7 Days)</h5>
              <div className="velocity-bars">
                {[40, 60, 45, 90, 65, 80, 50].map((h, i) => (
                  <div key={i} className="v-bar" style={{height: `${h}%`}}></div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Inventory;
