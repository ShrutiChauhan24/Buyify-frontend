import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../../redux/slices/orderSlice";
import { toast } from "react-toastify";

const statusStyles = {
  placed: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  shipped: "bg-red-100 text-red-700",
  "out-for-delivery": "bg-yellow-100 text-yellow-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const OrdersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/get-my-orders`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        if (res.data.success) {
          dispatch(setOrders(res.data.orders));
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            "Unable to fetch your orders, try again later",
        );
      }
    };
    fetchMyOrders();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-white px-4 py-6 sm:py-8 md:px-12 lg:px-20">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
        My Orders
      </h1>
      <p className="text-gray-500 mt-2">Track & manage your recent purchases</p>

      <div className="mt-8 sm:mt-10 space-y-6 sm:space-y-8">
        {orders.map((order) => {
          return (
            <div
              key={order._id}
              className="rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                <div>
                  <p className="font-semibold text-gray-900">
                    Order ID:{" "}
                    <span className="text-pink-600">{order.orderId}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Ordered on {formatDate(order.createdAt)}
                  </p>
                </div>

                <span
                  className={`w-fit px-4 py-1 rounded-full text-sm font-semibold ${
                    statusStyles[order.orderStatus]
                  }`}
                >
                  {order.orderStatus}
                </span>
              </div>

              {/* Products */}
              <div className="mt-4 sm:mt-6 divide-y">
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4 py-4"
                  >
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover"
                      />

                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {item.name}
                        </h3>

                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <span
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: item.colorHex }}
                            />
                            <span>{item.color}</span>
                          </div>

                          <span className="px-2 py-0.5 border rounded-full text-xs">
                            Size: {item.size}
                          </span>

                          <span>Qty: {item.quantity}</span>
                        </div>
                      </div>
                    </div>

                    <p className="font-bold text-gray-900">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              {/* Order Footer */}
              <div className="mt-4 sm:mt-6 pt-4 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-sm text-gray-500 space-y-1">
                  <p>Payment Method: {order.payment.method}</p>

                  {order?.items && (
                    <p>
                      Total Items:{" "}
                      {order?.items?.reduce(
                        (sum, item) => sum + item.quantity,
                        0,
                      )}
                    </p>
                  )}
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-500">Order Total</p>
                  <p className="text-xl font-extrabold text-gray-900">
                    ₹{order.pricing.total}
                  </p>
                </div>
              </div>

              {/* Actions */}
              
                <button
                  className="mt-5 sm:mt-6 block w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mx-auto px-6 py-2 rounded-full bg-pink-600 text-white font-semibold hover:shadow-lg transition"
                  onClick={() => navigate(`/my-orders/track-order/${order.orderId}`)} 
                >
                  Track Order
                </button>

              </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrdersPage;
