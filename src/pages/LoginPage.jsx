import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUserSignupLogin } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { clearCartGuest } from "../../redux/slices/cartSlice";
import GoogleAuthButton from "../components/GoogleAuthButton";

const LoginPage = () => {
     const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading , setLoading] = useState(false)
    const token = localStorage.getItem("token")

    useEffect(()=>{
     if(token) {
       navigate('/')
     }
    },[])

  const handleLogin = async (e)=>{
    e.preventDefault();
    try {
      const email = e.target.email.value.trim();
      const password = e.target.password.value;

        if(!email || !password){
          toast.error("All fields must be field")
          return
        }

        setLoading(true)
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/user/login`,{
          email,password
        },{withCredentials:true})
        setLoading(false)
        if(res.data.success){
          dispatch(setUserSignupLogin(res.data))
           toast.success(res.data.message)
           dispatch(clearCartGuest())
           navigate('/')
        }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed, try again later")
      setLoading(false)
    }
  }


  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Branding Section */}
      <div
        className="hidden lg:flex flex-col justify-center px-16 text-white relative"
        style={{
          background: "linear-gradient(135deg, #db2777, #ec4899, #f472b6)",
        }}
      >
        <h1 className="text-4xl font-extrabold leading-tight">
          Welcome Back
        </h1>
        <p className="mt-4 text-pink-100 max-w-md">
          Log in to track your orders, manage your account, and continue your styling journey.
        </p>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-24 h-24 rounded-full border-4 border-pink-300 opacity-40" />
        <div className="absolute bottom-16 left-12 w-14 h-14 bg-white/20 rounded-full" />
      </div>

      {/* Login Form Section */}
      <div className="flex items-center justify-center px-4 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Login
          </h2>
          <p className="text-gray-500 mt-2">
            Access your account
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleLogin}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="accent-pink-600" />
                Remember me
              </label>
              <Link to={"/forgot-password"} className="text-pink-600 font-medium cursor-pointer">
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled = {loading}
              className="w-full rounded-full bg-pink-600 py-3 text-white font-semibold hover:shadow-lg transition"
            >
              {loading ? "Login..." : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-gray-200" />
            <span className="text-sm text-gray-400">or</span>
            <span className="h-px flex-1 bg-gray-200" />
          </div>

         <GoogleAuthButton/> 

          {/* Signup Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link to={'/signup'} className="text-pink-600 font-semibold cursor-pointer">
              Sign Up
            </Link>
          </p>

           <p className="mt-6 text-center text-sm text-gray-600">
            If admin, Login here{' '}
            <Link to={'/admin/login'} className="text-red-600 font-semibold cursor-pointer">
              Admin Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
