import {
  ShoppingCart,
  IndianRupee,
  Users,
  Package,
} from "lucide-react";

import {StatCard,StatusBadge} from "../../helper/helper"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const AdminDashboard = () => {
   const [loading,setLoading] = useState(false)
  const [metricsData,setMetricsData] = useState({})
  
useEffect(()=>{
  const fetchMetricsData = async ()=>{
    setLoading(true)
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/get-all-metrics-data`,{
        headers : {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      if(res.data.success){
        setMetricsData(res.data.metricsData)
        setLoading(false)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to fetch all customers,try again later")
      setLoading(false)
    }
  }
  fetchMetricsData()
},[])

  if(loading){
    return (
      <div className="flex items-center justify-center h-screen">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
    </div>
    )
  } 

  return (
    <main className="min-h-screen bg-[#FFF7FA] p-4 md:p-6">
      
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-[#1F1F1F] mb-6">
        Dashboard
      </h1>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Orders"
          value={metricsData?.totalNoOfOrders}
          icon={<ShoppingCart />}
        />
        <StatCard
          title="Total Revenue"
          value={`₹${metricsData?.totalRevenue}`}
          icon={<IndianRupee />}
        />
        <StatCard
          title="Total Users"
          value={metricsData?.totalUsers}
          icon={<Users />}
        />
        <StatCard
          title="Total Products"
          value={metricsData?.totalProductsListed}
          icon={<Package />}
        />
      </section>

      {/* Recent Orders */}
      <section className="mt-10 bg-white rounded-2xl shadow p-5">
        <h2 className="text-lg font-semibold mb-4">
          Recent Orders
        </h2>

        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[#6B6B6B] border-b">
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>

            <tbody className="text-[#1F1F1F]">
              {metricsData?.recentOrders?.map((order) => (
                <tr key={order._id} className="border-b last:border-none">
                  <td className="py-3">{order?.orderId}</td>
                  <td>{order?.user?.name}</td>
                  <td>{new Date(order?.createdAt).toLocaleDateString()}</td>
                  <td className="font-medium">₹{order?.pricing?.total}</td>
                  <td>
                    <StatusBadge status={order?.orderStatus} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

           <div className="md:hidden space-y-4">
  {metricsData?.recentOrders?.map((order) => (
    <div
      key={order._id}
      className="bg-gray-50 rounded-xl p-4 shadow-sm border"
    >
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-500">Order ID</span>
        <span className="font-medium">{order?.orderId}</span>
      </div>

      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-500">Customer</span>
        <span>{order?.user?.name}</span>
      </div>

      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-500">Date</span>
        <span>{new Date(order?.createdAt).toLocaleDateString()}</span>
      </div>

      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-500">Amount</span>
        <span className="font-medium">
          ₹{order?.pricing?.total}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">Status</span>
        <StatusBadge status={order?.orderStatus} />
      </div>
    </div>
  ))}
</div>
      </section>
    </main>
  );
};

export default AdminDashboard;
