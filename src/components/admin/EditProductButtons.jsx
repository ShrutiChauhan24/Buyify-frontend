import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const EditProductButtons = ({product}) => {
   const [showEditModal, setShowEditModal] = useState(false);
   const [editingProduct,setEditingProduct] = useState(null);
   const navigate = useNavigate();

   const handleChange = async (e)=>{
     setEditingProduct({
        ...editingProduct,
        [e.target.name] : [e.target.value]
     })
   }

   const handleEditSubmit = async (e)=>{
     e.preventDefault();
    try {
        const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/update-product/${product._id}`,
            editingProduct ,{
             headers:{
                Authorization : `Bearer ${localStorage.getItem("token")}`
             }
            }
        )
        if(res.data.success){
           toast.success(res.data.message) 
           setShowEditModal(false) 
        }
    } catch (error) {
       toast.error(err?.response?.data?.message || "Unable to edit product,try again later") 
       setShowEditModal(false) 
    }
   }

  return (
     <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <button
                  className="bg-[#ff0055] hover:bg-[#e6004c] text-white px-8 py-3 rounded-xl font-semibold"
                  onClick={() => {
                    setShowEditModal(true);
                    setEditingProduct(product)
                  }}
                >
                  Edit Product
                </button>

                <button className="border border-[#ff0055] text-[#ff0055] px-8 py-3 rounded-xl font-semibold hover:bg-pink-50 cursor-pointer"
                 onClick={()=>navigate('/admin/dashboard/inventory')}
                >
                  Manage Inventory
                </button>
              </div>

       {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white w-[90%] max-w-2xl p-6 rounded-2xl relative">
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-3 right-4 text-gray-500"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">Edit Product</h2>

            <form className="space-y-5" onSubmit={handleEditSubmit}>
              <input
                name="productName"
                placeholder="Product Name"
                value={editingProduct?.productName}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
              />

              <textarea
                name="productDesc"
                placeholder="Product Description"
                value={editingProduct?.productDesc}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
              />

              <input
                name="price"
                placeholder="Product price"
                type="number"
                min="0"
                value={editingProduct?.price}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
              />

              <input
                name="discount"
                placeholder="Discount"
                type="number"
                min="0"
                value={editingProduct?.discount}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
              />

              <div>
                <label className="block text-sm font-medium mb-1">SKU</label>
                <input
                  type="text"
                  value="MTS-120"
                  disabled
                  className="w-full border p-3 rounded-lg bg-gray-100 cursor-not-allowed"
                />
                <p className="text-xs text-gray-400 mt-1">
                  SKU cannot be modified once created
                </p>
              </div>

              <button type="submit" className="bg-[#ff0055] text-white px-6 py-3 rounded-lg">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
            </div>
  )
}

export default EditProductButtons
