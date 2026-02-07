import { useState } from "react";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import axios from "axios";

const AdminSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
       const navigate = useNavigate()
       const [loading , setLoading] = useState(false)
   
     const handleSignup = async (e)=>{
       e.preventDefault();
       try {
         const name = e.target.name.value.trim();
         const email = e.target.email.value.trim();
         const password = e.target.password.value;
         const confirmPassword = e.target.confirmPassword.value;
         const secretKey = e.target.secretKey.value.trim();
   
           if(!name || !email || !password || !confirmPassword || !secretKey){
             toast.error("All fields must be field")
             return
           }
   
           if(password !== confirmPassword){
             toast.error("Password and confirm password doesn't match")
             return
           }
   
           setLoading(true)
           const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/admin/signup`,{
             name,email,password,secretKey
           },{withCredentials:true})
           setLoading(false)
           if(res.data.success){
              toast.success(res.data.message)
              navigate('/admin/login')
           }
       } catch (error) {
         toast.error(error?.response?.data?.message || "Sign up failed, try again later")
         setLoading(false)
       }
     }
   


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 md:p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <ShieldCheck className="text-[#FF0054]" />
            <h1 className="text-2xl font-bold text-[#1F1F1F]">
              Admin Signup
            </h1>
          </div>
          <p className="text-sm text-gray-500">
            Create a new admin account
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSignup}>
          {/* Name */}
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter admin name"
              className="w-full mt-1 px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-[#FF0054]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="admin@example.com"
              className="w-full mt-1 px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-[#FF0054]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create password"
                className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-[#FF0054]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter password"
              className="w-full mt-1 px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-[#FF0054]"
            />
          </div>

          {/* Admin Secret Key */}
          <div>
            <label className="text-sm font-medium">
              Admin Secret Key
            </label>
            <input
              type="password"
              name="secretKey"
              placeholder="Provided by super admin"
              className="w-full mt-1 px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-[#FF0054]"
            />
            <p className="text-xs text-gray-400 mt-1">
              This key is required to create admin accounts
            </p>
          </div>

          {/* Submit */}
          <button
          disabled={loading}
            type="submit"
            className="w-full mt-2 bg-[#FF0054] text-white py-2 rounded-xl font-medium hover:opacity-90 transition"
          >
            {loading ? "Creating Admin..." : "Create Admin Account"}
          </button>

          <p className="text-sm text-center text-gray-600 mt-4">
  Already have an account?{" "}
  <Link
    to="/admin/login"
    className="text-[#FF0054] font-medium hover:underline"
  >
    Log in
  </Link>
</p>
        </form>

        {/* Footer */}
        <p className="text-xs text-center text-gray-500 mt-6">
          Only authorized users can create admin accounts
        </p>
      </div>
    </div>
  );
};

export default AdminSignup;
