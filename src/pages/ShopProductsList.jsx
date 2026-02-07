import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../redux/slices/productSlice";

const ShopProductsList = () => {
  const [gender, setGender] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/get-all-categories?status=active`,
        );
        if (res.data.success) {
          setCategories(res.data.categories);
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Unable to fetch categories",
        );
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProductsList = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/get-products-list?category=${category}&gender=${gender}&search=${search}&status=active`,
        );
        if (res.data.success) {
          dispatch(setProducts(res.data.products));
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Unable to fetch products",
        );
      }
    };
    fetchProductsList();
  }, [category, gender, search]);

  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom_right,#fdf2f8,#ffffff,#fce7f3)] p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight">
          <span className="text-gray-900">Explore </span>
          <span className="text-pink-600">Our Products</span>
        </h1>
        <p className="text-gray-500 mt-2">
          Find your perfect fit with our curated collections
        </p>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-4">
        {/* Category */}
        <select
          value={gender}
          onChange={(e) => {
            setGender(e.target.value);
          }}
          className="border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          <option value="">Select gender</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="unisex">Unisex</option>
        </select>

        {/* Type */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          <option value="all">All</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.categoryName}
            </option>
          ))}
        </select>

        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      {/* Product Grid */}
   <div className="max-w-7xl mx-auto grid gap-4 mt-10 
  grid-cols-[repeat(auto-fit,minmax(140px,1fr))] 
  sm:grid-cols-[repeat(auto-fit,minmax(160px,1fr))] 
  md:grid-cols-[repeat(3,minmax(200px,1fr))] 
  lg:grid-cols-[repeat(3,minmax(220px,1fr))]"
>
  {products.map((product) => (
    <div
      key={product?._id}
      className="bg-white rounded-2xl shadow-lg p-3 sm:p-4 hover:shadow-xl transition flex flex-col h-full"
    >
      {/* Image */}
      <div className="w-full h-32 sm:h-48 md:h-56 lg:h-72 bg-white rounded-xl mb-3 sm:mb-4 flex items-center justify-center overflow-hidden">
        <img
          src={product?.images?.[0]}
          alt={product?.productName}
          className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Title */}
      <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-800 h-10 sm:h-12 md:h-14 overflow-hidden line-clamp-2">
        {product?.productName}
      </h3>

      {/* Category */}
      <p className="text-xs sm:text-xs md:text-sm text-gray-500 capitalize mb-3 sm:mb-4">
        {product?.gender} • {product?.category?.categoryName}
      </p>

      {/* Button */}
      <button
        className="mt-auto w-full rounded-xl bg-pink-600 text-white py-1.5 sm:py-2 font-medium hover:bg-pink-700 transition"
        onClick={() => navigate(`/shop/product-detail/${product._id}`)}
      >
        View Product
      </button>
    </div>
  ))}
</div>




      {products.length === 0 && (
        <p className="text-center text-gray-400 mt-16">No products found</p>
      )}
    </div>
  );
};

export default ShopProductsList;
