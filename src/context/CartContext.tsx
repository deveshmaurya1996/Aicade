"use client";

import { CartContextValue, CartItem } from "@/types/cart";
import { Product } from "@/types/types";
import { createContext, useContext, useState, ReactNode } from "react";

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      if (existingItem.currentQuantity >= product.quantity) {
        alert("Cannot add more of this product. Maximum quantity reached.");
        return;
      }
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                currentQuantity: item.currentQuantity + 1,
              }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, currentQuantity: 1 }]);
    }
  };

  const updateQuantity = (id: string, currentQuantity: number) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, currentQuantity: currentQuantity } : item
      )
    );
  };

  const increaseQuantity = (id: string) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, currentQuantity: item.currentQuantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id: string) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.currentQuantity > 1
          ? { ...item, currentQuantity: item.currentQuantity - 1 }
          : item
      )
    );
  };

  const getProductById = (id: string): Product | undefined => {
    return cart.find((product) => product.id === id);
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const value: CartContextValue = {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    getProductById,
    increaseQuantity,
    decreaseQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
