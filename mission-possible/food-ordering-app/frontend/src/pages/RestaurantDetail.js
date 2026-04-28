import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRestaurant } from '../../services/api';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import './RestaurantDetail.css';

export default function RestaurantDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const { addItem, removeItem, cart } = useCart();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await getRestaurant(id);
        setRestaurant(res.data.data);
      } catch (err) {
        toast.error('Failed to load restaurant');
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurant();
  }, [id]);

  if (loading) return <div className="loading-spinner"><div className="spinner" /></div>;
  if (!restaurant) return <div className="empty-state"><h3>Restaurant not found</h3></div>;

  const categories = ['All', ...new Set(restaurant.menuItems.map(i => i.category))];
  const filtered = activeCategory === 'All'
    ? restaurant.menuItems
    : restaurant.menuItems.filter(i => i.category === activeCategory);

  const getCartQty = (itemId) => {
    const found = cart.find(i => i.menuItemId === itemId);
    return found ? found.quantity : 0;
  };

  const handleAdd = (item) => {
    if (!user) { toast.error('Please login to add items'); return; }
    addItem(item, restaurant.id, restaurant.name);
  };

  return (
    <div className="restaurant-detail-page">
      <div className="restaurant-hero" style={{ backgroundImage: `url(${restaurant.imageUrl})` }}>
        <div className="hero-overlay">
          <div className="container">
            <span className="cuisine-tag">{restaurant.cuisine}</span>
            <h1>{restaurant.name}</h1>
            <p>{restaurant.description}</p>
            <div className="restaurant-stats">
              <span>⭐ {restaurant.rating} Rating</span>
              <span>🕐 {restaurant.deliveryTime} min delivery</span>
              <span>🛵 ₹{restaurant.deliveryFee} delivery fee</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container menu-container">
        <div className="category-tabs">
          {categories.map(cat => (
            <button key={cat} className={`cat-tab ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}>
              {cat}
            </button>
          ))}
        </div>

        <div className="menu-grid">
          {filtered.map(item => {
            const qty = getCartQty(item.id);
            return (
              <div key={item.id} className="menu-item-card">
                <div className="menu-item-image">
                  <img src={item.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300'} alt={item.name} />
                  {item.vegetarian && <span className="veg-badge">🌱 Veg</span>}
                </div>
                <div className="menu-item-info">
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                  <div className="menu-item-footer">
                    <span className="item-price">₹{item.price}</span>
                    {qty === 0 ? (
                      <button className="add-btn" onClick={() => handleAdd(item)}>+ Add</button>
                    ) : (
                      <div className="qty-control">
                        <button onClick={() => removeItem(item.id)}>−</button>
                        <span>{qty}</span>
                        <button onClick={() => handleAdd(item)}>+</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
