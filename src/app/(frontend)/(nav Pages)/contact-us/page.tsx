'use client'
import Navbar from '@/components/frontend/Navbar'
import React, { useState } from 'react'
import Image from 'next/image'
import CustomButton from '@/components/ui/CustomButton'
import Footer from '@/components/frontend/Footer'
 
import BottomCTA from '@/components/frontend/BottomCTA'

const materials = [
  {
    id: "sales",
    name: "Sales Team",
    subOptions: [
      "Product Pricing & Quotations",
      "Bulk Order Inquiries",
      "Special Discounts & Offers",
      "Product Availability & Lead Times",
    ],
  },
  {
    id: "question",
    name: "Have Any Question?",
    subOptions: [
      "Product Specifications",
      "Technical Documentation",
      "Material Certifications",
      "Custom Order Possibilities",
    ],
  },
  {
    id: "finance",
    name: "Account/Finance",
    subOptions: [
      "Billing Inquiries",
      "Payment Options & Methods",
      "Credit Applications",
      "Tax & Invoice Documentation",
    ],
  },
  {
    id: "tracking",
    name: "Tracking/Delivery",
    subOptions: [
      "Order Status Updates",
      "Shipping & Logistics Information",
      "Delivery Timeline Inquiries",
      "International Shipping Procedures",
    ],
  },
  {
    id: "supplier",
    name: "Supplier",
    subOptions: [
      "Partnership Opportunities",
      "Material Supply Proposals",
      "Quality Standards & Certification",
      "Vendor Registration Process",
    ],
  },
  {
    id: "investors",
    name: "Investors",
    subOptions: [
      "Financial Reports & Information",
      "Investment Opportunities",
      "Company Growth Strategy",
      "Shareholder Services",
    ],
  },
  {
    id: "jobseekers",
    name: "Job Seekers",
    subOptions: [
      "Current Openings & Positions",
      "Career Development Opportunities",
      "Internship Programs",
      "Employee Benefits & Culture",
    ],
  },
  {
    id: "media",
    name: "Press/Media",
    subOptions: [
      "Press Releases & News",
      "Media Kit Requests",
      "Interview Opportunities",
      "Event Coverage & Information",
    ],
  },
];

function Page() {

      const [openAccordion, setOpenAccordion] = useState<string | null>("tracking");
    
      // Function to toggle accordion
      const toggleAccordion = (id: string) => {
        setOpenAccordion(openAccordion === id ? null : id);
      };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="flex-1 px-4 md:px-8 lg:px-16 xl:px-36 py-8 md:py-14">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Contact Form Section */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-center">
            <div className="w-full max-w-[480px] flex flex-col gap-12">
              {/* Heading */}
              <div className="flex flex-col gap-4">
                <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight">Contact TheSupplier</h1>
                <p className="text-base md:text-lg text-slate-600">We appreciate your interest in TheSupplier.</p>
              </div>
              
              {/* Form */}
              <div className="w-full flex flex-col gap-8">
                <div className="flex flex-col gap-6">
                  {/* Name Fields */}
                  <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                    {/* First Name */}
                    <div className="w-full flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-neutral-800">First name</label>
                      <div className="w-full px-3.5 py-2.5 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] border border-neutral-200">
                        <input 
                          type="text" 
                          placeholder="First name" 
                          className="w-full outline-none text-base text-neutral-400 placeholder:text-neutral-400"
                        />
                      </div>
                    </div>
                    
                    {/* Last Name */}
                    <div className="w-full flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-neutral-800">Last name</label>
                      <div className="w-full px-3.5 py-2.5 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] border border-neutral-200">
                        <input 
                          type="text" 
                          placeholder="Last name" 
                          className="w-full outline-none text-base text-neutral-400 placeholder:text-neutral-400"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-neutral-800">Email</label>
                    <div className="w-full px-3.5 py-2.5 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] border border-neutral-200">
                      <input 
                        type="email" 
                        placeholder="you@company.com" 
                        className="w-full outline-none text-base text-neutral-400 placeholder:text-neutral-400"
                      />
                    </div>
                  </div>
                  
                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-neutral-800">Phone number</label>
                    <div className="flex w-full bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] border border-neutral-200">
                      <div className="flex items-center pl-3.5 py-2.5 border-r border-neutral-200">
                        <span className="text-neutral-950 text-base">IN</span>
                        <div className="w-5 h-5 ml-2 relative">
                          <div className="w-2.5 h-[5px] left-[5px] top-[7.50px] absolute border-[1.67px] border-neutral-500"></div>
                        </div>
                      </div>
                      <input 
                        type="tel" 
                        placeholder="+91 01234 56789" 
                        className="flex-1 px-3 py-2.5 outline-none text-base text-neutral-400 placeholder:text-neutral-400"
                      />
                    </div>
                  </div>
                  
                  {/* Message */}
                  <div className="flex flex-col gap-1.5 h-40">
                    <label className="text-sm font-semibold text-neutral-800">Message</label>
                    <textarea 
                      placeholder="Leave us a message..." 
                      className="flex-1 w-full px-3.5 py-3 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] border border-neutral-200 resize-none outline-none text-base text-neutral-400 placeholder:text-neutral-400"
                    ></textarea>
                  </div>
                  
                  {/* Privacy Policy */}
                  <div className="flex gap-3 items-start">
                    <div className="pt-0.5">
                      <input 
                        type="checkbox"
                        className="w-5 h-5 rounded-md border border-neutral-200 accent-sky-600" 
                      />
                    </div>
                    <p className="text-neutral-500 text-base">
                      You agree to our friendly privacy policy.
                    </p>
                  </div>
                </div>
                
                {/* Submit Button */}
         
                    <CustomButton  text="Send Message"/>
        
              </div>
            </div>
          </div>
      

          {/* Image Section */}
          <div className="hidden lg:block w-full lg:w-1/2 h-auto min-h-[500px]">
            <div className="w-full h-full relative">
              <Image 
                src="/contactUs.png" 
                alt="Contact us illustration" 
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* General Inquiries Section */}
      <section className="px-4 md:px-8 lg:px-16 xl:px-36 py-8 md:py-14">
        <div className="flex flex-col justify-start items-start gap-8 md:gap-16">
          {/* Heading */}
          <div className="w-full flex flex-col justify-start items-start gap-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-neutral-950 leading-tight">General Inquiries</h2>
            <p className="text-base md:text-lg text-neutral-500 leading-relaxed max-w-3xl">
              We appreciate your interest in TheSupplier. Please select from the options below.
            </p>
          </div>
          
          {/* Contact Cards */}
          <div className="w-full flex flex-col justify-start items-start gap-8">
            {/* First Row */}
            <div className="w-full flex flex-col md:flex-row justify-start items-stretch gap-8">
              {/* Phone Card */}
              <div className="flex-1 p-4 md:p-6 bg-white shadow-[0px_4px_11px_-1px_rgba(10,10,10,0.04)]  outline-1 outline-offset-[-1px] outline-neutral-200 flex flex-col justify-start items-start gap-6">
                <div className="w-full flex flex-col justify-start items-start gap-3">
                  <h3 className="text-xl md:text-2xl font-semibold text-neutral-950 leading-7">Call +91 9328 101125</h3>
                  <p className="text-base md:text-lg text-neutral-500 leading-relaxed">We love to hear from you.</p>
                </div>
              </div>
              
              {/* Email Card */}
              <div className="flex-1 p-4 md:p-6 bg-white shadow-[0px_4px_11px_-1px_rgba(10,10,10,0.04)  outline-1 outline-offset-[-1px] outline-neutral-200 flex flex-col justify-start items-start gap-6">
                <div className="w-full flex flex-col justify-start items-start gap-3">
                  <h3 className="text-xl md:text-2xl font-semibold text-neutral-950 leading-7 underline">info@TheSupplier.in</h3>
                  <p className="text-base md:text-lg text-neutral-500 leading-relaxed">Write to us for any Information.</p>
                </div>
              </div>
            </div>
            
            {/* Second Row */}
            <div className="w-full flex flex-col md:flex-row justify-start items-stretch gap-8">
              {/* Office Card */}
              <div className="flex-1 p-4 md:p-6 bg-white shadow-[0px_4px_11px_-1px_rgba(10,10,10,0.04)]  outline-1 outline-offset-[-1px] outline-neutral-200 flex flex-col justify-start items-start gap-6">
                <div className="w-full flex flex-col justify-start items-start gap-3">
                  <h3 className="text-xl md:text-2xl font-semibold text-neutral-950 leading-7">Office</h3>
                  <div className="text-base md:text-lg text-neutral-500 leading-relaxed">
                    S.K.Industries<br/>
                    B-39, M.P.Shah Industrial Estate,<br/>
                    Sarusection Road,<br/>
                    Jamnagar - 361002<br/>
                    Gujarat, India.
                  </div>
                </div>
              </div>
              
              {/* Warehouse Card */}
              <div className="flex-1 p-4 md:p-6 bg-white shadow-[0px_4px_11px_-1px_rgba(10,10,10,0.04)]   outline-1 outline-offset-[-1px] outline-neutral-200 flex flex-col justify-start items-start gap-6">
                <div className="w-full flex flex-col justify-start items-start gap-3">
                  <h3 className="text-xl md:text-2xl font-semibold text-neutral-950 leading-7">Warehouse</h3>
                  <div className="text-base md:text-lg text-neutral-500 leading-relaxed">
                    S.K.Industries<br/>
                    Plot No.4116,<br/>
                    G.I.D.C Phase -3, Dared,<br/>
                    Jamnagar - 361009<br/>
                    Gujarat, India.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
   
      <BottomCTA
        title="Seamless Forging Solutions: Place Your Order Today, Receive Precision Manufacture in Your TIME!"
        description=""
        buttonText="Get Your Quote"
      />

      <section className="w-full py-8 md:py-14 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-14">
          {/* Left column - Title */}
          <div className="w-full lg:w-72">
            <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-950 font-['Inter'] leading-10">
            For specific questions, get in touch below

            </h2>
          </div>

          {/* Right column - Accordion */}
          <div className="flex-1 flex flex-col gap-3">
            {materials.map((material) => (
              <div
                key={material.id}
                className="border border-neutral-200 bg-white rounded-md overflow-hidden"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleAccordion(material.id)}
                  className="w-full h-14 p-4 flex justify-between items-center transition-colors hover:bg-gray-50 focus:outline-none"
                  aria-expanded={openAccordion === material.id}
                >
                  <span className="text-zinc-950 text-base sm:text-lg font-semibold font-['Inter'] leading-relaxed">
                    {material.name}
                  </span>
                  {/* Icon indicator */}
                  <div className="w-5 h-5 relative flex items-center justify-center">
                    <div className="w-5 h-0.5 bg-neutral-950"></div>
                    <div 
                      className={`w-0.5 h-5 bg-neutral-950 absolute transition-transform duration-300 ${
                        openAccordion === material.id ? 'transform scale-0' : ''
                      }`}>
                    </div>
                  </div>
                </button>

                {/* Accordion Content with smooth transition */}
                <div 
                  className={`transition-all duration-300 overflow-hidden ${
                    openAccordion === material.id ? 'max-h-[500px]' : 'max-h-0'
                  }`}
                >
                  <div className="border-t border-neutral-200">
                    <div className="flex flex-col">
                      {material.subOptions.map((option, index) => (
                        <div
                          key={index}
                          className={`px-4 py-3 transition-colors hover:bg-gray-50 cursor-pointer ${
                            index === 1
                              ? "border-y border-neutral-200 text-zinc-950"
                              : "text-neutral-500"
                          }`}
                        >
                          <span className="text-sm sm:text-base font-medium font-['Inter'] leading-normal">
                            {option}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
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
