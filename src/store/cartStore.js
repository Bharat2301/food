import { create } from 'zustand';
import axios from 'axios';

const useCartStore = create((set, get) => ({
  cartItems: [],
  fetchCartItems: async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const response = await axios.get('http://localhost:5000/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ cartItems: response.data });
    } catch (error) {
      console.error('Error fetching cart items:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        window.location.href = '/login';
      }
    }
  },
  addItem: async (menuItemId, quantity = 1) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (!token || !userId) {
      window.location.href = '/login';
      return;
    }
    try {
      const response = await axios.post(
        'http://localhost:5000/api/cart',
        { menuItemId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      set((state) => ({
        cartItems: [...state.cartItems.filter((item) => item.id !== response.data.id), response.data],
      }));
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  },
  updateQuantity: async (id, quantity) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const response = await axios.put(
        `http://localhost:5000/api/cart/${id}`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.message === 'Item removed') {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        }));
      } else {
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id ? response.data : item
          ),
        }));
      }
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  },
  removeItem: async (id) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      await axios.delete(`http://localhost:5000/api/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set((state) => ({
        cartItems: state.cartItems.filter((item) => item.id !== id),
      }));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  },
  clearCart: async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      await axios.delete('http://localhost:5000/api/cart/clear', {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ cartItems: [] });
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  },
  getTotalAmount: () => {
    return get().cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },
  getTotalItems: () => {
    return get().cartItems.reduce((sum, item) => sum + item.quantity, 0);
  },
}));

export default useCartStore;