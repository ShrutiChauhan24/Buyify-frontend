import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import { addToCartGuest } from "../../redux/slices/cartSlice";
import {fetchCartItems} from "../../redux/fetchCartItems";
import {addToCartApi} from "../../redux/cartApi";
import { useNavigate } from "react-router-dom";


const ProductDetailPage =()=> {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [product,setProduct] = useState({});
  const {productId} = useParams();
  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector((state)=>state.auth)
  const navigate = useNavigate();

  useEffect(()=>{
    const getProductById = async ()=>{
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/get-product-by-id/${productId}`)
        if(res.data.success){
         setProduct(res.data.product)
       }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Unable to find product,try again later")
      }
    }
    getProductById()
  },[productId])

  const discountedPrice = Math.round(product?.price - (product?.price * product?.discount / 100))

  const handleAddToCart = async()=>{
    if(!selectedSize){
       toast.error("Select a size")
       return
    }
    if(!selectedColor){
       toast.error("Select a color")
       return
    }

     const maxStock = product.sizes[selectedSize]

     if(maxStock === 0){
       toast.error("This size is out of stock")
       return 
     }

     const cartItem = {
      id : `${product._id}_${selectedColor}_${selectedSize}`,
      productId: product._id,
      productName:product.productName,
      image:product.images[0],
      price:discountedPrice,
      quantity: 1,
      color : selectedColor,
      size:selectedSize,
      maxStock
     }

     if(!isAuthenticated){
       dispatch(addToCartGuest(cartItem))
       toast.success("Product added to cart")
       return
     }else{
        await addToCartApi({
          productId: product._id,
          selectedColor : selectedColor,
          selectedSize : selectedSize
        })
        dispatch(fetchCartItems())
        toast.success("Product added to cart")
     }
  }

  const handleBuyNow = async ()=>{
     try {
     if(!selectedSize){
       toast.error("Select a size")
       return
    }
    if(!selectedColor){
       toast.error("Select a color")
       return
    }

     const maxStock = product.sizes[selectedSize]

     if(maxStock === 0){
       toast.error("This size is out of stock")
       return
     }

     navigate("/checkout",{
                 state : {
                  items : [{
                      productId:product?._id,
                      quantity: 1,
                      color:selectedColor,
                      size:selectedSize
                  }]
                 }
              })
     } catch (error) {
      toast.error(error?.response?.data?.message || "Error in buying this product,try again later")
     }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* LEFT – Images */}
        <div>
          <div className="bg-[#fff5f8] rounded-2xl p-6">
            {selectedImage ? <img
              src={selectedImage}
              alt="Product"
              className="w-full object-contain rounded-xl"
              style={{height:"420px"}}
            /> : <img
              src={product?.images?.[0]}
              alt="Product"
              className="w-full object-contain rounded-xl"
              style={{height:"420px"}}
            />}
          </div>

          <div className="flex gap-4 mt-4">
            {product?.images?.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`border rounded-xl p-1 ${
                  selectedImage === img
                    ? "border-[#ff0055]"
                    : "border-gray-200"
                }`}
              >
                <img
                  src={img}
                  alt="thumb"
                  className="w-20 h-20 object-contain"
                />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT – Details */}
        <div>
          <h1 className="text-3xl font-bold text-[#1f1f1f]">
            {product?.productName}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={18} className="fill-[#ff0055] text-[#ff0055]" />
            ))}
            <span className="text-sm text-gray-500">(4.8 / 5)</span>
          </div>

          {/* Price */}
          <div className="mt-4 flex items-end gap-3">
            <span className="text-3xl font-bold text-[#ff0055]">₹{discountedPrice}</span>
            <span className="text-gray-400 line-through">₹{product?.price}</span>
            <span className="text-green-600 font-semibold">({product?.discount}%)</span>
          </div>

          {/* Color */}
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Color</h4>
            <div className="flex gap-3">
              {product?.colors?.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 rounded-full border ${
                    selectedColor === color
                      ? "bg-[#ff0055] text-white border-[#ff0055]"
                      : "border-gray-300"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Size</h4>
            <div className="flex gap-3">
               {Object.entries(product.sizes || {}).map(([size, qty]) => (
                <button
                  key={size}
                  disabled={qty === 0}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-lg border font-semibold ${
                    selectedSize === size
                      ? "bg-[#ff0055] text-white border-[#ff0055]"
                      : "border-gray-300"
                  } ${qty === 0 && "opacity-40 cursor-not-allowed"}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Trust Signals */}
          <div className="grid grid-cols-2 gap-4 mt-8 text-sm">
            <div className="flex items-center gap-2">✅ 7 Day Return</div>
            <div className="flex items-center gap-2">⭐ Top Brand</div>
            <div className="flex items-center gap-2">💰 Pay on Delivery</div>
            <div className="flex items-center gap-2">🔒 Secure Payment</div>
          </div>

          {/* Description */}
          <div className="mt-8">
            <h4 className="font-semibold mb-2">Product Description</h4>
            <p className="text-gray-600 leading-relaxed">
              {product?.productDesc}
            </p>
          </div>

          <button className="mt-8 w-full bg-yellow-400 hover:bg-yellow-500 text-white py-4 rounded-xl text-lg font-semibold transition cursor-pointer"
            onClick={handleAddToCart}
          >
           Add to Cart
          </button>
          {/* CTA */}
          <button className="mt-4 w-full bg-[#ff0055] hover:bg-[#e6004c] text-white py-4 rounded-xl text-lg font-semibold transition cursor-pointer"
             onClick={handleBuyNow}
          >
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;