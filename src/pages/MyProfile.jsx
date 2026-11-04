
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  Save,
  ArrowLeft,
  Package,
  ShieldCheck,
} from "lucide-react";

function MyProfile() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loggedInUser = JSON.parse(
      localStorage.getItem("medicareUser") || "null"
    );

    if (!loggedInUser) {
      navigate("/login");
      return;
    }

    const users = JSON.parse(
      localStorage.getItem("medicareUsers") || "[]"
    );

    const registeredUser = users.find(
      (user) => user.email === loggedInUser.email
    );

    setForm({
      name: loggedInUser.name || "",
      email: loggedInUser.email || "",
      phone: registeredUser?.phone || "",
    });
  }, [navigate]);

  const handleSave = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (form.name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (!/^[0-9]{10}$/.test(form.phone)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      const users = JSON.parse(
        localStorage.getItem("medicareUsers") || "[]"
      );

      const updatedUsers = users.map((user) =>
        user.email.toLowerCase() === form.email.toLowerCase()
          ? {
              ...user,
              name: form.name.trim(),
              phone: form.phone,
            }
          : user
      );

      const updatedUser = {
        name: form.name.trim(),
        email: form.email,
      };

      localStorage.setItem(
        "medicareUsers",
        JSON.stringify(updatedUsers)
      );

      localStorage.setItem(
        "medicareUser",
        JSON.stringify(updatedUser)
      );

      window.dispatchEvent(new Event("medicare-auth-change"));

      setMessage("Profile updated successfully!");
    } catch {
      setError("Unable to update profile. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 mb-5"
          >
            <ArrowLeft size={17} />
            Back to Home
          </Link>

          <h1 className="text-3xl font-extrabold text-slate-900">
            My Profile
          </h1>

          <p className="text-slate-500 mt-2">
            Manage your personal information and account details.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">

          {/* Profile Sidebar */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-7">

            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                <UserRound size={45} />
              </div>

              <h2 className="text-xl font-bold text-slate-900 mt-4">
                {form.name || "My Account"}
              </h2>

              <p className="text-sm text-slate-500 mt-1 break-all">
                {form.email}
              </p>

              <div className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-green-700 bg-green-50 px-4 py-2 rounded-full">
                <ShieldCheck size={15} />
                Registered Customer
              </div>
            </div>

            <div className="border-t border-slate-100 mt-7 pt-5 space-y-2">

              <Link
                to="/my-orders"
                className="flex items-center gap-3 p-3 rounded-xl text-slate-600 hover:bg-blue-50 hover:text-blue-600"
              >
                <Package size={19} />
                My Orders
              </Link>

              <Link
                to="/shop"
                className="flex items-center gap-3 p-3 rounded-xl text-slate-600 hover:bg-blue-50 hover:text-blue-600"
              >
                <MapPin size={19} />
                Continue Shopping
              </Link>

            </div>
          </div>

          {/* Edit Profile Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-9">

            <h2 className="text-xl font-bold text-slate-900">
              Personal Information
            </h2>

            <p className="text-sm text-slate-500 mt-2 mb-7">
              Update your details below.
            </p>

            <form onSubmit={handleSave} className="space-y-6">

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name
                </label>

                <div className="flex items-center border border-slate-200 rounded-xl px-4 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                  <UserRound size={19} className="text-slate-400" />

                  <input
                    type="text"
                    required
                    minLength={2}
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    placeholder="Enter your name"
                    className="w-full px-3 py-4 outline-none text-sm"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>

                <div className="flex items-center border border-slate-200 rounded-xl px-4 bg-slate-50">
                  <Mail size={19} className="text-slate-400" />

                  <input
                    type="email"
                    value={form.email}
                    readOnly
                    className="w-full px-3 py-4 outline-none text-sm bg-transparent text-slate-500"
                  />
                </div>

                <p className="text-xs text-slate-400 mt-2">
                  Email cannot be changed from this page.
                </p>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Mobile Number
                </label>

                <div className="flex items-center border border-slate-200 rounded-xl px-4 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                  <Phone size={19} className="text-slate-400" />

                  <input
                    type="tel"
                    required
                    maxLength={10}
                    pattern="[0-9]{10}"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        phone: e.target.value.replace(/\D/g, ""),
                      })
                    }
                    placeholder="Enter 10-digit mobile number"
                    className="w-full px-3 py-4 outline-none text-sm"
                  />
                </div>
              </div>

              {/* Messages */}
              {error && (
                <p className="bg-red-50 text-red-600 border border-red-100 rounded-lg p-3 text-sm">
                  {error}
                </p>
              )}

              {message && (
                <p className="bg-green-50 text-green-700 border border-green-100 rounded-lg p-3 text-sm">
                  {message}
                </p>
              )}

              {/* Save */}
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3.5 rounded-xl font-semibold transition"
              >
                <Save size={18} />
                Save Changes
              </button>

            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MyProfile;
