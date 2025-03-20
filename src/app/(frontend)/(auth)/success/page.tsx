"use client"

import { useState } from "react"
import { Eye } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left side - Blue section */}
      <div className="bg-primary text-white md:w-1/2 p-8 md:flex hidden flex-col items-center justify-center text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Take Your Business Faster</h1>
          <p className="text-sm md:text-base opacity-90 mb-8">
            Ullamcorper urna fringilla lorem scelerisque nunc. Amet odio eras amet adipiscing ut adipiscing urpis donec
            vel
          </p>

          {/* Dots indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            <div className="w-2 h-2 rounded-full bg-white"></div>
            <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
            <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
            <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
          </div>
        </div>
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
            <button className="flex items-center justify-center border border-gray-300 rounded-md p-3 hover:bg-gray-50 transition-colors">
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
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              Sign In with Apple
            </button>
          </div>

          <div className="text-center text-sm text-gray-500 mb-6">Or with email</div>

          {/* Login form */}
          <form className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Email or username"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
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
              <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-100 text-blue-600 py-3 rounded-full font-medium hover:bg-blue-200 transition-colors"
            >
              Sign In
            </button>
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

