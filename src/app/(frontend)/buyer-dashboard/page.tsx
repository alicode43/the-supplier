"use client";

import Navbar from './Navbar';
import React, { useState } from "react";
import Image from "next/image";

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

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

  <section className="w-full overflow-x-auto">
    <table className="min-w-max w-full table-auto border-collapse border border-zinc-200 rounded-lg">
      <thead>
        <tr className="bg-white">
          <th className="text-left text-indigo-600 text-base font-normal font-['Inter'] leading-normal px-4 py-2">
            2 Commissaires contrôleurs
          </th>
          <th className="text-right px-4 py-2">
            {/* Pagination Controls */}
            <div className="inline-flex items-center border border-zinc-200 rounded-lg overflow-hidden">
              <button className="h-9 px-2 bg-white border-r border-zinc-300">
                <div className="w-5 h-5 relative">
                  <div className="w-1.5 h-2.5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-500" />
                </div>
              </button>

              {["1", "2", "3", "...", "8", "9", "10"].map((page, index) => (
                <button
                  key={index}
                  className={`h-9 px-4 ${
                    page === "1"
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-zinc-800"
                  } text-sm font-normal font-['Inter'] leading-tight border-r border-zinc-300 last:border-none`}
                >
                  {page}
                </button>
              ))}

              <button className="h-9 px-2 bg-white border-l border-zinc-300">
                <div className="w-5 h-5 relative">
                  <div className="w-1.5 h-2.5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-500" />
                </div>
              </button>
            </div>
          </th>
        </tr>
      </thead>
    </table>
  </section>;
  
  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Navbar />
      <section className="container mx-auto px-4 py-6 sm:w-11/12">
        <div className="mb-8 mt-4">
          <h1 className="text-start text-neutral-800 text-3xl font-bold transition-all duration-300 hover:text-blue-600 cursor-pointer sm:text-4xl md:text-5xl">
            Buyer Dashboard
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
                    Active Requirements
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
                    Quotes Received
                  </div>
                  <div className="text-neutral-800 text-3xl font-bold font-['Nunito_Sans'] tracking-wide">
                    12
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

          {/* Pending Approvals Card */}
          <div className="p-5 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex flex-col justify-start items-start gap-4">
              <div className="w-full flex justify-between items-start">
                <div className="flex-1 flex flex-col gap-2.5">
                  <div className="opacity-70 text-neutral-800 text-base font-semibold font-['Nunito_Sans']">
                    Pending Approvals
                  </div>
                  <div className="text-neutral-800 text-3xl font-bold font-['Nunito_Sans'] tracking-wide">
                    3
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

          {/* Completed Orders Card */}
          <div className="p-5 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex flex-col justify-start items-start gap-4">
              <div className="w-full flex justify-between items-start">
                <div className="flex-1 flex flex-col gap-2.5">
                  <div className="opacity-70 text-neutral-800 text-base font-semibold font-['Nunito_Sans']">
                    Completed Orders
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

        {/* Recent Requirements Table */}
        <section className="w-full px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium text-black">
              Recent Requirements
            </h2>
            <button className="text-xs font-bold text-black underline">
              View All
            </button>
          </div>

          <div className="overflow-x-auto bg-white rounded-2xl shadow-sm">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-extrabold text-black">
                    Lead ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-extrabold text-black">
                    Part Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-extrabold text-black font-['Nunito_Sans']">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-extrabold text-black font-['Nunito_Sans']">
                    Material
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-extrabold text-black font-['Nunito_Sans']">
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-extrabold text-black font-['Nunito_Sans']">
                    Your Price/Pcs
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-extrabold text-black font-['Nunito_Sans']">
                    Your Lead Time
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-extrabold text-black font-['Nunito_Sans']">
                    Submitted On
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-extrabold text-black font-['Nunito_Sans']">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm text-black font-semibold">
                <tr>
                  <td className="px-4 py-3">L1001</td>
                  <td className="px-4 py-3">PCB Assembly</td>
                  <td className="px-4 py-3">Electronics</td>
                  <td className="px-4 py-3">FR4</td>
                  <td className="px-4 py-3">500</td>
                  <td className="px-4 py-3">₹25,000</td>
                  <td className="px-4 py-3">15-Jan-2023</td>
                  <td className="px-4 py-3">12-May-2023</td>
                  <td className="px-4 py-3">
                    <button className="text-indigo-500 text-xs font-bold border border-indigo-500 rounded-lg px-3 py-1">
                      View
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">L1003</td>
                  <td className="px-4 py-3">Machined Shaft</td>
                  <td className="px-4 py-3">Machining</td>
                  <td className="px-4 py-3">Steel</td>
                  <td className="px-4 py-3">800</td>
                  <td className="px-4 py-3">₹1,25,000</td>
                  <td className="px-4 py-3">22-Feb-2023</td>
                  <td className="px-4 py-3">10-May-2023</td>
                  <td className="px-4 py-3">
                    <button className="text-indigo-500 text-xs font-bold border border-indigo-500 rounded-lg px-3 py-1">
                      View
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">L1004</td>
                  <td className="px-4 py-3">Plastic Housing</td>
                  <td className="px-4 py-3">Plastic Molding</td>
                  <td className="px-4 py-3">ABS</td>
                  <td className="px-4 py-3">3,000</td>
                  <td className="px-4 py-3">₹74,000</td>
                  <td className="px-4 py-3">10-Mar-2023</td>
                  <td className="px-4 py-3">20-May-2023</td>
                  <td className="px-4 py-3">
                    <button className="text-indigo-500 text-xs font-bold border border-indigo-500 rounded-lg px-3 py-1">
                      View
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">L1002</td>
                  <td className="px-4 py-3">Rubber Gasket</td>
                  <td className="px-4 py-3">Molding</td>
                  <td className="px-4 py-3">Silicone Rubber</td>
                  <td className="px-4 py-3">5,000</td>
                  <td className="px-4 py-3">₹55,000</td>
                  <td className="px-4 py-3">05-Apr-2023</td>
                  <td className="px-4 py-3">28-May-2023</td>
                  <td className="px-4 py-3">
                    <button className="text-indigo-500 text-xs font-bold border border-indigo-500 rounded-lg px-3 py-1">
                      View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="p-4">
          <div className="flex flex-col gap-2.5">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium text-black">
                Recent Quotes
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
                <tbody className="font-['Nunito_Sans']">
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

        <section className="w-full overflow-x-auto p-2">
          <div className="min-w-max w-full border border-zinc-200 rounded-lg bg-white">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 py-3">
              <span className="text-indigo-600 text-base font-normal leading-normal mb-2 sm:mb-0">
                {currentPage} Commissaires contrôleurs
              </span>

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
                {renderPageNumbers()}

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


