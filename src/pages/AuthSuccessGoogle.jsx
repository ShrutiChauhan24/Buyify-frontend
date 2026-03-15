import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { setUserSignupLogin } from '../../redux/slices/authSlice'
import { useDispatch } from 'react-redux'

const AuthSuccessGoogle = () => {
  const navigate = useNavigate()
 const dispatch = useDispatch()
 const location = useLocation()

  const token = new URLSearchParams(location.search).get("token")

  useEffect(()=>{
    const setUser = async ()=>{
      try {
       const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/get-user-me-google`,{
         headers : {
          Authorization : `Bearer ${token}`
         }
       }) 
      if(res.data.success){
       dispatch(setUserSignupLogin({
          user: res.data.user,
          token: token
        }))
      }
      navigate('/')
      } catch (error) {
         navigate('/login')
      }
       
    }
    setUser()
  },[token,navigate,dispatch])

  return (
    <div>
      Logging you in...
    </div>
  )
}

export default AuthSuccessGoogle
