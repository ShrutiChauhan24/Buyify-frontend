import React from 'react';
import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const {isAuthenticated,role} = useSelector((state)=>state.auth)
    const {pathname} = useLocation();

    if(!isAuthenticated && pathname.startsWith("/admin/dashboard")){
        return <Navigate to={'/login'} replace/>
    }
    if(isAuthenticated && role === "user" && pathname.startsWith('/admin')){
        return <Navigate to={'/'} replace/>
    }
    if(isAuthenticated && role === "admin" && (pathname === '/admin/login' || pathname === '/admin/signup')){
        return <Navigate to={'/admin/dashboard'} replace/>
    }
    if(isAuthenticated && (pathname === '/login' || pathname === '/signup')){
        return <Navigate to={'/'} replace/>
    }
    if(!isAuthenticated && (pathname === '/checkout' || pathname === '/my-orders')){
        return <Navigate to={'/login'} replace/>
    }

    return children;

}

export default ProtectedRoute;
