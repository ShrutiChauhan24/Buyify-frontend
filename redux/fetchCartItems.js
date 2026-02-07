import { fetchItemsApi } from "./cartApi"
import {setCart} from "./slices/cartSlice"

export const fetchCartItems = ()=> async dispatch =>{
    const res = await fetchItemsApi()
         if(res.data.success){
            const items = res.data.cartItems.map((item)=>{
           const price = item.productId.discount ? 
           Math.round(item?.productId?.price - (item?.productId?.price * item?.productId?.discount / 100)) :
           item?.productId?.price ;

            return{
            id: `${item.productId._id}_${item.selectedColor}_${item.selectedSize}`,
            productId:item.productId._id,
            productName:item.productId.productName,
            image:item.productId.images[0],
            price: price, // discounted price 
            quantity:item.quantity,
            color:item.selectedColor,
            size:item.selectedSize
            }
        })
        dispatch(setCart(items))
    }}
