import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRestaurants, searchRestaurants } from '../../services/api';
import './Home.css';

const CUISINES = ['All', 'South Indian', 'Italian', 'American', 'Mughlai', 'Chinese', 'Mexican'];

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCuisine, setActiveCuisine] = useState('All');

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const res = await getRestaurants();
      setRestaurants(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    const val = e.target.value;
    setSearch(val);
    if (val.trim().length > 1) {
      try {
        const res = await searchRestaurants(val);
        setRestaurants(res.data.data);
      } catch {}
    } else if (val === '') {
      fetchRestaurants();
    }
  };

  const filtered = activeCuisine === 'All'
    ? restaurants
    : restaurants.filter(r => r.cuisine === activeCuisine);

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="container">
          <h1>Hungry? We've got you covered 🍔</h1>
          <p>Order food from the best restaurants near you</p>
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search restaurants or cuisines..."
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="cuisine-filters">
          {CUISINES.map(c => (
            <button
              key={c}
              className={`cuisine-btn ${activeCuisine === c ? 'active' : ''}`}
              onClick={() => setActiveCuisine(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading-spinner"><div className="spinner" /></div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🍽️</div>
            <h3>No restaurants found</h3>
            <p>Try a different search or cuisine filter</p>
          </div>
        ) : (
          <>
            <h2 className="section-title">{filtered.length} Restaurants Available</h2>
            <div className="restaurants-grid">
              {filtered.map(r => (
                <Link to={`/restaurant/${r.id}`} key={r.id} className="restaurant-card">
                  <div className="restaurant-image">
                    <img src={r.imageUrl || `https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400`} alt={r.name} />
                    <div className="restaurant-badge">{r.cuisine}</div>
                  </div>
                  <div className="restaurant-info">
                    <h3>{r.name}</h3>
                    <p className="restaurant-desc">{r.description}</p>
                    <div className="restaurant-meta">
                      <span className="rating">⭐ {r.rating}</span>
                      <span className="dot">•</span>
                      <span className="time">🕐 {r.deliveryTime} min</span>
                      <span className="dot">•</span>
                      <span className="fee">₹{r.deliveryFee} delivery</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
