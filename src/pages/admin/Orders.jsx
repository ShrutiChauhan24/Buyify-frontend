import { Eye } from "lucide-react";
import { StatusBadge, PaymentBadge } from "../../helper/adminOrdersHelper";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../../../redux/slices/orderSlice";
import { toast } from "react-toastify";
import { useState } from "react";

const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/admin/get-all-orders`,
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
            "Error in fetching all orders, try again later"
        );
      }
    };
    fetchAllOrders();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

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
           dispatch(setOrders(
             orders.map((order)=>
              order.orderId === orderId ? {...order,orderStatus:newOrderStatus} : order
            )
           ))
           toast.success(res.data.message)
         }
       } catch (error) {
         toast.error(
          error?.response?.data?.message ||
            "Unable to update order status, try again later"
        );
       } 
    }

  const styles = {
    placed: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-green-100 text-green-700",
    shipped: "bg-red-100 text-red-700",
    "out-for-delivery": "bg-yellow-100 text-yellow-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="p-4 md:p-6 max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1F1F1F]">Orders</h1>
        <p className="text-sm text-gray-500">
          Manage and track customer orders
        </p>
      </div>

      {/* TABLE (Desktop) */}
      <div className="hidden md:block bg-white rounded-2xl shadow overflow-x-auto">
        <table className="w-full table-fixed text-sm">
          <thead className="border-b text-gray-500">
            <tr>
              <th className="p-4 text-left w-[14%]">Order ID</th>
              <th className="text-left w-[18%]">Customer</th>
              <th className="text-center w-[8%]">Items</th>
              <th className="text-left w-[10%]">Amount</th>
              <th className="text-left w-[12%]">Payment</th>
              <th className="text-left w-[14%]">Status</th>
              <th className="text-left w-[14%]">Date</th>
              <th className="text-right pr-6 w-[10%]">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order?._id}
                className="border-b last:border-none hover:bg-gray-50"
              >
                <td className="p-4 font-medium truncate">{order?.orderId}</td>

                <td className="truncate">{order?.shippingAddress?.fullName}</td>

                <td className="text-center">{order?.items?.reduce((acc,item)=> acc + item.quantity , 0)}</td>

                <td>₹{order?.pricing?.total}</td>

                <td>
                  <PaymentBadge method={order?.payment?.method} />
                </td>

                <td>
                  <select
                    disabled={
                      order?.orderStatus === "delivered" ||
                      order?.orderStatus === "cancelled"
                    }
                    value={order?.orderStatus}
                    onChange={(e)=>handleUpdateOrderStatus(order.orderId,e.target.value)}
                    className={`px-3 py-1 rounded-full text-xs font-medium outline-none cursor-pointer ${styles[order?.orderStatus]}`}
                  >
                    <option value="placed">Placed</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="out-for-delivery">Out-for-delivery</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>

                <td className="truncate">{formatDate(order?.createdAt)}</td>

                <td className="text-right pr-6">
                  <button
                    className="inline-flex items-center gap-2 text-[#FF0054] hover:underline"
                    onClick={() =>
                      navigate(`/admin/dashboard/view-order-detail/${order.orderId}`)
                    }
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CARDS (Mobile) */}
      <div className="md:hidden space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl shadow p-4 space-y-3"
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold">{order?.orderId}</span>
              <select
                disabled={
                  order?.orderStatus === "delivered" ||
                  order?.orderStatus === "cancelled"
                }
                value={order?.orderStatus}
                // onChange={(e) => setOrderStatus(e.target.value)}
                className={`px-1 py-0.5 rounded-full text-xs font-medium outline-none cursor-pointer ${styles[order?.orderStatus]}`}
              >
                <option value="placed">Placed</option>
                <option value="confirmed">Confirmed</option>
                <option value="shipped">Shipped</option>
                <option value="out-for-delivery">Out-for-delivery</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="text-sm text-gray-600">
              <p>
                <span className="font-medium">Customer:</span>{" "}
                {order?.shippingAddress?.fullName}
              </p>
              <p>
                <span className="font-medium">Items:</span>{" "}
                {order?.items?.reduce((acc,item)=> acc + item.quantity , 0)}
              </p>
              <p>
                <span className="font-medium">Amount:</span> ₹
                {order?.pricing?.total}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <PaymentBadge method={order.payment.method} />
              <span className="text-xs text-gray-500">
                {formatDate(order?.createdAt)}
              </span>
            </div>

            <button
              className="w-full mt-2 flex items-center justify-center gap-2 border border-[#FF0054] text-[#FF0054] py-2 rounded-xl hover:bg-[#FF0054] hover:text-white transition"
              onClick={() => navigate(`/admin/dashboard/view-order-detail/${order.orderId}`)}
            >
              <Eye size={16} />
              View Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
