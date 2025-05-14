"use client";

import Navbar from "@/components/dashboard/Navbar";
import LeadsTable from "@/components/dashboard/LeadsTable";
import React, { useState } from "react";
import Image from "next/image";

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

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
      viewUrl: "/supplier-dashboard/lead/L1001",
      attachments: null // Add this line to fix the type error
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
      viewUrl: "/supplier-dashboard/lead/L1003",
      attachments: null // Add this line to fix the type error
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
      viewUrl: "/supplier-dashboard/lead/L1004",
      attachments: null // Add this line to fix the type error
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
      viewUrl: "/supplier-dashboard/lead/L1002",
      attachments: null // Add this line to fix the type error
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
           Supplier Dashboard
          </h1>
          <div className="w-24 h-1 bg-blue-500 mt-2 rounded-full hover:w-32 transition-all duration-300"></div>
        </div>

 
 <section>
 <div className="flex flex-col lg:flex-row justify-center items-stretch gap-5 w-full">
  {/* Card 1 - Available Leads */}
  <div className="flex-1 p-5 bg-white rounded-2xl flex flex-col gap-7">
    <div className="flex flex-col gap-9">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2.5">
          <h2 className="text-neutral-800 text-3xl font-bold tracking-wide ">
            Available Leads
          </h2>
          <p className="text-neutral-800 text-base font-semibold opacity-70 ">
            Browse and bid on available manufacturing leads.
          </p>
        </div>
        <Image
                     src="/dashboard/box.png"
                     alt="Active Requirements"
                     width={48}
                     height={48}
                     className="object-contain"
                   />
      </div>
      <button className="w-24 h-7 p-2 rounded-lg  outline-1 outline-indigo-500 text-indigo-500 text-xs font-bold ">
        View Leads
      </button>
    </div>
  </div>

  {/* Card 2 - My Quotes */}
  <div className="flex-1 p-5 bg-white rounded-2xl flex flex-col gap-7">
    <div className="flex flex-col gap-9">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2.5">
          <h2 className="text-neutral-800 text-3xl font-bold tracking-wide ">
            My Quotes
          </h2>
          <p className="text-neutral-800 text-base font-semibold opacity-70 ">
            View and manage all your submitted quotes.
          </p>
        </div>
        <Image
                     src="/dashboard/time.png"
                     alt="Active Requirements"
                     width={48}
                     height={48}
                     className="object-contain"
                   />
      </div>
      <button className="w-24 h-7 p-2 rounded-lg  outline-1 outline-indigo-500 text-indigo-500 text-xs font-bold md:bottom-0 "> 
        View Quotes
      </button>
    </div>
  </div>

  {/* Card 3 - Profile */}
  <div className="flex-1 p-5 bg-white rounded-2xl flex flex-col gap-7">
    <div className="flex flex-col gap-9">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2.5">
          <h2 className="text-neutral-800 text-3xl font-bold tracking-wide ">
            Profile
          </h2>
          <p className="text-neutral-800 text-base font-semibold opacity-70 ">
            Update your company profile and capabilities.
          </p>
        </div>
        <Image
                     src="/dashboard/group.png"
                     alt="Active Requirements"
                     width={48}
                     height={48}
                     className="object-contain"
                   />
      </div>
      <button className="w-24 h-7 p-2 rounded-lg  outline-1 outline-indigo-500 text-indigo-500 text-xs font-bold ">
        Edit Profile
      </button>
    </div>
  </div>
</div>

 </section>

        {/* Using the new LeadsTable component */}
        <LeadsTable 
          leads={recentLeads} 
          viewAllUrl="/supplier-dashboard/leads"
        />

        <section className="p-4">
          <div className="flex flex-col gap-2.5">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium text-black">
                My Recent Quotes
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
                  {[
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
                  ].map((quote, index) => (
                    <tr key={index} className="border-t border-gray-300">
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
                        <button className="px-4 py-1 text-xs font-bold text-indigo-500 border border-indigo-500 rounded-lg">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
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


