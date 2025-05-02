import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/frontend/Navbar';
import Footer from '@/components/frontend/Footer';
const services = [

  {
    href: '/cnc-machining',
    title: 'CNC Machining',
    image: '/services/cnc-turing.png',
    description: 'Precision CNC machining services for high-quality parts.',
  },
  {
    href: '/die-casting',
    title: 'Die Casting',
    image: '/services/cnc-milling.png',
    description: 'Efficient and high-volume metal part production.',
  },
  {
    href: '/forging-parts',
    title: 'Forging Parts',
    image: '/services/edm.png',
    description: 'Durable and reliable forged metal components.',
  },
  {
    href: '/cnc-milling',
    title: 'CNC Milling',
    image: 'https://images.unsplash.com/photo-1612558657340-df5d3c2270f2',
    description: 'Advanced milling solutions for complex geometries.',
  },
  {
    href: '/cnc-turning',
    title: 'CNC Turning',
    image: 'https://images.unsplash.com/photo-1603400526663-b1df7370c6bd',
    description: 'Efficient turning services for cylindrical parts.',
  },
  {
    href: '/cnc-wire-edm-machining',
    title: 'CNC Wire EMD Machining',
    image: 'https://images.unsplash.com/photo-1581092580498-8fdf777b54fe',
    description: 'High-precision EDM cutting for intricate parts.',
  },
  {
    href: '/sheet-metal',
    title: 'Sheet Metal',
    image: 'https://images.unsplash.com/photo-1633158829575-bb2c48bcb6fb',
    description: 'Custom sheet metal fabrication and assembly.',
  },
  {
    href: '/sheet-metal-stamping',
    title: 'Sheet Metal Stamping',
    image: 'https://images.unsplash.com/photo-1616001741520-44f99d9b2f4d',
    description: 'Stamped metal parts for industrial applications.',
  },
  {
    href: '/laser-cutting',
    title: 'Laser Cutting',
    image: 'https://images.unsplash.com/photo-1622537250783-0cf56a8c4d5b',
    description: 'Precision laser cutting for various materials.',
  },
  {
    href: '/water-jet-cutting',
    title: 'Water Jet Cutting',
    image: 'https://images.unsplash.com/photo-1604117492608-dc3c46821839',
    description: 'Cold-cutting process ideal for sensitive materials.',
  },
  {
    href: '/plasma-cutting',
    title: 'Plasma Cutting',
    image: 'https://images.unsplash.com/photo-1617160971725-4f9e6e76f5d1',
    description: 'Fast and efficient plasma cutting services.',
  },
];

export default function ServicesPage() {
  return (
<>
<Navbar />
<div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <Link
            href={service.href}
            key={index}
            className="group block border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
          >
            <div className="h-48 w-full bg-gray-100 overflow-hidden">
              <img
                src={`${service.image}?auto=format&fit=crop&w=800&q=60`}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
<Footer />
</>
  );
}
