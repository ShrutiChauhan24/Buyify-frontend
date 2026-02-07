import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import TrackOrderCancelled from "../components/TrackOrderCancelled";

const steps = [
  { key: "placed", label: "Order Placed" },
  { key: "confirmed", label: "Confirmed" },
  { key: "shipped", label: "Shipped" },
  { key: "out-for-delivery", label: "Out for Delivery" },
  { key: "delivered", label: "Delivered" },
];

const getStepIndex = (key) => steps.findIndex((step) => step.key === key);

const TrackOrderUser = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState({});
  const [currentStatus, setCurrentStatus] = useState("");
  const activeIndex = getStepIndex(currentStatus);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/track-order/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        if (res.data.success) {
          setOrder(res.data.order);
          setCurrentStatus(res.data.order.orderStatus);
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            "Unable to fetch order tracking details, try again later",
        );
      }
    };
    getOrder();
  }, []);

  if (["cancelled", "returned"].includes(order.orderStatus)) {
    return <TrackOrderCancelled orderId={order.orderId} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Track Order</h1>
        <p className="text-sm text-gray-500">
          Order ID:{" "}
          <span className="text-pink-600 font-medium">{order.orderId}</span>
        </p>
      </div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border p-6 mb-6">
        <h2 className="font-medium text-gray-700 mb-6">Order Status</h2>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {steps.map((step, index) => {
            const isCompleted = index <= activeIndex;

            return (
              <div
                key={step.key}
                className="flex md:flex-col items-center gap-3 md:gap-2"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                  ${
                    isCompleted
                      ? "bg-pink-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {index + 1}
                </div>

                <p
                  className={`text-sm text-center ${
                    isCompleted ? "text-gray-800 font-medium" : "text-gray-400"
                  }`}
                >
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Courier Info */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border p-6 mb-6">
        <h2 className="font-medium text-gray-700 mb-4">Shipping Details</h2>

        {currentStatus === "shipped" ||
        currentStatus === "out-for-delivery" ||
        currentStatus === "delivered" ? (
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              <span className="font-medium text-gray-800">Courier:</span>{" "}
              Delhivery
            </p>
            <p>
              <span className="font-medium text-gray-800">Tracking ID:</span>{" "}
              {order.trackingId}
            </p>

            <a
              href="#"
              className="inline-block mt-3 text-pink-600 font-medium hover:underline"
            >
              Track on Courier Website →
            </a>
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            Tracking details will be available once your order is shipped.
          </p>
        )}
      </div>

      {/* Ordered Items */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border">
        <h2 className="px-6 py-4 border-b font-medium text-gray-700">
          Ordered Items
        </h2>

        <div className="divide-y">
          {order?.items?.map((item) => (
            <div key={item._id} className="p-6 flex gap-4 items-center">
              <img
                src={item.image}
                alt="product"
                className="w-20 h-20 rounded-lg border object-cover"
              />

              <div className="flex-1">
                <h3 className="font-medium text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Color: {item.color} | Size: {item.size} | Qty: {item.quantity}
                </p>
              </div>
            </div>
          ))}

          <div className="flex flex-col px-3 py-2">
            <div className="flex justify-between">
              <p className="text-sm text-gray-400 font-semibold">
                Sub total (after deducting discount)
              </p>
              <div className="font-semibold text-gray-700 text-right text-sm">
                ₹{order?.pricing?.subTotal}
              </div>
            </div>

            <div className="flex justify-between">
              <p className="text-sm text-gray-400 font-semibold">
                Shipping charges
              </p>
              <div className="font-semibold text-gray-700 text-right text-sm">
                + ₹{order?.pricing?.shipping}
              </div>
            </div>

            <div className="flex justify-between">
              <p className="text-sm text-gray-400 font-semibold">Tax charged</p>
              <div className="font-semibold text-gray-700 text-right border-b text-sm">
                + ₹{order?.pricing?.tax}
              </div>
            </div>

            <div className="flex justify-between mt-2">
              <p className="text-md text-gray-500 font-bold">Order Total</p>
              <div className="text-md font-bold text-gray-900 text-right">
                ₹{order?.pricing?.total}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderUser;
