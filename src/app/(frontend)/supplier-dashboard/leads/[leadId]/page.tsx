'use client';
import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useState,useEffect } from 'react';

interface Attachment {
  url: string;
  name: string;
}

interface SupplierOffer {
  // Define properties based on your actual data structure
  id: string;
  price: number;
  // Add other properties as needed
}

interface LeadDetailsType {
  leadId: string;
  category: string;
  partName: string;
  specifications: string;
  supplierLocation: string;
  targetPrice: number;
  quantity: number;
  leadTime: number;
  additionalRequirements: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  attachments: Attachment[];
  supplierOffers: SupplierOffer[];
}

interface LeadDetailsPageProps {
  params: {
    leadId: string;
  };
}

export default function LeadDetailsPage({ params }: LeadDetailsPageProps) {
  // Unwrap params using React.use() for future compatibility
  // const unwrappedParams = React.use(params);
  // const { leadId } = unwrappedParams;
  // console.log("Lead ID from params:", leadId);
  const { leadId } = params;  
  
  const [leadDetails, setLeadDetails] = useState<LeadDetailsType | null>(null);
  const accessToken = Cookies.get("accessToken");
  const url=process.env.NEXT_PUBLIC_BACKEND_URL
  const [selectedAttachment, setSelectedAttachment] = useState<Attachment | null>(null);
  const [offerPrice, setOfferPrice] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formMessage, setFormMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  console.log("Access Token:", accessToken);
  
  console.log("Lead ID:", leadDetails);

  useEffect(() => {
    if (!accessToken) {
        window.location.href = "/signin";
    }  

    const fetchData = async () => {
        try {
            const response = await axios.post(`${url}/api/v1/supply/getLead`, 
                { leadId }, // Pass leadId in the request body
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setLeadDetails(response.data.data);
            
        } catch (error) {
            console.error("Error fetching lead details:", error);
        }
    };
    fetchData();
  }, [leadId, accessToken, url]);

  // Function to open attachment in popup
  const openAttachmentPopup = (attachment: Attachment) => {
    setSelectedAttachment(attachment);
  };

  // Function to close the popup
  const closeAttachmentPopup = () => {
    setSelectedAttachment(null);
  };

  // Function to determine if file is an image
  const isImageFile = (url?: string) => {
    if (!url) return false;
    const extensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'];
    return extensions.some(ext => url.toLowerCase().endsWith(ext));
  };
  
  const submitOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken || !leadId) return;
    
    setIsSubmitting(true);
    setFormMessage(null);
    
    try {
      await axios.post(`${url}/api/v1/supply/addSupplierOffer`, {
        leadId,
        offerPrice: parseFloat(offerPrice),
        note
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      
      // Clear form and show success message
      setOfferPrice('');
      setNote('');
      setFormMessage({
        type: 'success',
        text: 'Your offer was submitted successfully!'
      });
      
      // Refresh lead details to show the new offer
      const response = await axios.post(`${url}/api/v1/supply/getLead`, 
        { leadId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setLeadDetails(response.data.data);
      
    } catch (error) {
      console.error('Error submitting offer:', error);
      setFormMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to submit offer. Please try again.'
      });
    } 

  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {!leadDetails ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header with Lead ID and Status */}
          <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Lead #{leadDetails.leadId}</h1>
              <p className="text-gray-500">Created: {new Date(leadDetails.createdAt).toLocaleDateString()}</p>
              <p className="text-gray-500">Updated: {new Date(leadDetails.updatedAt).toLocaleDateString()}</p>
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
              leadDetails.status === 'approved' ? 'bg-green-100 text-green-800' :
              leadDetails.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {leadDetails.status?.toUpperCase()}
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Part Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Part Information</h2>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-600 font-medium">Category:</span>
                    <span className="ml-2">{leadDetails.category}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 font-medium">Part Name:</span>
                    <span className="ml-2">{leadDetails.partName}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 font-medium">Specifications:</span>
                    <span className="ml-2">{leadDetails.specifications}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 font-medium">Supplier Location:</span>
                    <span className="ml-2">{leadDetails.supplierLocation}</span>
                  </div>
                </div>
              </div>

              {/* Pricing and Quantity */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Pricing & Quantity</h2>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-600 font-medium">Target Price:</span>
                    <span className="ml-2">₹{leadDetails.targetPrice}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 font-medium">Quantity:</span>
                    <span className="ml-2">{leadDetails.quantity} units</span>
                  </div>
                  <div>
                    <span className="text-gray-600 font-medium">Lead Time:</span>
                    <span className="ml-2">{leadDetails.leadTime} days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Requirements */}
            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2 text-gray-700 border-b pb-2">Additional Requirements</h2>
              <p className="text-gray-700">{leadDetails.additionalRequirements || "No additional requirements specified."}</p>
            </div>

            {/* Attachments */}
            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2 text-gray-700 border-b pb-2">Attachments</h2>
              {leadDetails.attachments && leadDetails.attachments.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {leadDetails.attachments.map((attachment, index) => (
                    <div key={index} className="border p-3 rounded flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.414a4 4 0 00-5.656-5.656l-6.415 6.415a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                      <button 
                        onClick={() => openAttachmentPopup(attachment)}
                        className="text-blue-600 hover:underline truncate text-left"
                      >
                        {attachment.name || `Attachment ${index + 1}`}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No attachments available.</p>
              )}
            </div>

            {/* Supplier Offers */}
            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2 text-gray-700 border-b pb-2">Supplier Offers</h2>
              {leadDetails.supplierOffers && leadDetails.supplierOffers.length > 0 ? (
                <div className="space-y-4">
                  {leadDetails.supplierOffers.map((offer, index) => (
                    <div key={index} className="border rounded p-3">
                      <p className="font-medium">Offer {index + 1}</p>
                      {/* Display offer details when they become available */}
                      <p className="text-gray-600">Price: ₹{offer.price}</p>
                      {/* Additional offer details would go here */}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No offers available yet.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Attachment Popup/Modal */}
      {selectedAttachment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
           
              <button onClick={closeAttachmentPopup} className="text-gray-400 hover:text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4 flex items-center justify-center">
              {isImageFile(selectedAttachment) ? (
                
                <div className='flex flex-col items-center'>
                <img 
                  src={selectedAttachment} 
                //   alt={selectedAttachment.name} 
                  className="max-w-full max-h-full object-contain"
                />
                     <a 
                    href={selectedAttachment} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Download File
                  </a>
                </div>
                
              ) : (
                <div className="text-center">
                  <p className="mb-4">  This file type may not be viewable directly in the browser.</p>
                  <a 
                    href={selectedAttachment} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Download File
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Supplier Offer Form */}
      <div className="mt-8 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Submit Your Offer</h2>
        </div>
        <div className="p-6">
          {formMessage && (
            <div className={`mb-4 p-4 rounded ${formMessage.type === 'success' ? 'bg-green-50 text-green-700 border-l-4 border-green-500' : 'bg-red-50 text-red-700 border-l-4 border-red-500'}`}>
              {formMessage.text}
            </div>
          )}
          
          <form onSubmit={submitOffer} className="space-y-4">
            <div>
              <label htmlFor="offerPrice" className="block text-sm font-medium text-gray-700 mb-1">
                Your Price Offer (₹)
              </label>
              <input
                type="number"
                id="offerPrice"
                name="offerPrice"
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
                placeholder="Enter your price offer"
                min="0"
                step="0.01"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
                Additional Note
              </label>
              <textarea
                id="note"
                name="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add any additional details about your offer"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : 'Submit Offer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
