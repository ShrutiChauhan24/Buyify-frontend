import axios from "axios";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
    const {token} = useParams();
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");

    const handleSubmit = async (e)=>{
      e.preventDefault();
      try {
        if(password !== confirmPassword){
            toast.error("Password and confirm password not match")
            return
        }
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/reset-password/${token}`,{
            password
        },{withCredentials:true})
 
        if(res.data.success){
           toast.success(res.data.message)  
        }  
      } catch (error) {
        toast.error(error?.response?.data?.message)
      }
    }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4
      bg-[linear-gradient(to_bottom_right,var(--color-primary-light),white)]"
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Reset Password
        </h1>

        <p className="text-gray-500 text-sm text-center mt-2 mb-8">
          Enter your new password below
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
            className="w-full px-5 py-3 rounded-full border border-pink-200
            focus:outline-none focus:ring-2
            focus:ring-pink-600"
          />

          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            required
            className="w-full px-5 py-3 rounded-full border border-pink-200
            focus:outline-none focus:ring-2
            focus:ring-pink-600"
          />

          <button
            type="submit"
            className="w-full text-white py-3 rounded-full font-semibold
            bg-pink-600 hover:bg-pink-700 transition"
          >
            Reset Password
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-500">
          Back to
          <Link
            to="/login"
            className="text-pink-600 font-semibold ml-1 hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
