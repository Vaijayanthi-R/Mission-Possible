import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { placeOrder } from '../../services/api';
import './Cart.css';

export default function Cart() {
  const { cart, restaurantId, restaurantName, cartTotal, addItem, removeItem, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState(user?.address || '');
  const [loading, setLoading] = useState(false);

  const DELIVERY_FEE = 40;

  const handlePlaceOrder = async () => {
    if (!address.trim()) { toast.error('Please enter delivery address'); return; }
    if (cart.length === 0) { toast.error('Cart is empty'); return; }

    setLoading(true);
    try {
      const orderData = {
        restaurantId,
        items: cart.map(i => ({
          menuItemId: i.menuItemId,
          name: i.name,
          price: i.price,
          quantity: i.quantity
        })),
        deliveryAddress: address
      };
      const res = await placeOrder(orderData);
      clearCart();
      toast.success('Order placed successfully! 🎉');
      navigate(`/order-confirmation/${res.data.data.id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container" style={{ paddingTop: 60 }}>
        <div className="empty-state">
          <div className="empty-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Add some delicious items to get started!</p>
          <button className="btn-primary" style={{ marginTop: 20 }} onClick={() => navigate('/')}>
            Browse Restaurants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page container">
      <h1 className="page-title">Your Cart</h1>
      <p className="page-subtitle">From {restaurantName}</p>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.menuItemId} className="cart-item">
              <div className="cart-item-info">
                <h4>{item.name}</h4>
                <p className="item-unit-price">₹{item.price} each</p>
              </div>
              <div className="cart-item-controls">
                <div className="qty-control-cart">
                  <button onClick={() => removeItem(item.menuItemId)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => addItem({ id: item.menuItemId, name: item.name, price: item.price }, restaurantId, restaurantName)}>+</button>
                </div>
                <span className="item-total">₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>

          <div className="form-group">
            <label>Delivery Address *</label>
            <textarea
              rows="3"
              placeholder="Enter your full delivery address..."
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </div>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{cartTotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>₹{DELIVERY_FEE}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{(cartTotal + DELIVERY_FEE).toFixed(2)}</span>
          </div>

          <button className="btn-primary place-order-btn" onClick={handlePlaceOrder} disabled={loading}>
            {loading ? 'Placing Order...' : `Place Order • ₹${(cartTotal + DELIVERY_FEE).toFixed(2)}`}
          </button>

          <button className="clear-cart-btn" onClick={clearCart}>Clear Cart</button>
        </div>
      </div>
    </div>
  );
}
