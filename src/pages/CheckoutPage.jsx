import { useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import {useSelector} from "react-redux";
import axios from "axios";
import handleRazorpayOrder from "../helper/handleRazorpayOrder";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = useSelector((state)=>state.cart.items);
  const {user} = useSelector((state)=>state.auth);

  const items = location.state?.items?.length > 0 ? location.state?.items : cartItems;
   

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    paymentMethod: "COD"
  });

  useEffect(()=>{
    if(user){
      setForm((prev)=>({
        ...prev,
        fullName: user.name,
        email:user.email
      }))
    }
  },[user])
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // products arrays 
      const orderItems = items.map((item)=>(
        {
          productId : item.productId,
          quantity : item.quantity,
          color: item.color,
          size:item.size
        }
      ))

      // shipping address 
      const shippingAddress = {
      fullName:form.fullName.trim(),
      email:form.email.trim(),
      phone:form.phone,
      addressLine:form.addressLine.trim(),
      city:form.city.trim(),
      state:form.state.trim(),
      pincode:form.pincode,
      country:form.country.trim()
      }

      // final data for sending 
      const orderData = {
        items:orderItems,
        shippingAddress
      }
      
       if(form.paymentMethod === "RAZORPAY"){
          await handleRazorpayOrder({orderItems,orderData})
       }else{
          const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/create-cod-order`,{orderData},{
            headers : {
              Authorization : `Bearer ${localStorage.getItem("token")}`
            }
          })

          navigate('/my-orders')
       }

    } catch (err) {
       console.log("error:",err)
       toast.error(err?.response?.data?.message || "Order can't be placed")
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex justify-center items-start py-10 px-4">
      <div className="bg-white rounded-xl shadow-md w-full max-w-2xl p-6">
        <h2 className="text-2xl font-bold mb-6">Checkout</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Customer Details */}
          <div>
            <h3 className="font-semibold mb-2">Customer Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
                required
                readOnly
                className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
                readOnly
                className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
              className="border rounded-lg px-4 py-3 mt-4 w-full focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Shipping Address */}
          <div>
            <h3 className="font-semibold mb-2">Shipping Address</h3>
            <textarea
              name="addressLine"
              placeholder="House no, Street, Area"
              value={form.addressLine}
              onChange={handleChange}
              required
              className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                required
                className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={form.state}
                onChange={handleChange}
                required
                className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={form.pincode}
                onChange={handleChange}
                required
                className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={form.country}
              onChange={handleChange}
              required
              className="border rounded-lg px-4 py-3 mt-4 w-full focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="font-semibold mb-2">Payment Method</h3>
            <div className="space-y-2">
              <label className="border rounded-lg w-full flex items-center px-4 py-3 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={form.paymentMethod === "COD"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Cash on Delivery
              </label>
              <label className="border rounded-lg w-full flex items-center px-4 py-3 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="RAZORPAY"
                  checked={form.paymentMethod === "RAZORPAY"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Razorpay (UPI / Card / NetBanking)
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-4 rounded-xl transition"
          >
            Confirm & Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
