'use client'
import Footer from '@/components/frontend/Footer'
import Navbar from '@/components/frontend/Navbar'
import React, { useState } from 'react'
import { Plane, Truck} from 'lucide-react'
import BottomCTA from '@/components/frontend/BottomCTA'
import Image from 'next/image'

function Page() {
      const [openFaq, setOpenFaq] = useState<string | null>(null);
    
      const toggleFaq = (id: string) => {
        setOpenFaq(openFaq === id ? null : id);
      };
    
      const faqItems = [
        {
          id: "1",
          question: "What is TheSupplier Partner Network?",
          answer: "TheSupplier Partner Network is a global community of manufacturers and suppliers who collaborate with TheSupplier to fulfill orders from clients worldwide. It creates opportunities for businesses to expand their reach and grow without financial constraints."
        },
        {
          id: "2",
          question: "How does TheSupplier Partner Network function?",
          answer: "Once you join the network, you'll have 24/7 access to orders through our platform. You can browse opportunities, submit quotes, and fulfill orders directly through our streamlined system. TheSupplier handles the client relationships, marketing, and logistics while you focus on what you do best."
        },
        {
          id: "3",
          question: "Why should I join TheSupplier Partner Network?",
          answer: "Joining TheSupplier Partner Network provides you with consistent order flow, global exposure without customer acquisition costs, and the freedom to work on your terms. You'll benefit from our established client base while maintaining your independence."
        },
        {
          id: "4",
          question: "What is the cost of joining TheSupplier Partner Network?",
          answer: "There is no cost to join TheSupplier Partner Network. We believe in creating opportunities without financial barriers. There are no transaction fees, service charges, or membership costs associated with being part of our network."
        }
      ];
    
  return (
    <div>
        <Navbar />
        <section className="w-full py-10 md:py-14 px-4 sm:px-6 lg:px-10 xl:px-20 relative">
        {/* Background grid lines - hidden on small screens */}
        <div className="hidden md:flex absolute top-0 left-0 right-0 bottom-0 justify-between opacity-60 px-4 sm:px-6 lg:px-10 xl:px-20 pointer-events-none">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="w-px h-full bg-neutral-300"></div>
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto space-y-14 relative z-10">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-10">
            <div className="w-full lg:w-1/2 space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold font-['Inter'] leading-tight sm:leading-tight lg:leading-[1.2]">
                Delivery Options at TheSupplier
              </h1>
              <p className="text-base sm:text-lg text-neutral-500 font-normal font-['Inter'] leading-relaxed">
                At TheSupplier, we prioritize seamless deliveries to enhance your experience. Here&apos;s how our delivery options are structured
              </p>
            </div>
            
            {/* Graphic Container */}
            <div className="w-full lg:w-[500px] h-80 sm:h-96 relative border border-neutral-200 overflow-hidden">
            <Image 
  className="mix-blend-luminosity object-cover" 
  src="/globe.png" 
  alt="Delivery illustration"
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
  priority
  style={{ objectPosition: 'bottom' }}
/>
              
              {/* Shipping Icons - simplified for responsiveness */}
              {/* <div className="absolute top-1/4 left-[10%] w-12 h-12 sm:w-16 sm:h-16 bg-zinc-100 flex items-center justify-center">
                <Plane className="w-8 h-8 text-sky-700" />
              </div>
              
              <div className="absolute top-1/5 left-[35%] w-12 h-12 sm:w-16 sm:h-16 bg-zinc-100 flex items-center justify-center">
                <Ship className="w-8 h-8 text-rose-700" />
              </div>
              
              <div className="absolute top-1/3 right-[10%] w-12 h-12 sm:w-16 sm:h-16 bg-amber-500 flex items-center justify-center">
                <Package className="w-8 h-8 text-white" />
              </div>
              
              <div className="absolute top-1/4 left-[60%] w-12 h-12 sm:w-16 sm:h-16 flex flex-col">
                <div className="h-1/3 bg-yellow-300 w-full"></div>
                <div className="h-1/3 bg-sky-300/50 w-full"></div>
                <div className="h-1/3 bg-rose-700 w-full"></div>
              </div> */}
            </div>
          </div>
          
          {/* Delivery Options Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* International Deliveries Card */}
            <div className="p-4 sm:p-6 bg-white shadow-md border border-neutral-200 flex flex-col gap-4 sm:gap-6 h-full">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-stone-200 rounded-full flex items-center justify-center">
                <Plane className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600" />
              </div>
              
              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-semibold font-['Inter'] leading-tight text-neutral-950">
                  International Deliveries for Foreign Customers
                </h2>
                <p className="text-base sm:text-lg font-normal font-['Inter'] leading-relaxed text-neutral-500">
                  For our esteemed foreign customers, we ensure flexible delivery solutions tailored to your specific needs. The delivery timeline is influenced by your lead time and order quantity.
                </p>
                
                <div className="pt-2 space-y-4">
                  <div>
                    <span className="text-base sm:text-lg font-medium font-['Inter'] text-black">Small Quantities</span>
                    <p className="text-base sm:text-lg font-normal font-['Inter'] leading-relaxed text-neutral-500">
                      Swift delivery is guaranteed through airfreight, ensuring your orders reach you promptly.
                    </p>
                  </div>
                  
                  <div>
                    <span className="text-base sm:text-lg font-medium font-['Inter'] text-black">Large Quantities</span>
                    <p className="text-base sm:text-lg font-normal font-['Inter'] leading-relaxed text-neutral-500">
                      For substantial orders, we optimize cost efficiency and reliability through sea shipment, balancing timely delivery with economical transport solutions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Domestic Deliveries Card */}
            <div className="p-4 sm:p-6 bg-white shadow-md border border-neutral-200 flex flex-col gap-4 sm:gap-6 h-full">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-stone-200 rounded-full flex items-center justify-center">
                <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600" />
              </div>
              
              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-semibold font-['Inter'] leading-tight text-neutral-950">
                  Domestic Deliveries for Local Customers
                </h2>
                <p className="text-base sm:text-lg font-normal font-['Inter'] leading-relaxed text-neutral-500">
                  When it comes to our domestic customers, we understand the importance of choice. You have the flexibility to opt for the delivery method that suits you best.
                </p>
                
                <div className="pt-2 space-y-4">
                  <div>
                    <span className="text-base sm:text-lg font-medium font-['Inter'] text-black">Transport</span>
                    <p className="text-base sm:text-lg font-normal font-['Inter'] leading-relaxed text-neutral-500">
                      Choose traditional transport options for a reliable and straightforward delivery process.
                    </p>
                  </div>
                  
                  <div>
                    <span className="text-base sm:text-lg font-medium font-['Inter'] text-black">Courier</span>
                    <p className="text-base sm:text-lg font-normal font-['Inter'] leading-relaxed text-neutral-500">
                      Opt for courier services if you prefer a more direct and expedited delivery experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BottomCTA  title='TheSupplier Welcome
you to Become Our Partner' buttonText='Register & Start'/>
{/* FAQ Section */}
<section className="py-14 md:py-20 bg-white">
  <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-28 flex flex-col lg:flex-row justify-start items-start gap-8 lg:gap-14">
    {/* Left Column - Title */}
    <div className="w-full lg:w-72 flex flex-col justify-start items-start gap-4">
      <h2 className="text-3xl font-semibold text-neutral-950 font-['Inter'] leading-10">Frequently Asked Questions</h2>
    </div>




    
    {/* Right Column - Accordion */}
    <div className="flex-1 w-full flex flex-col justify-center items-center gap-3">
      {faqItems.map((item) => (
        <div key={item.id} className="w-full">
          {/* Accordion Header */}
          <button 
            onClick={() => toggleFaq(item.id)}
            className="w-full h-auto min-h-14 p-4 bg-white border border-neutral-200 flex justify-between items-center gap-2"
            aria-expanded={openFaq === item.id}
          >
            <div className="flex-1 text-left text-zinc-950 text-base sm:text-lg font-semibold font-['Inter'] leading-relaxed">
              {item.question}
            </div>
            <div className="w-5 h-5 relative flex items-center justify-center">
              <div className="w-2 h-0.5 bg-neutral-950"></div>
              {openFaq !== item.id && (
                <div className="w-0.5 h-2 bg-neutral-950 absolute"></div>
              )}
            </div>
          </button>
          
          {/* Accordion Content */}
          {openFaq === item.id && (
            <div className="w-full p-4 border border-t-0 border-neutral-200 bg-white">
              <p className="text-neutral-600 text-sm sm:text-base font-normal">
                {item.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
</section>
        <Footer />
      
    </div>
  )
}

export default Page
