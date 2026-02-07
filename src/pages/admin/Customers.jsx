import { Mail, ShoppingBag } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import {toast} from "react-toastify";



const Customers = () => {
  const [customers,setCustomers] = useState([]);

  useEffect(()=>{
     const fetchAllCustomers = async()=>{
      try {
         const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/get-all-customers`,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
       })
       if(res.data.success){
        console.log(res.data.customers)
        setCustomers(res.data.customers)
       }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Unable to fetch all customers,try again later")
      }
     }
     fetchAllCustomers()
  },[])

  return (
    <div className="p-4 md:p-6 max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1F1F1F]">
          Customers
        </h1>
        <p className="text-sm text-gray-500">
          View and manage registered users
        </p>
      </div>

      {/* TABLE (Desktop) */}
      <div className="hidden md:block bg-white rounded-2xl shadow overflow-x-auto">
        <table className="w-full table-fixed text-sm">
          <thead className="border-b text-gray-500">
            <tr>
              <th className="p-4 text-left w-[30%]">User</th>
              <th className="text-left w-[30%]">Email</th>
              <th className="text-left w-[20%]">Joined</th>
              <th className="text-center w-[20%]">Total Orders</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((user) => (
              <tr
                key={user._id}
                className="border-b last:border-none hover:bg-gray-50"
              >
                <td className="p-4 font-medium truncate">
                  {user.name}
                </td>

                <td className="truncate">{user.email}</td>

                <td>{new Date(user.createdAt).toLocaleDateString()}</td>

                <td className="text-center font-semibold">
                  {user.totalOrders}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CARDS (Mobile) */}
      <div className="md:hidden space-y-4">
        {customers.map((user) => (
          <div
            key={user._id}
            className="bg-white rounded-2xl shadow p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-[#1F1F1F]">
                {user.name}
              </h3>
              <span className="flex items-center gap-1 text-sm text-gray-500">
                <ShoppingBag size={14} />
                {user.totalOrders}
              </span>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <p className="flex items-center gap-2">
                <Mail size={14} />
                {user.email}
              </p>
              <p>
                <span className="font-medium">Joined:</span>{" "}
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customers;
