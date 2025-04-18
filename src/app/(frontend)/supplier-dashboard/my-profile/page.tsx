"use client";

import Navbar from "@/components/dashboard/Navbar";
import React, { useState, useRef } from "react";
 
import { ChevronDown } from "lucide-react";
 
export default function Page() {
  // State for form data
  const [formData, setFormData] = useState({
    companyName: "Acme Manufacturing Ltd.",
    yearEstablished: "2022-06-21",
    companyType: "Manufacturer",
    employees: "11 - 50",
    description: "Acme Manufacturing Ltd. is a leading manufacturer of precision metal components for the automotive, aerospace, and medical industries. With over 25 years of experience, we specialize in CNC machining, sheet metal fabrication, and precision assembly.",
    website: "https://www.acmemanufacturing.com",
    phone: "+91 98765 43210",
    email: "info@acmemanufacturing.com",
    address: "123 Industrial Area, Phase 2",
    city: "Ahmedabad",
    state: "Gujarat",
    postalCode: "380015",
    country: "India"
  });

  // Refs for select elements
  const companyTypeRef = useRef<HTMLSelectElement>(null);
  const employeesRef = useRef<HTMLSelectElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);

  // Function to open select dropdown
  const openDropdown = (ref: React.RefObject<HTMLSelectElement | null>) => {
      if (ref.current) {
        ref.current.focus();
        ref.current.click();
      }
    };

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send data to an API
    console.log("Form submitted:", formData);
    alert("Profile changes saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Navbar />
      <section className="container mx-auto px-4 py-6 sm:w-11/12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* Left Sidebar */}
          <div className="w-full lg:w-auto lg:pt-28 flex flex-col gap-5">
            {/* Company Photo/Logo */}
            <div className="p-3 bg-white rounded-xl flex flex-col items-center gap-2.5 overflow-hidden">
              <div className="flex flex-col items-start gap-6">
                <div className="w-64 h-44 relative bg-neutral-200 rounded-xl">
                  {/* Image placeholder */}
                </div>
                <div className="flex flex-col items-start gap-1 w-full">
                  <div className="self-stretch text-center text-black text-lg font-medium">
                    {formData.companyName}
                  </div>
                  <div className="w-64 text-center text-stone-500 text-sm">Premium Supplier</div>
                </div>
              </div>
              <button className="h-7 px-2.5 py-2 rounded-lg outline outline-indigo-500 flex justify-center items-center">
                <div className="text-indigo-500 text-xs font-bold">Change Photo</div>
              </button>
            </div>

            {/* Account Status */}
            <div className="w-full lg:w-72 p-6 bg-white rounded-xl flex flex-col gap-2.5 overflow-hidden">
              <div className="self-stretch flex flex-col gap-6">
                {/* Account Status Section */}
                <div className="self-stretch flex flex-col gap-3.5">
                  <div className="flex flex-col gap-0.5">
                    <div className="text-black text-lg font-medium">Account Status</div>
                  </div>
                  <div className="self-stretch flex flex-col gap-5">
                    <div className="self-stretch flex justify-between items-center">
                      <div className="text-stone-500 text-sm">Email Verified</div>
                      <div className="w-3.5 h-3.5 relative overflow-hidden">
                        <div className="w-3.5 h-3.5 left-0 top-0 absolute bg-lime-700"></div>
                      </div>
                    </div>
                    <div className="self-stretch flex justify-between items-center">
                      <div className="text-stone-500 text-sm">Phone Verified</div>
                      <div className="w-3.5 h-3.5 relative overflow-hidden">
                        <div className="w-3.5 h-3.5 left-0 top-0 absolute bg-lime-700"></div>
                      </div>
                    </div>
                    <div className="self-stretch flex justify-between items-center">
                      <div className="text-stone-500 text-sm">Business Verified</div>
                      <div className="w-3.5 h-3.5 relative overflow-hidden">
                        <div className="w-3.5 h-3.5 left-0 top-0 absolute bg-lime-700"></div>
                      </div>
                    </div>
                    <div className="self-stretch flex justify-between items-center">
                      <div className="text-stone-500 text-sm">Premium Member</div>
                      <div className="w-3.5 h-3.5 relative overflow-hidden">
                        <div className="w-3.5 h-3.5 left-[0.63px] top-[0.63px] absolute bg-yellow-500"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="self-stretch h-px bg-neutral-200"></div>

                {/* Membership Section */}
                <div className="self-stretch flex flex-col gap-3.5">
                  <div className="flex flex-col gap-0.5">
                    <div className="text-black text-lg font-medium">Membership</div>
                  </div>
                  <div className="self-stretch flex flex-col gap-2.5">
                    <div className="self-stretch flex gap-24">
                      <div className="text-stone-500 text-sm">Plan: Premium</div>
                    </div>
                    <div className="self-stretch flex gap-24">
                      <div className="text-stone-500 text-sm">Renewal Date: 15 Dec, 2025</div>
                    </div>
                  </div>
                  <button className="h-7 px-2.5 py-2 rounded-lg  outline-1 outline-indigo-500 flex justify-center items-center">
                    <div className="text-indigo-500 text-xs font-bold">Upgrade Plan</div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col gap-5">
            {/* Header */}
            <div className="flex items-center gap-2.5">
              <h1 className="text-neutral-800 text-3xl font-bold">My Profile</h1>
            </div>

            {/* Form Section */}
            <div className="self-stretch flex flex-col gap-2.5">
              <div className="self-stretch flex flex-col gap-2.5">
                <div className="self-stretch rounded-xl">
                  <form onSubmit={handleSubmit} className="self-stretch px-8 pt-8 pb-11 bg-white rounded-tl-xl rounded-tr-xl flex flex-col gap-9">
                    <div className="text-black text-xl font-medium">Company Info</div>
                    
                    <div className="self-stretch flex flex-col gap-4">
                      {/* First row */}
                      <div className="self-stretch flex flex-col lg:flex-row gap-6 lg:gap-14">
                        <div className="flex-1 self-stretch flex flex-col gap-4">
                          <div className="self-stretch flex gap-3">
                            <div className="flex-1 flex flex-col gap-2">
                              <label className="text-black text-base">Company Name</label>
                              <input 
                                type="text" 
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                className="self-stretch p-4 rounded-xl outline outline-indigo-500 text-zinc-900 text-sm" 
                              />
                            </div>
                          </div>
                          
                          <div className="self-stretch flex gap-3">
                            <div className="flex-1 flex flex-col gap-2">
                              <label className="text-black text-base">Year Established</label>
                              <div className="self-stretch p-4 rounded-xl outline outline-zinc-100 flex gap-px">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-4 h-4 relative overflow-hidden">
                                    <div className="w-4 h-4 left-0 top-0 absolute bg-black" />
                                    <div className="w-0.5 h-0.5 left-[7.88px] top-[10.12px] absolute bg-black" />
                                    <div className="w-0.5 h-0.5 left-[4.12px] top-[10.12px] absolute bg-black" />
                                    <div className="w-0.5 h-0.5 left-[11.62px] top-[10.12px] absolute bg-black" />
                                  </div>
                                  <input
                                    type="date"
                                    name="yearEstablished"
                                    value={formData.yearEstablished}
                                    onChange={handleChange}
                                    className="text-zinc-900 text-sm bg-transparent border-none outline-none"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex-1 self-stretch flex flex-col gap-4">
                          <div className="self-stretch flex gap-3">
                            <div className="flex-1 flex flex-col gap-2">
                              <label className="text-black text-base">Company Type</label>
                              <div className="self-stretch p-4 rounded-xl outline outline-zinc-100 relative flex items-center">
                                <select
                                  ref={companyTypeRef}
                                  name="companyType"
                                  value={formData.companyType}
                                  onChange={handleChange}
                                  className="w-full appearance-none bg-transparent text-zinc-900 text-sm"
                                >
                                  <option value="Manufacturer">Manufacturer</option> 
                                  <option value="Distributor">Distributor</option>
                                  <option value="Service Provider">Service Provider</option>
                                  <option value="Retailer">Retailer</option>
                                </select>
                                <div 
                                  className="cursor-pointer" 
                                  onClick={() => openDropdown(companyTypeRef)}
                                >
                                  <ChevronDown />
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="self-stretch flex gap-3">
                            <div className="flex-1 flex flex-col gap-2">
                              <label className="text-black text-base">Number of Employees</label>
                              <div className="self-stretch p-4 rounded-xl outline outline-zinc-100 relative flex items-center">
                                <select
                                  ref={employeesRef}
                                  name="employees"
                                  value={formData.employees}
                                  onChange={handleChange}
                                  className="w-full appearance-none bg-transparent text-zinc-900 text-sm"
                                >
                                  <option value="1 - 10">1 - 10</option>
                                  <option value="11 - 50">11 - 50</option>
                                  <option value="51 - 200">51 - 200</option>
                                  <option value="201 - 500">201 - 500</option>
                                  <option value="500+">500+</option>
                                </select>
                                <div 
                                  className="cursor-pointer" 
                                  onClick={() => openDropdown(employeesRef)}
                                >
                                  <ChevronDown />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Description */}
                      <div className="self-stretch flex gap-3">
                        <div className="flex-1 flex flex-col gap-2">
                          <label className="text-black text-base">Company Description</label>
                          <div className="self-stretch rounded-xl outline outline-zinc-100">
                            <textarea
                              name="description"
                              value={formData.description}
                              onChange={handleChange}
                              className="w-full px-4 pt-4 pb-16 rounded-xl text-zinc-900 text-sm resize-none border-0 outline-none"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      
                      {/* Contact info */}
                      <div className="self-stretch flex flex-col lg:flex-row gap-6 lg:gap-14">
                        <div className="flex-1 self-stretch flex flex-col gap-4">
                          <div className="self-stretch flex gap-3">
                            <div className="flex-1 flex flex-col gap-2">
                              <label className="text-black text-base">Website</label>
                              <input
                                type="url"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                className="self-stretch p-4 rounded-xl outline outline-indigo-500 text-zinc-900 text-sm"
                              />
                            </div>
                          </div>
                          
                          <div className="self-stretch flex gap-3">
                            <div className="flex-1 flex flex-col gap-2">
                              <label className="text-black text-base">Phone Number</label>
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="self-stretch p-4 rounded-xl outline outline-zinc-100 text-zinc-900 text-sm"
                              />
                            </div>
                          </div>
                          
                          <div className="self-stretch flex gap-3">
                            <div className="flex-1 flex flex-col gap-2">
                              <label className="text-black text-base">City</label>
                              <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="self-stretch p-4 rounded-xl outline outline-zinc-100 text-zinc-900 text-sm"
                              />
                            </div>
                          </div>
                          
                          <div className="self-stretch flex gap-3">
                            <div className="flex-1 flex flex-col gap-2">
                              <label className="text-black text-base">Postal Code</label>
                              <input
                                type="text"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleChange}
                                className="self-stretch p-4 rounded-xl outline outline-zinc-100 text-zinc-900 text-sm"
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex-1 self-stretch flex flex-col gap-4">
                          <div className="self-stretch flex gap-3">
                            <div className="flex-1 flex flex-col gap-2">
                              <label className="text-black text-base">Company Email</label>
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="self-stretch p-4 rounded-xl outline outline-zinc-100 text-zinc-900 text-sm"
                              />
                            </div>
                          </div>
                          
                          <div className="self-stretch flex gap-3">
                            <div className="flex-1 flex flex-col gap-2">
                              <label className="text-black text-base">Address</label>
                              <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="self-stretch p-4 rounded-xl outline outline-zinc-100 text-zinc-900 text-sm"
                              />
                            </div>
                          </div>
                          
                          <div className="self-stretch flex gap-3">
                            <div className="flex-1 flex flex-col gap-2">
                              <label className="text-black text-base">State</label>
                              <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                className="self-stretch p-4 rounded-xl outline outline-zinc-100 text-zinc-900 text-sm"
                              />
                            </div>
                          </div>
                          
                          <div className="self-stretch flex gap-3">
                            <div className="flex-1 flex flex-col gap-2">
                              <label className="text-black text-base">Country</label>
                              <div className="self-stretch p-4 rounded-xl outline outline-zinc-100 relative flex items-center">
                                <select
                                  ref={countryRef}
                                  name="country"
                                  value={formData.country}
                                  onChange={handleChange}
                                  className="w-full appearance-none bg-transparent text-zinc-900 text-sm"
                                >
                                  <option value="India">India</option>
                                  <option value="United States">United States</option>
                                  <option value="United Kingdom">United Kingdom</option>
                                  <option value="Germany">Germany</option>
                                  <option value="Japan">Japan</option>
                                </select>
                                <div 
                                  className="cursor-pointer" 
                                  onClick={() => openDropdown(countryRef)}
                                >
                                  <ChevronDown />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-48 h-12 p-4 bg-indigo-600 rounded-[10px] flex justify-center items-center gap-2 cursor-pointer hover:bg-indigo-700 transition-colors"
                    >
                      <div className="text-white text-lg">Save Changes</div>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


