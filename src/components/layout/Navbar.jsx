
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Heart,
  Search,
  ShoppingCart,
  UserRound,
  Menu,
  X,
  LogOut,
  Package,
  ChevronDown,
  Mail,
} from "lucide-react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("medicareUser")) || null;
    } catch {
      return null;
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    const updateUser = () => {
      try {
        setUser(JSON.parse(localStorage.getItem("medicareUser")) || null);
      } catch {
        setUser(null);
      }
    };

    window.addEventListener("medicare-auth-change", updateUser);
    window.addEventListener("storage", updateUser);

    return () => {
      window.removeEventListener("medicare-auth-change", updateUser);
      window.removeEventListener("storage", updateUser);
    };
  }, []);

useEffect(() => {
  const syncCartCount = () => {
    try {
      const cart = JSON.parse(
        localStorage.getItem("medicareCart") || "[]"
      );

      const count = cart.reduce(
        (sum, item) => sum + Number(item.quantity || 0),
        0
      );

      setCartCount(count);
    } catch (error) {
      console.error("Cart count error:", error);
      setCartCount(0);
    }
  };

  // Initial sync
  syncCartCount();

  // Same-tab cart changes
  window.addEventListener("cartUpdated", syncCartCount);

  // Other-tab changes
  window.addEventListener("storage", syncCartCount);

  // Fallback sync: refresh count automatically
  const interval = setInterval(syncCartCount, 500);

  return () => {
    window.removeEventListener("cartUpdated", syncCartCount);
    window.removeEventListener("storage", syncCartCount);
    clearInterval(interval);
  };
}, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Categories", path: "/categories" },
    { name: "My Orders", path: "/my-orders" },
    { name: "Contact", path: "/contact" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      search.trim()
        ? `/shop?search=${encodeURIComponent(search.trim())}`
        : "/shop"
    );
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("medicareUser");

    setUser(null);
    setProfileOpen(false);

    window.dispatchEvent(new Event("medicare-auth-change"));

    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-h-[76px] flex items-center justify-between gap-5">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <Heart size={23} fill="white" className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">
                Medi<span className="text-blue-600">Care</span>
              </h1>
              <p className="text-[9px] tracking-[2px] text-slate-400 font-semibold">
                HEALTHCARE STORE
              </p>
            </div>
          </Link>

          {/* Desktop Navigation - Center */}
          <nav className="hidden lg:flex items-center justify-center gap-7 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-4">

            {/* Search */}
            <form onSubmit={handleSearch} className="relative">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-36 xl:w-44 pl-9 pr-3 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-sm outline-none focus:border-blue-500"
              />
            </form>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative text-slate-600 hover:text-blue-600"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <ShoppingCart size={22} />

              {user && cartCount > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[19px] h-[19px] px-1 bg-red-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>


            {/* Profile / Login / Signup */}
            {user ? (
              <div className="relative">

                {/* Profile Icon */}
                <button
                  type="button"
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="w-11 h-11 rounded-full bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition"
                  aria-label="My Account"
                >
                  <UserRound size={23} />
                </button>

                {/* Profile Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 top-14 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50">

                    {/* User Details */}
                    <div className="pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-3">

                        <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                          <UserRound size={22} />
                        </div>

                        <div className="min-w-0">
                          <p className="font-bold text-slate-800">
                            {user.name || "My Account"}
                          </p>

                          <p className="text-xs text-slate-500 break-all mt-1">
                            {user.email}
                          </p>
                        </div>

                      </div>
                    </div>

                    {/* My Profile */}
                    <Link
                      to="/my-profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-3 py-3 mt-2 text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
                    >
                      <UserRound size={18} />
                      My Profile
                    </Link>

                    {/* My Orders */}
                    <Link
                      to="/my-orders"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
                    >
                      <Package size={18} />
                      My Orders
                    </Link>

                    {/* Logout */}
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-3 mt-2 border-t border-slate-100 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>

                  </div>
                )}

              </div>
            ) : (
              <div className="flex items-center gap-3">

                <Link
                  to="/login"
                  className="text-sm font-semibold text-slate-700 hover:text-blue-600"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg"
                >
                  Sign Up
                </Link>

              </div>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-4">
            <Link
              to="/cart"
              className="relative text-slate-700 hover:text-blue-600"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <ShoppingCart size={22} />

              {user && cartCount > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[19px] h-[19px] px-1 bg-red-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-slate-700"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={25} /> : <Menu size={25} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-lg">
          <div className="max-w-7xl mx-auto px-5 py-4">

            <form onSubmit={handleSearch} className="relative mb-4">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none text-sm"
              />
            </form>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="block py-3 border-b border-slate-100 text-sm font-semibold text-slate-700 hover:text-blue-600"
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <div className="mt-4 p-3 bg-blue-50 rounded-xl">
                <p className="font-semibold text-slate-800">
                  {user.name || "My Account"}
                </p>
                <p className="text-xs text-slate-500 mt-1 break-all">
                  {user.email || "Email not available"}
                </p>
                <button
                  onClick={handleLogout}
                  className="mt-3 text-sm font-semibold text-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-3 mt-4">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center border border-blue-600 text-blue-600 py-3 rounded-lg font-semibold"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center bg-blue-600 text-white py-3 rounded-lg font-semibold"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
