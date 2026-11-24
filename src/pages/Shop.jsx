import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import {
  ShieldCheck,
  Truck,
  HeartPulse,
  Cross,
  ArrowRight,
  MoveUpRight,
  Search,
  SlidersHorizontal,
  ShoppingCart,
  Headphones,
  Check,
  PackageSearch,
} from "lucide-react";

import products from "../data/products";

// CATEGORY PRODUCT MAPPING
const productCategories = {
  "Medical Equipment": [1, 2, 4, 5, 6, 7, 8, 16],
  "Health & Wellness": [9, 10, 14, 17, 18],
  "Personal Care": [12, 13],
  "Healthcare Essentials": [3, 11, 15],
};

// CATEGORY DETAILS
const categories = [
  { id: 1, name: "Medical Equipment" },
  { id: 2, name: "Health & Wellness" },
  { id: 3, name: "Personal Care" },
  { id: 4, name: "Healthcare Essentials" },
];

function Shop() {
  const navigate = useNavigate();
  const location = useLocation();

useEffect(() => {
    if (location.hash === "#all-products") {
        const timer = setTimeout(() => {
            document.getElementById("all-products")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }, 300);

        return () => clearTimeout(timer);
    }
}, [location.pathname, location.search, location.hash]);

  const [addedProduct, setAddedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const selectedCategory = new URLSearchParams(
    location.search
  ).get("category");

  // ADD TO CART
  const handleAddToCart = (product) => {
    let user = null;

    try {
      user = JSON.parse(
        localStorage.getItem("medicareUser") || "null"
      );
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

      localStorage.setItem(
        "medicareCart",
        JSON.stringify(updatedCart)
      );

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

    const categoryProductIds =
      productCategories[selectedCategory];

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
    <main className="min-h-screen bg-[#F6F9FD]">

      {/* MEDICARE SHOP HERO */}
      <section className="relative bg-[#071D3B] text-white overflow-hidden">

        {/* BACKGROUND EFFECTS */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-[130px]" />
          <div className="absolute -bottom-40 -left-20 w-[450px] h-[450px] rounded-full bg-cyan-500/10 blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-14 sm:py-20 lg:py-24">

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-14 items-center">

            {/* LEFT CONTENT */}
            <div className="relative z-10">

              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-300/20 text-blue-200 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[2px]">
                <ShieldCheck size={16} />
                Your Trusted Healthcare Store
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-extrabold leading-[1.12] tracking-tight mt-7">
                Your Health,
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] via-[#67E8F9] to-[#5EEAD4]">
                  Our Priority.
                </span>
              </h1>

              <p className="text-blue-100/80 text-base sm:text-lg leading-8 mt-6 max-w-xl">
                Discover quality healthcare products, medical equipment
                and everyday wellness essentials. Everything you need
                to take better care of yourself and your loved ones,
                all in one place.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-9">

                <a
                  href="#category-list"
                  className="inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-7 py-4 rounded-xl font-bold shadow-lg shadow-blue-950/30 transition-all duration-300 hover:-translate-y-1"
                >
                  Explore Categories
                  <ArrowRight size={19} />
                </a>

                {/* <Link
                  to="/shop"
                  onClick={() => setSearchTerm("")}
                  className="inline-flex items-center justify-center gap-3 border border-white/25 hover:bg-white hover:text-[#071D3B] text-white px-7 py-4 rounded-xl font-bold transition-all duration-300"
                >
                  Shop All Products
                  <MoveUpRight size={19} />
                </Link> */}

              </div>

              {/* TRUST POINTS */}
              <div className="grid grid-cols-2 gap-5 mt-10 pt-7 border-t border-white/15">

                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-blue-400/10 text-cyan-300 flex items-center justify-center">
                    <ShieldCheck size={23} />
                  </div>

                  <div>
                    <p className="font-bold text-sm">Quality Products</p>
                    <p className="text-xs text-blue-100/60 mt-1">
                      Carefully selected
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-blue-400/10 text-cyan-300 flex items-center justify-center">
                    <Truck size={23} />
                  </div>

                  <div>
                    <p className="font-bold text-sm">Easy Shopping</p>
                    <p className="text-xs text-blue-100/60 mt-1">
                      Convenient ordering
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative flex items-center justify-center lg:justify-end">

              <div className="absolute w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] rounded-full bg-blue-500/20 blur-[80px]" />

              <div className="relative w-full max-w-[510px]">

                <div className="relative rounded-[30px] overflow-hidden border border-white/20 shadow-2xl">

                  <img
                    src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=1100&auto=format&fit=crop&q=90"
                    alt="Medical healthcare equipment"
                    className="w-full h-[320px] sm:h-[430px] lg:h-[470px] object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#071D3B]/50 via-transparent to-transparent" />
                </div>

                {/* BOTTOM FLOATING CARD */}
                <div className="absolute -bottom-6 left-3 sm:-left-7 bg-white text-[#102A43] rounded-2xl p-4 sm:p-5 shadow-2xl max-w-[245px]">

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <HeartPulse size={26} />
                    </div>

                    <div>
                      <p className="font-extrabold text-sm">
                        Better Health
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Everyday care starts here
                      </p>
                    </div>
                  </div>
                </div>

                {/* TOP FLOATING CARD */}
                <div className="absolute -top-5 right-3 sm:-right-5 bg-white text-[#102A43] rounded-2xl px-4 py-3 shadow-xl">

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                      <Cross size={22} />
                    </div>

                    <div>
                      <p className="font-extrabold text-xs tracking-wide">
                        MEDICARE
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Care You Can Trust
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CATEGORY BUTTONS */}
      <section
        id="all-products" 
        className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-10 scroll-mt-24"
      >

        <div className="mb-5">
          <div className="flex items-center gap-2 text-blue-600 text-xs font-extrabold uppercase tracking-[2px]">
            <span className="w-8 h-[2px] bg-blue-600" />
            Explore Collections
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] mt-3">
            Shop By Category
          </h2>

          <p className="text-slate-500 text-sm mt-2">
            Browse our healthcare products by category.
          </p>
        </div>

        {/* HORIZONTAL CATEGORY BUTTONS */}
        <div className="flex items-center gap-3 overflow-x-auto pb-3">

          <button
            type="button"
            // onClick={() => navigate("/shop")}
            onClick={() => {
              navigate("/shop#all-products");
            }}
            className={`shrink-0 px-6 py-3 rounded-full text-sm font-bold border transition-all duration-300 hover:-translate-y-1 ${!selectedCategory
                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                : "bg-white text-slate-600 border-slate-200 hover:bg-blue-600 hover:text-white hover:border-blue-600"
              }`}
          >
            All Products
          </button>

          {categories.map((category) => (
            <button
              type="button"
              key={category.id}
              onClick={() =>
                navigate(
                  `/shop?category=${encodeURIComponent(category.name)}`
                )
              }
              className={`shrink-0 px-6 py-3 rounded-full text-sm font-bold border transition-all duration-300 hover:-translate-y-1 ${selectedCategory === category.name
                  ? "bg-blue-600 text-white border-blue-600 shadow-md"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-blue-600 hover:text-white hover:border-blue-600"
                }`}
            >
              {category.name}
            </button>
          ))}

        </div>
      </section>

      {/* SHOP PRODUCTS */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-12 sm:py-14">

        {/* SEARCH AND SORT */}
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
          </div>

          <div className="flex flex-col sm:flex-row gap-3">

            {/* SEARCH */}
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

            {/* SORT */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">

            {filteredProducts.map((product) => {
              const discount =
                product.mrp > product.price
                  ? Math.round(
                    ((product.mrp - product.price) /
                      product.mrp) *
                    100
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
                      loading="lazy"
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
                      className={`w-full mt-5 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${addedProduct === product.id
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
          /* NO PRODUCTS FOUND */
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
              type="button"
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

      {/* BENEFITS / SUPPORT */}
      <section className="bg-white border-t border-slate-100">

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-10">

          <div className="text-center mb-10">
            <p className="text-blue-600 text-xs font-extrabold uppercase tracking-[2px]">
              The MediCare Experience
            </p>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] mt-3">
              Shopping Made More Convenient
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                <ShieldCheck size={30} />
              </div>

              <h3 className="font-bold text-[#102A43] mt-5">
                Quality-Focused Selection
              </h3>

              <p className="text-sm text-slate-500 leading-6 mt-2 max-w-xs">
                Explore a range of healthcare and everyday care products.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center">
                <Truck size={30} />
              </div>

              <h3 className="font-bold text-[#102A43] mt-5">
                Convenient Shopping
              </h3>

              <p className="text-sm text-slate-500 leading-6 mt-2 max-w-xs">
                Discover your everyday essentials in one place.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
                <Headphones size={30} />
              </div>

              <h3 className="font-bold text-[#102A43] mt-5">
                Customer Support
              </h3>

              <p className="text-sm text-slate-500 leading-6 mt-2 max-w-xs">
                Assistance whenever you need help.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CART CTA */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-10 text-center">
        <Link
          to="/cart"
          className="inline-flex items-center justify-center gap-2 bg-[#102A43] hover:bg-slate-800 text-white px-7 py-3.5 rounded-xl font-bold transition"
        >
          <ShoppingCart size={19} />
          Go to My Cart
        </Link>
      </section>

    </main>
  );
}

export default Shop;