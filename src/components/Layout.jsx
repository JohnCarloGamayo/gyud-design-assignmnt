import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Toast from './Toast';
import './Layout.css';
import './Toast.css';

const Layout = () => {
  const location = useLocation();
  const [toasts, setToasts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  // Listen for viewport changes
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const closeMobileSidebar = () => { if (isMobile) setIsSidebarOpen(false); };

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const getTitle = (path) => {
    switch (path) {
      case '/': return 'Dashboard';
      case '/analytics': return 'Analytics Deep Dive';
      case '/inventory': return 'Inventory Management';
      case '/orders': return 'Order History';
      case '/alerts': return 'System Health';
      case '/settings': return 'Settings & Branding';
      default: return 'Command Center';
    }
  };

  return (
    <div className={`layout ${isSidebarOpen && !isMobile ? '' : 'sidebar-collapsed'}`}>
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
        onCloseMobile={closeMobileSidebar}
      />
      <div className="main-content">
        <Header
          title={getTitle(location.pathname)}
          onToggleSidebar={toggleSidebar}
        />
        <main className="content-area">
          <Outlet context={{ showToast }} />
        </main>
      </div>

      <div className="toast-container">
        {toasts.map(t => (
          <Toast
            key={t.id}
            message={t.message}
            type={t.type}
            onClose={() => removeToast(t.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Layout;
