import Link from "next/link"
import { Facebook, Linkedin, Twitter } from "lucide-react"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div className="flex-1 bg-blue-600 flex flex-col">
        {/* Header */}
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">TheSupplier</h1>
          <div className="hidden md:flex space-x-2">
            <Link
              href="/signin"
              className="bg-transparent border border-white text-white rounded-full px-4 py-1 text-sm hover:bg-white/10 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="bg-white text-blue-600 rounded-full px-4 py-1 text-sm hover:bg-gray-100 transition-colors"
            >
              Open an Account
            </Link>
          </div>
          <button className="md:hidden text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-8">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 rounded-full p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="blue"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-center mb-2">Forgot password?</h2>
            <p className="text-gray-500 text-center mb-6">No worries, we&apos;ll send you reset instructions.</p>

            <form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-100 text-blue-600 py-3 rounded-full font-medium hover:bg-blue-200 transition-colors"
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 flex flex-col md:flex-row justify-between items-center text-white text-sm">
          <div>© 2023 Finto. All right reserved</div>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <Link href="#" className="hover:text-gray-200">
              <Linkedin size={20} />
            </Link>
            <Link href="#" className="hover:text-gray-200">
              <Twitter size={20} />
            </Link>
            <Link href="#" className="hover:text-gray-200">
              <Facebook size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

