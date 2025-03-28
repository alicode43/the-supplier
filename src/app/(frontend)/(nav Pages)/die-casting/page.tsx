"use client"
import React from 'react'
import Navbar from '@/components/frontend/Navbar'
import Footer from '@/components/frontend/Footer'
import HeroInput from '@/components/frontend/HeroInput'
import DrawingShowCase from '@/components/frontend/DrawingShowCase'
function page() {
  return (
    <div>
        <Navbar/>
      {/* Hero Section */}
      <HeroInput/>
      <DrawingShowCase/>
      <Footer/>
    </div>
  )
}

export default page
