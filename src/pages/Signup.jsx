
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Heart,
  UserRound,
  Mail,
  Phone,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  CheckCircle2,
} from "lucide-react";

function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const phone = form.phone.trim();
    const password = form.password;
    const confirmPassword = form.confirmPassword;

    // Validate name
    if (name.length < 2) {
      setError("Please enter your full name.");
      return;
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Validate phone
    if (!/^[0-9]{10}$/.test(phone)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    // Validate password
    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    // Confirm password
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Get existing registered users
    let registeredUsers = [];

    try {
      registeredUsers = JSON.parse(
        localStorage.getItem("medicareUsers") || "[]"
      );

      if (!Array.isArray(registeredUsers)) {
        registeredUsers = [];
      }
    } catch {
      setError("Unable to access account data. Please try again.");
      return;
    }

    // Check duplicate email
    const existingUser = registeredUsers.find(
      (user) => user.email?.toLowerCase() === email
    );

    if (existingUser) {
      setError("This email is already registered. Please login.");
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      name,
      email,
      phone,
      password,
    };

    // Save user in localStorage
    try {
      registeredUsers.push(newUser);

      localStorage.setItem(
        "medicareUsers",
        JSON.stringify(registeredUsers)
      );
    } catch {
      setError("Unable to save your account. Please try again.");
      return;
    }

    setSuccess("Account created successfully! Redirecting to login...");

    // Redirect to login
    setTimeout(() => {
      navigate("/login");
    }, 1000);
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
              <Heart
                size={28}
                className="text-blue-600"
                fill="currentColor"
              />
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
              Start Your

              <span className="block text-blue-200">
                Health Journey.
              </span>
            </h1>

            <p className="text-blue-100 leading-8 mt-6 max-w-md">
              Create your MediCare account to explore healthcare
              products and manage your shopping experience.
            </p>

            <div className="flex items-center gap-3 mt-9 text-sm text-blue-100">
              <ShieldCheck size={21} />
              A convenient healthcare shopping experience
            </div>

          </div>

          <p className="relative text-sm text-blue-200">
            © {new Date().getFullYear()} MediCare. All rights reserved.
          </p>

        </div>

        {/* Signup Form */}
        <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-center">

          {/* Mobile Logo */}
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">

            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Heart
                size={23}
                fill="white"
                className="text-white"
              />
            </div>

            <span className="text-2xl font-extrabold text-slate-900">
              Medi<span className="text-blue-600">Care</span>
            </span>

          </Link>

          <div className="max-w-md w-full mx-auto">

            <p className="text-blue-600 font-bold text-sm uppercase tracking-wider">
              Join MediCare
            </p>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
              Create Account
            </h2>

            <p className="text-slate-500 mt-3">
              Fill in your details to get started.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-4">

              {/* Full Name */}
              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name
                </label>

                <div className="flex items-center border border-slate-200 rounded-xl px-4 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">

                  <UserRound size={19} className="text-slate-400 shrink-0" />

                  <input
                    type="text"
                    required
                    minLength={2}
                    value={form.name}
                    onChange={(e) => {
                      setForm({ ...form, name: e.target.value });
                      setError("");
                    }}
                    placeholder="Enter your full name"
                    className="w-full px-3 py-3.5 outline-none text-sm"
                  />

                </div>
              </div>

              {/* Email */}
              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>

                <div className="flex items-center border border-slate-200 rounded-xl px-4 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">

                  <Mail size={19} className="text-slate-400 shrink-0" />

                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value });
                      setError("");
                    }}
                    placeholder="Enter your email"
                    className="w-full px-3 py-3.5 outline-none text-sm"
                  />

                </div>
              </div>

              {/* Phone */}
              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Mobile Number
                </label>

                <div className="flex items-center border border-slate-200 rounded-xl px-4 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">

                  <Phone size={19} className="text-slate-400 shrink-0" />

                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    maxLength={10}
                    value={form.phone}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        phone: e.target.value.replace(/\D/g, ""),
                      });
                      setError("");
                    }}
                    placeholder="10-digit mobile number"
                    className="w-full px-3 py-3.5 outline-none text-sm"
                  />

                </div>
              </div>

              {/* Password */}
              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Password
                </label>

                <div className="flex items-center border border-slate-200 rounded-xl px-4 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">

                  <LockKeyhole size={19} className="text-slate-400 shrink-0" />

                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={6}
                    value={form.password}
                    onChange={(e) => {
                      setForm({ ...form, password: e.target.value });
                      setError("");
                    }}
                    placeholder="Create a password"
                    className="w-full px-3 py-3.5 outline-none text-sm"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-blue-600"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>

                </div>
              </div>

              {/* Confirm Password */}
              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Confirm Password
                </label>

                <div className="flex items-center border border-slate-200 rounded-xl px-4 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">

                  <LockKeyhole size={19} className="text-slate-400 shrink-0" />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    minLength={6}
                    value={form.confirmPassword}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        confirmPassword: e.target.value,
                      });
                      setError("");
                    }}
                    placeholder="Confirm your password"
                    className="w-full px-3 py-3.5 outline-none text-sm"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="text-slate-400 hover:text-blue-600"
                    aria-label="Toggle confirm password visibility"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>

                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">
                  {error}
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-100 rounded-lg p-3">
                  <CheckCircle2 size={18} />
                  {success}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={Boolean(success)}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-100 transition"
              >
                Create Account
                <ArrowRight size={19} />
              </button>

            </form>

            {/* Login Link */}
            <p className="text-center text-sm text-slate-500 mt-7">
              Already have an account?{" "}

              <Link
                to="/login"
                className="font-bold text-blue-600 hover:text-blue-700"
              >
                Sign In
              </Link>

            </p>

            {/* Back Home */}
            <Link
              to="/"
              className="block text-center text-sm text-slate-400 hover:text-blue-600 mt-6"
            >
              ← Back to Home
            </Link>

          </div>
        </div>
      </div>
    </main>
  );
}

export default Signup;
