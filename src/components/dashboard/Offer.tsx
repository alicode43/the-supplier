"use client";

import { useState, useEffect } from "react";
import { Eye, Edit, Trash2, ChevronDown, ChevronUp } from "lucide-react";

export default function Offer() {
  const [offers, setOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  
  // Sample data for demonstration
  const mockOffers = [
    {
      id: "201",
      leadId: "101",
      supplier: "ABC Manufacturing",
      askingPrice: "₹25,000",
      askingTime: "15-Jan-2023",
      status: "approved",
      submitDate: "12-May-2023",
      notes: "Initial offer from ABC Manufacturing. Quality guaranteed."
    },
    {
      id: "202",
      leadId: "101",
      supplier: "XYZ Metals",
      askingPrice: "₹1,25,000",
      askingTime: "22-Feb-2023",
      status: "approved",
      submitDate: "10-May-2023",
      notes: "Competitive offer with premium materials."
    },
    {
      id: "203",
      leadId: "102",
      supplier: "Precision Engineering",
      askingPrice: "₹74,000",
      askingTime: "10-Mar-2023",
      status: "rejected",
      submitDate: "20-May-2023",
      notes: "Rejected due to high costs and long lead time."
    },
    {
      id: "204",
      leadId: "103",
      supplier: "Plastic Innovations",
      askingPrice: "₹55,000",
      askingTime: "05-Apr-2023",
      status: "approved",
      submitDate: "28-May-2023",
      notes: "Approved with conditional terms."
    },
    {
      id: "205",
      leadId: "104",
      supplier: "MetalTech Solutions",
      askingPrice: "₹65,000",
      askingTime: "12-Apr-2023",
      status: "pending",
      submitDate: "01-Jun-2023",
      notes: "Under review by procurement team."
    }
  ];

  // Fetch offers on component mount
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      setOffers(mockOffers);
      setFilteredOffers(mockOffers);
      setIsLoading(false);
    }, 800);
  }, []);

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }

    const sortedOffers = [...filteredOffers].sort((a, b) => {
      const aValue = a[field]?.toString().toLowerCase() || "";
      const bValue = b[field]?.toString().toLowerCase() || "";
      
      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    setFilteredOffers(sortedOffers);
  };

  // View notes for an offer
  const handleViewNotes = (id, notes) => {
    // In a real app, this might open a modal or navigate to a details page
    alert(`Notes for offer #${id}: ${notes}`);
  };

  // Edit offer
  const handleEditOffer = (id) => {
    // In a real app, this would navigate to edit form or open a modal
    alert(`Edit offer #${id}`);
  };

  // Delete offer
  const handleDeleteOffer = (id) => {
    // In a real app, this would call an API endpoint
    if (confirm(`Are you sure you want to delete offer #${id}?`)) {
      setOffers(offers.filter(offer => offer.id !== id));
      setFilteredOffers(filteredOffers.filter(offer => offer.id !== id));
    }
  };

  // Render status badge based on status
  const renderStatusBadge = (status) => {
    switch(status.toLowerCase()) {
      case 'approved':
        return (
          <div className="w-24 h-7 px-4 py-[5px] relative flex justify-center items-center">
            <div className="absolute inset-0 opacity-20 bg-teal-500 rounded"></div>
            <div className="text-teal-500 text-xs font-bold">Approved</div>
          </div>
        );
      case 'rejected':
        return (
          <div className="w-24 h-7 px-4 py-[5px] relative flex justify-center items-center">
            <div className="absolute inset-0 opacity-20 bg-red-600 rounded"></div>
            <div className="text-red-600 text-xs font-bold">Rejected</div>
          </div>
        );
      case 'pending':
        return (
          <div className="w-24 h-7 px-4 py-[5px] relative flex justify-center items-center">
            <div className="absolute inset-0 opacity-20 bg-amber-500 rounded"></div>
            <div className="text-amber-500 text-xs font-bold">Pending</div>
          </div>
        );
      default:
        return <div>{status}</div>;
    }
  };

  return (
    <div className="self-stretch px-5 py-2.5 flex flex-col gap-2.5">
      {/* Header */}
      <div className="flex flex-col gap-2.5 overflow-hidden">
        <h1 className="text-neutral-800 text-3xl font-bold font-['Nunito_Sans']">Offers Management</h1>
      </div>
      
      {/* Divider */}
      <div className="h-px opacity-60 bg-black/60"></div>
      
      {/* Results count */}
      <div className="flex flex-col overflow-hidden">
        <div className="opacity-60 text-neutral-800 text-sm font-semibold">
          Items Found: {filteredOffers.length}
        </div>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <div className="bg-white rounded-2xl shadow-sm">
          {isLoading ? (
            <div className="py-20 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-sky-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-gray-600">Loading offers...</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  {[
                    { id: "id", label: "OFFER ID", sortable: true },
                    { id: "leadId", label: "NAME", sortable: true },
                    { id: "supplier", label: "SUPPLIER", sortable: true },
                    { id: "askingPrice", label: "ASKING PRICE", sortable: true },
                    { id: "askingTime", label: "ASKING TIME", sortable: true },
                    { id: "status", label: "STATUS", sortable: true },
                    { id: "submitDate", label: "SUBMIT DATE", sortable: true },
                    { id: "notes", label: "NOTES", sortable: false },
                    { id: "actions", label: "ACTION", sortable: false }
                  ].map(column => (
                    <th 
                      key={column.id} 
                      className={`px-8 py-5 text-left text-sm font-extrabold text-black/90 uppercase ${column.sortable ? 'cursor-pointer' : ''}`}
                      onClick={() => column.sortable && handleSort(column.id)}
                    >
                      <div className="flex items-center">
                        {column.label}
                        {column.sortable && sortField === column.id && (
                          <span className="ml-1">
                            {sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              
              <tbody className="divide-y divide-gray-200">
                {filteredOffers.map((offer) => (
                  <tr key={offer.id} className="hover:bg-gray-50">
                    <td className="px-8 py-5 text-sm font-semibold text-black/90">
                      {offer.id}
                    </td>
                    <td className="px-8 py-5 text-sm font-semibold text-black/90">
                      {offer.leadId}
                    </td>
                    <td className="px-8 py-5 text-sm font-semibold text-black/90">
                      {offer.supplier}
                    </td>
                    <td className="px-8 py-5 text-sm font-semibold text-black/90">
                      {offer.askingPrice}
                    </td>
                    <td className="px-8 py-5 text-sm font-semibold text-black/90">
                      {offer.askingTime}
                    </td>
                    <td className="px-8 py-5 text-center">
                      {renderStatusBadge(offer.status)}
                    </td>
                    <td className="px-8 py-5 text-sm font-semibold text-black/90">
                      {offer.submitDate}
                    </td>
                    <td className="px-8 py-5">
                      <button 
                        onClick={() => handleViewNotes(offer.id, offer.notes)}
                        className="w-24 h-7 p-2 flex items-center justify-center rounded-lg border border-indigo-500 text-indigo-500"
                      >
                        <Eye size={12} className="mr-1" />
                        <span className="text-xs font-bold">View</span>
                      </button>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2.5">
                        <button 
                          onClick={() => handleEditOffer(offer.id)}
                          className="w-24 h-7 p-2 flex items-center justify-center rounded-lg border border-indigo-500 text-indigo-500"
                        >
                          <Edit size={12} className="mr-1" />
                          <span className="text-xs font-bold">Edit</span>
                        </button>
                        <button 
                          onClick={() => handleDeleteOffer(offer.id)}
                          className="w-24 h-7 p-2 flex items-center justify-center bg-red-600 rounded-lg text-white"
                        >
                          <Trash2 size={12} className="mr-1" />
                          <span className="text-xs font-bold">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}