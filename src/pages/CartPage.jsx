import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import {increaseQtyGuest,decreaseQtyGuest,removeItemFromCartGuest} from "../../redux/slices/cartSlice";
import {increaseQtyApi,decreaseQtyApi,removeItemApi} from "../../redux/cartApi";
import {fetchCartItems} from "../../redux/fetchCartItems";
import axios from "axios";
import { setSettings } from "../../redux/slices/settingsSlice";

const CartPage = ()=> {
   const {items} = useSelector((state)=>state.cart);
   const {isAuthenticated} = useSelector((state)=>state.auth);
   const {tax,shipping} = useSelector((state)=>state.settings)
   const dispatch = useDispatch();
   const navigate = useNavigate();

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
          dispatch(setSettings(res.data?.settings))
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
  
  const handleDescrease = async (item)=>{
     if(!isAuthenticated){
       dispatch(decreaseQtyGuest(item.id))
     }else{
        await decreaseQtyApi({
           productId: item.productId,
           selectedColor : item.color,
           selectedSize : item.size
        })
        dispatch(fetchCartItems())
     }
  }

   const handleIncrease = async (item)=>{
      if(!isAuthenticated){
       dispatch(increaseQtyGuest(item.id))
     }else{
        await increaseQtyApi({
           productId: item.productId,
           selectedColor : item.color,
           selectedSize : item.size
        })
         dispatch(fetchCartItems())
     }
  }

   const handleRemoveItemFromCart = async (item)=>{
     if(!isAuthenticated){
        dispatch(removeItemFromCartGuest(item.id))
     }else{
        await removeItemApi({
           productId: item.productId,
           selectedColor : item.color,
           selectedSize : item.size
        })
         dispatch(fetchCartItems())
     }
  }
 
  
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const taxPercent = tax || 0;
  const shippingCharge = shipping || 0;

  const taxAmt = Math.round(subtotal * taxPercent / 100)
  const shippingAmt = subtotal > 3000 ? 0 : shippingCharge;
  const total = subtotal + shippingAmt + taxAmt;


 return (
  <div className="min-h-screen bg-[linear-gradient(to_bottom_right,#fdf2f8,#ffffff,#fce7f3)] px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
    <div className="max-w-7xl mx-auto">
      
      {/* Header */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6 sm:mb-8">
        Your <span className="text-pink-600">Cart</span>
      </h1>

      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6"
              >
                
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.productName}
                  className="w-full sm:w-28 sm:h-36 h-52 object-cover rounded-xl"
                />

                {/* Details */}
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                    {item.productName}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Color: <span className="font-medium">{item.color}</span>
                  </p>

                  <p className="text-sm text-gray-500">
                    Size: <span className="font-medium">{item.size}</span>
                  </p>

                  {/* Quantity */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => handleDescrease(item)}
                      className="w-8 h-8 rounded-full border text-lg hover:bg-gray-100"
                    >
                      −
                    </button>

                    <span className="font-medium">{item.quantity}</span>

                    <button
                      onClick={() => handleIncrease(item)}
                      className="w-8 h-8 rounded-full border text-lg hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => handleRemoveItemFromCart(item)}
                    className="text-sm text-red-500 mt-3 hover:underline"
                  >
                    Remove
                  </button>
                </div>

                {/* Price */}
                <div className="sm:text-right mt-2 sm:mt-0">
                  <p className="text-lg font-semibold text-gray-800">
                    ₹{item.price * item.quantity}
                  </p>
                  <p className="text-sm text-gray-400">
                    ₹{item.price} each
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 h-fit">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Order Summary
            </h2>

            <div className="flex justify-between text-gray-600 mb-2 text-sm sm:text-base">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between text-gray-600 mb-2 text-sm sm:text-base">
              <span>Shipping</span>
              <span>{shippingAmt === 0 ? "Free" : `₹${shippingAmt}`}</span>
            </div>

            <div className="flex justify-between text-gray-600 mb-2 text-sm sm:text-base">
              <span>Tax</span>
              <span>({tax}%) ₹{taxAmt}</span>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between text-base sm:text-lg font-bold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="mt-6 w-full bg-pink-600 text-white py-3 rounded-xl font-medium hover:bg-pink-700 transition"
            >
              Proceed to Checkout
            </button>

            <p className="text-xs text-gray-400 text-center mt-4">
              Free shipping on orders above ₹3000
            </p>
          </div>
        </div>
      )}
    </div>
  </div>
);

}

export default CartPage;
