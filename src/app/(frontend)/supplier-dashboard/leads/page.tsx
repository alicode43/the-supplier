"use client";

import Navbar from "@/components/dashboard/Navbar";
import LeadsTable from "@/components/dashboard/LeadsTable";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
 
// Define types
interface Attachment {
  url: string;
  name?: string;
}

interface Requirement {
  leadId: string;
  partName: string;
  attachments: Attachment[] | string[];
  category: string;
  material: string;
  quantity: string | number;
  targetPrice: string;
  notes?: string;
  leadTime: string;
  createdAt: string;
  status?: string;
  submitted?: string;
  viewUrl?: string;
  price?: string;
}

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  // State for requirements data and filtering
  const [requirementsData, setRequirementsData] = useState<Requirement[]>([]);
  const [filteredRequirements, setFilteredRequirements] = useState<Requirement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [category, setCategory] = useState("All Categories");
  const [material, setMaterial] = useState("All Materials");
  const [minQuantity, setMinQuantity] = useState("");
  const [maxQuantity, setMaxQuantity] = useState("");
  const [buyerLocation, setBuyerLocation] = useState("All Locations");
  const [keyword, setKeyword] = useState("");
  const [postedWithin, setPostedWithin] = useState("Any Time");
  
  // Search terms for filtering
  const [reqSearchTerm] = useState("");
  const [reqCategory] = useState("");
  const [reqDateRange] = useState("");
  
  // State for attachment modal
  const [isAttachmentModalOpen, setIsAttachmentModalOpen] = useState(false);
  const [currentAttachments] = useState<Attachment[]>([]);
  const [currentItemName] = useState("");
  
  const url = process.env.NEXT_PUBLIC_BACKEND_URL || "";
  const accessToken = Cookies.get("accessToken");

  // Fetch requirements data from API
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Make API request with authentication header
        const response = await axios.get(
          `${url}/api/v1/supply/getAllQuotes`,
          {
            headers: {
              "Authorization": `Bearer ${accessToken}`,
              "Content-Type": "application/json"
            }
          }
        );
        
        // Check if response is successful
        if (response.data.success) {
          const leads = response.data.data.map((lead: Requirement) => ({
            ...lead,
            viewUrl: `/supplier-dashboard/lead/${lead.leadId}`,
            price: `₹ ${lead.targetPrice ? lead.targetPrice.toString() : "0"}`
          }));
          
          setRequirementsData(leads);
          setFilteredRequirements(leads);
          
          // Update total pages based on data length
          setTotalPages(Math.ceil(leads.length / 10));
        } else {
          setError(response.data.message || "Failed to fetch leads");
          toast.error("Failed to fetch leads");
        }
      } catch (error) {
        const err = error as Error;
        console.error("Error fetching leads:", err);
        setError(err.message || "An error occurred while fetching leads");
        toast.error("Error loading leads data");
      } finally {
        setLoading(false);
      }
    };
    
    if (accessToken) {
      fetchLeads();
    } else {
      toast.error("Authentication required");
      setLoading(false);
    }
  }, [url, accessToken]);

  // Apply filters when filter values change for requirements
  useEffect(() => {
    if (!requirementsData || requirementsData.length === 0) return;

    let results = [...requirementsData];
    
    // Apply search filter
    if (reqSearchTerm) {
      results = results.filter(item => 
        (item.leadId?.toString() || "").includes(reqSearchTerm) ||
        (item.partName?.toLowerCase() || "").includes(reqSearchTerm.toLowerCase()) ||
        (item.category?.toLowerCase() || "").includes(reqSearchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (reqCategory) {
      results = results.filter(item => 
        (item.category?.toLowerCase() || "").includes(reqCategory.toLowerCase())
      );
    }
    
    // Apply date filter
    if (reqDateRange) {
      results = results.filter(item => item.createdAt && item.createdAt.includes(reqDateRange));
    }
    
    setFilteredRequirements(results);
  }, [requirementsData, reqSearchTerm, reqCategory, reqDateRange]);
  
  // Apply custom filters function
  const applyFilters = () => {
    let results = [...requirementsData];
    
    // Apply category filter
    if (category !== "All Categories") {
      results = results.filter(item => 
        (item.category?.toLowerCase() || "").includes(category.toLowerCase())
      );
    }
    
    // Apply material filter
    if (material !== "All Materials") {
      results = results.filter(item => 
        (item.material?.toLowerCase() || "").includes(material.toLowerCase())
      );
    }
    
    // Apply quantity range filter
    if (minQuantity) {
      results = results.filter(item => {
        const qty = typeof item.quantity === 'string' 
          ? parseInt(item.quantity.replace(/,/g, ''), 10) 
          : item.quantity;
        return !isNaN(qty) && qty >= parseInt(minQuantity, 10);
      });
    }
    
    if (maxQuantity) {
      results = results.filter(item => {
        const qty = typeof item.quantity === 'string' 
          ? parseInt(item.quantity.replace(/,/g, ''), 10) 
          : item.quantity;
        return !isNaN(qty) && qty <= parseInt(maxQuantity, 10);
      });
    }
    
    // Apply keyword filter
    if (keyword) {
      results = results.filter(item => 
        (item.partName?.toLowerCase() || "").includes(keyword.toLowerCase()) ||
        (item.notes?.toLowerCase() || "").includes(keyword.toLowerCase()) ||
        (item.material?.toLowerCase() || "").includes(keyword.toLowerCase())
      );
    }
    
    // Apply posted within filter
    if (postedWithin !== "Any Time") {
      const now = new Date();
      const cutoffDate = new Date();
      
      switch (postedWithin) {
        case "Last 24 hours":
          cutoffDate.setDate(now.getDate() - 1);
          break;
        case "Last 7 days":
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case "Last 30 days":
          cutoffDate.setDate(now.getDate() - 30);
          break;
        case "Last 90 days":
          cutoffDate.setDate(now.getDate() - 90);
          break;
      }
      
      results = results.filter(item => {
        const createdDate = new Date(item.createdAt);
        return createdDate >= cutoffDate;
      });
    }
    
    setFilteredRequirements(results);
    toast.info(`Found ${results.length} leads matching your criteria`);
  };
  
  // Open attachment modal function
  // const openAttachmentModal = (item: any) => {
  //   if (!item.attachments) {
  //     toast.info("No attachments available for this item.");
  //     return;
  //   }
    
  //   if (Array.isArray(item.attachments) && item.attachments.length > 0) {
  //     setCurrentAttachments(item.attachments);
  //     setCurrentItemName(item.partName || "Item");
  //     setIsAttachmentModalOpen(true);
  //   } else {
  //     setCurrentAttachments(Array.isArray(item.attachments) ? item.attachments : [item.attachments]);
  //     setCurrentItemName(item.partName || "Item");
  //     setIsAttachmentModalOpen(true);
  //   }
  // };

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

  // Get paginated data
  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    
    // Transform Requirement[] to Lead[] by making sure all required properties are present
    return filteredRequirements.slice(startIndex, endIndex).map(req => ({
      leadId: req.leadId,
      partName: req.partName || "",
      category: req.category || "",
      material: req.material || "",
      quantity: req.quantity || 0,
      price: req.price || `₹ ${req.targetPrice || "0"}`,  // Ensure price is not undefined
      leadTime: req.leadTime || "",
      submitted: req.submitted || req.createdAt || new Date().toISOString(), // Ensure submitted is not undefined
      viewUrl: req.viewUrl || `/supplier-dashboard/leads/${req.leadId}`,
      attachments: req.attachments || null
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      
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

        {/* Results count */}
        <div className="mb-4">
          <div className="text-neutral-800/60 text-sm font-semibold">
            Available Leads: {filteredRequirements ? filteredRequirements.length : 0}
            {loading && " (Loading...)"}
          </div>
        </div>

        {/* Using LeadsTable with real data */}
        {loading ? (
          <div className="flex justify-center items-center p-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-center">
            {error}
          </div>
        ) : (
          <LeadsTable 
            leads={getPaginatedData()}
            viewAllUrl="/supplier-dashboard/leads"
          />
        )}

        <div className="sm:h-10"></div>

        {/* Attachment Modal */}
        {isAttachmentModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-[80vh] overflow-hidden">
              <div className="flex justify-between items-center p-5 border-b">
                <h3 className="font-bold text-lg">
                  Attachments for {currentItemName}
                </h3>
                <button
                  onClick={() => setIsAttachmentModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  ✕
                </button>
              </div>

              <div className="p-5 overflow-y-auto" style={{ maxHeight: "60vh" }}>
                {currentAttachments && currentAttachments.length > 0 ? (
                  <div className="grid gap-4">
                    {currentAttachments.map((attachment, index) => {
                      const url = typeof attachment === 'object' ? attachment.url : attachment;
                      const name = typeof attachment === 'object' ? 
                        attachment.name || `Attachment ${index + 1}` : 
                        `Attachment ${index + 1}`;
                      const isImage = typeof url === 'string' && url.match(/\.(jpeg|jpg|gif|png)$/i);

                      return (
                        <div key={`attachment-${index}`} className="border rounded-lg overflow-hidden">
                          <div className="flex justify-between items-center p-4 bg-gray-50">
                            <span className="font-medium truncate">{name}</span>
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-500 hover:text-indigo-700"
                            >
                              Open
                            </a>
                          </div>
                          {isImage && (
                            <div className="p-4 flex justify-center">
                              <img 
                                src={url} 
                                alt={name} 
                                className="max-h-48 object-contain"
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-center text-gray-500">No attachments available</p>
                )}
              </div>

              <div className="border-t p-4 flex justify-end">
                <button
                  onClick={() => setIsAttachmentModalOpen(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

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


