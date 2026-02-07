import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setUserSignupLogin } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import GoogleAuthButton from "../components/GoogleAuthButton";


const SignupPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading , setLoading] = useState(false)
    const token = localStorage.getItem("token")
    
        useEffect(()=>{
         if(token) {
           navigate('/')
         }
        },[])

  const handleSignup = async (e)=>{
    e.preventDefault();
    try {
      const name = e.target.name.value.trim();
      const email = e.target.email.value.trim();
      const password = e.target.password.value;
      const confirmPassword = e.target.confirmPassword.value;

        if(!name || !email || !password || !confirmPassword){
          toast.error("All fields must be field")
          return
        }

        if(password !== confirmPassword){
          toast.error("Password and confirm password doesn't match")
          return
        }

        setLoading(true)
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/user/signup`,{
          name,email,password
        },{withCredentials:true})
        setLoading(false)
        if(res.data.success){
          dispatch(setUserSignupLogin(res.data))
           toast.success(res.data.message)
           navigate('/')
        }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || "Sign up failed, try again later")
      setLoading(false)
    }
  }



  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Branding Section */}
      <div className="hidden lg:flex flex-col justify-center px-16 text-white relative"
        style={{ background: "linear-gradient(to right, #ec4899, #f472b6)"}}
      >
        <h1 className="text-4xl font-extrabold leading-tight">
          Get Your <br /> Perfect Shape
        </h1>
        <p className="mt-4 text-pink-100 max-w-md">
          Join our styling & lifestyle community. Track your orders, workouts and stay motivated.
        </p>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-24 h-24 rounded-full border-4 border-pink-300 opacity-40" />
        <div className="absolute bottom-16 left-12 w-14 h-14 bg-white/20 rounded-full" />
      </div>

      {/* Signup Form Section */}
      <div className="flex items-center justify-center px-4 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Create Account
          </h2>
          <p className="text-gray-500 mt-2">
            Sign up to start your styling journey
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSignup}>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                name="name"
                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                name="email"
                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                name="password"
                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••"
                name="confirmPassword"
                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 text-sm">
              <input type="checkbox" className="mt-1 accent-pink-600" />
              <p className="text-gray-600">
                I agree to the <span className="text-pink-600 font-medium">Terms</span> &{' '}
                <span className="text-pink-600 font-medium">Privacy Policy</span>
              </p>
            </div>

            {/* Submit */}
            <button
              disabled = {loading}
              type="submit"
              className="w-full rounded-full bg-pink-600 py-3 text-white font-semibold hover:shadow-lg transition"
            >
              {loading ? "Signing up..." : "Signup"}     
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-gray-200" />
            <span className="text-sm text-gray-400">or</span>
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          {/*Social Signup */}
           <GoogleAuthButton/>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to={'/login'} className="text-pink-600 font-semibold cursor-pointer">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
