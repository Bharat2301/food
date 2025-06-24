import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      addItem: (item) => {
        const existingItem = get().cartItems.find((i) => i.id === item.id);
        if (existingItem) {
          set((state) => ({
            cartItems: state.cartItems.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          }));
        } else {
          set((state) => ({
            cartItems: [...state.cartItems, { ...item, quantity: 1 }],
          }));
        }
      },
      updateQuantity: (id, quantity) => {
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
      },
      removeItem: (id) => {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        }));
      },
      clearCart: () => {
        set({ cartItems: [] });
      },
      getTotalItems: () => {
        return get().cartItems.reduce((total, item) => total + item.quantity, 0);
      },
      getTotalAmount: () => {
        return get().cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'cart-storage', // Persist cart in localStorage
    }
  )
);

export default useCartStore;