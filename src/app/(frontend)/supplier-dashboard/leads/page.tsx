"use client";

import Navbar from "@/components/dashboard/Navbar";
import LeadsTable from "@/components/dashboard/LeadsTable";
import React, { useState } from "react";
 

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  // Filter states
  const [category, setCategory] = useState("All Categories");
  const [material, setMaterial] = useState("All Materials");
  const [minQuantity, setMinQuantity] = useState("");
  const [maxQuantity, setMaxQuantity] = useState("");
  const [buyerLocation, setBuyerLocation] = useState("All Locations");
  const [keyword, setKeyword] = useState("");
  const [postedWithin, setPostedWithin] = useState("Any Time");
  
  // Apply filters function
  const applyFilters = () => {
    // In a real app, this would filter the leads based on criteria or trigger an API call
    console.log("Applying filters:", {
      category, material, minQuantity, maxQuantity, buyerLocation, keyword, postedWithin
    });
  };

  // Sample lead data
  const recentLeads = [
    {
      leadId: "L1001",
      partName: "PCB Assembly",
      category: "Electronics",
      material: "FR4",
      quantity: "500",
      price: "₹25,000",
      leadTime: "15-Jan-2023",
      submitted: "12-May-2023",
      viewUrl: "/supplier-dashboard/lead/L1001"
    },
    {
      leadId: "L1003",
      partName: "Machined Shaft",
      category: "Machining",
      material: "Steel",
      quantity: "800",
      price: "₹1,25,000",
      leadTime: "22-Feb-2023",
      submitted: "10-May-2023",
      viewUrl: "/supplier-dashboard/lead/L1003"
    },
    {
      leadId: "L1004",
      partName: "Plastic Housing",
      category: "Plastic Molding",
      material: "ABS",
      quantity: "3,000",
      price: "₹74,000",
      leadTime: "10-Mar-2023",
      submitted: "20-May-2023",
      viewUrl: "/supplier-dashboard/lead/L1004"
    },
    {
      leadId: "L1002",
      partName: "Rubber Gasket",
      category: "Molding",
      material: "Silicone Rubber",
      quantity: "5,000",
      price: "₹55,000",
      leadTime: "05-Apr-2023",
      submitted: "28-May-2023",
      viewUrl: "/supplier-dashboard/lead/L1002"
    }
  ];

  const renderPageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages.map((page, index) => (
      <button
        key={index}
        onClick={() => typeof page === "number" && setCurrentPage(page)}
        className={`h-9 px-4 ${
          currentPage === page
            ? "bg-indigo-600 text-white"
            : "bg-white text-zinc-800 hover:bg-zinc-100"
        } text-sm font-normal font-['Inter'] leading-tight border-r border-zinc-300 last:border-none`}
        disabled={page === "..."}
      >
        {page}
      </button>
    ));
  };

  const goToPrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

 
  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Navbar />
      <section className="container mx-auto px-4 py-6 sm:w-11/12">
        <div className="mb-8 mt-4">
          <h1 className="text-start text-neutral-800 text-3xl font-bold transition-all duration-300 hover:text-blue-600 cursor-pointer sm:text-4xl md:text-5xl">
          Available Leads
          </h1>
          <div className="w-24 h-1 bg-blue-500 mt-2 rounded-full hover:w-32 transition-all duration-300"></div>
        </div>
        
        {/* Lead Filters Component */}
        <div className="self-stretch inline-flex flex-col justify-start items-start gap-2.5 mb-8">
          <div className="justify-start text-black text-xl font-medium font-['Inter']">Lead Filters</div>
          <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
            <div className="self-stretch rounded-xl flex flex-col justify-start items-start">
              <div className="self-stretch px-4 sm:px-8 pt-4 sm:pt-8 pb-6 sm:pb-11 bg-white rounded-xl flex flex-col justify-start items-start gap-6 sm:gap-9 w-full">
                <div className="self-stretch flex flex-col justify-start items-start gap-4 w-full">
                  <div className="self-stretch grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                    {/* First column */}
                    <div className="flex flex-col justify-start items-start gap-4 w-full">
                      <div className="w-full inline-flex flex-col justify-start items-start gap-2">
                        <label className="text-black text-base font-normal">Category</label>
                        <select 
                          className="w-full p-3 sm:p-4 rounded-xl border border-zinc-100 text-sm"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option>All Categories</option>
                          <option>Electronics</option>
                          <option>Machining</option>
                          <option>Plastic Molding</option>
                          <option>Molding</option>
                        </select>
                      </div>
                      
                      <div className="w-full inline-flex flex-col justify-start items-start gap-2">
                        <label className="text-black text-base font-normal">Min Quantity</label>
                        <input
                          type="number"
                          placeholder="Min"
                          className="w-full p-3 sm:p-4 rounded-xl border border-zinc-100 text-sm"
                          value={minQuantity}
                          onChange={(e) => setMinQuantity(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    {/* Second column */}
                    <div className="flex flex-col justify-start items-start gap-4 w-full">
                      <div className="w-full inline-flex flex-col justify-start items-start gap-2">
                        <label className="text-black text-base font-normal">Material</label>
                        <select 
                          className="w-full p-3 sm:p-4 rounded-xl border border-zinc-100 text-sm"
                          value={material}
                          onChange={(e) => setMaterial(e.target.value)}
                        >
                          <option>All Materials</option>
                          <option>FR4</option>
                          <option>Steel</option>
                          <option>ABS</option>
                          <option>Silicone Rubber</option>
                        </select>
                      </div>
                      
                      <div className="w-full inline-flex flex-col justify-start items-start gap-2">
                        <label className="text-black text-base font-normal">Max Quantity</label>
                        <input
                          type="number"
                          placeholder="Max"
                          className="w-full p-3 sm:p-4 rounded-xl border border-zinc-100 text-sm"
                          value={maxQuantity}
                          onChange={(e) => setMaxQuantity(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    {/* Third column */}
                    <div className="flex flex-col justify-start items-start gap-4 w-full">
                      <div className="w-full inline-flex flex-col justify-start items-start gap-2">
                        <label className="text-black text-base font-normal">Buyer Location</label>
                        <select 
                          className="w-full p-3 sm:p-4 rounded-xl border border-zinc-100 text-sm"
                          value={buyerLocation}
                          onChange={(e) => setBuyerLocation(e.target.value)}
                        >
                          <option>All Locations</option>
                          <option>Delhi</option>
                          <option>Mumbai</option>
                          <option>Bangalore</option>
                          <option>Chennai</option>
                        </select>
                      </div>
                      
                      <div className="w-full inline-flex flex-col justify-start items-start gap-2">
                        <label className="text-black text-base font-normal">Keyword</label>
                        <input
                          type="text"
                          placeholder="Search..."
                          className="w-full p-3 sm:p-4 rounded-xl border border-zinc-100 text-sm"
                          value={keyword}
                          onChange={(e) => setKeyword(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    {/* Fourth column */}
                    <div className="flex flex-col justify-between items-start gap-4 w-full">
                      <div className="w-full inline-flex flex-col justify-start items-start gap-2">
                        <label className="text-black text-base font-normal">Posted Within</label>
                        <select 
                          className="w-full p-3 sm:p-4 rounded-xl border border-zinc-100 text-sm"
                          value={postedWithin}
                          onChange={(e) => setPostedWithin(e.target.value)}
                        >
                          <option>Any Time</option>
                          <option>Last 24 hours</option>
                          <option>Last 7 days</option>
                          <option>Last 30 days</option>
                          <option>Last 90 days</option>
                        </select>
                      </div>
                      
                      <button 
                        className="w-full h-12 p-4 bg-indigo-600 rounded-[10px] inline-flex justify-center items-center gap-2 text-white text-lg font-normal hover:bg-indigo-700 transition-colors"
                        onClick={applyFilters}
                      >
                        Apply Filters
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Using the new LeadsTable component */}
        <LeadsTable 
          leads={recentLeads} 
          viewAllUrl="/supplier-dashboard/leads"
        />
 

        <div className="sm:h-10"></div>

            <section className="overflow-x-auto p-2 fixed  bottom-0 right-0 max-w-fit font-inter">
                <div className="border border-zinc-200 rounded-lg bg-white">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 py-3">
                    <div className="inline-flex flex-wrap items-center border border-zinc-200 rounded-lg overflow-hidden">
                      {/* Prev */}
                      <button
                        onClick={goToPrevious}
                        className="h-9 px-2 bg-white border-r border-zinc-300 hover:bg-zinc-100 disabled:opacity-50"
                        disabled={currentPage === 1}
                        aria-label="Previous"
                      >
                        <div className="w-4 h-4 border-t-2 border-l-2 border-zinc-500 transform rotate-[-45deg] mt-1 ml-1"></div>
                      </button>
      
                      {/* Pages */}
                      {renderPageNumbers().map((btn, i) => {
                      
                        return React.cloneElement(btn, {
                          key: i,
                          className: btn.props.className + " font-inter"
                        });
                      })}
      
                      {/* Next */}
                      <button
                        onClick={goToNext}
                        className="h-9 px-2 bg-white border-l border-zinc-300 hover:bg-zinc-100 disabled:opacity-50"
                        disabled={currentPage === totalPages}
                        aria-label="Next"
                      >
                        <div className="w-4 h-4 border-t-2 border-l-2 border-zinc-500 transform rotate-135 mt-1 ml-1"></div>
                      </button>
                    </div>
                  </div>
                </div>
              </section>
      </section>
    </div>
  );
}


