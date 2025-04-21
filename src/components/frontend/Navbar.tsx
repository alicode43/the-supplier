'use client'
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';


const Navbar: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for authentication status when component mounts
    const accessToken = Cookies.get("accessToken");
    setIsAuthenticated(!!accessToken);
    
    // Add click event listener to close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleLogout = () => {
    // Remove tokens from cookies
    Cookies.remove("accessToken", { path: '/' });
    Cookies.remove("refreshToken", { path: '/' });
    
    // Update authentication state
    setIsAuthenticated(false);
    
    // Close dropdown
    setIsDropdownOpen(false);
    
    // Redirect to home page
    router.push('/');
  };

  return ( 
    <nav className="bg-[#046BD2]  text-white sticky w-full   border-b border-gray-200">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
        <span className="self-center text-2xl font-semibold whitespace-nowrap ">TheSuplier</span>
      </a>
      <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse ">
      {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-700 hover:bg-blue-100 transition-all duration-300 ease-in-out"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href={'/signin'}>
              <button type="button" className="text-[#0A0A0A] bg-white hover:bg-blue-100 hover:text-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold text-sm px-6 py-2.5 text-center rounded-full transition-all duration-300 ease-in-out hover:shadow-md hover:scale-105">
                Login
              </button>
            </Link>
          )}

        <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-sticky" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
      </div>
      <div className="items-center  justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-[#046BD2]">
          <li>
            <a href="#" className="block py-2 px-3 bg-blue-700 rounded-sm md:bg-transparent md:p-0 relative after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full" aria-current="page">Home</a>
          </li>
          <li>
            <a href="#" className="block py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:p-0 relative after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full md:hover:text-white transition-colors duration-300">About</a>
          </li>
          <li>
            <a href="#" className="block py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:p-0 relative after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full md:hover:text-white transition-colors duration-300">Services</a>
          </li>
          <li>
            <a href="/how-it-work" className="block py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:p-0 relative after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full md:hover:text-white transition-colors duration-300">How it works</a>
          </li>
          <li>
            <a href="#" className="block py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:p-0 relative after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full md:hover:text-white transition-colors duration-300">Supplier Network</a>
          </li>
          <li>
            <a href="#" className="block py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:p-0 relative after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full md:hover:text-white transition-colors duration-300">Quality</a>
          </li>
          <li>
            <a href="#" className="block py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:p-0 relative after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full md:hover:text-white transition-colors duration-300">Contact</a>
          </li>
        </ul>
      </div>
    </div>
    
  </nav>
  );
};

export default Navbar;