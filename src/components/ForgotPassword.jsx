import axios from "axios";
import { useState } from "react";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";

const ForgotPassword = () => {
  const [email,setEmail] = useState("")

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/forgot-password`,{
            email
        },{withCredentials:true})
        toast.success(res.data.message)
    } catch (error) {
      console.log(error)
       toast.error(error?.response?.data?.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(to_bottom_right,var(--color-primary-light),white)] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Forgot Password?
        </h1>

        <p className="text-gray-500 text-sm text-center mt-2 mb-8">
          Enter your registered email address <br />
          and we’ll send you a reset link.
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
            className="w-full px-5 py-3 rounded-full border border-pink-200 focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-pink-700 transition"
          >
            Send Reset Link →
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-500">
          Remember your password?
          <Link
            to="/login"
            className="text-primary font-semibold ml-1 hover:underline"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

