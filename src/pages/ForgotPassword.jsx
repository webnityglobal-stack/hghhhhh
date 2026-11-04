
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Mail,
  ArrowRight,
  ArrowLeft,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">

        {/* Branding */}
        <div className="hidden lg:flex flex-col justify-between bg-blue-700 text-white p-12 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-500 rounded-full opacity-40" />
          <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-teal-500 rounded-full opacity-20" />

          <Link to="/" className="relative flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
              <Heart size={28} className="text-blue-600" fill="currentColor" />
            </div>
            <span className="text-3xl font-extrabold">MediCare</span>
          </Link>

          <div className="relative">
            <div className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center mb-7">
              <LockKeyhole size={34} />
            </div>

            <h1 className="text-4xl font-extrabold leading-tight">
              Secure Your
              <span className="block text-blue-200">
                Account.
              </span>
            </h1>

            <p className="text-blue-100 leading-8 mt-6 max-w-md">
              Don't worry. You can recover access to your account
              with a simple password reset process.
            </p>

            <div className="flex items-center gap-3 mt-8 text-sm text-blue-100">
              <ShieldCheck size={21} />
              Account security matters
            </div>
          </div>

          <p className="relative text-sm text-blue-200">
            © {new Date().getFullYear()} MediCare. All rights reserved.
          </p>
        </div>

        {/* Form */}
        <div className="p-7 sm:p-12 lg:p-16 flex items-center">
          <div className="max-w-md w-full mx-auto">

            <Link to="/" className="lg:hidden flex items-center gap-2 mb-12">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <Heart size={23} fill="white" className="text-white" />
              </div>
              <span className="text-2xl font-extrabold text-slate-900">
                Medi<span className="text-blue-600">Care</span>
              </span>
            </Link>

            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
              <Mail size={27} />
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-7">
              Forgot Password?
            </h2>

            <p className="text-slate-500 mt-4 leading-7">
              Enter your registered email address to start the
              password recovery process.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="mt-8">

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>

                <div className="flex items-center border border-slate-200 rounded-xl px-4 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                  <Mail size={19} className="text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your registered email"
                    className="w-full px-3 py-4 outline-none text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition shadow-lg shadow-blue-100"
                >
                  Submit Request
                  <ArrowRight size={19} />
                </button>
              </form>
            ) : (
              <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-5">
                <p className="font-bold text-blue-800">
                  Request received!
                </p>
                <p className="text-sm text-blue-700 mt-2 leading-6">
                  This is a frontend demo. Password reset emails
                  will be enabled after backend integration.
                </p>
              </div>
            )}

            <Link
              to="/login"
              className="inline-flex items-center gap-2 mt-8 text-blue-600 font-semibold hover:text-blue-700"
            >
              <ArrowLeft size={18} />
              Back to Login
            </Link>

          </div>
        </div>
      </div>
    </main>
  );
}

export default ForgotPassword;
