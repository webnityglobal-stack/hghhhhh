
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// import Navbar from "../components/layout/Navbar";
import { CheckCircle, Package, ShoppingBag } from "lucide-react";

function OrderSuccess() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const savedOrders = JSON.parse(
      localStorage.getItem("medicareOrders") || "[]"
    );

    if (savedOrders.length > 0) {
      setOrder(savedOrders[savedOrders.length - 1]);
    }
  }, []);

  if (!order) {
    return (
      <>
        {/* <Navbar /> */}
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-800">
            No Order Found
          </h2>
          <Link
            to="/shop"
            className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-xl"
          >
            Continue Shopping
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      {/* <Navbar /> */}

      <main className="min-h-screen bg-slate-50 px-4 py-12">
        <div className="max-w-3xl mx-auto">

          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-10 text-center">

            <CheckCircle
              size={75}
              className="text-green-500 mx-auto"
            />

            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mt-6">
              Order Placed Successfully!
            </h1>

            <p className="text-gray-500 mt-3">
              Thank you for shopping with MediCare.
              Your order has been received.
            </p>

            <div className="bg-blue-50 rounded-xl p-5 mt-8">
              <p className="text-gray-500 text-sm">
                Your Order ID
              </p>
              <h2 className="text-2xl font-bold text-blue-600 mt-2">
                {order.orderId}
              </h2>
            </div>

            <div className="text-left border border-gray-100 rounded-xl p-5 mt-8">
              <h2 className="text-lg font-bold text-slate-800 mb-4">
                Order Details
              </h2>

              {order.products.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between gap-3 py-3 border-b border-gray-100"
                >
                  <div>
                    <p className="font-semibold text-slate-700">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold text-slate-800">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </p>
                </div>
              ))}

              <div className="flex justify-between font-bold text-lg mt-5">
                <span>Total Amount</span>
                <span>
                  ₹{order.total.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="mt-5 bg-slate-50 rounded-xl p-4">
                <p className="font-semibold text-slate-800">
                  Delivery Address
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  {order.customer.name}
                  <br />
                  {order.customer.address}
                  <br />
                  {order.customer.city}, {order.customer.state}
                  <br />
                  PIN: {order.customer.pincode}
                  <br />
                  Mobile: {order.customer.phone}
                </p>
              </div>

              <div className="flex items-center gap-3 mt-5">
                <Package className="text-blue-600" size={24} />
                <div>
                  <p className="font-semibold text-slate-800">
                    Order Status: {order.status}
                  </p>
                  <p className="text-sm text-gray-500">
                    Payment: Cash on Delivery
                  </p>
                </div>
              </div>
            </div>

            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-2 mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition"
            >
              <ShoppingBag size={20} />
              Continue Shopping
            </Link>

          </div>
        </div>
      </main>
    </>
  );
}

export default OrderSuccess;
