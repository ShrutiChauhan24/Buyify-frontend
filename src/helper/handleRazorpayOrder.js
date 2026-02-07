import axios from "axios";

const handleRazorpayOrder = async ({orderItems,orderData})=>{
   const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/create-razorpay-order`,
    {orderData},
    {
        headers : {
            Authorization : `Bearer ${localStorage.getItem("token")}`
        }
    }
)

  const razorpayOrder = res.data.order

  const options = {
     key : import.meta.env.VITE_RAZORPAY_KEY_ID,
     amount:razorpayOrder.amount,
     currency:"INR",
     order_id:razorpayOrder.id,
     name:"Buyify",
      prefill: {
        name: orderData.shippingAddress.fullName,
        email: orderData.shippingAddress.email,
        contact: orderData.shippingAddress.phone,
      },
     handler: async function (response){
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/verify-razorpay-payment`,{
            ...response},{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})

         window.location.href = "/my-orders";
        } catch (error) {
             alert("Payment verification failed");
        }     
     },
       modal: {
        ondismiss: function () {
          alert("Payment cancelled");
        },
      },
            
     theme: { color: "#ec4899" },
  }

  const rzp = new window.Razorpay(options)
  rzp.open()
}

export default handleRazorpayOrder;