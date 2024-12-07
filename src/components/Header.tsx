"use client";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React from "react";

const Header = () => {
  const { cart } = useCart();
  const pathname = usePathname();
  const totalItems = cart.reduce(
    (total, item) => total + item.currentQuantity,
    0
  );
  const isCartPage = pathname === "/cart";
  return (
    <header className="bg-gray-200 text-white p-3 flex justify-between items-center fixed w-full lg:pl-16 lg:pr-16">
      <h1 className="text-2xl font-bold text-black">TeeRex Store</h1>
      <div className="flex space-x-4">
        <Link href="/">
          <button
            className={` ${
              isCartPage ? "transparent" : "bg-white"
            } text-black px-4 py-2 rounded font-bold`}
          >
            Home
          </button>
        </Link>

        <Link href="/cart">
          <button
            className={`${
              !isCartPage ? "transparent" : "bg-white"
            } text-black px-4 py-2 rounded relative`}
          >
            <Image
              src="/shopping-cart.png"
              alt="Cart"
              width={25}
              height={25}
              loading="lazy"
            />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
