"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";

const CartComponent = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const handleQuantityChange = (itemId: string, currentQuantity: number) => {
    console.log(`Item ID: ${itemId}, New Quantity: ${currentQuantity}`);
    updateQuantity(itemId, currentQuantity);
  };

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen bg-gray-50 max-w-screen-xl">
      <h1 className="text-2xl font-bold text-left text-gray-800 mb-8 mt-16">
        Your Shopping Cart
      </h1>

      {cart.length > 0 ? (
        <>
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4 mb-4">
              <Image
                src={item.imageURL}
                alt={item.name}
                width={55}
                height={55}
                // layout="responsive"
                loading="lazy"
              />
              <div className="flex-1">
                <h3 className="font-bold text-black">{item.name}</h3>
                <p className="text-black">Rs. {item.price}</p>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={item.currentQuantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                  className="p-1 border border-gray-300 rounded-md text-black"
                >
                  {Array.from(
                    { length: item.quantity },
                    (_, index) => index + 1
                  ).map((quantity) => (
                    <option key={quantity} value={quantity}>
                      {quantity}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="border-solid border border-black rounded-md text-black px-6 py-1"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          <p className="text-lg font-bold border-t border-gray-300 mt-4 p-4 pr-0 text-right text-black">
            Total: Rs.{" "}
            {cart.reduce(
              (total, item) => total + item.price * item.currentQuantity,
              0
            )}
          </p>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartComponent;
