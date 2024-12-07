import { useCart } from "@/context/CartContext";
import { Product } from "@/types/types";

const ProductCard = ({ product }: { product: Product }) => {
  const {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const existingItem = cart.find((item) => item.id === product.id);

  const handleIncrease = () => {
    if (existingItem && existingItem.currentQuantity < product.quantity) {
      increaseQuantity(product.id);
    }
  };

  const handleDecrease = () => {
    if (existingItem) {
      if (existingItem.currentQuantity > 1) {
        decreaseQuantity(product.id);
      } else if (existingItem.currentQuantity === 1) {
        removeFromCart(product.id);
      }
    }
  };

  return (
    <div className="border p-4">
      <img
        src={product.imageURL}
        alt={product.name}
        className="w-full h-40 object-cover"
      />
      <div className="flex flex-column justify-between mt-2">
        <div>
          <h3 className="font-bold">{product.name}</h3>
          <p>Rs. {product.price}</p>
        </div>

        {existingItem ? (
          <div className="bg-black flex items-center gap-2 mt-2">
            <button
              onClick={handleDecrease}
              className="text-white p-2 font-bold"
            >
              -
            </button>
            <span className="font-bold text-white">
              {existingItem.currentQuantity}
            </span>
            <button
              onClick={handleIncrease}
              className="text-white p-2 font-bold"
            >
              +
            </button>
          </div>
        ) : product.quantity > 1 ? (
          <button
            onClick={() => addToCart(product)}
            className="bg-black text-white p-2 mt-2 font-bold"
          >
            Add to Cart
          </button>
        ) : (
          <p className="text-red-500 font-bold mt-4">Sold Out</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
