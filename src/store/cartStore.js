import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-toastify';

const useCartStore = create((set, get) => ({
  cartItems: [],
  fetchCartItems: async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ cartItems: response.data });
    } catch (error) {
      console.error('Error fetching cart items:', error.response?.data || error.message);
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        window.location.href = '/login';
        toast.error('Session expired. Please log in again.');
      } else {
        toast.error(error.response?.data?.message || 'Failed to fetch cart items.');
      }
    }
  },
  addItem: async (item, quantity = 1) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (!token || !userId) {
      window.location.href = '/login';
      toast.warn('Please log in to add items to cart.');
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/cart`,
        { menuItemId: item.id, quantity }, // Use custom id
        { headers: { Authorization: `Bearer ${token}` } }
      );
      set((state) => ({
        cartItems: [
          ...state.cartItems.filter((cartItem) => cartItem.menuItemId.id !== item.id),
          response.data,
        ],
      }));
      toast.success(`${item.title} added to cart!`);
    } catch (error) {
      console.error('Error adding item to cart:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      toast.error(error.response?.data?.message || 'Failed to add item to cart.');
    }
  },
  updateQuantity: async (menuItemId, quantity) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/cart/${menuItemId}`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.message === 'Item removed') {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.menuItemId.id !== menuItemId),
        }));
        toast.success('Item removed from cart.');
      } else {
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.menuItemId.id === menuItemId ? response.data : item
          ),
        }));
        toast.success('Cart updated.');
      }
    } catch (error) {
      console.error('Error updating item quantity:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to update cart.');
    }
  },
  removeItem: async (menuItemId) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/cart/${menuItemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set((state) => ({
        cartItems: state.cartItems.filter((item) => item.menuItemId.id !== menuItemId),
      }));
      toast.success('Item removed from cart.');
    } catch (error) {
      console.error('Error removing item:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to remove item.');
    }
  },
  clearCart: async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/cart/clear`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ cartItems: [] });
      toast.success('Cart cleared.');
    } catch (error) {
      console.error('Error clearing cart:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to clear cart.');
    }
  },
  getTotalAmount: () => {
    return get().cartItems.reduce((sum, item) => sum + item.menuItemId.price * item.quantity, 0);
  },
  getTotalItems: () => {
    return get().cartItems.reduce((sum, item) => sum + item.quantity, 0);
  },
}));

export default useCartStore;