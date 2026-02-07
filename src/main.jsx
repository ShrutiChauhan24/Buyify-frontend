import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {store} from "../redux/store"
import { Provider } from 'react-redux'
import {BrowserRouter} from "react-router-dom"
import { GoogleOAuthProvider } from '@react-oauth/google'

// console.log('Google Client ID:', import.meta.env.VITE_GOOGLE_CLIENT_ID);
createRoot(document.getElementById('root')).render(
 
 <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID} >
  <StrictMode>
    <Provider store={store}>
   <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
  </StrictMode>
  </GoogleOAuthProvider>

)
