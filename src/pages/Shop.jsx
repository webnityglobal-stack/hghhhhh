
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  ShoppingCart,
  Check,
  Search,
  ArrowRight,
  ShieldCheck,
  Truck,
  Headphones,
  SlidersHorizontal,
  PackageSearch,
} from "lucide-react";

import products from "../data/products";

const productCategories = {
  "Medical Equipment": [1, 2, 4, 5, 6, 7, 8, 16],
  "Health & Wellness": [9, 10, 14, 17, 18],
  "Personal Care": [12, 13],
  "Healthcare Essentials": [3, 11, 15],
};

function Shop() {
  const navigate = useNavigate();
  const location = useLocation();

  const [addedProduct, setAddedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const selectedCategory = new URLSearchParams(location.search).get("category");

  const handleAddToCart = (product) => {
    let user = null;

    try {
      user = JSON.parse(localStorage.getItem("medicareUser") || "null");
    } catch {
      user = null;
    }

    if (!user?.email) {
      navigate("/login", {
        state: {
          from: location,
          action: "add-to-cart",
        },
      });
      return;
    }

    try {
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
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [
          ...existingCart,
          { ...product, quantity: 1 },
        ];
      }

      localStorage.setItem("medicareCart", JSON.stringify(updatedCart));

      setAddedProduct(product.id);

      setTimeout(() => {
        setAddedProduct(null);
      }, 1800);
    } catch {
      alert("Unable to add product. Please try again.");
    }
  };

  // CATEGORY + SEARCH FILTER
  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const categoryProductIds = productCategories[selectedCategory];

    const matchesCategory = selectedCategory
      ? categoryProductIds?.includes(product.id)
      : true;

    return matchesSearch && matchesCategory;
  });

  // SORT PRODUCTS
  if (sortBy === "price-low") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.price - b.price
    );
  } else if (sortBy === "price-high") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.price - a.price
    );
  } else if (sortBy === "name") {
    filteredProducts = [...filteredProducts].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  return (
    <>
      

      <main className="min-h-screen bg-[#F7F9FC]">

        {/* SHOP HERO */}
        <section className="bg-[#EDF4FF] border-b border-blue-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-11">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-7">

              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                  <Link to="/" className="hover:text-blue-600">
                    Home
                  </Link>
                  <span>/</span>
                  <span className="text-blue-600 font-semibold">
                    Shop
                  </span>
                  {selectedCategory && (
                    <>
                      <span>/</span>
                      <span className="text-blue-600 font-semibold">
                        {selectedCategory}
                      </span>
                    </>
                  )}
                </div>

                <span className="inline-flex items-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-wider bg-white px-3 py-2 rounded-full border border-blue-100">
                  <ShieldCheck size={15} />
                  Healthcare Collection
                </span>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102A43] mt-4 leading-tight">
                  Shop Healthcare
                  <span className="block text-blue-600">
                    Essentials
                  </span>
                </h1>

                <p className="text-slate-600 mt-4 leading-7 max-w-xl text-sm sm:text-base">
                  Discover medical equipment, wellness products and
                  everyday healthcare essentials in one convenient place.
                </p>

                <div className="flex flex-wrap gap-5 mt-6">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                    <ShieldCheck size={18} className="text-teal-600" />
                    Quality Focused
                  </div>

                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                    <Truck size={18} className="text-teal-600" />
                    Convenient Delivery
                  </div>
                </div>
              </div>

              <div className="hidden lg:flex items-center justify-center relative">
                <div className="absolute w-56 h-56 bg-blue-200/60 rounded-full blur-3xl" />

                <img
                  src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=700&auto=format&fit=crop&q=85"
                  alt="Healthcare medical equipment"
                  className="relative w-72 h-56 object-cover rounded-2xl shadow-xl shadow-blue-900/10 border-4 border-white"
                />
              </div>

            </div>
          </div>
        </section>

        {/* SHOP CONTENT */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

          {/* SEARCH AND FILTER BAR */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-7">

            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#102A43]">
                {selectedCategory || "All Products"}
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                {selectedCategory
                  ? `Explore products in ${selectedCategory}.`
                  : "Explore our healthcare product collection."}
              </p>

              {selectedCategory && (
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-1 text-sm text-blue-600 font-semibold mt-2 hover:text-blue-800"
                >
                  <ArrowRight size={15} className="rotate-180" />
                  View All Products
                </Link>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">

              <div className="relative flex-1 sm:w-64">
                <Search
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search healthcare products..."
                  className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                />
              </div>

              <div className="relative">
                <SlidersHorizontal
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                />

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full sm:w-48 appearance-none bg-white border border-slate-200 rounded-xl py-3 pl-10 pr-8 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="featured">Featured Products</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>

            </div>
          </div>

          {/* PRODUCT COUNT */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-bold text-slate-800">
                {filteredProducts.length}
              </span>{" "}
              products
            </p>

            <span className="text-xs text-slate-400 font-medium">
              MEDICARE COLLECTION
            </span>
          </div>

          {/* PRODUCT GRID */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 sm:gap-6">

              {filteredProducts.map((product) => {
                const discount = product.mrp > product.price
                  ? Math.round(
                      ((product.mrp - product.price) / product.mrp) * 100
                    )
                  : 0;

                return (
                  <div
                    key={product.id}
                    className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300"
                  >

                    {/* PRODUCT IMAGE */}
                    <Link
                      to={`/product/${product.id}`}
                      className="relative flex items-center justify-center bg-[#F2F6FC] p-5 sm:p-6 h-60 sm:h-64 overflow-hidden"
                    >
                      {discount > 0 && (
                        <span className="absolute top-4 left-4 z-10 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                          {discount}% OFF
                        </span>
                      )}

                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>

                    {/* PRODUCT INFORMATION */}
                    <div className="p-5">

                      <Link to={`/product/${product.id}`}>
                        <h3 className="text-base sm:text-lg font-bold text-[#102A43] line-clamp-2 min-h-12 group-hover:text-blue-600 transition">
                          {product.name}
                        </h3>
                      </Link>

                      {/* RATING */}
                      <div className="flex items-center gap-2 mt-3">
                        <span className="text-amber-500">★</span>

                        <span className="text-sm font-bold text-slate-700">
                          {product.rating}
                        </span>

                        <span className="text-xs text-slate-400">
                          Customer Rating
                        </span>
                      </div>

                      {/* PRICE */}
                      <div className="flex items-center flex-wrap gap-3 mt-4">
                        <span className="text-xl font-extrabold text-[#102A43]">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>

                        {product.mrp > product.price && (
                          <span className="text-sm text-slate-400 line-through">
                            ₹{product.mrp.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>

                      {/* ADD TO CART */}
                      <button
                        type="button"
                        onClick={() => handleAddToCart(product)}
                        className={`w-full mt-5 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                          addedProduct === product.id
                            ? "bg-teal-600 text-white"
                            : "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-100"
                        }`}
                      >
                        {addedProduct === product.id ? (
                          <>
                            <Check size={19} />
                            Added to Cart
                          </>
                        ) : (
                          <>
                            <ShoppingCart size={19} />
                            Add to Cart
                          </>
                        )}
                      </button>

                      {/* DETAILS LINK */}
                      <Link
                        to={`/product/${product.id}`}
                        className="flex items-center justify-center gap-2 text-blue-600 font-semibold text-sm mt-4 hover:text-blue-800 transition"
                      >
                        View Product Details
                        <ArrowRight size={16} />
                      </Link>

                    </div>
                  </div>
                );
              })}

            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-100 py-16 px-5 text-center">
              <PackageSearch
                size={45}
                className="mx-auto text-slate-300"
              />

              <h3 className="text-xl font-bold text-slate-800 mt-4">
                No Products Found
              </h3>

              <p className="text-sm text-slate-500 mt-2">
                Try searching with another product name.
              </p>

              <button
                onClick={() => {
                  setSearchTerm("");
                  setSortBy("featured");
                  if (selectedCategory) {
                    navigate("/shop");
                  }
                }}
                className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold text-sm"
              >
                Clear Filters
              </button>
            </div>
          )}

        </section>

        {/* SUPPORT STRIP */}
        <section className="bg-white border-t border-slate-100 mt-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 grid grid-cols-1 sm:grid-cols-3 gap-6">

            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">
                  Quality-Focused Selection
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Healthcare essentials
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <Truck size={22} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">
                  Convenient Shopping
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Easy online ordering
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Headphones size={22} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">
                  Customer Support
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Assistance when needed
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* CART CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 text-center">
          <Link
            to="/cart"
            className="inline-flex items-center justify-center gap-2 bg-[#102A43] hover:bg-slate-800 text-white px-7 py-3.5 rounded-xl font-bold transition"
          >
            <ShoppingCart size={19} />
            Go to My Cart
          </Link>
        </section>

      </main>
    </>
  );
}

export default Shop;
