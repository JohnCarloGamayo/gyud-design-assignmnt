import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ShoppingCart, Download, Filter, Search, Package } from 'lucide-react';
import Modal from '../components/Modal';
import './Orders.css';

const Orders = () => {
  const { showToast } = useOutletContext();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = [
    { id: '#1024', customer: 'Jane Cooper', date: 'Oct 24, 2023', total: '$124.00', status: 'Delivered', platform: 'Shopify' },
    { id: '#1023', customer: 'Wade Warren', date: 'Oct 24, 2023', total: '$56.00', status: 'Processing', platform: 'TikTok' },
    { id: '#1022', customer: 'Esther Howard', date: 'Oct 23, 2023', total: '$210.50', status: 'Shipped', platform: 'Shopify' },
    { id: '#1021', customer: 'Cameron Williamson', date: 'Oct 23, 2023', total: '$89.99', status: 'Delivered', platform: 'Shopify' },
  ];

  return (
    <div className="orders-page">
      <div className="page-header">
        <div>
          <h1>Order History</h1>
          <p>Manage and track orders across all your connected stores.</p>
        </div>
        <div className="header-actions">
           <button className="btn btn-secondary" onClick={() => showToast('Preparing CSV export of order history...')}><Download size={16} /> Export All</button>
        </div>
      </div>

      <div className="orders-table-container card" style={{marginTop: '2rem'}}>
        <div className="table-filters" style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem'}}>
           <div className="search-bar" style={{maxWidth: '300px'}}>
             <Search size={16} style={{position: 'absolute', left: '10px', top: '10px', color: '#94A3B8'}} />
             <input type="text" placeholder="Filter orders..." style={{paddingLeft: '2.5rem', width: '100%', height: '36px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none'}} />
           </div>
           <button className="btn btn-secondary" onClick={() => showToast('Opening filter sidebar...')}>
             <Filter size={16} /> Filter
           </button>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Platform</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="clickable-row" onClick={() => setSelectedOrder(order)}>
                <td><span className="order-id">{order.id}</span></td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td style={{fontWeight: '700'}}>{order.total}</td>
                <td>
                  <span className={`status-badge ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <span className="badge badge-info">{order.platform}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={selectedOrder !== null}
        onClose={() => setSelectedOrder(null)}
        title={`Order Details: ${selectedOrder?.id}`}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setSelectedOrder(null)}>Print Label</button>
            <button className="btn btn-primary" onClick={() => setSelectedOrder(null)}>Mark as Shipped</button>
          </>
        }
      >
        {selectedOrder && (
          <div className="order-modal-content">
            <div className="om-header">
               <div className={`om-status-badge ${selectedOrder.status.toLowerCase()}`}>
                  {selectedOrder.status}
               </div>
               <span className="om-date">Placed on Oct 24, 2024 at 10:24 AM via {selectedOrder.platform}</span>
            </div>

            <div className="om-grid">
               <div className="om-customer card">
                  <h5>Customer Info</h5>
                  <p><strong>{selectedOrder.customer}</strong></p>
                  <p>alex.silver@gmail.com</p>
                  <p>+1 (555) 012-3456</p>
               </div>
               <div className="om-shipping card">
                  <h5>Shipping Address</h5>
                  <p>123 Enterprise Way</p>
                  <p>Suite 400</p>
                  <p>Los Angeles, CA 90001</p>
               </div>
            </div>

            <div className="om-items card">
               <h5>Order Items</h5>
               <div className="om-item">
                  <Package size={16} />
                  <div className="omi-details">
                    <span>Luxe Performance Hoodie (Black / L)</span>
                    <p>SKU: LPH-001-B-L</p>
                  </div>
                  <div className="omi-price">
                    <span>x1</span>
                    <strong>$142.00</strong>
                  </div>
               </div>
            </div>

            <div className="om-summary">
               <div className="oms-row"><span>Subtotal</span><span>$142.00</span></div>
               <div className="oms-row"><span>Shipping</span><span>$0.00</span></div>
               <div className="oms-row total"><span>Total</span><span>$142.00</span></div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Orders;
