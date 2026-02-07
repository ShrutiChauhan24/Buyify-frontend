import './App.css'
import {Routes,Route} from "react-router-dom"
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import ShopProductsList from './pages/ShopProductsList';
import RootLayout from './layout/RootLayout';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './layout/DashboardLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AllProducts from './pages/admin/AllProducts';
import AddProduct from './pages/admin/AddProduct';
import Orders from './pages/admin/Orders';
import AdminSignup from './pages/admin/AdminSignup';
import AdminLogin from './pages/admin/AdminLogin';
import Customers from './pages/admin/Customers';
import AdminInventory from './pages/admin/AdminInventory';
import AdminSettings from './pages/admin/AdminSettings';
import ProductDetailPage from './pages/ProductDetailPage';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import AddCategory from './pages/admin/AddCategory';
import AllCategories from './pages/admin/AllCategories';
import CategoryProducts from './pages/CategoryProducts';
import { useEffect } from 'react';
import {clearCartGuest} from "../redux/slices/cartSlice";
import {fetchCartItems} from "../redux/fetchCartItems";
import AdminOrderView from './pages/admin/AdminOrderView';
import TrackOrderUser from './pages/TrackOrderUser';
import AuthSuccessGoogle from './pages/AuthSuccessGoogle';
import AdminProductDetails from './pages/admin/AdminProductDetails';



function App() {
  const {isAuthenticated} = useSelector((state)=>state.auth)
  const dispatch = useDispatch();

  useEffect(()=>{
    if(isAuthenticated){
      dispatch(clearCartGuest())
      dispatch(fetchCartItems())
    }
  },[isAuthenticated,dispatch])


  const Router = ()=>{
    return(
    <Routes>
     <Route 
      path='/' 
       element={(
      <ProtectedRoute>
      <RootLayout>
      <HomePage/>
      </RootLayout>
      </ProtectedRoute>
      )}/>
     <Route 
     path='/about' 
     element={(
      <ProtectedRoute>
      <RootLayout>
      <About/>
      </RootLayout>
      </ProtectedRoute>
      )}/>
      <Route 
     path='/signup' 
     element={(
      <ProtectedRoute>
      <SignupPage/>
      </ProtectedRoute>
     )}/>
      <Route 
     path='/login' 
     element={(
      <ProtectedRoute>
      <LoginPage/>
     </ProtectedRoute>
     )}/>

     <Route 
     path='/auth-success' 
     element={(
      <ProtectedRoute>
      <AuthSuccessGoogle/>
     </ProtectedRoute>
     )}/>

      <Route 
     path='/forgot-password' 
     element={(
      <ProtectedRoute>
      <ForgotPassword/>
     </ProtectedRoute>
     )}/>
      <Route 
     path='/reset-password/:token' 
     element={(
      <ProtectedRoute>
      <ResetPassword/>
     </ProtectedRoute>
     )}/>
     <Route 
     path='/contact' 
     element={(
      <ProtectedRoute>
      <RootLayout>
     <Contact/>
     </RootLayout>
     </ProtectedRoute>
     )}/>
     <Route 
     path='/shop/all-products' 
     element={(
      <ProtectedRoute>
      <RootLayout>
     <ShopProductsList/>
     </RootLayout>
     </ProtectedRoute>
     )}/>

     <Route 
     path='/shop/products/category/:categoryId' 
     element={(
      <ProtectedRoute>
      <RootLayout>
     <CategoryProducts/>
     </RootLayout>
     </ProtectedRoute>
     )}/>

      <Route 
     path='/shop/product-detail/:productId' 
     element={(
      <ProtectedRoute>
      <RootLayout>
      <ProductDetailPage/>
     </RootLayout>
     </ProtectedRoute>
     )}/>

     <Route 
     path='/cart-items' 
     element={(
      <ProtectedRoute>
      <RootLayout>
      <CartPage/>
     </RootLayout>
     </ProtectedRoute>
     )}/>
     <Route 
     path='/checkout' 
     element={(
      <ProtectedRoute>
      <RootLayout>
      <CheckoutPage/>
     </RootLayout>
     </ProtectedRoute>
     )}/>
     <Route 
     path='/my-orders' 
     element={(
      <ProtectedRoute>
      <RootLayout>
      <OrdersPage/>
     </RootLayout>
     </ProtectedRoute>
     )}/>

      <Route 
     path='/my-orders/track-order/:orderId' 
     element={(
      <ProtectedRoute>
      <RootLayout>
      <TrackOrderUser/>
     </RootLayout>
     </ProtectedRoute>
     )}/>

      <Route 
     path='/admin/signup' 
     element={(
        <ProtectedRoute>
        <AdminSignup/>
        </ProtectedRoute>
     )}/>

      <Route 
     path='/admin/login' 
     element={(
      <ProtectedRoute>
        <AdminLogin/>
        </ProtectedRoute>
     )}/>

     <Route 
     path='/admin/dashboard' 
     element={(
      <ProtectedRoute>
      <DashboardLayout>
        <AdminDashboard/>
      </DashboardLayout>
      </ProtectedRoute>
     )}/>

     <Route 
     path='/admin/dashboard/all-products' 
     element={(
      <ProtectedRoute>
      <DashboardLayout>
        <AllProducts/>
      </DashboardLayout>
      </ProtectedRoute>
     )}/>
      
      <Route 
     path='/admin/dashboard/product/:productId' 
     element={(
      <ProtectedRoute>
      <DashboardLayout>
        <AdminProductDetails/>
      </DashboardLayout>
      </ProtectedRoute>
     )}/>

      <Route 
     path='/admin/dashboard/add-product' 
     element={(
      <ProtectedRoute>
      <DashboardLayout>
        <AddProduct/>
      </DashboardLayout>
      </ProtectedRoute>
     )}/>

      <Route 
     path='/admin/dashboard/add-category' 
     element={(
      <ProtectedRoute>
      <DashboardLayout>
        <AddCategory/>
      </DashboardLayout>
      </ProtectedRoute>
     )}/>

       <Route 
     path='/admin/dashboard/all-categories' 
     element={(
      <ProtectedRoute>
      <DashboardLayout>
        <AllCategories/>
      </DashboardLayout>
      </ProtectedRoute>
     )}/>

     <Route 
     path='/admin/dashboard/all-orders' 
     element={(
      <ProtectedRoute>
      <DashboardLayout>
        <Orders/>
      </DashboardLayout>
      </ProtectedRoute>
     )}/>

     <Route 
     path='/admin/dashboard/view-order-detail/:orderId' 
     element={(
      <ProtectedRoute>
      <DashboardLayout>
        <AdminOrderView/>
      </DashboardLayout>
      </ProtectedRoute>
     )}/>

     <Route 
     path='/admin/dashboard/customers' 
     element={(
      <ProtectedRoute>
      <DashboardLayout>
        <Customers/>
      </DashboardLayout>
      </ProtectedRoute>
     )}/>

    <Route 
     path='/admin/dashboard/inventory' 
     element={(
      <ProtectedRoute>
      <DashboardLayout>
        <AdminInventory/>
      </DashboardLayout>
      </ProtectedRoute>
     )}/>

     <Route 
     path='/admin/dashboard/settings' 
     element={(
      <ProtectedRoute>
      <DashboardLayout>
        <AdminSettings/>
      </DashboardLayout>
      </ProtectedRoute>
     )}/>

    </Routes>
    )
  }

  return (
   <>

     <Router/>
    <ToastContainer/>
 
   </>
  )
}

export default App;
