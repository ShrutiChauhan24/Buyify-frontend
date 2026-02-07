import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Edit2 } from "lucide-react";

const LOW_SIZE_THRESHOLD = 5;
const getSizeBadge = (qty) => {
  if (qty === 0) return "out";
  if (qty <= LOW_SIZE_THRESHOLD) return "low";
  return "in";
};

const AdminInventory = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingInventory, setEditingInventory] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [search,setSearch] = useState("");

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/get-inventory-details?search=${search}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        if (res.data.success) {
          setInventoryData(res.data.products);
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.response ||
            "Error while fetching inventory details"
        );
      }
    };
    fetchAllProducts();
  }, [search]);

  const handleSizeChange = async (size,value)=>{
    setSelectedSizes((prev)=>({
      ...prev,  [size]: value === "" ? "" : Number(value),
    }));
  }

  const handleSave = async ()=>{
    try {
       const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/update-inventory-stock/${editingInventory._id}`,
        {sizes : selectedSizes},
        {
         headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
         }
       })
       if(res.data.success){
        toast.success(res.data.message)
        setIsEditModalOpen(false)

        setInventoryData((prev)=>
          prev.map((item) =>
            item._id === editingInventory._id ? {...item , sizes:selectedSizes} : item
          )
        )
       }
    } catch (error) {
      console.log(error)
      toast.error(
          error?.response?.data?.response ||
            "Unable to update inventory,try again later",
        );
    }
  }

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-[#1F1F1F]">
          Inventory
        </h1>
        <p className="text-sm text-gray-500">Size-wise stock management</p>
      </div>


          {/* Search Bar UI */}
<div className="mb-6 flex justify-end">
  <div className="relative w-full sm:w-80">
    <input
      type="text"
      value={search}
      onChange={(e)=>setSearch(e.target.value)}
      placeholder="Search by product or SKU..."
      className="w-full border border-gray-300 rounded-xl px-4 py-2 pr-10 text-sm 
                 focus:outline-none focus:ring-2 focus:ring-[#FF0054] 
                 focus:border-[#FF0054] transition"
    />
    
    {/* Search Icon */}
    <svg
      className="absolute right-3 top-2.5 w-5 h-5 text-gray-400"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35m1.35-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  </div>
</div>


      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left">Product</th>
              <th className="px-6 py-3 text-center w-32">SKU</th>

              <th className="px-6 py-3 text-center">XS</th>
              <th className="px-6 py-3 text-center">S</th>
              <th className="px-6 py-3 text-center">M</th>
              <th className="px-6 py-3 text-center">L</th>
              <th className="px-6 py-3 text-center">XL</th>

              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {inventoryData.map((item) => (
              <tr key={item._id} className="border-b last:border-none">
                <td className="px-6 py-4 font-medium">{item.productName}</td>
                <td className="px-6 py-4 text-center w-32 text-gray-500">
                  {item.sku}
                </td>

                {Object.entries(item.sizes).map(([size, qty]) => {
                  const status = getSizeBadge(qty);

                  return (
                    <td key={size} className="px-6 py-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium
                          ${
                            status === "in"
                              ? "bg-green-100 text-green-700"
                              : status === "low"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-600"
                          }`}
                      >
                        {qty}
                      </span>
                    </td>
                  );
                })}
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => {
                      setIsEditModalOpen(true);
                      setEditingInventory(item);
                      setSelectedSizes(item.sizes);
                    }}
                    className="text-[#FF0054] text-sm font-medium hover:underline"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden flex flex-col gap-4">
        {inventoryData.map((item) => (
          <div key={item._id} className="bg-white rounded-xl shadow p-4">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-[#1F1F1F]">
                  {item.productName}
                </h3>
                <p className="text-xs text-gray-500 mb-3">SKU: {item.sku}</p>
              </div>

              {/* Edit Button */}
              <button
                onClick={() => {
                  setIsEditModalOpen(true);
                  setEditingInventory(item);
                  setSelectedSizes(item.sizes);
                }}
                className="text-sm px-3 py-1 text-[#FF0054]"
              >
                <Edit2 />
              </button>
            </div>

            {/* Sizes */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              {Object.entries(item.sizes).map(([size, qty]) => {
                const status = getSizeBadge(qty);

                return (
                  <div
                    key={size}
                    className={`flex justify-between items-center px-3 py-2 rounded-lg
                ${
                  status === "in"
                    ? "bg-green-100 text-green-700"
                    : status === "low"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100  text-red-600"
                }`}
                  >
                    <span className="font-medium">{size}</span>
                    <span>{qty}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {isEditModalOpen && editingInventory && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[90%] max-w-lg p-6">
            {/* Header */}
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Edit Inventory</h2>
              <p className="text-sm text-gray-500">
                {editingInventory.productName} • {editingInventory.sku}
              </p>
            </div>

            {/* Sizes */}
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(selectedSizes).map(([size, qty]) => (
                <div key={size} className="flex items-center justify-between">
                  <span className="font-medium">{size}</span>
                  <input
                    type="number"
                    min="0"
                    value={qty}
                    onChange={(e) =>
                      handleSizeChange(size, e.target.value)
                    }
                    className="w-24 border rounded-md px-2 py-1 text-sm"
                  />
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 text-sm border rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm bg-[#FF0054] text-white rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInventory;
