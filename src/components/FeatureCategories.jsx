import { useEffect, useState } from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {Link} from "react-router-dom"


const FeatureCategories = () => {
  const [categories,setCategories] = useState([]);

  
useEffect(()=>{
   const fetchCategories = async ()=>{
    try {
       const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/get-all-categories?status=active`)
      if(res.data.success){
        setCategories(res.data.categories)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error in categories fetching")
    }
   }
   fetchCategories()
},[])

  return (
    <section className="bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-20 py-12 md:py-20">
    
    {/* Heading */}
    <div className="mb-10 md:mb-12 text-center md:text-left">
      <h2 className="text-3xl sm:text-4xl font-extrabold">
        Shop by <span className="text-pink-600">Category</span>
      </h2>
      <p className="text-gray-500 mt-3">
        Explore our most loved collections
      </p>
    </div>

    {/* Category Cards */}
    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-3 md:gap-8">
      {categories.map((cat) => (
        <div
  key={cat._id}
  className="group relative overflow-hidden rounded-2xl cursor-pointer"
>
  {/* Image Container */}
  <div className="relative w-full h-44 sm:h-56 md:h-80 lg:h-96 overflow-hidden">
    <img
      src={cat?.images?.[0]?.url}
      alt={cat?.categoryName}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-black/25 md:bg-black/30 md:opacity-0 md:group-hover:opacity-100 transition duration-500" />

    {/* Text */}
    <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white">
      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">
        {cat?.categoryName}
      </h3>

      <Link
        to={`/shop/products/category/${cat?._id}`}
        className="mt-2 inline-block px-4 py-1.5 rounded-full border border-white text-xs sm:text-sm hover:bg-white hover:text-black transition"
      >
        Shop Now
      </Link>
    </div>
  </div>
</div>

      ))}
    </div>
  </div>
</section>

  );
};

export default FeatureCategories;
