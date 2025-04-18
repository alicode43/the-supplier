"use client";

import Navbar from "@/components/dashboard/Navbar";
 
import React, { useState } from "react";
import Image from "next/image";

// Define quotes data array
const quotes = [
  {
    offerId: "Q1001",
    leadId: "L1001",
    part: "Metal Bracket",
    price: "₹25,000",
    leadTime: "15-Jan-2023",
    submitted: "12-May-2023",
    status: "Approved",
    statusColor: "teal-500",
  },
  {
    offerId: "Q1002",
    leadId: "L1003",
    part: "PCB Assembly",
    price: "₹1,25,000",
    leadTime: "22-Feb-2023",
    submitted: "10-May-2023",
    status: "Approved",
    statusColor: "teal-500",
  },
  {
    offerId: "Q1003",
    leadId: "L1004",
    part: "Aluminum Enclosure",
    price: "₹74,000",
    leadTime: "10-Mar-2023",
    submitted: "20-May-2023",
    status: "Rejected",
    statusColor: "red-600",
  },
  {
    offerId: "Q1004",
    leadId: "L1002",
    part: "Plastic Housing",
    price: "₹55,000",
    leadTime: "05-Apr-2023",
    submitted: "28-May-2023",
    status: "Approved",
    statusColor: "teal-500",
  },
];

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState('All');
  const totalPages = 10;

  // Filter quotes based on active filter
  const filteredQuotes = quotes.filter(quote => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Pending') return quote.status === 'Pending';
    if (activeFilter === 'Accepted') return quote.status === 'Approved';
    if (activeFilter === 'Rejected') return quote.status === 'Rejected';
    return true;
  });

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
           Dashboard
          </h1>
          <div className="w-24 h-1 bg-blue-500 mt-2 rounded-full hover:w-32 transition-all duration-300"></div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Active Requirements Card */}
          <div className="p-5 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex flex-col justify-start items-start gap-4">
              <div className="w-full flex justify-between items-start">
                <div className="flex-1 flex flex-col gap-2.5">
                  <div className="opacity-70 text-neutral-800 text-base font-semibold">
                  Total Quotes
                  </div>
                  <div className="text-neutral-800 text-3xl font-bold tracking-wide">
                    5
                  </div>
                </div>
                <Image
                  src="/dashboard/group.png"
                  alt="Active Requirements"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Quotes Received Card */}
          <div className="p-5 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex flex-col justify-start items-start gap-4">
              <div className="w-full flex justify-between items-start">
                <div className="flex-1 flex flex-col gap-2.5">
                  <div className="opacity-70 text-neutral-800 text-base font-semibold font-['Nunito_Sans']">
                  Rejected
                  </div>
                  <div className="text-neutral-800 text-3xl font-bold font-['Nunito_Sans'] tracking-wide">
                    12
                  </div>
                </div>
                <Image
                  src="/dashboard/time.png"
                  alt="Active Requirements"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Pending Approvals Card */}
          <div className="p-5 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex flex-col justify-start items-start gap-4">
              <div className="w-full flex justify-between items-start">
                <div className="flex-1 flex flex-col gap-2.5">
                  <div className="opacity-70 text-neutral-800 text-base font-semibold font-['Nunito_Sans']">
                    Pending  
                  </div>
                  <div className="text-neutral-800 text-3xl font-bold font-['Nunito_Sans'] tracking-wide">
                    3
                  </div>
                </div>
                <Image
                  src="/dashboard/box.png"
                  alt="Active Requirements"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Completed Orders Card */}
          <div className="p-5 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex flex-col justify-start items-start gap-4">
              <div className="w-full flex justify-between items-start">
                <div className="flex-1 flex flex-col gap-2.5">
                  <div className="opacity-70 text-neutral-800 text-base font-semibold font-['Nunito_Sans']">
                  Accepted
                  </div>
                  <div className="text-neutral-800 text-3xl font-bold font-['Nunito_Sans'] tracking-wide">
                    8
                  </div>
                </div>
                <Image
                  src="/dashboard/graph.png"
                  alt="Active Requirements"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quote Filters */}
        <section className="p-4">
          <div className="self-stretch flex flex-col justify-start items-start gap-3.5 w-full overflow-hidden">
            <div className="opacity-60 justify-start text-neutral-800 text-sm font-semibold">
              Items Found: {filteredQuotes.length}
            </div>
            <div className="flex flex-col justify-start items-start gap-3.5 w-full">
              <div className="flex justify-start items-center gap-4 md:gap-8 overflow-x-auto w-full py-2">
                <button
                  onClick={() => setActiveFilter('All')}
                  className={`whitespace-nowrap justify-start text-base font-normal ${activeFilter === 'All' ? 'text-indigo-600 font-medium' : 'text-zinc-500'}`}
                >
                  All Quotes
                </button>
                <button
                  onClick={() => setActiveFilter('Pending')}
                  className={`whitespace-nowrap justify-start text-base font-normal ${activeFilter === 'Pending' ? 'text-indigo-600 font-medium' : 'text-zinc-500'}`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setActiveFilter('Accepted')}
                  className={`whitespace-nowrap justify-start text-base font-normal ${activeFilter === 'Accepted' ? 'text-indigo-600 font-medium' : 'text-zinc-500'}`}
                >
                  Accepted
                </button>
                <button
                  onClick={() => setActiveFilter('Rejected')}
                  className={`whitespace-nowrap justify-start text-base font-normal ${activeFilter === 'Rejected' ? 'text-indigo-600 font-medium' : 'text-zinc-500'}`}
                >
                  Rejected
                </button>
              </div>
              <div className="w-full h-0 outline-2 outline-offset-[-1px] outline-zinc-200"></div>
              <div className="relative w-full">
                <div 
                  className={`h-0 outline-[3px] outline-offset-[-1.50px] outline-indigo-600 absolute transition-all duration-300`}
                  style={{
                    width: activeFilter === 'All' ? '80px' : activeFilter === 'Pending' ? '70px' : activeFilter === 'Accepted' ? '80px' : '70px',
                    left: activeFilter === 'All' ? '0' : activeFilter === 'Pending' ? '80px' : activeFilter === 'Accepted' ? '150px' : '230px',
                  }}
                ></div>
              </div>
            </div>
          </div>
        </section>

        <section className="p-4">
          <div className="flex flex-col gap-2.5">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium text-black">
              My Submitted Quotes
              </h2>
              <a
                href="#"
                className="text-xs font-bold text-black underline"
              >
                View All
              </a>
            </div>
            
            <div className="overflow-auto">
              <table className="min-w-full bg-white rounded-2xl overflow-hidden text-sm text-left">
                <thead className="bg-gray-100">
                  <tr className="text-black font-extrabold">
                    <th className="px-4 py-3">Offer ID</th>
                    <th className="px-4 py-3">Lead ID</th>
                    <th className="px-4 py-3">Part Name</th>
                    <th className="px-4 py-3">Your Price/Pcs</th>
                    <th className="px-4 py-3">Your Lead Time</th>
                    <th className="px-4 py-3">Submitted On</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="">
                  {(() => {
                    // Create array to store table rows
                    const tableRows = [];
                    
                    // Use for loop to generate rows for filtered quotes
                    for (let i = 0; i < filteredQuotes.length; i++) {
                      const quote = filteredQuotes[i];
                      tableRows.push(
                        <tr key={i} className="border-t border-gray-300">
                          <td className="px-4 py-3 font-semibold text-black">
                            {quote.offerId}
                          </td>
                          <td className="px-4 py-3 font-semibold text-black">
                            {quote.leadId}
                          </td>
                          <td className="px-4 py-3 font-semibold text-black">
                            {quote.part}
                          </td>
                          <td className="px-4 py-3 font-semibold text-black">
                            {quote.price}
                          </td>
                          <td className="px-4 py-3 font-semibold text-black">
                            {quote.leadTime}
                          </td>
                          <td className="px-4 py-3 font-semibold text-black">
                            {quote.submitted}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={
                                quote.status === "Approved"
                                  ? "inline-block px-3 py-1 text-xs font-bold text-teal-500 bg-teal-50 rounded"
                                  : "inline-block px-3 py-1 text-xs font-bold text-red-600 bg-red-50 rounded"
                              }
                            >
                              {quote.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex space-x-2">
                              <button className="px-4 py-1 text-xs font-bold text-indigo-500 border border-indigo-500 rounded-lg hover:bg-indigo-50">
                                View
                              </button>
                              <button className="px-4 py-1 text-xs font-bold text-red-500 border border-red-500 rounded-lg hover:bg-red-50">
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                    
                    return tableRows;
                  })()}
                </tbody>
              </table>
            </div>
          </div>
        </section>

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


