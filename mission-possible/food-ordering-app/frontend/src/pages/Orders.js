import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getUserOrders, cancelOrder } from '../../services/api';
import './Orders.css';

const STATUS_COLORS = {
  PENDING: 'badge-warning',
  CONFIRMED: 'badge-info',
  PREPARING: 'badge-warning',
  OUT_FOR_DELIVERY: 'badge-info',
  DELIVERED: 'badge-success',
  CANCELLED: 'badge-error'
};

const STATUS_LABELS = {
  PENDING: '⏳ Pending',
  CONFIRMED: '✅ Confirmed',
  PREPARING: '👨‍🍳 Preparing',
  OUT_FOR_DELIVERY: '🛵 On the Way',
  DELIVERED: '🎉 Delivered',
  CANCELLED: '❌ Cancelled'
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await getUserOrders();
      setOrders(res.data.data);
    } catch {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (orderId) => {
    if (!window.confirm('Cancel this order?')) return;
    try {
      await cancelOrder(orderId);
      toast.success('Order cancelled');
      fetchOrders();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Cannot cancel order');
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  if (loading) return <div className="loading-spinner"><div className="spinner" /></div>;

  return (
    <div className="orders-page container">
      <h1 className="page-title">My Orders</h1>
      <p className="page-subtitle">Track and manage all your orders</p>

      {orders.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <h3>No orders yet</h3>
          <p>Start ordering your favourite food!</p>
          <Link to="/" className="btn-primary" style={{ marginTop: 20 }}>Browse Restaurants</Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-card-header">
                <div>
                  <h3>{order.restaurantName}</h3>
                  <p className="order-date">{formatDate(order.createdAt)}</p>
                </div>
                <span className={`badge ${STATUS_COLORS[order.status]}`}>
                  {STATUS_LABELS[order.status]}
                </span>
              </div>

              <div className="order-items-preview">
                {order.items?.slice(0, 3).map((item, i) => (
                  <span key={i} className="item-chip">{item.quantity}× {item.name}</span>
                ))}
                {order.items?.length > 3 && (
                  <span className="item-chip more">+{order.items.length - 3} more</span>
                )}
              </div>

              <div className="order-card-footer">
                <div className="order-total">
                  <span>Total</span>
                  <strong>₹{order.totalAmount?.toFixed(2)}</strong>
                </div>
                <div className="order-actions">
                  <Link to={`/order-confirmation/${order.id}`} className="btn-view">View Details</Link>
                  {['PENDING', 'CONFIRMED'].includes(order.status) && (
                    <button className="btn-cancel" onClick={() => handleCancel(order.id)}>
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
