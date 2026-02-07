import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
   name : "settings",

   initialState : {
    storeName: "",
    email: "",
    codEnabled: true,
    tax: "",
    shipping: ""
   },

   reducers : {
   setSettings : (state,action)=>{
     state.storeName = action.payload.storeName || "";
     state.email =  action.payload.contactEmail || "";
     state.codEnabled = !!action.payload.enableCOD;
     state.tax = action.payload.tax || 0;
     state.shipping =  action.payload.shippingCharges || 0;
    }
   }
})

export const {setSettings} = settingsSlice.actions;
export default settingsSlice.reducer;