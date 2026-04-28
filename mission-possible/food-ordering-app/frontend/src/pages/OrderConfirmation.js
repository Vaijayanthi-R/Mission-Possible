import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getOrder } from '../../services/api';
import './OrderConfirmation.css';

const STATUS_STEPS = ['PENDING', 'CONFIRMED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED'];

const STATUS_LABELS = {
  PENDING: 'Order Placed',
  CONFIRMED: 'Confirmed',
  PREPARING: 'Preparing',
  OUT_FOR_DELIVERY: 'On the Way',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled'
};

const STATUS_ICONS = {
  PENDING: '📋', CONFIRMED: '✅', PREPARING: '👨‍🍳',
  OUT_FOR_DELIVERY: '🛵', DELIVERED: '🎉', CANCELLED: '❌'
};

export default function OrderConfirmation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await getOrder(id);
        setOrder(res.data.data);
      } catch {
        navigate('/orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id, navigate]);

  if (loading) return <div className="loading-spinner"><div className="spinner" /></div>;
  if (!order) return null;

  const currentStep = STATUS_STEPS.indexOf(order.status);
  const isCancelled = order.status === 'CANCELLED';

  return (
    <div className="confirmation-page container">
      <div className="confirmation-card">
        <div className={`confirmation-header ${isCancelled ? 'cancelled' : ''}`}>
          <div className="status-icon">{STATUS_ICONS[order.status]}</div>
          <h1>{isCancelled ? 'Order Cancelled' : 'Order Confirmed!'}</h1>
          <p>Order #{order.id?.slice(-8).toUpperCase()}</p>
          {!isCancelled && <p className="email-note">📧 Confirmation sent to your email</p>}
        </div>

        {!isCancelled && (
          <div className="status-tracker">
            {STATUS_STEPS.map((step, idx) => (
              <div key={step} className={`step ${idx <= currentStep ? 'done' : ''} ${idx === currentStep ? 'active' : ''}`}>
                <div className="step-circle">{idx < currentStep ? '✓' : idx + 1}</div>
                <span>{STATUS_LABELS[step]}</span>
                {idx < STATUS_STEPS.length - 1 && <div className={`step-line ${idx < currentStep ? 'done' : ''}`} />}
              </div>
            ))}
          </div>
        )}

        <div className="order-details">
          <div className="detail-section">
            <h3>🍽️ {order.restaurantName}</h3>
            <div className="order-items-list">
              {order.items?.map((item, i) => (
                <div key={i} className="order-item-row">
                  <span>{item.quantity}× {item.name}</span>
                  <span>₹{item.totalPrice?.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="detail-section">
            <h3>📍 Delivery Address</h3>
            <p className="address-text">{order.deliveryAddress}</p>
          </div>

          <div className="detail-section bill-summary">
            <div className="bill-row">
              <span>Subtotal</span>
              <span>₹{order.subtotal?.toFixed(2)}</span>
            </div>
            <div className="bill-row">
              <span>Delivery Fee</span>
              <span>₹{order.deliveryFee?.toFixed(2)}</span>
            </div>
            <div className="bill-row total">
              <span>Total Paid</span>
              <span>₹{order.totalAmount?.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="confirmation-actions">
          <Link to="/orders" className="btn-secondary">View All Orders</Link>
          <Link to="/" className="btn-primary">Order Again</Link>
        </div>
      </div>
    </div>
  );
}
