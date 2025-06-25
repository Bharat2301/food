import { create } from 'zustand';
import axios from 'axios';

// Helper to get or generate userId
const getUserId = () => {
  let userId = localStorage.getItem('userId');
  if (!userId) {
    userId = Math.random().toString(36).substring(2, 15); // Simple random ID (replace with UUID if preferred)
    localStorage.setItem('userId', userId);
  }
  return userId;
};

const useCartStore = create((set, get) => ({
  cartItems: [],
  userId: getUserId(),

  // Fetch cart items from backend
  fetchCartItems: async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/cart/${get().userId}`);
      set({ cartItems: response.data });
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  },

  // Add item to cart
  addItem: async (item) => {
    try {
      const response = await axios.post('http://localhost:5000/api/cart', {
        userId: get().userId,
        item,
      });
      set((state) => ({
        cartItems: state.cartItems.some((i) => i.id === item.id)
          ? state.cartItems.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            )
          : [...state.cartItems, { ...response.data, quantity: response.data.quantity || 1 }],
      }));
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  },

  // Update item quantity
  updateQuantity: async (id, quantity) => {
    try {
      await axios.put(`http://localhost:5000/api/cart/${id}`, {
        userId: get().userId,
        quantity,
      });
      if (quantity < 1) {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        }));
      } else {
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      }
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  },

  // Remove item from cart
  removeItem: async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${id}`, {
        data: { userId: get().userId },
      });
      set((state) => ({
        cartItems: state.cartItems.filter((item) => item.id !== id),
      }));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  },

  // Clear cart
  clearCart: async () => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/clear/${get().userId}`);
      set({ cartItems: [] });
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  },

  // Get total items
  getTotalItems: () => {
    return get().cartItems.reduce((total, item) => total + item.quantity, 0);
  },

  // Get total amount
  getTotalAmount: () => {
    return get().cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },
}));

export default useCartStore;