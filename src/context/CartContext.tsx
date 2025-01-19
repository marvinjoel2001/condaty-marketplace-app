import React, {createContext, useState, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Product} from '../types/product';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextData {
  items: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export const CartProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const saveCart = async (cartItems: CartItem[]) => {
    try {
      await AsyncStorage.setItem('@cart_items', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  const addToCart = (product: Product, quantity: number) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(
        item => item.product.id === product.id,
      );

      let newItems;
      if (existingItem) {
        newItems = currentItems.map(item =>
          item.product.id === product.id
            ? {...item, quantity: item.quantity + quantity}
            : item,
        );
      } else {
        newItems = [...currentItems, {product, quantity}];
      }

      saveCart(newItems);
      return newItems;
    });
  };

  const removeFromCart = (productId: number) => {
    setItems(currentItems => {
      const newItems = currentItems.filter(
        item => item.product.id !== productId,
      );
      saveCart(newItems);
      return newItems;
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setItems(currentItems => {
      const newItems = currentItems.map(item =>
        item.product.id === productId ? {...item, quantity} : item,
      );
      saveCart(newItems);
      return newItems;
    });
  };

  const clearCart = () => {
    setItems([]);
    saveCart([]);
  };

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
