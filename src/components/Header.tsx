import { useCart } from "@/context/CartContext";
import React from "react";

interface HeaderProps {
  onTabChange: (tab: "products" | "cart") => void;
  isCartOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onTabChange, isCartOpen }) => {
  const { cart } = useCart();

  const totalItems = cart.reduce(
    (total, item) => total + item.currentQuantity,
    0
  );

  return (
    <header className="bg-gray-200 text-white p-2 flex justify-between items-center fixed w-full">
      <h1 className="text-2xl font-bold text-black">TeeRex Store</h1>
      <div className="flex space-x-4">
        <button
          className={` ${
            isCartOpen ? "transparent" : "bg-white"
          } text-black px-4 py-2 rounded font-bold underline`}
          onClick={() => onTabChange("products")}
        >
          Products
        </button>
        <button
          className={`${
            !isCartOpen ? "transparent" : "bg-white"
          } text-black px-4 py-2 rounded`}
          onClick={() => {
            onTabChange("cart");
          }}
        >
          <img src="/shopping-cart.png" alt="Cart" width={30} height={30} />
          {totalItems > 0 && (
            <span className="absolute top-2 right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
