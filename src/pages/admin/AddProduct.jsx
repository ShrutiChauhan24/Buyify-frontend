import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SIZES = ["XS", "S", "M", "L", "XL"];
const COLORS = ["Black", "White", "Red", "Blue", "Green"];

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [loading , setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [sizes, setSizes] = useState(
    SIZES.map((s) => ({ size: s, stock: "", enabled: false }))
  );
  const [formData,setFormData] = useState({
    productName : "",
    productDesc : "",
    price : "",
    discount : "",
    sku : "",
    gender : "",
    category : "",
    status : "",
    colors:[]
  });

  const sizesObj = sizes.reduce((acc,s)=>{
     acc[s.size] = s.enabled ? Number(s.stock) || 0 : 0
     return acc;
  },{});

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/get-all-categories?status=active`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        if (res.data.success) setCategories(res.data.categories);
      } catch (error) {
        toast.error(
          error?.response?.data?.response || "Error while fetching categories"
        );
      }
    };
    fetchAllCategories();
  }, []);

  const totalStock = sizes.reduce(
    (sum, s) => sum + (s.enabled ? Number(s.stock) : 0),
    0
  );

  const handleChange = async (e)=>{
     const {name,value} = e.target;
     setFormData((prev)=>({...prev , [name] : value}))
  }

  const handleColorChange = (color, checked) => {
    setFormData((prev) => ({
      ...prev,
      colors: checked
        ? [...prev.colors, color]
        : prev.colors.filter((c) => c !== color),
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 4) return;
    setImages((prev) => [...prev, ...files]);
  };

   const handleSubmit = async (e)=>{
     e.preventDefault();

      if(!formData.productName || !formData.productDesc || !formData.sku || !formData.category || !formData.gender || !formData.price || !formData.status){
        toast.error("All fields must be filled")
        return
      }
      if(!Array.isArray(formData.colors) || formData.colors.length === 0){
        toast.error("Select at least one color")
        return
      }
      if(images.length < 4){
        toast.error("4 images must be uploaded")
        return
      }
     if(totalStock === 0){
        toast.error("Total stock should not be 0")
        return
     }

     try {

      setLoading(true)
        const fd = new FormData();
        fd.append("productName",formData.productName);
        fd.append("productDesc",formData.productDesc);
        fd.append("price",formData.price);
        fd.append("discount",formData.discount || 0);
        fd.append("sku",formData.sku);
        fd.append("gender",formData.gender);
        fd.append("category",formData.category);
        fd.append("status",formData.status);
        fd.append("totalStock", totalStock)

        fd.append("colors",JSON.stringify(formData.colors));
        fd.append("sizes",JSON.stringify(sizesObj));
        images.forEach((img)=>fd.append("images",img))

        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/add-product`,fd,{
          headers:{
            Authorization :`Bearer ${localStorage.getItem("token")}`
          }
        })

        if(res.data.success){
          toast.success(res.data.message)
          setLoading(false)
          setFormData({
            productName : "",
           productDesc : "",
           price : "",
           discount : "",
            sku : "",
           gender : "",
            category : "",
           status : "",
           colors:[]
          })
          setImages([])
          setSizes(SIZES.map((s)=>({size:s,stock:"",enabled:false})))
        }
     } catch (error) {
        toast.error(error?.response?.data?.message || "Unable to add product,try again later")
        setLoading(false)
     }
   }


  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl rounded-xl bg-white p-6 shadow">
        <h1 className="mb-6 text-2xl font-bold">Add Product</h1>

        <form className="grid gap-6 md:grid-cols-2" onSubmit={handleSubmit}>
          {/* LEFT SIDE */}
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Product Name</label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className="w-full rounded-lg border px-3 py-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Description</label>
              <textarea
                name="productDesc"
                value={formData.productDesc}
                onChange={handleChange}
                className="w-full rounded-lg border px-3 py-2"
                rows="4"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">SKU</label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                placeholder="TSH-001"
                className="w-full rounded-lg border px-3 py-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Price (₹)</label>
                <input
                  type="number"
                  min="1"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-3 py-2"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Discount (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full rounded-lg border px-3 py-2"
              >
                <option value="">Select</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="unisex">Unisex</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-lg border px-3 py-2"
              >
                <option value="">Select</option>
                {categories?.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Available Colors</label>
              <div className="flex flex-wrap gap-2">
                {COLORS.map((c) => (
                  <label key={c} className="flex items-center gap-2 rounded-full border px-3 py-1 text-sm">
                    <input
                      type="checkbox"
                      checked = {formData.colors.includes(c)}
                      onChange={(e)=>handleColorChange(c,e.target.checked)}
                    />
                    {c}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            {/* IMAGE UPLOAD */}
            <div>
              <label className="mb-2 block text-sm font-medium">Product Images (max 4)</label>
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={URL.createObjectURL(img)}
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                ))}
                {images.length < 4 && (
                  <label className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed text-gray-400">
                    +
                    <input
                      type="file"
                      hidden
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* SIZE + STOCK */}
            <div>
              <label className="mb-3 block text-sm font-medium">Size-wise Stock</label>
              <div className="space-y-2">
                {sizes.map((s, i) => (
                  <div key={s.size} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={s.enabled}
                      onChange={(e) => {
                        const updated = [...sizes];
                        updated[i].enabled = e.target.checked;
                        if (!e.target.checked) updated[i].stock = "";
                        setSizes(updated);
                      }}
                    />
                    <span className="w-10 text-sm">{s.size}</span>
                    <input
                      type="number"
                      placeholder="Stock"
                      value={s.stock}
                      disabled={!s.enabled}
                      onChange={(e) => {
                        const updated = [...sizes];
                        updated[i].stock = e.target.value;
                        setSizes(updated);
                      }}
                      className="w-24 rounded border px-2 py-1 disabled:bg-gray-100"
                    />
                  </div>
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Total Stock: <b>{totalStock}</b>
              </p>
            </div>

            {/* STATUS */}
            <div>
              <label className="mb-1 block text-sm font-medium">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-lg border px-3 py-2"
              >
                <option value="">Select</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row md:col-span-2">
            <button
              type="submit"
              disabled = {loading}
              className="rounded-lg bg-pink-600 px-6 py-3 text-white hover:bg-pink-700"
            >
             {loading ? "Adding product..." : "Save Product"}
            </button>
            <button
              type="button"
              className="rounded-lg border px-6 py-3"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;








// import axios from "axios";
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";

// const SIZES = ["XS", "S", "M", "L", "XL"];
// const COLORS = ["Black", "White", "Red", "Blue", "Green"];

// const AddProduct = () => {
//   const [categories, setCategories] = useState([]);
//   const [images, setImages] = useState([]);

//   const [formData, setFormData] = useState({
//     productName: "",
//     productDesc: "",
//     sku: "",
//     price: "",
//     discount: "",
//     gender: "",
//     category: "",
//     status: "",
//     colors: [],
//   });

//   const [sizes, setSizes] = useState(
//     SIZES.map((s) => ({ size: s, stock: "", enabled: false }))
//   );

//   /* ---------------- FETCH CATEGORIES ---------------- */
//   useEffect(() => {
//     const fetchAllCategories = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:4000/api/get-all-categories?status=active",
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );
//         if (res.data.success) setCategories(res.data.categories);
//       } catch (error) {
//         toast.error("Error fetching categories");
//       }
//     };
//     fetchAllCategories();
//   }, []);

//   /* ---------------- HANDLERS ---------------- */
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleColorChange = (color, checked) => {
//     setFormData((prev) => ({
//       ...prev,
//       colors: checked
//         ? [...prev.colors, color]
//         : prev.colors.filter((c) => c !== color),
//     }));
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length + images.length > 4) {
//       toast.error("Maximum 4 images allowed");
//       return;
//     }
//     setImages((prev) => [...prev, ...files]);
//   };

//   /* ---------------- CALCULATIONS ---------------- */
//   const totalStock = sizes.reduce(
//     (sum, s) => sum + (s.enabled ? Number(s.stock) : 0),
//     0
//   );

//   const sizeObject = sizes.reduce((acc, s) => {
//     acc[s.size] = s.enabled ? Number(s.stock) || 0 : 0;
//     return acc;
//   }, {});

//   /* ---------------- SUBMIT ---------------- */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Basic validations
//     if (!formData.productName || !formData.price || !formData.sku) {
//       toast.error("Required fields missing");
//       return;
//     }

//     if (formData.colors.length === 0) {
//       toast.error("Select at least one color");
//       return;
//     }

//     if (images.length < 4 ) {
//       toast.error("upload 4 images");
//       return;
//     }

//     if (totalStock === 0) {
//       toast.error("Total stock must be greater than 0");
//       return;
//     }

//     try {
//       const fd = new FormData();

//       fd.append("productName", formData.productName);
//       fd.append("productDesc", formData.productDesc);
//       fd.append("sku", formData.sku.trim());
//       fd.append("price", Number(formData.price));
//       fd.append("discount", Number(formData.discount || 0));
//       fd.append("gender", formData.gender.toLowerCase());
//       fd.append("category", formData.category);
//       fd.append("status", formData.status.toLowerCase());
//       fd.append("totalStock", totalStock);

//       fd.append("colors", JSON.stringify(formData.colors));
//       fd.append("sizes", JSON.stringify(sizeObject));

//       images.forEach((img) => fd.append("images", img));

//       const res = await axios.post(
//         "http://localhost:4000/api/add-product",
//         fd,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       if (res.data.success) {
//         toast.success("Product added successfully");

//         // reset
//         setFormData({
//           productName: "",
//           productDesc: "",
//           sku: "",
//           price: "",
//           discount: "",
//           gender: "",
//           category: "",
//           status: "",
//           colors: [],
//         });
//         setImages([]);
//         setSizes(SIZES.map((s) => ({ size: s, stock: "", enabled: false })));
//       }
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Failed to add product");
//     }
//   };

//   /* ---------------- UI ---------------- */
//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//       <div className="mx-auto max-w-6xl rounded-xl bg-white p-6 shadow">
//         <h1 className="mb-6 text-2xl font-bold">Add Product</h1>

//         <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
//           {/* LEFT */}
//           <div className="space-y-4">
//             <input
//               name="productName"
//               placeholder="Product Name"
//               value={formData.productName}
//               onChange={handleChange}
//               className="w-full rounded-lg border px-3 py-2"
//             />

//             <textarea
//               name="productDesc"
//               placeholder="Description"
//               value={formData.productDesc}
//               onChange={handleChange}
//               className="w-full rounded-lg border px-3 py-2"
//             />

//             <input
//               name="sku"
//               placeholder="SKU"
//               value={formData.sku}
//               onChange={handleChange}
//               className="w-full rounded-lg border px-3 py-2"
//             />

//             <div className="grid grid-cols-2 gap-4">
//               <input
//                 type="number"
//                 name="price"
//                 placeholder="Price"
//                 value={formData.price}
//                 onChange={handleChange}
//                 className="w-full rounded-lg border px-3 py-2"
//               />
//               <input
//                 type="number"
//                 name="discount"
//                 placeholder="Discount %"
//                 value={formData.discount}
//                 onChange={handleChange}
//                 className="w-full rounded-lg border px-3 py-2"
//               />
//             </div>

//             <select
//               name="gender"
//               value={formData.gender}
//               onChange={handleChange}
//               className="w-full rounded-lg border px-3 py-2"
//             >
//               <option value="">Select Gender</option>
//               <option value="men">Men</option>
//               <option value="women">Women</option>
//               <option value="unisex">Unisex</option>
//             </select>

//             <select
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               className="w-full rounded-lg border px-3 py-2"
//             >
//               <option value="">Select Category</option>
//               {categories.map((cat) => (
//                 <option key={cat._id} value={cat._id}>
//                   {cat.categoryName}
//                 </option>
//               ))}
//             </select>

//             {/* COLORS */}
//             <div className="flex flex-wrap gap-2">
//               {COLORS.map((c) => (
//                 <label key={c} className="flex items-center gap-2 border px-3 py-1 rounded">
//                   <input
//                     type="checkbox"
//                     checked={formData.colors.includes(c)}
//                     onChange={(e) => handleColorChange(c, e.target.checked)}
//                   />
//                   {c}
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* RIGHT */}
//           <div className="space-y-6">
           
//                {/* IMAGE UPLOAD */}
//             <div>
//               <label className="mb-2 block text-sm font-medium">Product Images (max 4)</label>
//               <div className="grid grid-cols-4 gap-3">
//                {images.map((img, i) => (
//                   <img
//                     key={i}
//                     src={URL.createObjectURL(img)}
//                     className="h-20 w-20 rounded-lg object-cover"
//                   />
//                 ))}
//                 {images.length < 4 && (
//                   <label className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed text-gray-400">
//                     +
//                     <input
//                       type="file"
//                       hidden
//                       multiple
//                       accept="image/*"
//                       onChange={handleImageChange}
//                     />
//                   </label>
//                 )}
//               </div>
//             </div>

//             {/* SIZES */}
//             {sizes.map((s, i) => (
//               <div key={s.size} className="flex items-center gap-3">
//                 <input
//                   type="checkbox"
//                   checked={s.enabled}
//                   onChange={(e) => {
//                     const updated = [...sizes];
//                     updated[i].enabled = e.target.checked;
//                     if (!e.target.checked) updated[i].stock = "";
//                     setSizes(updated);
//                   }}
//                 />
//                 <span>{s.size}</span>
//                 <input
//                   type="number"
//                   disabled={!s.enabled}
//                   value={s.stock}
//                   onChange={(e) => {
//                     const updated = [...sizes];
//                     updated[i].stock = e.target.value;
//                     setSizes(updated);
//                   }}
//                   className="border px-2 py-1 w-24"
//                 />
//               </div>
//             ))}

//             <p>Total Stock: <b>{totalStock}</b></p>

//             <select
//               name="status"
//               value={formData.status}
//               onChange={handleChange}
//               className="w-full rounded-lg border px-3 py-2"
//             >
//               <option value="">Select Status</option>
//               <option value="active">Active</option>
//               <option value="draft">Draft</option>
//             </select>
//           </div>

//           <button type="submit" className="md:col-span-2 bg-pink-600 text-white py-3 rounded">
//             Save Product
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;

