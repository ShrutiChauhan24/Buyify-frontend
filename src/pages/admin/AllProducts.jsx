import { useEffect } from "react";
import axios from "axios";
import { StockBadge, ActionButtons } from "../../helper/helper";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setProducts } from "../../../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";

const AllProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/admin/get-all-products`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (res.data.success) {
          dispatch(setProducts(res.data.allProducts));
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            "Unable to fetch products. Try again later."
        );
      }
    };

    fetchAllProducts();
  }, [dispatch]);

  const handleDelete = async (id)=>{
    try {
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/delete-product/${id}`,{
        headers : {
          Authorization : `Bearer ${localStorage.getItem("token")}`
        }
      })
      if(res.data.success){
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(
          error?.response?.data?.message ||
            "Unable to delete product. Try again later."
        );
    }
  }

  return (
    <div className="p-4 sm:p-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Products</h1>

        <button className="bg-[#FF0054] hover:bg-[#e6004c] transition text-white px-5 py-2 rounded-xl shadow-sm w-fit"
         onClick={()=>navigate('/admin/dashboard/add-product')}
        >
          + Add Product
        </button>
      </div>

      {/* ===================== DESKTOP TABLE ===================== */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="p-4 text-left w-[40%]">Product</th>
              <th className="text-left w-[20%]">Category</th>
              <th className="text-left w-[15%]">Price</th>
              <th className="text-left w-[15%]">Stock</th>
              <th className="text-left w-[15%]">Status</th>
              <th className="text-right pr-6 w-[10%]">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                onClick={()=>navigate(`/admin/dashboard/product/${product._id}`)}
                key={product._id}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* PRODUCT */}
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={product?.images?.[0]}
                      alt={product?.productName}
                      className="w-14 h-14 rounded-xl object-cover border"
                    />
                    <span className="font-medium text-gray-800 line-clamp-2">
                      {product?.productName}
                    </span>
                  </div>
                </td>

                <td className="text-gray-600">
                  {product?.category?.categoryName}
                </td>

                <td className="font-medium text-gray-800">
                  ₹{product?.price}
                </td>

                <td>
                  <StockBadge stock={product?.totalStock} />
                </td>

                 <td
                className={`text-sm font-semibold capitalize ${
                  product?.status === "active"
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                {product?.status}
              </td>

                <td className="text-right pr-6">
                  <ActionButtons onDelete = {()=>handleDelete(product?._id)}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===================== MOBILE CARDS ===================== */}
      <div className="md:hidden space-y-4">
        {products.map((product) => (
          <div
           onClick={()=>navigate(`/admin/dashboard/product/${product._id}`)}
            key={product._id}
            className="bg-white rounded-2xl shadow-sm border p-4 flex gap-4"
          >
            <img
              src={product?.images?.[0]}
              alt={product?.productName}
              className="w-20 h-20 rounded-xl object-cover border"
            />

            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 line-clamp-2">
                {product?.productName}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {product?.category?.categoryName}
              </p>

              <div className="flex items-center justify-between mt-3">
                <span className="font-semibold text-gray-800">
                  ₹{product?.price}
                </span>
                <StockBadge stock={product?.totalStock} />
              </div>

              <div className="mt-3">
                <ActionButtons 
                  onDelete = {()=>handleDelete(product?._id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
