import React, { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [restaurantId, setRestaurantId] = useState(null);
  const [restaurantName, setRestaurantName] = useState('');

  const addItem = (item, restId, restName) => {
    if (restaurantId && restaurantId !== restId) {
      if (!window.confirm('Adding items from a different restaurant will clear your cart. Continue?')) return;
      setCart([]);
      setRestaurantId(restId);
      setRestaurantName(restName);
    }
    if (!restaurantId) {
      setRestaurantId(restId);
      setRestaurantName(restName);
    }
    setCart(prev => {
      const existing = prev.find(i => i.menuItemId === item.id);
      if (existing) {
        toast.success('Item quantity updated!');
        return prev.map(i => i.menuItemId === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      toast.success(`${item.name} added to cart!`);
      return [...prev, { menuItemId: item.id, name: item.name, price: item.price, quantity: 1 }];
    });
  };

  const removeItem = (menuItemId) => {
    setCart(prev => {
      const item = prev.find(i => i.menuItemId === menuItemId);
      if (!item) return prev;
      if (item.quantity === 1) {
        const updated = prev.filter(i => i.menuItemId !== menuItemId);
        if (updated.length === 0) { setRestaurantId(null); setRestaurantName(''); }
        return updated;
      }
      return prev.map(i => i.menuItemId === menuItemId ? { ...i, quantity: i.quantity - 1 } : i);
    });
  };

  const clearCart = () => {
    setCart([]);
    setRestaurantId(null);
    setRestaurantName('');
  };

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, restaurantId, restaurantName, addItem, removeItem, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);