import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Define the service card type
interface ServiceCard {
  id: string;
  title: string;
  imageUrl: string;
  description?: string;
}

function DrawingShowCase() {
  // Sample service cards data
  const serviceCards: ServiceCard[] = [
    {
      id: 'cnc-turning',
      title: 'CNC Turning',
      imageUrl: '/images/cnc-turning.jpg', // Replace with actual image paths
      description: 'Precision CNC turning services for complex components'
    },
    {
      id: 'cnc-milling',
      title: 'CNC Milling',
      imageUrl: '/images/cnc-milling.jpg', // Replace with actual image paths
      description: 'High-quality CNC milling for diverse material applications'
    },
    {
      id: 'edm-machining',
      title: 'EDM Machining',
      imageUrl: '/images/edm-machining.jpg', // Replace with actual image paths
      description: 'Advanced EDM machining for intricate parts and components'
    }
  ];

  // State for tracking which card is hovered
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section className="relative py-14 px-4 sm:px-6 lg:px-20 overflow-hidden">
      {/* Background grid lines - hidden on mobile for cleaner UI */}
      <div className="hidden lg:flex absolute top-0 left-0 right-0 bottom-0 justify-between opacity-60 px-10 lg:px-28 pointer-events-none">
        {[1, 2, 3, 4, 5].map((index) => (
          <div 
            key={index}
            className="w-px h-full bg-neutral-300" 
            aria-hidden="true"
          ></div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto space-y-10 md:space-y-14 relative z-10">
        {/* Heading Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-neutral-950 leading-tight max-w-3xl">
            Just Send Us Your Drawing For Any Kinds Of Forging Parts
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          {serviceCards.map((card) => (
            <div 
              key={card.id}
              className="flex flex-col gap-5 group"
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card Image */}
              <div className="relative h-64 rounded-2xl overflow-hidden bg-neutral-100">
                {/* Placeholder - replace with actual Image component */}
                <div className="absolute inset-0 bg-neutral-200 transition-transform duration-700 group-hover:scale-105">
                  {/* If using Next.js Image component */}
                  <Image 
                    src={card.imageUrl} 
                    alt={card.title}
                    fill
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
                    // Fallback for now - replace with actual images
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://placehold.co/400x258";
                    }}
                  />
                </div>
                
                {/* Overlay on hover */}
                <div className={`absolute inset-0 bg-sky-600 bg-opacity-0 transition-all duration-300 flex items-center justify-center ${
                  hoveredCard === card.id ? 'bg-opacity-70' : ''
                }`}>
                  {hoveredCard === card.id && (
                    <span className="text-white font-medium text-sm px-4 py-2 border border-white rounded-full opacity-0 transform translate-y-4 transition-all duration-300 animate-fadeIn">
                      View Details
                    </span>
                  )}
                </div>
              </div>
              
              {/* Card Content */}
              <div className="flex justify-between items-start">
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 leading-tight">
                  {card.title}
                </h3>
                
                <Link 
                  href={`/services/${card.id}`} 
                  className="group flex items-center text-sm font-bold text-neutral-900/80 hover:text-sky-600 underline py-1 transition-colors duration-200"
                >
                  <span>Get Your Quote</span>
                  <ArrowRight className="ml-1 w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DrawingShowCase;