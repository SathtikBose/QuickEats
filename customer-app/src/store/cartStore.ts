import { create } from 'zustand';

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  isVeg: boolean;
  restaurantId: string;
}

interface CartState {
  items: CartItem[];
  restaurantId: string | null;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  restaurantId: null,

  addItem: (item) => {
    set((state) => {
      // Prevent adding items from different restaurants
      if (state.restaurantId && state.restaurantId !== item.restaurantId) {
        throw new Error('You can only order from one restaurant at a time');
      }

      const existingItem = state.items.find((i) => i._id === item._id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((i) =>
            i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }

      return {
        ...state,
        restaurantId: item.restaurantId,
        items: [...state.items, { ...item, quantity: 1 }],
      };
    });
  },

  removeItem: (id) => {
    set((state) => {
      const newItems = state.items.filter((i) => i._id !== id);
      return {
        ...state,
        items: newItems,
        restaurantId: newItems.length === 0 ? null : state.restaurantId,
      };
    });
  },

  incrementQuantity: (id) => {
    set((state) => ({
      ...state,
      items: state.items.map((i) =>
        i._id === id ? { ...i, quantity: i.quantity + 1 } : i
      ),
    }));
  },

  decrementQuantity: (id) => {
    set((state) => {
      const item = state.items.find((i) => i._id === id);
      if (item && item.quantity === 1) {
        const newItems = state.items.filter((i) => i._id !== id);
        return {
          ...state,
          items: newItems,
          restaurantId: newItems.length === 0 ? null : state.restaurantId,
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i._id === id ? { ...i, quantity: i.quantity - 1 } : i
        ),
      };
    });
  },

  clearCart: () => set({ items: [], restaurantId: null }),

  getTotal: () => {
    return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
}));
