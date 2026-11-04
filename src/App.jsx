
import { useState } from "react";
import Navbar from "./components/layout/Navbar";
import ProductCard from "./components/products/ProductCard";
import products from "./data/products";

function App() {
  const [cart, setCart] = useState([]);

  // Add product to cart
  const handleAddToCart = (product) => {
    setCart((previousCart) => {
      const existingProduct = previousCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return previousCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previousCart, { ...product, quantity: 1 }];
    });
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove product
  const removeFromCart = (id) => {
    setCart((previousCart) =>
      previousCart.filter((item) => item.id !== id)
    );
  };

  // Calculate total items and price
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-blue-50 px-6 md:px-16 py-12">

        {/* Products Heading */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Healthcare Products
            </h1>
            <p className="text-gray-500 mt-2">
              Find the best healthcare products for your needs.
            </p>
          </div>

          <div className="bg-white px-5 py-3 rounded-lg shadow-sm font-semibold">
            <span className="text-blue-600">Cart:</span> {totalItems} Items
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {/* Shopping Cart */}
        <section className="mt-16 bg-white p-6 md:p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Your Shopping Cart
          </h2>

          {cart.length === 0 ? (
            <p className="text-gray-500">
              Your cart is empty. Start shopping!
            </p>
          ) : (
            <>
              <div className="space-y-5">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row items-center justify-between gap-5 border-b pb-5"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-contain bg-blue-50 rounded-lg"
                      />

                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {item.name}
                        </h3>
                        <p className="text-blue-600 font-bold">
                          ₹{item.price}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="bg-gray-200 px-3 py-1 rounded"
                      >
                        -
                      </button>

                      <span className="font-bold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        +
                      </button>
                    </div>

                    <div className="font-bold text-gray-800">
                      ₹{item.price * item.quantity}
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              {/* Cart Total */}
              <div className="mt-8 flex flex-col items-end gap-3">
                <p className="text-gray-600">
                  Total Items: <strong>{totalItems}</strong>
                </p>

                <h3 className="text-2xl font-bold text-blue-600">
                  Total: ₹{totalPrice}
                </h3>

                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold">
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </section>

      </main>
    </>
  );
}

export default App;
