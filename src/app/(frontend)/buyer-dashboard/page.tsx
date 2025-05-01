"use client";

import Navbar from './Navbar';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import axios from 'axios';

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  const accessToken = Cookies.get("accessToken")
 
  interface Requirement {
    leadId: string;
    id: string;
    partName: string;
    category: string;
    material: string;
    quantity: number;
    targetPrice: number;
    leadTime: string;
    createdAt: string;
 
  }
  
  const [requirementsData, setRequirementsData] = useState<Requirement[]>([]);

  const [offersData, setOffersData] = useState<Requirement[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // console.log(quotes," ",loading," ",error)

  const url =process.env.NEXT_PUBLIC_BACKEND_URL

  useEffect(() => {
    // Check if user is authenticated
    if (!accessToken) {
      window.location.href = "/signin";
    } else {
      // console.log("Access Token:", accessToken);
      
      // Define the function to fetch quotes
      const fetchQuotes = async () => {
        try {
          setLoading(true);
          setError(null);
          
          // Make API request with authentication header
          const response = await axios.get(
            url+'/api/v1/supply/getAllQuotes',
            {
              headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
              }
            }
          );
          
          // console.log("Quotes response:", response.data.data);
          
          // Check if response is successful
          if (response.data.success) {
            // setQuotes(response.data.data);
            setRequirementsData(response.data.data);
          } else {
            setError(response.data.message || "Failed to fetch quotes");
          }
        } catch (err) {
          console.error("Error fetching quotes:", err);
          
          // Handle different error types
          
        } finally {
          setLoading(false);
        }
      };


      const fetchOffer = async () => {
        console.log("Fetching offers...");
        try {
          setLoading(true);
          setError(null);
          
          // Make API request with authentication header
          const response = await axios.get(
            url+'/api/v1/supply/buyerOffer',
            {
              headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
              }
            }
          );
          
          console.table( response.data.data);
          
          // Check if response is successful
          if (response.data.success) {
            // setQuotes(response.data.data);
            setOffersData(response.data.data);
            
          } else {
            setError(response.data.message || "Failed to fetch quotes");
          }
        } catch (err) {
          console.error("Error fetching quotes:", err);
          
          // Handle different error types
          
        } finally {
          setLoading(false);
        }
      };
      


      // Call the fetch function
      fetchQuotes();
      fetchOffer();
    }
  }, [accessToken]);


  
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
        } text-sm font-normal   leading-tight border-r border-zinc-300 last:border-none`}
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
          <th className="text-left text-indigo-600 text-base font-normal leading-normal px-4 py-2">
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
                  } text-sm font-normal  leading-tight border-r border-zinc-300 last:border-none`}
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
                  <div className="opacity-70 text-neutral-800 text-base font-semibold  ">
                    Quotes Received
                  </div>
                  <div className="text-neutral-800 text-3xl font-bold   tracking-wide">
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
                  <div className="opacity-70 text-neutral-800 text-base font-semibold  ">
                    Pending Approvals
                  </div>
                  <div className="text-neutral-800 text-3xl font-bold   tracking-wide">
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
                  <div className="opacity-70 text-neutral-800 text-base font-semibold  ">
                    Completed Orders
                  </div>
                  <div className="text-neutral-800 text-3xl font-bold   tracking-wide">
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
                  <th className="px-4 py-3 text-left text-sm font-extrabold text-black  ">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-extrabold text-black  ">
                    Material
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-extrabold text-black  ">
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-extrabold text-black  ">
                    Your Price/Pcs
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-extrabold text-black  ">
                    Your Lead Time
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-extrabold text-black  ">
                    Submitted On
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-extrabold text-black  ">
                    Action
                  </th>
                </tr>
              </thead>
          <tbody className="divide-y divide-gray-200 text-sm text-black font-semibold">
  {requirementsData.map((item) => (
    <tr key={item.leadId}>
      <td className="px-4 py-3">{item.leadId}</td>
      <td className="px-4 py-3">{item.partName}</td>
      <td className="px-4 py-3">{item.category}</td>
      <td className="px-4 py-3">{item.material}</td>
      <td className="px-4 py-3">{item.quantity}</td>
      <td className="px-4 py-3">{item.targetPrice}</td>
      <td className="px-4 py-3">{item.leadTime}</td>
      <td className="px-4 py-3">{item.
createdAt}</td>
      <td className="px-4 py-3">
        <button 
          // onClick={() => router.push(`/buyer-dashboard/view-requirement/${item.id}`)}
          className="text-indigo-500 text-xs font-bold border border-indigo-500 rounded-lg px-3 py-1 hover:bg-indigo-50"
        >
          View
        </button>
      </td>
    </tr>
  ))}
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
                    <th className="px-4 py-3">Lead ID</th>
                    <th className="px-4 py-3">Part Name</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Quantity</th>
                    <th className="px-4 py-3">Admin Price</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Created Date</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {offersData.map((offer, index) => (
                    <React.Fragment key={index}>
                      <tr className="border-t border-gray-300 bg-white hover:bg-gray-50">
                        <td className="px-4 py-3 font-semibold text-black">
                          {offer.leadId}
                        </td>
                        <td className="px-4 py-3 font-semibold text-black">
                          {offer.partName}
                        </td>
                        <td className="px-4 py-3 font-semibold text-black">
                          {offer.category}
                        </td>
                        <td className="px-4 py-3 font-semibold text-black">
                          {offer.quantity}
                        </td>
                        <td className="px-4 py-3 font-semibold text-black">
                          ₹{offer.adminOfferPrice?.toLocaleString() || 'N/A'}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-block px-3 py-1 text-xs font-bold rounded
                            ${offer.status === 'approved' ? 'text-teal-500 bg-teal-50' : 
                              offer.status === 'pending' ? 'text-yellow-600 bg-yellow-50' : 
                              'text-red-600 bg-red-50'}`}
                          >
                            {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-semibold text-black">
                          {new Date(offer.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <button className="px-4 py-1 text-xs font-bold text-indigo-500 border border-indigo-500 rounded-lg hover:bg-indigo-50">
                            Details
                          </button>
                        </td>
                      </tr>
                      
                      {/* Supplier Offers Section */}
                      {offer.supplierOffers && offer.supplierOffers.length > 0 && (
                        <tr>
                          <td colSpan={8} className="px-0 py-0">
                            <div className="bg-gray-50 px-8 py-3">
                              <h4 className="text-sm font-bold text-gray-700 mb-2">Supplier Offers</h4>
                              <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-200 rounded-md">
                                  <thead className="bg-gray-100">
                                    <tr className="text-xs text-gray-700">
                                      <th className="px-3 py-2">Supplier</th>
                                      {/* <th className="px-3 py-2">Price</th> */}
                                      <th className="px-3 py-2">Status</th>
                                      <th className="px-3 py-2">Date</th>
                                      <th className="px-3 py-2">Note</th>
                                      <th className="px-3 py-2">Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {offer.supplierOffers.map((supplier, idx) => (
                                      <tr key={idx} className="border-t border-gray-200 hover:bg-gray-50">
                                        <td className="px-3 py-2 text-xs font-medium">
                                          {supplier.supplierName}
                                        </td>
                                        {/* <td className="px-3 py-2 text-xs font-medium">
                                          ₹{supplier.offerPrice?.toLocaleString() || 'N/A'}
                                        </td> */}
                                        <td className="px-3 py-2">
                                          <span className={`inline-block px-2 py-1 text-xs font-bold rounded
                                            ${supplier.status === 'approved' ? 'text-teal-500 bg-teal-50' : 
                                              supplier.status === 'pending' ? 'text-yellow-600 bg-yellow-50' : 
                                              'text-red-600 bg-red-50'}`}
                                          >
                                            {supplier.status.charAt(0).toUpperCase() + supplier.status.slice(1)}
                                          </span>
                                        </td>
                                        <td className="px-3 py-2 text-xs">
                                          {supplier.offerDate ? new Date(supplier.offerDate).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className="px-3 py-2 text-xs max-w-[150px] truncate">
                                          {supplier.note || 'No notes'}
                                        </td>
                                        <td className="px-3 py-2">
                                          <button className="px-3 py-1 text-xs font-medium text-blue-500 hover:underline">
                                            View
                                          </button>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                  
                  {offersData.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-4 py-6 text-center text-gray-500">
                        No quote offers available
                      </td>
                    </tr>
                  )}
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


