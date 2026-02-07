import axios from "axios";

const getAuth = () =>({
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    
export const addToCartApi = (data)=>{
  return axios.put(`${import.meta.env.VITE_API_URL}/api/cart/add-item`,data,getAuth())
}

export const increaseQtyApi = (data)=>{
  return axios.put(`${import.meta.env.VITE_API_URL}/api/cart/item/increase-qty`,data,getAuth())
}

export const decreaseQtyApi = (data)=>{
  return axios.put(`${import.meta.env.VITE_API_URL}/api/cart/item/decrease-qty`,data,getAuth())
}

export const removeItemApi = (data)=>{
  return axios.delete(`${import.meta.env.VITE_API_URL}/api/cart/remove-item-from-cart`,
    {
     headers : getAuth().headers,
     data
    }
    )
}

export const fetchItemsApi = ()=>{
  return axios.get(`${import.meta.env.VITE_API_URL}/api/cart/fetch-all-items`,getAuth())
}