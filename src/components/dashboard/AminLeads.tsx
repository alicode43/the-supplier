"use client";

import { useState, useEffect } from "react";
import { Trash2, Eye, FilterX, ChevronDown, X } from "lucide-react";
import Cookies from "js-cookie";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";

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
}

// Define status types
type StatusType = 'pending' | 'under_review' | 'approved' | 'rejected' | 'completed';
 
export default function AdminLeads() {
  const router = useRouter();
  
  // Get access token from cookies on client side only
 
  const accessToken = Cookies.get("accessToken");

  // Add state for status editing
  const [editingStatus, setEditingStatus] = useState<{ [leadId: string]: StatusType | null }>({});
  const [confirmingStatus, setConfirmingStatus] = useState<{ [leadId: string]: boolean }>({});
  
  useEffect(() => {
    console.log("Access Token:", accessToken);
    if (!accessToken) {
      toast.error("Authentication required");
    
      // router.push("/signin");
     
      return;
    }
  }, []);
  
 
  // State for attachment modal
  const [isAttachmentModalOpen, setIsAttachmentModalOpen] = useState(false);
  const [currentAttachments, setCurrentAttachments] = useState<(Attachment | string)[]>([]);
  const [currentItemName, setCurrentItemName] = useState("");

  // State for requirements data and filtering
  const [requirementsData, setRequirementsData] = useState<Requirement[]>([]);
  const [filteredRequirements, setFilteredRequirements] = useState<Requirement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reqSearchTerm, setReqSearchTerm] = useState("");
  const [reqCategory, setReqCategory] = useState("");
  const [reqDateRange, setReqDateRange] = useState("");
  
  const url = process.env.NEXT_PUBLIC_BACKEND_URL || "";

  // Sample data for demonstration
 

  // Open attachment modal function
  const openAttachmentModal = (item: Requirement) => {
    if (!item.attachments) {
      toast.info("No attachments available for this item.");
      return;
    }
    
    if (Array.isArray(item.attachments) && item.attachments.length > 0) {
      setCurrentAttachments(item.attachments);
      setCurrentItemName(item.partName || "Item");
      setIsAttachmentModalOpen(true);
    } else {
      // If it's a single attachment (string or object)
      setCurrentAttachments(Array.isArray(item.attachments) ? item.attachments : [item.attachments]);
      setCurrentItemName(item.partName || "Item");
      setIsAttachmentModalOpen(true);
    }
  };

  // Fetch leads on component mount
 

 
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

 
  // Reset all filters for requirements
  const resetRequirementFilters = () => {
    setReqSearchTerm("");
    setReqCategory("");
    setReqDateRange("");
  };

 

  
  // Handle requirement deletion
  const handleDeleteRequirement = (leadId: string) => {
    if (typeof window !== 'undefined' && window.confirm(`Are you sure you want to delete requirement ${leadId}?`)) {
      try {
   
        // For now, just update local state
        setRequirementsData(requirementsData.filter(item => item.leadId !== leadId));
        setFilteredRequirements(filteredRequirements.filter(item => item.leadId !== leadId));
        toast.success("Requirement deleted successfully");
      } catch (err) {
        console.error("Error deleting requirement:", err);
        toast.error("Failed to delete requirement");
      }
    }
  };

  // Handle status change
  const handleStatusChange = (leadId: string, status: StatusType) => {
    setEditingStatus(prev => ({
      ...prev,
      [leadId]: status
    }));
    setConfirmingStatus(prev => ({
      ...prev,
      [leadId]: true
    }));
  };

  // Handle status confirmation
  const handleConfirmStatus = async (leadId: string) => {
    const newStatus = editingStatus[leadId];
    
    if (!newStatus) return;
    
    try {
      // Make API request to update status
      const response = await axios.post(
        `${url}/api/v1/supply/updateStatus`,
        { leadId, status: newStatus },
        {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        }
      );
      
      if (response.data.success) {
        toast.success(`Status for lead ${leadId} updated to ${newStatus}`);
        
        // Update status in local state
        const updatedData = requirementsData.map(item => 
          item.leadId === leadId ? {...item, status: newStatus} : item
        );
        
        setRequirementsData(updatedData);
        setFilteredRequirements(filteredRequirements.map(item => 
          item.leadId === leadId ? {...item, status: newStatus} : item
        ));
      } else {
        toast.error(response.data.message || "Failed to update status");
      }
    } catch (err) {
   
      if (err instanceof Error) {
        toast.error(err.message || "An error occurred while updating status");
      } else {
        toast.error("An error occurred while updating status");
      }
    } finally {
      // Reset editing and confirming state
      setEditingStatus(prev => ({
        ...prev,
        [leadId]: null
      }));
      setConfirmingStatus(prev => ({
        ...prev,
        [leadId]: false
      }));
    }
  };

  // Handle cancel status update
  const handleCancelStatusUpdate = (leadId: string) => {
    setEditingStatus(prev => ({
      ...prev,
      [leadId]: null
    }));
    setConfirmingStatus(prev => ({
      ...prev,
      [leadId]: false
    }));
  };

  // Status label formatting
  const getStatusLabel = (status?: string) => {
    if (!status) return "Pending";
    
    return status
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Status color mapping
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-500 bg-green-50 border-green-500';
      case 'rejected':
        return 'text-red-500 bg-red-50 border-red-500';
      case 'completed':
        return 'text-blue-500 bg-blue-50 border-blue-500';
      case 'under_review':
        return 'text-orange-500 bg-orange-50 border-orange-500';
      default:
        return 'text-gray-500 bg-gray-50 border-gray-500';
    }
  };

  // Fetch requirements data from API
  useEffect(() => {
    // Check if user is authenticated

    
    // Define the function to fetch quotes
    const fetchQuotes = async () => {
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
          setRequirementsData(response.data.data);
          setFilteredRequirements(response.data.data);
        } else {
          setError(response.data.message || "Failed to fetch quotes");
        }
      } catch (err) {
        console.error("Error fetching quotes:", err);
        if (err instanceof Error) {
          setError(err.message || "An error occurred while fetching quotes");
        } else {
          setError("An error occurred while fetching quotes");
        }
        
        // if (axios.isAxiosError(err) && err.response?.status === 401) {
        //   toast.error("Session expired. Please login again.");
        //   router.push('/signin');
        // }
      } finally {
        setLoading(false);
      }
    };
    
    // Call the fetch function
    fetchQuotes();
  }, [accessToken, url, router]);

  return (
    <div className="self-stretch px-5 py-4 flex flex-col gap-4">
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Header */}
      <div className="flex flex-col gap-2.5 overflow-hidden">
        <h1 className="text-neutral-800 text-3xl font-bold">Leads Management</h1>
      </div>
      
      {/* Leads Section */}
   
      {/* Requirements Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium text-black">Recent Requirements</h2>
          <button className="text-xs font-bold text-black underline">View All</button>
        </div>
        
        {/* Requirements Filters */}
        <div className="w-full bg-gray-50 rounded-[10px] border-[0.60px] border-neutral-300 p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search field */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by ID, Part Name or Category"
                value={reqSearchTerm}
                onChange={(e) => setReqSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            {/* Category filter */}
            <div className="relative">
              <select
                value={reqCategory}
                onChange={(e) => setReqCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none"
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Metal">Metal</option>
                <option value="Plastic">Plastic</option>
                <option value="Machining">Machining</option>
                <option value="Injection Moulding">Injection Moulding</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown size={16} />
              </div>
            </div>
            
            {/* Date filter */}
            <div className="relative">
              <input
                type="date"
                value={reqDateRange}
                onChange={(e) => setReqDateRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          
          {/* Reset Filters Button */}
          <div className="flex items-center gap-2 cursor-pointer mt-3" onClick={resetRequirementFilters}>
            <FilterX size={16} className="text-rose-600" />
            <span className="text-rose-600 text-sm font-semibold">Reset Filter</span>
          </div>
        </div>
        
        {/* Results count */}
        <div className="mb-4">
          <div className="text-neutral-800/60 text-sm font-semibold">
            Requirements Found: {filteredRequirements ? filteredRequirements.length : 0}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-extrabold text-black">
                  Lead ID
                </th>
                <th className="px-4 py-3 text-left text-sm font-extrabold text-black">
                  Part Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-extrabold text-black">
                  Drawing File
                </th>
                <th className="px-4 py-3 text-left text-sm font-extrabold text-black">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-sm font-extrabold text-black">
                  Material
                </th>
                <th className="px-4 py-3 text-left text-sm font-extrabold text-black">
                  Quantity
                </th>
                <th className="px-4 py-3 text-left text-sm font-extrabold text-black">
                 Buyer Estimate
                </th>
                {/* <th className="px-4 py-3 text-left text-sm font-extrabold text-black">
                  Your Price/Pcs
                </th> */}
                <th className="px-4 py-3 text-left text-sm font-extrabold text-black">
                  Notes
                </th>
                <th className="px-4 py-3 text-left text-sm font-extrabold text-black">
                  Your Lead Time
                </th>
                <th className="px-4 py-3 text-left text-sm font-extrabold text-black">
                  Submitted On
                </th>
                <th className="px-4 py-3 text-left text-sm font-extrabold text-black">
                  Action
                </th>
                <th className="px-4 py-3 text-left text-sm font-extrabold text-black">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-extrabold text-black">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-black font-semibold">
              {loading ? (
                <tr>
                  <td colSpan={13} className="px-4 py-8 text-center">
                    <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
                  </td>
                </tr>
              ) : filteredRequirements && filteredRequirements.length > 0 ? (
                filteredRequirements.map((item) => (
                  <tr key={item.leadId} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{item.leadId}</td>
                    <td className="px-4 py-3">{item.partName}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => openAttachmentModal(item)}
                        className="flex items-center justify-center w-24 h-7 p-2 rounded-lg border border-indigo-500 text-indigo-500 text-xs font-bold hover:bg-indigo-50"
                      >
                        <Eye size={12} className="mr-1" />
                        Attachments
                      </button>
                    </td>
                    <td className="px-4 py-3">{item.category}</td>
                    <td className="px-4 py-3">{item.material}</td>
                    <td className="px-4 py-3">{item.quantity}</td>
                    <td className="px-4 py-3">₹ {item.targetPrice}</td>
                    {/* <td className="px-4 py-3">₹ 00 {item.targetPrice}</td> */}
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toast.info(`Notes for ${item.leadId}: ${item.notes || 'No notes available'}`)}
                        className="flex items-center justify-center w-24 h-7 p-2 rounded-lg border border-indigo-500 text-indigo-500 text-xs font-bold hover:bg-indigo-50"
                      >
                        <Eye size={12} className="mr-1" />
                        View Notes
                      </button>
                    </td>
                    <td className="px-4 py-3">{item.leadTime}</td>
                    <td className="px-4 py-3">{item.createdAt}</td>
                    <td className="px-4 py-3">
                      <button 
                        className="text-indigo-500 text-xs font-bold border border-indigo-500 rounded-lg px-3 py-1 hover:bg-indigo-50"
                        onClick={() => router.push(`/admin/requirement/${item.leadId}`)}
                      >
                        View
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-2">
                        {!confirmingStatus[item.leadId] ? (
                          <div className="flex items-center gap-2">
                            <div className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(item.status)}`}>
                              {getStatusLabel(item.status)}
                            </div>
                            <button 
                              onClick={() => setConfirmingStatus(prev => ({ ...prev, [item.leadId]: true }))}
                              className="text-xs text-indigo-500 hover:underline"
                            >
                              Change
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-2">
                            <select 
                              value={editingStatus[item.leadId] || item.status || "pending"}
                              onChange={(e) => handleStatusChange(item.leadId, e.target.value as StatusType)}
                              className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                            >
                              <option value="pending">Pending</option>
                              <option value="under_review">Under Review</option>
                              <option value="approved">Approved</option>
                              <option value="rejected">Rejected</option>
                              <option value="completed">Completed</option>
                            </select>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleConfirmStatus(item.leadId)}
                                className="text-xs px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                              >
                                Confirm
                              </button>
                              <button 
                                onClick={() => handleCancelStatusUpdate(item.leadId)}
                                className="text-xs px-2 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <button 
                        onClick={() => handleDeleteRequirement(item.leadId)}
                        className="flex items-center justify-center w-24 h-7 p-2 bg-red-600 rounded-lg text-white text-xs font-bold hover:bg-red-700"
                      >
                        <Trash2 size={12} className="mr-1" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={13} className="px-4 py-8 text-center text-gray-500">
                    {error ? `Error: ${error}` : "No requirements data found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
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
                <X size={20} />
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
    </div>
  );
}