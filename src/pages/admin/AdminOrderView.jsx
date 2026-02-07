import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {toast} from "react-toastify"

const AdminOrderView = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState({});
   const [trackingId, setTrackingId] = useState("");

  useEffect(() => {
    const getOrderByOrderId = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/admin/view-order-details/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        if (res.data.success) {
          setOrder(res.data.order);
          setTrackingId(res.data.order.trackingId)
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            "Error in fetching order, try again later",
        );
      }
    };
    getOrderByOrderId();
  }, [orderId]);

      const handleUpdateOrderStatus = async (orderId,newOrderStatus)=>{
         try {
           const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/update-order-status/${orderId}`,
            {orderStatus:newOrderStatus},{
              headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
              }
            }
           )
           if(res.data.success){
             setOrder((prev)=>({...prev,orderStatus:newOrderStatus}))
             toast.success(res.data.message)
           }
         } catch (error) {
           toast.error(
            error?.response?.data?.message ||
              "Unable to update order status, try again later"
          );
         } 
      }

        const handleAddTrackingId = async ()=>{
         try {
           const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/add-tracking-id/${orderId}`,
            {trackingId},{
              headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
              }
            }
           )
           if(res.data.success){
             toast.success(res.data.message)
           }
         } catch (error) {
           toast.error(
            error?.response?.data?.message ||
              "Unable to add tracking id, try again later"
          );
         } 
      }



  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Order Details</h1>
        <p className="text-sm text-gray-500">
          Order ID:{" "}
          <span className="font-medium text-pink-600">{order?.orderId}</span>
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-6">
          {/* Products */}
          <div className="bg-white rounded-xl shadow-sm border">
            <h2 className="px-4 py-3 border-b font-medium text-gray-700">
              Ordered Products
            </h2>

            <div className="divide-y">
              {order?.items?.map((o) => (
                <div key={o._id} className="p-4 flex gap-4 items-start">
                  <img
                    src={o?.image}
                    alt="product"
                    className="w-20 h-20 rounded-lg object-cover border"
                  />

                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{o?.name}</h3>

                    <div className="text-sm text-gray-500 mt-1 space-x-2">
                      <span>Color: {o?.color}</span>
                      <span>|</span>
                      <span>Size: {o?.size}</span>
                      <span>|</span>
                      <span>Qty: {o?.quantity}</span>
                    </div>
                  </div>

                  <div className="font-semibold text-gray-800">₹{o?.price * o?.quantity}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer */}
          <div className="bg-white rounded-xl shadow-sm border">
            <h2 className="px-4 py-3 border-b font-medium text-gray-700">
              Customer & Delivery Address
            </h2>

            <div className="p-4 text-sm text-gray-600 space-y-2">
              <p>
                <span className="font-medium text-gray-800">Name:</span>{" "}
                {order?.shippingAddress?.fullName}
              </p>
              <p>
                <span className="font-medium text-gray-800">Phone:</span>{" "}
                {order?.shippingAddress?.phone}
              </p>
              <p>
                <span className="font-medium text-gray-800">Address:</span>
                <br />
                {order?.shippingAddress?.addressLine}
                <br />
                {order?.shippingAddress?.city},{" "}
                {order?.shippingAddress?.pincode}
                <br />
                {order?.shippingAddress?.state} (
                {order?.shippingAddress?.country})
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-sm border">
            <h2 className="px-4 py-3 border-b font-medium text-gray-700">
              Order Summary
            </h2>

            <div className="p-4 space-y-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Items</span>
                <span>{order?.items?.reduce((acc,item)=> acc + item.quantity , 0)}</span>
              </div>

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{order?.pricing?.subTotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹{order?.pricing?.tax}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{order?.pricing?.shipping}</span>
              </div>

              <div className="border-t pt-2 flex justify-between font-semibold text-gray-800">
                <span>Total</span>
                <span>₹{order?.pricing?.total}</span>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-xl shadow-sm border">
            <h2 className="px-4 py-3 border-b font-medium text-gray-700">
              Payment
            </h2>

            <div className="p-4 text-sm space-y-2">
              <p>
                <span className="font-medium text-gray-800">Method:</span>{" "}
                <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs">
                  {order?.payment?.method}
                </span>
              </p>

              <p>
                <span className="font-medium text-gray-800">Payment status:</span>{" "}
                <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs">
                  {order?.payment?.status}
                </span>
              </p>

                {order?.payment?.method === "RAZORPAY" &&  <p>
                <span className="font-medium text-gray-800">Razorpay payment Id:</span>{" "}
                <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs">
                  {order?.payment?.razorpay?.razorpayPaymentId}
                </span>
              </p>}
             

              <p>
                <span className="font-medium text-gray-800">Status:</span>{" "}
                <span className="px-2 py-1 rounded-full bg-orange-100 text-orange-700 text-xs">
                  {order?.orderStatus}
                </span>
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-xl shadow-sm border">
            <h2 className="px-4 py-3 border-b font-bold text-gray-700">
              Order Actions
            </h2>

            <div className="p-4 space-y-3">
              <select className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={order?.orderStatus}
                onChange={(e)=>{
                  console.log("changed to:", e.target.value);
                  handleUpdateOrderStatus(order.orderId,e.target.value)}}
              >
                <option disabled value="">Update Status</option>
                <option value="placed">Placed</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="out-for-delivery">Out-for-delivery</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
              </select>


             <label className="font-medium text-gray-800">Add Tracking Id</label>
              <input
                type="text"
                disabled={order?.orderStatus !== "confirmed"}
                value={trackingId}
                onChange={(e)=>setTrackingId(e.target.value)}
                placeholder="eg. SHIP-20250112-A9F3K"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              />

              <button className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg text-sm font-medium transition"
              onClick={handleAddTrackingId}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderView;
