
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Heart,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();
    const location = useLocation();
    
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const email = form.email.trim().toLowerCase();
    const password = form.password;

    let registeredUsers = [];

    try {
      registeredUsers = JSON.parse(
        localStorage.getItem("medicareUsers") || "[]"
      );
    } catch {
      setError("Unable to read account details. Please signup again.");
      return;
    }

    const matchedUser = registeredUsers.find(
      (user) =>
        user.email?.toLowerCase() === email &&
        user.password === password
    );

    if (!matchedUser) {
      setError("Invalid email or password. Please check your details or signup first.");
      return;
    }

    const loggedInUser = {
      name: matchedUser.name,
      email: matchedUser.email,
    };

    localStorage.setItem(
      "medicareUser",
      JSON.stringify(loggedInUser)
    );

    window.dispatchEvent(new Event("medicare-auth-change"));

    navigate("/");
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">

        {/* Left Branding Panel */}
        <div className="hidden lg:flex flex-col justify-between bg-blue-700 text-white p-12 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-500 rounded-full opacity-40" />
          <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-teal-500 rounded-full opacity-20" />

          <Link to="/" className="relative flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
              <Heart size={28} className="text-blue-600" fill="currentColor" />
            </div>
            <span className="text-3xl font-extrabold">
              MediCare
            </span>
          </Link>

          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center mb-7">
              <Stethoscope size={34} />
            </div>

            <h1 className="text-4xl xl:text-5xl font-extrabold leading-tight">
              Your Health,
              <span className="block text-blue-200">
                Our Priority.
              </span>
            </h1>

            <p className="text-blue-100 leading-8 mt-6 max-w-md">
              Sign in to explore healthcare essentials,
              manage your orders and enjoy a convenient
              shopping experience.
            </p>

            <div className="flex items-center gap-3 mt-9 text-sm text-blue-100">
              <ShieldCheck size={21} />
              Your healthcare shopping companion
            </div>
          </div>

          <p className="relative text-sm text-blue-200">
            © {new Date().getFullYear()} MediCare. All rights reserved.
          </p>
        </div>

        {/* Login Form */}
        <div className="p-6 sm:p-10 lg:p-14 flex flex-col justify-center">
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-10">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Heart size={23} fill="white" className="text-white" />
            </div>
            <span className="text-2xl font-extrabold text-slate-900">
              Medi<span className="text-blue-600">Care</span>
            </span>
          </Link>

          <div className="max-w-md w-full mx-auto">
            <p className="text-blue-600 font-bold text-sm uppercase tracking-wider">
              Welcome Back
            </p>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
              Sign In
            </h2>

            <p className="text-slate-500 mt-3">
              Enter your details to access your account.
            </p>

            <form onSubmit={handleSubmit} className="mt-9 space-y-5">

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>

                <div className="flex items-center border border-slate-200 rounded-xl px-4 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                  <Mail size={19} className="text-slate-400" />

                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value });
                      setError("");
                    }}
                    placeholder="Enter your email"
                    className="w-full px-3 py-4 outline-none text-sm"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <div className="flex items-center border border-slate-200 rounded-xl px-4 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                  <LockKeyhole size={19} className="text-slate-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={6}
                    value={form.password}
                    onChange={(e) => {
                      setForm({ ...form, password: e.target.value });
                      setError("");
                    }}
                    placeholder="Enter your password"
                    className="w-full px-3 py-4 outline-none text-sm"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-blue-600"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-100 transition"
              >
                Sign In
                <ArrowRight size={19} />
              </button>
            </form>

            <p className="text-center text-sm text-slate-500 mt-8">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-bold text-blue-600 hover:text-blue-700"
              >
                Create Account
              </Link>
            </p>

            <Link
              to="/"
              className="block text-center text-sm text-slate-400 hover:text-blue-600 mt-7"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
