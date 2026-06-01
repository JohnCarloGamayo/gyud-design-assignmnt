import { useState, useEffect } from 'react';

/**
 * Custom hook to simulate data fetching from the Command Center API.
 * This architecture allows us to handle partial successes (e.g., Shopify succeeds, TikTok fails)
 * and provide a consistent data interface to the UI.
 */
export const useDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        setLoading(true);
        // In a real app, this would be fetch('/api/v1/dashboard/summary')
        await new Promise(resolve => setTimeout(resolve, 800));

        setData({
          merchant: { name: 'Admin' },
          lastSync: '2 mins ago',
          metrics: {
            revenue: { value: '$124,592', change: '+8.4%', trend: 'up' },
            orders: { value: '1,204', change: '+12%', trend: 'up' },
            conversion: { value: '3.42%', change: '-0.5%', trend: 'down' },
            lowStock: { value: '14 SKUs', change: 'Requires attention', trend: 'warning' },
            syncHealth: { value: '1 Warning', change: 'TikTok Delay', trend: 'warning' }
          },
          salesData: [
            { name: 'Mon', shopify: 4000, tiktok: 2400 },
            { name: 'Tue', shopify: 3000, tiktok: 1398 },
            { name: 'Wed', shopify: 2000, tiktok: 9800 },
            { name: 'Thu', shopify: 2780, tiktok: 3908 },
            { name: 'Fri', shopify: 1890, tiktok: 4800 },
            { name: 'Sat', shopify: 2390, tiktok: 3800 },
            { name: 'Sun', shopify: 3490, tiktok: 4300 },
          ],
          platforms: {
            shopify: { status: 'healthy', lastSync: 'Real-time' },
            tiktok: { status: 'delayed', lastSync: '14m ago' }
          }
        });
      } catch (err) {
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
