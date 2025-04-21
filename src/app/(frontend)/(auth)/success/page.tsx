"use client"

import Link from "next/link"
// import { useRouter } from "next/navigation"

export default function SuccessPage() {
  // const router = useRouter()
  
  return (
    <div className="flex flex-col min-h-screen    bg-[#046BD2]">
      {/* Header */}
      {/* <header className="w-full h-20 px-4 md:px-20 py-5 bg-[#046BD2] border-b border-white/10 flex justify-between items-center">
        <div className="w-36 md:w-56 h-10 md:h-14">
     
        </div>
        <div className="w-8 h-8 relative overflow-hidden">
          <div className="w-3.5 h-3.5 left-[8.80px] top-[8.80px] absolute outline-2 outline-offset-[-1px] outline-white"></div>
        </div>
      </header> */}
      
      {/* Main content */}
      <main className="flex-1 py-10 md:py-44 relative flex justify-center items-center">
        {/* Background grid lines - visible on larger screens */}
    
        
        {/* Content container */}
        <div className="w-full px-4 flex flex-col justify-center items-center gap-6 md:gap-10 z-10">
          {/* Success icon/image */}
          <div className="w-24 h-24 md:w-36 md:h-36 bg-white/20 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 md:h-20 md:w-20 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          {/* Text content */}
          <div className="flex flex-col justify-center items-center gap-3 md:gap-4 text-center">
            <h1 className="text-2xl md:text-4xl font-semibold text-white max-w-xs md:max-w-md leading-tight">
              Successfully Created Your Account!
            </h1>
            <p className="text-white/50 text-base md:text-lg max-w-xs md:max-w-lg">
              Your account has been created successfully. You can now sign in to access your account.
            </p>
          </div>
          
          {/* Button */}
          <Link 
            href="/signin" 
            className="mt-4 w-full max-w-xs md:w-64 h-12 px-4 py-3 bg-white rounded-full flex justify-center items-center hover:bg-gray-100 transition-colors"
          >
            <span className="text-black/95 text-base font-semibold">Back to Login</span>
          </Link>
        </div>
      </main>
    </div>
  )
}