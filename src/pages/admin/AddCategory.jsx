import React, { useState } from "react";
import axios from "axios";
import {toast} from "react-toastify";

const AddCategory = () => {
 const [categoryName,setCategoryName] = useState("")
 const [slug,setSlug] = useState("")
 const [status, setStatus] = useState("active")
  const [images, setImages] = useState([]);
  const [loading,setLoading] = useState(false)
 
   const handleImageUpload = (e) => {
     const files = Array.from(e.target.files);
     if (files.length + images.length > 1) {
       alert("You can upload only 1 image");
       return;
     }
     setImages([...images, ...files]);
   };
 
   
const handleSubmit = async (e)=>{


     e.preventDefault()
     try {
      if(!categoryName.trim() || !slug.trim() || images.length === 0){
         toast.error("All fields are required");
         return;
      }

      if(images.length > 1){
        toast.error("Upload only 1 image")
        return
      }

      if(images.length === 0){
        toast.error("Upload image")
        return
      }

       setLoading(true)
       const formData = new FormData();
       formData.append("categoryName",categoryName)
       formData.append("slug",slug)
       formData.append("status",status)
       images.forEach((image)=>formData.append("images",image))


        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/add-category`,
           formData
        ,{headers : {
          "Content-Type" : "multipart/form-data",
          Authorization : `Bearer ${localStorage.getItem("token")}`
        }})
        if(res.data.success){
           toast.success(res.data.message)
           setCategoryName("")
           setSlug("")
           setImages([])
           setStatus("active")
           setLoading(false)
        }
     } catch (error) {
         toast.error(error?.response?.data?.message || "Unable to add category,try again later");
          setLoading(false)
     } 
}

  const generateSlug = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");


  return (
    <div className="max-w-3xl mx-auto">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1A1A1A]">
          Add Category
        </h1>
        <p className="text-sm text-gray-500">
          Create a new product category
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <form className="space-y-5" onSubmit={handleSubmit}>

          {/* Category Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              value={categoryName}
              onChange={(e)=>{
                setCategoryName(e.target.value)
                setSlug(generateSlug(e.target.value))
              }}
              placeholder="e.g. Supplements"
              className="w-full rounded-xl border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF0054]"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Slug
            </label>
            <input
              type="text"
              name="slug"
              value={slug}
              onChange={(e)=>setSlug(e.target.value)}
              placeholder="e.g. supplements"
              className="w-full rounded-xl border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF0054]"
            />
            <p className="text-xs text-gray-400 mt-1">
              URL-friendly identifier
            </p>
          </div>

           <div>
              <label className="mb-2 block text-sm font-medium">
                Category Image (Only 1 image)
              </label>

              <div className="grid grid-cols-4 gap-3">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={URL.createObjectURL(img)}
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                ))}

                {images.length < 1 && (
                  <label className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed text-gray-400">
                    +
                    <input
                      type="file"
                      hidden
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </div>
            </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Status
            </label>
            <select
              name="status"
              value={status}
              onChange={(e)=>setStatus(e.target.value)}
              className="w-full rounded-xl border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF0054]"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              className="bg-[#FF0054] text-white px-6 py-2 rounded-xl hover:opacity-90 transition"
              disabled={loading}
            >
              {loading ? "Adding Category..." : "Save Category" }
            </button>

            <button
              type="button"
              className="border px-6 py-2 rounded-xl text-gray-600 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddCategory;
