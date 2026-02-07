
const GoogleAuthButton = ()=>{
   
  const handleGoogleLogin = ()=>{
     window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`
  }
  
  return (
   <button onClick={handleGoogleLogin}>
      Continue with Google
    </button>
  )

}

export default GoogleAuthButton;