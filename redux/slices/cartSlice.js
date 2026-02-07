import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState:{
        items: JSON.parse(localStorage.getItem("cartItems")) || []
    },

    reducers :{
         setCart: (state,action)=>{
          state.items = action.payload
         },
        addToCartGuest : (state,action)=>{
           const item = action.payload;

           const existingItem = state.items.find(i=>i.id === item.id);

           if(existingItem){
             if(existingItem.quantity < existingItem.maxStock){
                existingItem.quantity += 1
             }
           }else{
             state.items.push(item)
           }
           localStorage.setItem("cartItems",JSON.stringify(state.items))
        },


        increaseQtyGuest : (state,action)=>{
            const itemId = action.payload;

            const item = state.items.find(i=>i.id === itemId);
            if(!item) return;

            if(item.quantity >= item.maxStock) return;

            item.quantity += 1
            localStorage.setItem("cartItems",JSON.stringify(state.items))
        },
        decreaseQtyGuest : (state,action)=>{
           const itemId = action.payload;
           const item = state.items.find(i=>i.id === itemId) 
           if(!item) return;

           if(item.quantity === 1){
            state.items = state.items.filter(i=>i.id !== itemId)
           }else{
             item.quantity -= 1
           }

           localStorage.setItem("cartItems",JSON.stringify(state.items))
        },
        removeItemFromCartGuest : (state,action)=>{
            const itemId = action.payload;

           state.items = state.items.filter(i=>i.id !== itemId)
           localStorage.setItem("cartItems",JSON.stringify(state.items))
        },
        clearCartGuest : (state,action)=>{
            state.items = []
            localStorage.removeItem("cartItems")
        }
    }
})

export const {setCart,addToCartGuest,increaseQtyGuest,decreaseQtyGuest,removeItemFromCartGuest,clearCartGuest} = cartSlice.actions;
export default cartSlice.reducer;