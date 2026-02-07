import axios from "axios";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../redux/slices/productSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const NewArrivals = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/get-products-list?limit=7&status=active`
        );
        if (res.data.success) {
          dispatch(setProducts(res.data.products));
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Unable to fetch products");
      }
    };
    fetchProducts();
  }, [dispatch]); // Added dispatch to dependency array for best practice

  return (
<section className="bg-gray-50">
  {/* Reduced padding significantly for mobile (px-2) to give cards room */}
  <div className="max-w-7xl mx-auto px-2 md:px-12 py-10">
    
    {/* Section Heading */}
    <div className="mb-6 px-2">
      <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900">
        New <span className="text-pink-600">Arrivals</span>
      </h2>
    </div>

    {/* 4 Columns across ALL screen sizes */}
    <div className="grid grid-cols-4 gap-2 md:gap-6">
      
      {/* Products */}
      {products.map((product) => (
        <Link 
        to={`/shop/product-detail/${product._id}`}
          key={product._id}
          className="group bg-white rounded-lg overflow-hidden shadow-sm flex flex-col h-full border border-gray-100"
        >
          {/* Image Container */}
          <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
            <img
              src={product?.images?.[0]}
              alt={product?.productName}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Tiny badge for mobile */}
            <span className="absolute top-1 left-1 bg-pink-600 text-white text-[8px] md:text-xs px-1.5 py-0.5 rounded-full">
              New
            </span>
          </div>

          {/* Content - Compact for mobile */}
          <div className="p-1.5 md:p-4 flex flex-col grow">
            <h3 className="text-[10px] md:text-base font-medium text-gray-800 line-clamp-1 md:line-clamp-2 leading-tight">
              {product?.productName}
            </h3>

            <div className="mt-1 md:mt-auto">
              <p className="text-pink-600 font-bold text-xs md:text-lg">
                ₹{product?.price}
              </p>
            </div>
          </div>
        </Link>
      ))}

      {/* SEE MORE CARD - Styled to match the small 4-col layout */}
      <Link
        to="/shop/all-products"
        className="group flex flex-col items-center justify-center rounded-lg border border-dashed border-pink-300 text-pink-600 hover:bg-pink-600 hover:text-white transition-all aspect-square p-1"
      >
        <ArrowRight className="w-4 h-4 md:w-8 md:h-8 mb-1 transition-transform group-hover:translate-x-1" />
        <span className="text-[8px] md:text-sm font-bold text-center leading-tight">
          See All
        </span>
      </Link>

    </div>
  </div>
</section>
  );
};

export default NewArrivals;