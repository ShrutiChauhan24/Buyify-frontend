import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { setUserSignupLogin } from '../../redux/slices/authSlice'
import { useDispatch } from 'react-redux'

const AuthSuccessGoogle = () => {
  const [params] = useSearchParams()
  const token = params.get("token")
  const navigate = useNavigate()
 const dispatch = useDispatch()

  useEffect(()=>{
    const setUser = async ()=>{
      try {
        if (!token){
        navigate('/login')
          return 
        }

       const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/get-user-me-google`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
       }) 
       if(res.data.success){
         dispatch(setUserSignupLogin({
          user: res.data.user,
          token:token
         }))
         navigate('/')
       }
     
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
