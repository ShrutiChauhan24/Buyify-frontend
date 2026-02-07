import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import EditProductButtons from "../../components/admin/EditProductButtons";

const AdminProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [color,setColor] = useState("");

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/admin/get-product-by-id/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        if (res.data.success) {
          setProduct(res.data.product);
          setLoading(false);
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            "Unable to fetch product details. Try again later.",
        );
      }
      setLoading(false);
    };
    getProductDetails();
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Product not found
      </div>
    );
  }

  const finalPrice =
    product?.price - (product?.price * product?.discount) / 100;

    const handleColorOnChange = async (e)=>{
      const value = e.target.value;
      const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
      setColor(capitalized)
    }
    const handleAddColor = async ()=>{
       if(!color) return
       if(!color.trim()) return;
       try {
         const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/add-new-color/${product._id}`,
          {color},
          {headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }}
         )
         if(res.data.success){
           setColor("")
            setProduct(
              {
                ...product,
                colors : [...product.colors,color]
              }
            )
           toast.success(res.data.message)
         }
       } catch (error) {
        toast.error(error?.response?.data?.message || "Unable to add new color,try again later")
       }
    }

    const handleRemoveColor = async (colorToRemove)=>{
       try {
          const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/remove-color/${product._id}`,
            {
              data:{color:colorToRemove},
               headers : {
                Authorization: `Bearer ${localStorage.getItem("token")}`
              } 
            })
            if(res.data.success){
               setProduct(
              {
                ...product,
                colors : product.colors.filter((c)=> c !== colorToRemove)
              }
            )
              toast.success(res.data.message)
            }
       } catch (error) {
          toast.error(error?.response?.data?.message || "Unable to remove color,try again later")
       }
    }

  return (
    <div className="bg-[#f6f7fb] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* IMAGE SECTION */}
          {/* IMAGE SECTION */}
          <div className="bg-white rounded-2xl shadow-sm p-6 flex justify-center">
            <img
              src={product?.images?.[0]}
              alt={product?.productName}
              className="w-full max-w-sm h-80 object-contain"
            />
          </div>

          {/* DETAILS SECTION */}
          <div>
            <p className="uppercase tracking-widest text-pink-600 text-sm font-semibold">
              {product?.category?.categoryName}
            </p>

            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
              {product?.productName}
            </h1>

            {/* Price Section */}
            <div className="mt-4 flex items-center gap-3 flex-wrap">
              <span className="text-2xl font-bold text-pink-600">
                ₹{finalPrice?.toFixed(0) || 0}
              </span>

              {product?.discount > 0 && (
                <>
                  <span className="text-gray-400 line-through">
                    ₹{product?.price}
                  </span>
                  <span className="bg-pink-100 text-pink-600 px-2 py-1 rounded text-xs font-medium">
                    {product?.discount}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="mt-4 text-sm text-gray-600 leading-relaxed">
              {product?.productDesc}
            </p>

            {/* Colors */}
            <div className="mt-6">
              <div>
                <label className="block font-medium mb-2">Available Colors</label>

                <div className="flex flex-wrap gap-2 mb-3">
                  {product?.colors?.map((color, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-2 bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm"
                    >
                      {color}
                      <button type="button" className="text-xs font-bold"
                        onClick={()=>handleRemoveColor(color)}
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    className="border rounded-lg px-3 py-2 flex-1"
                    placeholder="Add new color"
                    value={color}
                    onChange={handleColorOnChange}
                  />
                  <button
                    type="button"
                    className="bg-pink-600 text-white px-4 rounded-lg"
                    onClick={handleAddColor}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Sizes */}
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Available Sizes</h3>
              <div className="flex gap-3 flex-wrap">
                {Object.entries(product?.sizes || {})
                  .filter(([_, value]) => value > 0)
                  .map(([size]) => (
                    <span
                      key={size}
                      className="border border-pink-500 text-pink-600 px-4 py-1 rounded-full text-sm"
                    >
                      {size}
                    </span>
                  ))}
              </div>
            </div>

            {/* Buttons */}
           <EditProductButtons product={product}/>
          </div>
        </div>
      </div>

      {/* STOCK & META SECTION */}
      <div className="bg-white py-10 mt-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <p className="text-xs text-gray-500">Total Stock</p>
              <p className="text-lg font-semibold text-gray-900">
                {product?.totalStock}
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm">
              <p className="text-xs text-gray-500">SKU</p>
              <p className="text-sm font-medium">{product?.sku}</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm">
              <p className="text-xs text-gray-500">Gender</p>
              <p className="text-sm font-medium capitalize">
                {product?.gender}
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm">
              <p className="text-xs text-gray-500">Status</p>
              <p
                className={`text-sm font-semibold capitalize ${
                  product?.status === "active"
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                {product?.status}
              </p>
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default AdminProductDetails;
