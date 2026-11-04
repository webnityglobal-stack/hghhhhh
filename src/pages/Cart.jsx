
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ShoppingCart,
  ShieldCheck,
} from "lucide-react";
import Navbar from "../components/layout/Navbar";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  // Load cart products
  useEffect(() => {
    const savedCart = JSON.parse(
      localStorage.getItem("medicareCart") || "[]"
    );

    setCartItems(savedCart);
  }, []);

  // Update localStorage
  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem(
      "medicareCart",
      JSON.stringify(updatedCart)
    );
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    updateCart(updatedCart);
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    const updatedCart = cartItems
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updatedCart);
  };

  // Remove product
  const removeProduct = (id) => {
    const updatedCart = cartItems.filter(
      (item) => item.id !== id
    );

    updateCart(updatedCart);
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 px-4 sm:px-6 lg:px-10 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
              My Shopping Cart
            </h1>
            <p className="text-gray-500 mt-2">
              Review your products before checkout.
            </p>
          </div>

          {cartItems.length === 0 ? (
            /* Empty Cart */
            <div className="bg-white rounded-2xl shadow-sm p-8 sm:p-14 text-center">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
                <ShoppingBag size={38} className="text-blue-600" />
              </div>

              <h2 className="text-2xl font-bold text-slate-800 mt-6">
                Your Cart is Empty
              </h2>

              <p className="text-gray-500 mt-3">
                You haven't added any products to your cart yet.
              </p>

              <Link
                to="/shop"
                className="inline-flex items-center gap-2 mt-7 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl font-semibold transition"
              >
                <ShoppingCart size={19} />
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Cart Products */}
              <div className="lg:col-span-2 space-y-5">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 flex flex-col sm:flex-row gap-5"
                  >
                    {/* Product Image */}
                    <Link
                      to={`/product/${item.id}`}
                      className="w-full sm:w-36 h-36 bg-blue-50 rounded-xl flex items-center justify-center shrink-0"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain p-3"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between gap-3">
                        <div>
                          <Link
                            to={`/product/${item.id}`}
                            className="text-lg font-bold text-slate-800 hover:text-blue-600"
                          >
                            {item.name}
                          </Link>

                          <p className="text-blue-600 font-bold mt-2">
                            ₹{item.price.toLocaleString("en-IN")}
                          </p>
                        </div>

                        <button
                          onClick={() => removeProduct(item.id)}
                          className="text-red-500 hover:bg-red-50 h-10 w-10 rounded-lg flex items-center justify-center"
                          aria-label="Remove product"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center justify-between mt-5">
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} />
                          </button>

                          <span className="w-10 text-center font-semibold">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100"
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <p className="font-bold text-slate-800">
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700"
                >
                  <ArrowLeft size={18} />
                  Continue Shopping
                </Link>
              </div>

              {/* Order Summary */}
              <div>
                <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
                  <h2 className="text-xl font-bold text-slate-800">
                    Order Summary
                  </h2>

                  <div className="border-t border-gray-100 my-5" />

                  <div className="flex justify-between text-gray-600 mb-4">
                    <span>Items ({totalItems})</span>
                    <span>
                      ₹{subtotal.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-600 mb-4">
                    <span>Delivery</span>
                    <span className="text-green-600 font-semibold">
                      Free
                    </span>
                  </div>

                  <div className="border-t border-gray-100 my-5" />

                  <div className="flex justify-between text-lg font-bold text-slate-800">
                    <span>Total</span>
                    <span>
                      ₹{subtotal.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* <button
                    onClick={() => alert("Checkout functionality coming soon!")}
                    className="w-full mt-7 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition"
                  >
                    Proceed to Checkout
                  </button> */}

                  <Link
                    to="/checkout"
                    className="block w-full mt-7 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold text-center"
                  >
                    Proceed to Checkout
                  </Link>

                  <div className="flex items-center justify-center gap-2 mt-5 text-gray-500 text-sm">
                    <ShieldCheck size={18} className="text-green-600" />
                    Secure Shopping
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default Cart;
