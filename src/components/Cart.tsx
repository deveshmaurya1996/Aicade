import { useCart } from "@/context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const handleQuantityChange = (itemId: string, currentQuantity: number) => {
    console.log(`Item ID: ${itemId}, New Quantity: ${currentQuantity}`);
    updateQuantity(itemId, currentQuantity);
  };

  return (
    <div className="bg-white rounded-lg p-4 max-w-7xl flex-1 shadow-lg">
      <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>

      {cart.length > 0 ? (
        <>
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4 mb-4">
              <img
                src={item.imageURL}
                alt={item.name}
                className="w-16 h-16 object-cover"
              />
              <div className="flex-1">
                <h3 className="font-bold">{item.name}</h3>
                <p>${item.price}</p>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={item.currentQuantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                  className="p-1 border border-gray-300 rounded-md"
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

          <p className="text-lg font-bold border-t border-gray-300 mt-4 p-4 pr-0 text-right">
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

export default Cart;
