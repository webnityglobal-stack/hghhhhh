
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, ShoppingBag, ArrowLeft } from "lucide-react";
import Navbar from "../components/layout/Navbar";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(
      localStorage.getItem("medicareOrders") || "[]"
    );

    setOrders(savedOrders.reverse());
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 px-4 sm:px-6 lg:px-10 py-10">
        <div className="max-w-6xl mx-auto">

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
            My Orders
          </h1>

          <p className="text-gray-500 mt-2">
            View and manage your recent orders.
          </p>

          {orders.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center mt-8 shadow-sm">
              <Package size={20} className="mx-auto text-blue-500" />

              <h2 className="text-2xl font-bold text-slate-800 mt-5">
                No Orders Yet
              </h2>

              <p className="text-gray-500 mt-2">
                You haven't placed any orders yet.
              </p>

              <Link
                to="/shop"
                className="inline-flex items-center gap-2 mt-6 bg-blue-600 text-white px-7 py-3 rounded-xl font-semibold"
              >
                <ShoppingBag size={19} />
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-6 mt-8">

              {orders.map((order) => (
                <div
                  key={order.orderId}
                  className="bg-white rounded-2xl shadow-sm p-5 sm:p-7"
                >
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-gray-100 pb-5">

                    <div>
                      <p className="text-sm text-gray-500">
                        Order ID
                      </p>

                      <h2 className="font-bold text-blue-600 mt-1">
                        {order.orderId}
                      </h2>

                      <p className="text-sm text-gray-500 mt-2">
                        Ordered on:{" "}
                        {new Date(order.orderDate).toLocaleDateString("en-IN")}
                      </p>
                    </div>

                    <span className="inline-flex w-fit bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                      {order.status}
                    </span>

                  </div>

                  {/* Products */}
                  <div className="py-5 space-y-4">
                    {order.products.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-contain bg-blue-50 rounded-xl p-2"
                        />

                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-800">
                            {item.name}
                          </h3>

                          <p className="text-sm text-gray-500 mt-1">
                            Quantity: {item.quantity}
                          </p>
                        </div>

                        <p className="font-bold text-slate-800">
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div className="border-t border-gray-100 pt-5 flex flex-col sm:flex-row sm:justify-between gap-3">
                    <div>
                      <p className="text-sm text-gray-500">
                        Payment Method
                      </p>
                      <p className="font-semibold text-slate-800">
                        Cash on Delivery
                      </p>
                    </div>

                    <div className="sm:text-right">
                      <p className="text-sm text-gray-500">
                        Total Amount
                      </p>
                      <p className="text-xl font-bold text-blue-600">
                        ₹{order.total.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>

                </div>
              ))}

            </div>
          )}

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold mt-8"
          >
            <ArrowLeft size={18} />
            Continue Shopping
          </Link>

        </div>
      </main>
    </>
  );
}

export default MyOrders;
