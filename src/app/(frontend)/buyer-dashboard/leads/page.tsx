"use client";

import Navbar from '../Navbar';
import { ChevronDownIcon, Undo2Icon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
 
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
        } text-sm font-normal font-['Inter'] leading-tight border-r border-zinc-300 last:border-none font-inter`}
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
          <h1 className="text-start text-neutral-800 text-3xl font-bold transition-all duration-300 hover:text-blue-600 cursor-pointer sm:text-4xl md:text-5xl font-inter">
          Available Leads
          </h1>
          <div className="w-24 h-1 bg-blue-500 mt-2 rounded-full hover:w-32 transition-all duration-300"></div>
        </div>


        {/* filter */}
        <section className="flex flex-wrap gap-2 font-inter my-6 md:my-10">
            <button className="border border-gray-300 rounded-md md:rounded-none md:rounded-tl-md md:rounded-bl-md p-2 md:p-4 px-4 md:px-8 flex items-center justify-center">
              <Image
                src={'/dashboard/filter.png'}
                width={20} 
                height={20} 
                alt="Filter Icon"
              />
            </button>
            <button className="border border-gray-300 rounded-md md:rounded-none p-2 md:p-4 px-4 md:px-8 text-sm md:text-base">Filter By</button>
            <button className="border border-gray-300 rounded-md md:rounded-none p-2 md:p-4 px-4 md:px-8 flex items-center gap-1 text-sm md:text-base"> 
              Date<ChevronDownIcon className="h-4 w-4 md:h-5 md:w-5"/>
            </button>
            <button className="border border-gray-300 rounded-md md:rounded-none p-2 md:p-4 px-4 md:px-8 flex items-center gap-1 text-sm md:text-base">
              Order Type<ChevronDownIcon className="h-4 w-4 md:h-5 md:w-5"/>
            </button>
            <button className="border border-gray-300 rounded-md md:rounded-none p-2 md:p-4 px-4 md:px-8 text-sm md:text-base">Order Status</button>
            <button className="border border-gray-300 rounded-md md:rounded-none md:rounded-tr-md md:rounded-br-md text-red-500 p-2 md:p-4 px-4 md:px-8 flex items-center gap-1 text-sm md:text-base">
              <Undo2Icon className="h-4 w-4 md:h-5 md:w-5"/> Reset Filter
            </button>
        </section>
       
    
        {/* Recent Requirements Table */}
        <section className="w-full px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium text-black font-inter">
            Available Manufacturing Leads
            </h2>
            <button className="text-xs font-bold text-black underline font-inter">
              View All
            </button>
          </div>

          <div className="overflow-x-auto bg-white rounded-2xl shadow-sm">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-extrabold text-black font-inter">
                    Lead ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-extrabold text-black font-inter">
                    Part Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-extrabold text-black font-inter">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-extrabold text-black font-inter">
                    Material
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-extrabold text-black font-inter">
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-extrabold text-black font-inter">
                    Your Price/Pcs
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-extrabold text-black font-inter">
                    Your Lead Time
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-extrabold text-black font-inter">
                    Submitted On
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-extrabold text-black font-inter">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm text-black font-semibold font-inter">
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

    

 

        <section className="overflow-x-auto p-2 fixed bottom-0 right-0 max-w-fit font-inter">
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


