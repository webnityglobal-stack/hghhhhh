
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { ArrowLeft, ShieldCheck } from "lucide-react";

function Checkout() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    payment: "COD",
  });

  const cart = JSON.parse(
    localStorage.getItem("medicareCart") || "[]"
  );

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty!");
      navigate("/shop");
      return;
    }

    const order = {
      orderId: "MED" + Date.now(),
      customer: form,
      products: cart,
      total,
      orderDate: new Date().toISOString(),
      status: "Placed",
    };

    const previousOrders = JSON.parse(
      localStorage.getItem("medicareOrders") || "[]"
    );

    localStorage.setItem(
      "medicareOrders",
      JSON.stringify([...previousOrders, order])
    );

    localStorage.removeItem("medicareCart");

    navigate("/order-success");
  };

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold">Your Cart is Empty</h2>
          <Link to="/shop" className="text-blue-600 mt-4">
            Continue Shopping
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 px-4 sm:px-6 lg:px-10 py-10">
        <div className="max-w-7xl mx-auto">

          <h1 className="text-3xl font-bold text-slate-800">
            Checkout
          </h1>
          <p className="text-gray-500 mt-2">
            Enter your delivery details to place your order.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">

              {/* Customer Details */}
              <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-2xl shadow-sm">

                <h2 className="text-xl font-bold text-slate-800 mb-6">
                  Delivery Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                  {[
                    { label: "Full Name", name: "name", type: "text" },
                    { label: "Mobile Number", name: "phone", type: "tel" },
                    { label: "Email Address", name: "email", type: "email" },
                    { label: "PIN Code", name: "pincode", type: "text" },
                    { label: "City", name: "city", type: "text" },
                    { label: "State", name: "state", type: "text" },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        {field.label}
                      </label>

                      <input
                        type={field.type}
                        name={field.name}
                        value={form[field.name]}
                        onChange={handleChange}
                        required
                        maxLength={field.name === "phone" || field.name === "pincode" ? 10 : undefined}
                        pattern={
                          field.name === "phone"
                            ? "[0-9]{10}"
                            : field.name === "pincode"
                            ? "[0-9]{6}"
                            : undefined
                        }
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                      />
                    </div>
                  ))}

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Complete Address
                    </label>

                    <textarea
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      required
                      rows="4"
                      placeholder="House number, street, area..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                    />
                  </div>

                </div>

                <div className="border-t border-gray-100 mt-8 pt-6">
                  <h2 className="text-xl font-bold text-slate-800 mb-4">
                    Payment Method
                  </h2>

                  <label className="flex items-center gap-3 border border-blue-200 bg-blue-50 rounded-xl p-4 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="COD"
                      checked={form.payment === "COD"}
                      onChange={handleChange}
                    />
                    <div>
                      <p className="font-semibold text-slate-800">
                        Cash on Delivery
                      </p>
                      <p className="text-sm text-gray-500">
                        Pay when your order arrives.
                      </p>
                    </div>
                  </label>
                </div>

              </div>

              {/* Order Summary */}
              <div className="bg-white p-6 rounded-2xl shadow-sm h-fit">

                <h2 className="text-xl font-bold text-slate-800">
                  Order Summary
                </h2>

                <div className="border-t my-5" />

                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between gap-3 mb-4">
                    <div>
                      <p className="font-medium text-slate-700">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </div>
                ))}

                <div className="border-t my-5" />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>

                <button
                  type="submit"
                  className="w-full mt-7 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold"
                >
                  Place Order
                </button>

                <div className="flex items-center justify-center gap-2 mt-5 text-sm text-gray-500">
                  <ShieldCheck size={18} className="text-green-600" />
                  Secure Checkout
                </div>

                <Link
                  to="/cart"
                  className="flex items-center justify-center gap-2 text-blue-600 font-semibold mt-5"
                >
                  <ArrowLeft size={17} />
                  Back to Cart
                </Link>

              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default Checkout;
