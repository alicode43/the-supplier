"use client";

import { useState, useEffect } from "react";
import { File, Trash2, Eye, FilterX, ChevronDown, ChevronUp } from "lucide-react";

export default function AdminLeads() {
  // State for filters and leads data
  const [orderType, setOrderType] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  // Sample data for demonstration
  const mockLeads = [
    {
      id: "201",
      partName: "John Doe",
      drawingFile: "drawing201.pdf",
      category: "CNC Milling",
      quantity: "500",
      futureRequirement: "Regular Requirement",
      targetPrice: "₹25,000",
      leadTime: "15-May-2023",
      productionNotes: "notes201.pdf",
      submitDate: "01-May-2023 10:30 AM",
      offerFile: "offer201.pdf"
    },
    {
      id: "202",
      partName: "Jane Smith",
      drawingFile: "drawing202.pdf",
      category: "Laser Cutting",
      quantity: "1000",
      futureRequirement: "Not Sure",
      targetPrice: "₹1,25,000",
      leadTime: "22-May-2023",
      productionNotes: "notes202.pdf",
      submitDate: "02-May-2023 09:15 AM",
      offerFile: "offer202.pdf"
    },
    {
      id: "203",
      partName: "Alice Johnson",
      drawingFile: "drawing203.pdf",
      category: "Injection Moulding",
      quantity: "1000",
      futureRequirement: "Regular Requirement",
      targetPrice: "₹74,000",
      leadTime: "30-May-2023",
      productionNotes: "notes203.pdf",
      submitDate: "03-May-2023 02:45 PM",
      offerFile: "offer203.pdf"
    },
  ];

  // Fetch leads on component mount
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      setLeads(mockLeads);
      setFilteredLeads(mockLeads);
      setIsLoading(false);
    }, 800);
  }, []);

  // Apply filters when filter values change
  useEffect(() => {
    let results = leads;
    
    if (orderType) {
      results = results.filter(lead => lead.category.toLowerCase().includes(orderType.toLowerCase()));
    }
    
    if (orderStatus) {
      results = results.filter(lead => lead.futureRequirement.toLowerCase().includes(orderStatus.toLowerCase()));
    }
    
    if (dateRange) {
      // In a real app, implement date range filtering logic
    }
    
    if (searchTerm) {
      results = results.filter(lead => 
        lead.id.includes(searchTerm) ||
        lead.partName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sorting if active
    if (sortField) {
      results = [...results].sort((a, b) => {
        const aValue = a[sortField].toString().toLowerCase();
        const bValue = b[sortField].toString().toLowerCase();
        
        if (sortDirection === "asc") {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }
    
    setFilteredLeads(results);
  }, [leads, orderType, orderStatus, dateRange, searchTerm, sortField, sortDirection]);

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setOrderType("");
    setOrderStatus("");
    setDateRange("");
    setSearchTerm("");
    setSortField(null);
    setSortDirection("asc");
  };

  // Handle file view
  const handleViewFile = (fileType, fileId) => {
    // In a real app, this would open the file or a modal
    alert(`Viewing ${fileType} for lead ${fileId}`);
  };

  // Handle lead deletion
  const handleDeleteLead = (id) => {
    // In a real app, this would call an API endpoint
    if (confirm(`Are you sure you want to delete lead ${id}?`)) {
      setLeads(leads.filter(lead => lead.id !== id));
      setFilteredLeads(filteredLeads.filter(lead => lead.id !== id));
    }
  };

  return (
    <div className="self-stretch px-5 py-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col gap-2.5 overflow-hidden">
        <h1 className="text-neutral-800 text-3xl font-bold font-['Nunito_Sans']">Leads Management</h1>
      </div>
      
      {/* Filters */}
      <div className="w-full bg-gray-50 rounded-[10px] border-[0.60px] border-neutral-300 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search field */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by ID, Name or Category"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          {/* Order Type filter */}
          <div className="relative">
            <select
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none"
            >
              <option value="">Select Order Type</option>
              <option value="CNC Milling">CNC Milling</option>
              <option value="Laser Cutting">Laser Cutting</option>
              <option value="Injection Moulding">Injection Moulding</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown size={16} />
            </div>
          </div>
          
          {/* Order Status filter */}
          <div className="relative">
            <select
              value={orderStatus}
              onChange={(e) => setOrderStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none"
            >
              <option value="">Select Order Status</option>
              <option value="Regular Requirement">Regular Requirement</option>
              <option value="Not Sure">Not Sure</option>
              <option value="One Time">One Time</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown size={16} />
            </div>
          </div>
          
          {/* Date filter */}
          <div className="relative">
            <input
              type="date"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>
      
      {/* Reset Filters */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={resetFilters}>
        <FilterX size={16} className="text-rose-600" />
        <span className="text-rose-600 text-sm font-semibold font-['Nunito_Sans']">Reset Filter</span>
      </div>
      
      {/* Filter Section Labels (hidden on small screens) */}
      <div className="hidden md:flex items-center gap-6 text-sm text-neutral-800 font-bold">
        <div className="w-24">Order Type</div>
        <div className="w-24">Order Status</div>
        <div className="w-24">Date</div>
        <div className="w-24">Filter By</div>
      </div>
      
      <div className="h-px bg-black/60"></div>
      
      {/* Results count */}
      <div className="flex flex-col overflow-hidden">
        <div className="text-neutral-800/60 text-sm font-semibold">
          Items Found: {filteredLeads.length}
        </div>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <div className="bg-white rounded-2xl shadow-sm">
          {isLoading ? (
            <div className="py-20 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-sky-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-gray-600">Loading leads...</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  {[
                    { id: "id", label: "LEAD ID", sortable: true },
                    { id: "partName", label: "PART NAME", sortable: true },
                    { id: "drawingFile", label: "DRAWING FILE", sortable: false },
                    { id: "category", label: "CATEGORY", sortable: true },
                    { id: "quantity", label: "QUANTITY", sortable: true },
                    { id: "futureRequirement", label: "FUTURE REQUIREMENT", sortable: true },
                    { id: "targetPrice", label: "TARGET PRICE/PCS", sortable: true },
                    { id: "leadTime", label: "LEAD TIME", sortable: true },
                    { id: "productionNotes", label: "PRODUCTION NOTES", sortable: false },
                    { id: "submitDate", label: "SUBMIT DATE", sortable: true },
                    { id: "offerFile", label: "OFFER", sortable: false },
                    { id: "actions", label: "DELETE", sortable: false }
                  ].map(column => (
                    <th 
                      key={column.id} 
                      className={`px-4 py-3 text-left text-xs font-extrabold text-black/90 uppercase tracking-wider ${column.sortable ? 'cursor-pointer' : ''}`}
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
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLeads.length > 0 ? (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-black/90">
                        {lead.id}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-black/90">
                        {lead.partName}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <button 
                          onClick={() => handleViewFile('drawing', lead.id)}
                          className="flex items-center justify-center w-24 h-7 p-2 rounded-lg border border-indigo-500 text-indigo-500 text-xs font-bold"
                        >
                          <Eye size={12} className="mr-1" />
                          View
                        </button>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-black/90">
                        {lead.category}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-black/90">
                        {lead.quantity}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-black/90">
                        {lead.futureRequirement}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-black/90">
                        {lead.targetPrice}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-black/90">
                        {lead.leadTime}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <button 
                          onClick={() => handleViewFile('notes', lead.id)}
                          className="flex items-center justify-center w-24 h-7 p-2 rounded-lg border border-indigo-500 text-indigo-500 text-xs font-bold"
                        >
                          <Eye size={12} className="mr-1" />
                          View
                        </button>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-black/90">
                        {lead.submitDate}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <button 
                          onClick={() => handleViewFile('offer', lead.id)}
                          className="flex items-center justify-center w-24 h-7 p-2 rounded-lg border border-indigo-500 text-indigo-500 text-xs font-bold"
                        >
                          <Eye size={12} className="mr-1" />
                          View
                        </button>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <button 
                          onClick={() => handleDeleteLead(lead.id)}
                          className="flex items-center justify-center w-24 h-7 p-2 bg-red-600 rounded-lg text-white text-xs font-bold"
                        >
                          <Trash2 size={12} className="mr-1" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={12} className="px-4 py-8 text-center text-gray-500">
                      No leads found matching your filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}