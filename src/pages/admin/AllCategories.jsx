import React from "react";
import { Pencil, Trash2, Plus, Trophy } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import {toast} from "react-toastify";


const AllCategories = () => {
  const [categories,setCategories] = useState([])
  const [isEditModalOpen,setIsEditModalOpen] = useState(false)
  const [editingCategory,setEditingCategory] = useState(null)

  const statusStyle = {
  active: "bg-green-100 text-green-700",
  inactive: "bg-red-100 text-red-700",
};

 useEffect(()=>{
    const fetchAllCategories = async ()=>{
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/get-all-categories`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      if(res.data.success){
        setCategories(res.data.categories)
      }
      } catch (error) {
        toast.error(error?.response?.data?.response || "error while fetching categories")
      }
    }
    fetchAllCategories()
 },[])

 const handleEditCategory = async (e)=>{
     e.preventDefault()
     try {
      const formData = new FormData(e.currentTarget)
       const updatedCategory = {
         ...editingCategory,
         categoryName : formData.get("categoryName"),
         slug : formData.get("slug"),
         status : formData.get("status")
       } 
       const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/edit-category/${editingCategory?._id}`,{
          categoryName: updatedCategory.categoryName ,
          slug : updatedCategory.slug,
          status: updatedCategory.status
       },{headers:{
        Authorization : `Bearer ${localStorage.getItem("token")}`
       }})
       if(res.data.success){
         toast.success(res.data.message)
         setIsEditModalOpen(false)
         setEditingCategory(null)
         setCategories(categories.map((cat)=> cat._id === editingCategory._id ? updatedCategory : cat))
       }
     } catch (error) {
        toast.error(error?.response?.data?.message || "Unable to edit category,please try again")
        setIsEditModalOpen(false)
        setEditingCategory(null)
     }
 }

  const handleDelete = async (id)=>{
    try {
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/delete-category/${id}`,{
        headers:{
          Authorization : `Bearer ${localStorage.getItem("token")}`
        }
      })
      if(res.data.success){
        toast.success(res.data.message)
        setCategories(categories.filter((cat)=>cat._id !== id))
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to delete category,try again later")
    }
  }

  return (
    <div className="max-w-6xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">
            Categories
          </h1>
          <p className="text-sm text-gray-500">
            Manage product categories
          </p>
        </div>

        <button className="flex items-center gap-2 bg-[#FF0054] text-white px-4 py-2 rounded-xl hover:opacity-90">
          <Plus size={18} />
          Add Category
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-sm text-gray-600">
            <tr>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Slug</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id} className="border-t">
                <td className="px-6 py-4 font-medium">
                  {cat.categoryName}
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {cat.slug}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle[cat.status]}`}
                  >
                    {cat.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                    onClick={()=>{
                  setEditingCategory(cat)
                  setIsEditModalOpen(true)
                }}
                  >
                    <Pencil size={16}/>
                  </button>
                  <button className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600"
                  type="button" onClick={()=>handleDelete(cat._id)}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-2xl shadow-sm p-4 space-y-2"
          >
            <div className="flex justify-between items-start">
              <h2 className="font-semibold">{cat.categoryName}</h2>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle[cat.status]}`}
              >
                {cat.status}
              </span>
            </div>

            <p className="text-sm text-gray-500">
              Slug: {cat.slug}
            </p>

            <div className="flex gap-2 pt-2">
              <button className="flex-1 border rounded-xl py-2 text-sm flex items-center justify-center gap-2">
                <Pencil size={16} 
                onClick={()=>{
                  setEditingCategory(cat)
                  setIsEditModalOpen(true)
                }}/>
                Edit
              </button>

              <button className="flex-1 bg-red-50 text-red-600 rounded-xl py-2 text-sm flex items-center justify-center gap-2"
               type="button" onClick={()=>handleDelete(cat._id)}
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>



       {isEditModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    
    {/* Backdrop */}
    <div
      className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      onClick={() => setIsEditModalOpen(false)}
    />

    {/* Modal */}
    <div className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-xl animate-scaleIn">
      <form
        onSubmit={handleEditCategory}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Edit Category</h2>
          <button
            type="button"
            onClick={() => setIsEditModalOpen(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Category Name
            </label>
            <input
              type="text"
              name="categoryName"
              defaultValue={editingCategory?.categoryName}
              className="w-full rounded-xl border px-4 py-2 focus:ring-2 focus:ring-[#FF0054] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Slug
            </label>
            <input
              type="text"
              defaultValue={editingCategory?.slug}
              name="slug"
              className="w-full rounded-xl border px-4 py-2 focus:ring-2 focus:ring-[#FF0054] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Status
            </label>
            <select
              defaultValue={editingCategory?.status}
              name="status"
              className="w-full rounded-xl border px-4 py-2 focus:ring-2 focus:ring-[#FF0054] focus:outline-none"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t">
          <button
            type="button"
            onClick={() => setIsEditModalOpen(false)}
            className="px-4 py-2 rounded-xl border hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-[#FF0054] text-white hover:opacity-90"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
)}


    </div>
  );
};

export default AllCategories;
