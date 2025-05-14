"use client";

import { useState, useEffect } from "react";
import { Eye, Edit, Trash2, ChevronDown, ChevronUp, X } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";
// import { useRouter } from 'next/router';

export default function Offer() {
  // const router = useRouter();

    const [newPrice, setNewPrice] = useState<number | string>("");
    // Add state variables for edit modal
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
    const [editFormData, setEditFormData] = useState({
      leadId: "",
      partName: "",
        price: "",
        category: "",
        quantity: "",
    });

    const accessToken = Cookies.get("accessToken");

    const url=process.env.NEXT_PUBLIC_BACKEND_URL;
    useEffect(() => {
 
        try {
            const fetchData = async () => {
                const response = await axios.get(url+'/api/v1/supply/offerToAdmin', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setOffers(response.data.data);
                // setFilteredOffers(response.data);
                // setIsLoading(false);
                console.table(response.data.data);
            };
            fetchData();
        }
        catch (error) {
            console.error("Error fetching offers:", error);
            setIsLoading(false);
        }

    }, []);


  interface Offer {
    targetPrice: number;
    supplierOffers: SupplierOffer[];
    _id: string;          // MongoDB ID (6810acd82300871b92ee3b11)
    partName: string;         // Name (cha)
    price: number;        // Price (12)
    category: string;         // Type (q)
    quantity: number;     // Quantity (123)
    status: string;       // Status (approved)
    createdAt: string;    // Date (2025-04-29T10:41:28.139Z)
    notes: string;    // Notes array
    leadId: string;       // Lead ID (L0001)
  }

  interface SupplierOffer {
    buyerStatus: string;
    createdAt: string;
    note: string;
    offerDate: string;
    offerPrice: number;
    quoteId: string;
    status: string;
    supplierId: string;
    supplierName: string;
    updatedAt: string;
    _id: string;
  }

  const [offers, setOffers] = useState<Offer[]>([]);
  const [filteredOffers, setFilteredOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortField, setSortField] = useState<keyof Offer | null>(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [showModal, setShowModal] = useState(false);
  const [selectedOfferDetails, setSelectedOfferDetails] = useState<SupplierOffer | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(url+'/api/v1/supply/offerToAdmin', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        
        if (response.data && response.data.data) {
          setOffers(response.data.data);
          setFilteredOffers(response.data.data);
          setIsLoading(false);
          console.table(response.data.data);
        }
      };
      fetchData();
    }
    catch (error) {
      console.error("Error fetching offers:", error);
      setIsLoading(false);
    }
  }, []);

  // Handle sorting
  const handleSort = (field: keyof Offer) => {
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

  // View offer details and show modal


  // Edit offer
  const handleEditOffer = (id: string) => {
    // Find the offer to edit
    const offerToEdit = offers.find(offer => offer._id === id);
    if (offerToEdit) {
     
      setEditingOffer(offerToEdit);
   
      const priceValue = offerToEdit.price !== undefined ? offerToEdit.price : 
                        (typeof offerToEdit.targetPrice === 'number' ? offerToEdit.targetPrice : 0);
      
    
      setEditFormData({
        leadId: offerToEdit.leadId,
        partName: offerToEdit.partName,
        price: String(priceValue), // Convert to string safely
        category: offerToEdit.category,
        quantity: String(offerToEdit.quantity || 0), // Handle potential 
      });
      
 
      setShowEditModal(true);
    }
  };

  // Handle form input changes
  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Save edited offer
  const handleSaveEdit = async () => {
    if (!editingOffer) return;
    console.log("Saving edited offer:", editFormData);
    const updateURL= url+"/api/v1/supply/updateOffer/";
    try {
    
      console.log("Update URL:", updateURL);
      const res=await axios.post(
        updateURL,
        {
          offerId:editingOffer.leadId,
          name: editFormData.partName,
          price: parseFloat(editFormData.price),
          type: editFormData.category,
          quantity: parseInt(editFormData.quantity),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      
      // console.log("Response from update:", res.data);
      if (res.data.statusCode == 200) {

        console.log("Editing offer:",);
        console.log( editingOffer);
        // console.log("Offer updated successfully:", res.data);
        // Update local state
        const updatedOffers = offers.map(offer => 
          offer.leadId === editingOffer.leadId 
            ? { 
                ...offer, 
                partName: editFormData.partName,
                price: parseFloat(editFormData.price),
                category: editFormData.category,
                quantity: parseInt(editFormData.quantity),
              } 
            : offer
        );
        
        setOffers(updatedOffers);
        setFilteredOffers(updatedOffers);
        setShowEditModal(false);
     
 
        
     
      }
      else{
        alert("Failed to update offer");
        return;
      }
    
    } 
    catch (error) {
      console.error("Error updating offer:", error);
      alert("Failed to update offer");
    }
  };

  // Delete offer
  const handleDeleteOffer = (id:string) => {
    console.log("Deleting offer with ID:", id);
  };

  // Update offer status
  const handleStatusUpdate = async () => {
    if (!selectedOfferDetails) return;
    if(newPrice === ""){ 
      alert("Please enter a price");
      return;
    }
    
    setUpdatingStatus(true);
    try {
        await axios.post(
            `${url}/api/v1/supply/updateOfferStatus`,
            {
                status: newStatus,
                quoteId: selectedOfferDetails.quoteId,
                supplierId: selectedOfferDetails.supplierId,
                price: newPrice
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        setNewPrice("");
        
        // Update local state to reflect the change
        const updatedOffers = offers.map(offer => 
            offer._id === selectedOfferDetails.quoteId ? { ...offer, status: newStatus } : offer
        );
        setOffers(updatedOffers);
        setFilteredOffers(updatedOffers);
        
        // Close the modal
        setShowModal(false);
    } catch (error) {
        console.error("Error updating offer status:", error);
        alert("Failed to update offer status");
    } finally {
        setUpdatingStatus(false);
    }
  };

  // Render status badge based on status
  const renderStatusBadge = (status: string) => {
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
        <h1 className="text-neutral-800 text-3xl font-bold 
        ">Offers Management</h1>
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
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid  border-sky-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-gray-600">Loading offers...</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  {[
                    { id: "_id" as keyof Offer, label: "OFFER ID", sortable: true },
                    { id: "leadId" as keyof Offer, label: "LEAD ID", sortable: true },
                    { id: "name" as keyof Offer, label: "NAME", sortable: true },
                    { id: "type" as keyof Offer, label: "TYPE", sortable: true },
                    { id: "price" as keyof Offer, label: "PRICE", sortable: true },
                    { id: "quantity" as keyof Offer, label: "QUANTITY", sortable: true },
                    { id: "status" as keyof Offer, label: "STATUS", sortable: true },
                    { id: "createdAt" as keyof Offer, label: "DATE", sortable: true },
                    { id: "notes" as keyof Offer, label: "NOTES", sortable: false },
                    { id: "actions" as keyof Offer, label: "ACTION", sortable: false }
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
                  <tr key={offer._id} className="hover:bg-gray-50">
                    <td className="px-8 py-5 text-sm font-semibold text-black/90">
                      {offer._id}
                    </td>
                    <td className="px-8 py-5 text-sm font-semibold text-black/90">
                      {offer.leadId}
                    </td>
                    <td className="px-8 py-5 text-sm font-semibold text-black/90">
                      {offer.partName}
                    </td>
                    <td className="px-8 py-5 text-sm font-semibold text-black/90">
                      {offer.category}
                    </td>
                    <td className="px-8 py-5 text-sm font-semibold text-black/90">
                      ₹{offer.targetPrice}
                    </td>
                    <td className="px-8 py-5 text-sm font-semibold text-black/90">
                      {offer.quantity}
                    </td>
                    <td className="px-8 py-5 text-center">
                      {renderStatusBadge(offer.status)}
                    </td>
                    <td className="px-8 py-5 text-sm font-semibold text-black/90">
                      {new Date(offer.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-5">
                    {offer.supplierOffers.length > 0 ? (
                     
                      <button
                        // onClick={() => handleViewNotes(offer.supplierOffers[0]._id)}
                        className="bg-indigo-600 text-white p-1 rounded-lg hover:bg-indigo-700 flex items-center"
                      >
                        {/* <Eye size={16} className="mr-2" /> */}
                        { offer.supplierOffers.map((supplierOffer) => (
                                <button
                                key={supplierOffer._id}
                                onClick={() => {
                                  // Create a default/empty supplier offer object or use a test one
                                  setSelectedOfferDetails({
                                    _id: "",
                                    supplierId: supplierOffer.supplierId,
                                    supplierName: supplierOffer.supplierName,
                                    quoteId: supplierOffer.quoteId,
                                    offerPrice: supplierOffer.offerPrice,
                                    offerDate: supplierOffer.offerDate,
                                    status: supplierOffer.status,
                                    note: supplierOffer.note,
                                    createdAt: "",
                                    updatedAt: "",
                                    buyerStatus: supplierOffer.buyerStatus
                                  });
                                  setNewStatus("pending");
                                  setShowModal(true);
                                }}
                                className="bg-indigo-600 text-white  p-1  rounded-lg hover:bg-indigo-700 flex items-center "
                              >
                                <Eye size={16} className="mr-2" />
                                Show 
                              </button>

                        ))}
                      </button>
                    ) : (
                      <span>No notes available</span>
                    )}
          
               

                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2.5">
                        <button 
                          onClick={() => handleEditOffer(offer._id)}
                          className="w-24 h-7 p-2 flex items-center justify-center rounded-lg border border-indigo-500 text-indigo-500"
                        >
                          <Edit size={12} className="mr-1" />
                          <span className="text-xs font-bold">Edit</span>
                        </button>
                        <button 
                          onClick={() => handleDeleteOffer(offer._id)}
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



 



      {/* Offer Details Modal */}
      {showModal && selectedOfferDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Supplier Offer Details</h3>
                    <button 
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => setShowModal(false)}
                    >
                        <X size={24} />
                    </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <p className="text-sm font-semibold text-gray-600">Supplier Name</p>
                        <p className="text-lg">{selectedOfferDetails.supplierName}</p>
                        <p>{selectedOfferDetails.supplierId}</p>
                        <p>{selectedOfferDetails.quoteId}</p>
                        {/* <p>{selectedOfferDetails}</p> */}
           
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-600">Offer Price</p>
                        <p className="text-lg">₹{selectedOfferDetails.offerPrice}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-600">Offer Date</p>
                        <p className="text-lg">{new Date(selectedOfferDetails.offerDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-600">Current Status</p>
                        <p className="text-lg">{selectedOfferDetails.status}</p>
                    </div>
                    <div className="col-span-2">
                        <p className="text-sm font-semibold text-gray-600">Note</p>
                        <p className="text-lg">{selectedOfferDetails.note || "No notes available"}</p>
                    </div>
                    <div className="col-span-2">
                        <p className="text-sm font-semibold text-gray-600">Buyer Status</p>
                        <p className="text-lg">{selectedOfferDetails.buyerStatus || "No notes available"}</p>
                    </div>
                </div>
                
                <div className="border-t pt-4">
    <h4 className="text-lg font-bold mb-2">Update Offer</h4>
    <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
            <label className="text-sm font-semibold text-gray-600 block mb-1">Status</label>
            <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="border p-2 rounded-lg w-full"
                disabled={updatingStatus}
            >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
            </select>
        </div>
        <div>
            <label className="text-sm font-semibold text-gray-600 block mb-1">Price (₹)</label>
            <input
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                className="border p-2 rounded-lg w-full"
                placeholder="Enter price"
                disabled={updatingStatus}
            />
        </div>
    </div>
    <div className="flex justify-end">
        <button
            onClick={handleStatusUpdate}
            disabled={updatingStatus}
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
        >
            {updatingStatus ? "Updating..." : "Update Offer"}
        </button>
    </div>
</div>
            </div>
        </div>
      )}

      {/* Edit Offer Modal */}
      {showEditModal && editingOffer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Edit Offer</h3>
                    <button 
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => setShowEditModal(false)}
                    >
                        <X size={24} />
                    </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="text-sm font-semibold text-gray-600 block mb-1">Part Name</label>
                        <input
                            type="text"
                            name="partName"
                            value={editFormData.partName}
                            onChange={handleEditFormChange}
                            className="border p-2 rounded-lg w-full"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-gray-600 block mb-1">Type</label>
                        <input
                            type="text"
                            name="category"
                            value={editFormData.category}
                            onChange={handleEditFormChange}
                            className="border p-2 rounded-lg w-full"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-gray-600 block mb-1">Price (₹)</label>
                        <input
                            type="number"
                            name="price"
                            value={editFormData.price}
                            onChange={handleEditFormChange}
                            className="border p-2 rounded-lg w-full"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-gray-600 block mb-1">Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            value={editFormData.quantity}
                            onChange={handleEditFormChange}
                            className="border p-2 rounded-lg w-full"
                        />
                    </div>
                </div>
                
                <div className="border-t pt-4 flex justify-end">
                    <button
                        onClick={() => setShowEditModal(false)}
                        className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSaveEdit}
                        className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}