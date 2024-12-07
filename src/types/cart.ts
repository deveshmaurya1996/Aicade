import { Product } from "./types";

export interface CartItem extends Product {
  currentQuantity: number; // Adds quantity to the existing Product type
}

export interface CartContextValue {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  updateQuantity: (id: string, currentQuntity: number) => void;
  removeFromCart: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
}
