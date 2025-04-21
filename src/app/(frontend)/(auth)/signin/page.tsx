"use client"

import { useState } from "react"
import Cookies from "js-cookie"
import { Eye } from "lucide-react"
import Link from "next/link"
import BusinessCarousel from "../carausel"
import CustomButton from "@/components/ui/CustomButton"
import axios from "axios"
import { useRouter } from "next/navigation"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
 



export default function Home() {
  const [showPassword, setShowPassword] = useState(false)
  

  const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
 
const router = useRouter()
const url = process.env.NEXT_PUBLIC_BACKEND_URL+"/api/v1/users"

const submitSignIn = async ( ) => {

  console.log("url is ", url)
  
  if(!email.trim() || !password.trim()) {
    toast.error("Please fill all the fields")
    return;
  }
    
  // Email validation with regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    toast.error("Please enter a valid email address");
    return;
  }

  try {
    const response = await axios.post(url+'/login', {
      email: email,
      password: password
    })
    
    console.log(response.data.data)
    
    // Check if signin was successful
    if (response.status === 200 || response.status === 201) {
      // Store token if available
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      Cookies.set("accessToken", response.data.data.accessToken, { expires: 7, path: "/" });
      Cookies.set("refreshToken", response.data.data.refreshToken, { expires: 7, path: "/" });
      // Show success message
      toast.success('Signed in successfully!');
      
      // Redirect to dashboard after a brief delay
      setTimeout(() => {
        router.push('/')
      }, 1500);
    }
  } catch (error) {
    console.error("Signin failed:", error)
    
    // Handle specific error status codes
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 401) {
        toast.error("Invalid email or password")
      } else if (error.response.status === 404) {
        toast.error("Account not found")
      } else {
        toast.error("Signin failed. Please try again.")
      }
    } else {
      toast.error("Network error. Please check your connection.")
    }
  }
}
const googleAuth = async () => {
  window.location.href = url+"/auth/google";
};


  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Left side - Blue section */}
      <div className="bg-primary text-white md:w-1/2 p-8 md:flex hidden flex-col items-center justify-center text-center">
      <BusinessCarousel/>
    </div>
      {/* Right side - Login form */}
      <div className="bg-white md:w-1/2 p-6 md:p-8 flex items-center my-auto justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">Sign in to TheSupplier</h2>
            <p className="text-gray-500 text-sm">Partner in Manufacturing !</p>
          </div>

          {/* Social login buttons */}
          <div className="grid gap-4 mb-6">
            <button 
            onClick={googleAuth}
            className="flex items-center justify-center border border-gray-300 rounded-md p-3 hover:bg-gray-50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="mr-2">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign In with Google
            </button>
            <button className="flex items-center justify-center border border-gray-300 rounded-md p-3 hover:bg-gray-50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="mr-2">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Sign In with Apple
            </button>
          </div>

          <div className="text-center text-sm text-gray-500 mb-6">Or with email</div>

          {/* Login form */}
          <form className="space-y-4">
            <div>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Email or username"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                <Eye size={20} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <Link href="/forgotPassword" className="text-sm text-blue-600 hover:text-blue-800">
                Forgot Password?
              </Link>
            </div>
         
            <CustomButton 
            onClick={ submitSignIn }
            text="Sign In"  className="w-full text-center justify-center"/>
{/* 
            <button
              type="submit"
              className="w-full bg-blue-100 text-blue-600 py-3 rounded-full font-medium hover:bg-blue-200 transition-colors"
            >
              Sign In
            </button> */}
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?
              <Link href="/signup" className="text-blue-600 font-medium ml-1">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

