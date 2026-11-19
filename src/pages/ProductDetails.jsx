
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { ShoppingCart, Minus, Plus, Truck, ShieldCheck, ArrowLeft } from "lucide-react";
import products from "../data/products";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const [quantity, setQuantity] = useState(1);
  const [cartMessage, setCartMessage] = useState("");

  const handleAddToCart = () => {
    const existingCart = JSON.parse(
      localStorage.getItem("medicareCart") || "[]"
    );
    

    const existingProduct = existingCart.find(
      (item) => item.id === product.id
    );

    let updatedCart;

    if (existingProduct) {
      updatedCart = existingCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedCart = [
        ...existingCart,
        { ...product, quantity },
      ];
    }

    localStorage.setItem(
      "medicareCart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(new Event("cartUpdated"));

    setCartMessage("Product successfully added to cart!");
  };

  if (!product) {
    return (
      <>
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-800">
            Product Not Found
          </h2>
          <Link to="/shop" className="mt-5 text-blue-600 font-semibold">
            Back to Shop
          </Link>
        </div>
      </>
    );
  }

  const discount = Math.round(
    ((product.mrp - product.price) / product.mrp) * 100
  );

  return (
    <>
      

      <main className="bg-white min-h-screen px-4 sm:px-6 lg:px-10 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-8"
          >
            <ArrowLeft size={18} />
            Back to Shop
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">

            {/* Product Image */}
            <div className="bg-blue-50 rounded-2xl p-5 sm:p-8">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[280px] sm:h-[400px] object-contain rounded-xl"
              />
            </div>

            {/* Product Information */}
            <div className="py-2">

              <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-2 rounded-full">
                Healthcare Product
              </span>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mt-5 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-2 mt-4">
                <span className="text-yellow-500 text-lg">★</span>
                <span className="font-semibold text-slate-700">
                  {product.rating}
                </span>
                <span className="text-gray-400 text-sm">
                  Customer Rating
                </span>
              </div>

              {/* Price */}
              <div className="flex flex-wrap items-center gap-3 mt-7">
                <span className="text-3xl font-bold text-slate-800">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>

                <span className="text-lg text-gray-400 line-through">
                  ₹{product.mrp.toLocaleString("en-IN")}
                </span>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-semibold">
                  {discount}% OFF
                </span>
              </div>

              <p className="text-gray-500 text-sm mt-2">
                Inclusive of applicable taxes
              </p>

              <div className="border-t border-gray-100 my-7" />

              {/* Quantity */}
              <p className="font-semibold text-slate-800 mb-3">
                Select Quantity
              </p>

              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">

                  <button
                    onClick={() =>
                      setQuantity((prev) => Math.max(1, prev - 1))
                    }
                    className="w-11 h-11 flex items-center justify-center hover:bg-gray-100"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={17} />
                  </button>

                  <span className="w-12 text-center font-semibold">
                    {quantity}
                  </span>

                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="w-11 h-11 flex items-center justify-center hover:bg-gray-100"
                    aria-label="Increase quantity"
                  >
                    <Plus size={17} />
                  </button>

                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="w-full sm:w-auto mt-7 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition shadow-md"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>

              {cartMessage && (
                <p className="text-green-600 font-medium text-sm mt-4">
                  {cartMessage}
                </p>
              )}

              {/* Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">

                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                  <Truck className="text-blue-600" size={24} />
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">
                      Fast Delivery
                    </p>
                    <p className="text-gray-500 text-xs">
                      Convenient doorstep delivery
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                  <ShieldCheck className="text-blue-600" size={24} />
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">
                      Secure Shopping
                    </p>
                    <p className="text-gray-500 text-xs">
                      Safe shopping experience
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Product Description */}
          <section className="mt-14 border-t border-gray-100 pt-10">
            <h2 className="text-2xl font-bold text-slate-800">
              Product Description
            </h2>

            <p className="text-gray-600 leading-relaxed mt-4 max-w-3xl">
              Explore the {product.name}, a healthcare product selected
              for your everyday healthcare needs. Check the product
              packaging and manufacturer's instructions before use.
            </p>
          </section>

        </div>
      </main>
    </>
  );
}

export default ProductDetails;
