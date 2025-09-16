import { useState, useEffect } from 'react';
import { OrderHistory } from '../types/auth';
import { HomeAPI } from '../services/api';

interface UseOrderHistoryReturn {
  orders: OrderHistory | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useOrderHistory = (limit: number = 5): UseOrderHistoryReturn => {
  const [orders, setOrders] = useState<OrderHistory | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const orderData = await HomeAPI.getOrderHistory(1, limit);
      setOrders(orderData);
    } catch (err: any) {
      // Don't treat empty orders as an error for new users
      if (err.statusCode === 404 || err.message?.includes('No orders found')) {
        setOrders({
          orders: [],
          totalCount: 0,
          currentPage: 1,
          totalPages: 0
        });
      } else {
        setError(err.message || 'Failed to fetch order history');
        console.error('Order history fetch error:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    await fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, [limit]);

  return {
    orders,
    loading,
    error,
    refetch,
  };
};
