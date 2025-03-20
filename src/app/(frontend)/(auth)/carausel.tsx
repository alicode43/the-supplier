"use client"

import { useState, useEffect } from "react"
 

const BusinessCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    {
      heading: "Take Your Business Faster",
      text: "Ullamcorper urna fringilla lorem scelerisque nunc. Amet odio eras amet adipiscing ut adipiscing urpis donec vel"
    },
    {
      heading: "Streamline Your Operations",
      text: "Efficient supply chain management to optimize your business processes and reduce operational costs."
    },
    {
      heading: "Connect with Global Suppliers",
      text: "Access a network of verified suppliers across the globe to ensure quality and reliability."
    },
    {
      heading: "Real-time Analytics",
      text: "Make data-driven decisions with powerful insights and reporting tools designed for manufacturers."
    }
  ]

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [slides.length])

  // Navigation functions
  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }
 

  return (
    <div className="max-w-md mx-auto w-full relative">
      {/* Carousel content */}
      <div className="relative h-[300px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center transition-opacity duration-500 ${
              currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{slide.heading}</h1>
            <p className="text-sm md:text-base opacity-90 mb-8 text-center">{slide.text}</p>
          </div>
        ))}
      </div>

      {/* Carousel navigation */}
      <div className="mt-8">
        {/* Dots indicator */}
        <div className="flex justify-center space-x-3">
          {slides.map((_, index) => (
            <button 
              key={index} 
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? "bg-white w-4" : "bg-white opacity-50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Arrow controls */}
      {/* <button 
        onClick={goToPrevious} 
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button 
        onClick={goToNext} 
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button> */}
    </div>
  )
}

export default BusinessCarousel

