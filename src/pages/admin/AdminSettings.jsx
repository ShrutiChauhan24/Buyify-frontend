import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const AdminSettings = () => {
  const [data, setData] = useState({
    storeName: "",
    email: "",
    codEnabled: true,
    tax: "",
    shipping: "",
  });

  useEffect(() => {
    const fetchSettingsInfo = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/settings/get-store-info`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        if (res.data.success) {
          const settings = res.data?.settings;
          setData({
            storeName: settings?.storeName || "",
            email: settings?.contactEmail || "",
            codEnabled: Boolean(settings?.enableCOD) || false,
            tax: settings?.tax ?? 0,
            shipping: settings?.shippingCharges ?? "",
          });
        }
      } catch (error) {
        console.log("err :", error);
        toast.error(
          error?.response?.data?.message ||
            "Unable to fetch settings info,try again later",
        );
      }
    };
    fetchSettingsInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

      setData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }))
    }

  const handleSave = async () => {
    try {
      const res = await axios.patch(
        "http://localhost:4000/api/settings/add-store-info",
        {
         storeName : data.storeName,
         contactEmail: data.email,
         enableCOD : data.codEnabled || false,
         tax : Number(data.tax) || 0,
         shippingCharges: Number(data.shipping) || 0
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("err :", error);
      toast.error(
        error?.response?.data?.message ||
          "Unable to update settings,try again later",
      );
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-[#1F1F1F]">
          Settings
        </h1>
        <p className="text-sm text-gray-500">Manage store preferences</p>
      </div>

      <div className="bg-white rounded-xl shadow p-4 md:p-6 space-y-6">
        {/* Store Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Store Name</label>
          <input
            type="text"
            name="storeName"
            value={data.storeName}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#FF0054] outline-none"
          />
        </div>

        {/* Contact Email */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Contact Email
          </label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#FF0054] outline-none"
          />
        </div>

        {/* COD Toggle */}
        <div className="flex items-center justify-between border rounded-lg px-4 py-3">
          <div>
            <p className="font-medium">Cash on Delivery</p>
            <p className="text-xs text-gray-500">
              Enable or disable COD payment option
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="codEnabled"
              checked={data.codEnabled}
              onChange={handleChange}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-[#FF0054] rounded-full peer peer-checked:bg-[#FF0054] transition"></div>
            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full peer-checked:translate-x-5 transition"></div>
          </label>
        </div>

        {/* Tax & Shipping */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tax (%)</label>
            <input
              type="number"
              name="tax"
              value={data.tax}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#FF0054] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Shipping Charges (₹)
            </label>
            <input
              type="number"
              name="shipping"
              value={data.shipping}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#FF0054] outline-none"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-[#FF0054] text-white px-6 py-2 rounded-lg text-sm hover:opacity-90 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
