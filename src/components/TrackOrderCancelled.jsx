import React from "react";
import { useNavigate } from "react-router-dom";

const TrackOrderCancelled = ({ orderId }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white max-w-md w-full rounded-xl shadow-sm border p-6 text-center">
        
        <div className="text-red-500 text-5xl mb-4">✕</div>

        <h1 className="text-xl font-semibold text-gray-800 mb-2">
          Order Cancelled
        </h1>

        <p className="text-sm text-gray-600 mb-4">
          This order has been cancelled and will not be processed.
        </p>

        <p className="text-sm text-gray-500 mb-6">
          Order ID:{" "}
          <span className="font-medium text-gray-800">
            {orderId}
          </span>
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/")}
            className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderCancelled;
