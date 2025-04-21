"use client";

import { useState, useRef, FormEvent } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import { Inter } from "next/font/google";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

// Initialize the Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function Page() {
  // File upload state
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form fields
  const [formData, setFormData] = useState({
    partName: "",
    quantity: "",
    leadTime: "",
    category: "",
    targetPrice: "",
    supplierLocation: "",
    specifications: "",
    additionalRequirements: ""
  });

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // File handlers
  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
    }
  };
  
  const removeFile = (fileToRemove: File) => {
    setSelectedFiles(selectedFiles.filter(file => file !== fileToRemove));
  };

  // Form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData, selectedFiles);
    
    // Validate required fields
    if (!formData.partName || !formData.quantity || !formData.leadTime || 
        !formData.category || !formData.targetPrice || !formData.specifications) {
      toast.error("Please fill all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create form data object for file uploads
      const submitData = new FormData();
      
      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value);
      });
      
      // Append files
      selectedFiles.forEach(file => {
        submitData.append("images", file);
      });
      
      // Get access token
      const accessToken = Cookies.get("accessToken");
      
      if (!accessToken) {
        toast.error("You must be logged in to submit a quote request");
        return;
      }
      
      // Submit the form
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/supply/getQuote`, 
        submitData,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      console.log("Response:", response.data);
      
      toast.success("Quote request submitted successfully");
      
      // Reset form after successful submission
      setFormData({
        partName: "",
        quantity: "",
        leadTime: "",
        category: "",
        targetPrice: "",
        supplierLocation: "",
        specifications: "",
        additionalRequirements: ""
      });
      setSelectedFiles([]);
      
    } catch (error) {
      console.error("Error submitting quote request:", error);
      toast.error("Failed to submit quote request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <section className={`w-full px-4 sm:px-10 py-8 ${inter.className}`}>
        <div className="flex flex-col gap-5">
          <h1 className="text-start text-neutral-800 text-3xl font-bold transition-all duration-300 hover:text-blue-600 cursor-pointer sm:text-4xl md:text-5xl">
            Get a Quote
          </h1>
          <div className="w-24 h-1 bg-blue-500 mt-2 rounded-full hover:w-32 transition-all duration-300"></div>
          
          <form onSubmit={handleSubmit}>
            <section className="w-full bg-white rounded-xl shadow">
              <div className="px-6 sm:px-8 pt-8 pb-11 flex flex-col gap-9">
                <h2 className="text-xl font-medium text-black">
                  Submit a Quote Request
                </h2>

                <div className="flex flex-col gap-6">
                  {/* Two-column responsive grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="flex flex-col gap-4">
                      <FormField label="Part Name/Description *">
                        <input
                          name="partName"
                          value={formData.partName}
                          onChange={handleChange}
                          className="w-full p-4 rounded-xl border border-indigo-500 text-sm text-zinc-900"
                          placeholder="Enter description"
                          required
                        />
                      </FormField>

                      <FormField label="Quantity *">
                        <input
                          name="quantity"
                          type="number"
                          value={formData.quantity}
                          onChange={handleChange}
                          className="w-full p-4 rounded-xl border border-zinc-200 text-sm text-zinc-900"
                          placeholder="Enter quantity"
                          required
                        />
                      </FormField>

                      <FormField label="Required Lead Time (Days) *">
                        <input
                          name="leadTime"
                          type="number"
                          value={formData.leadTime}
                          onChange={handleChange}
                          className="w-full p-4 rounded-xl border border-zinc-200 text-sm text-zinc-900"
                          placeholder="Enter days"
                          required
                        />
                      </FormField>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-4">
                      <FormField label="Category *">
                        <input
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          className="w-full p-4 rounded-xl border border-zinc-200 text-sm text-zinc-900"
                          placeholder="Select category"
                          required
                        />
                      </FormField>

                      <FormField label="Target Price per Piece (INR) *">
                        <input
                          name="targetPrice"
                          type="number"
                          value={formData.targetPrice}
                          onChange={handleChange}
                          className="w-full p-4 rounded-xl border border-zinc-200 text-sm text-zinc-900"
                          placeholder="Enter price"
                          required
                        />
                      </FormField>

                      <FormField label="Preferred Supplier Location">
                        <input
                          name="supplierLocation"
                          value={formData.supplierLocation}
                          onChange={handleChange}
                          className="w-full p-4 rounded-xl border border-zinc-200 text-sm text-zinc-900"
                          placeholder="Any location"
                        />
                      </FormField>
                    </div>
                  </div>

                  {/* Detailed Specs */}
                  <FormField label="Detailed Specifications *">
                    <textarea
                      name="specifications"
                      value={formData.specifications}
                      onChange={handleChange}
                      rows={5}
                      className="w-full p-4 rounded-xl border border-zinc-200 text-sm text-zinc-900"
                      placeholder="Write detailed specifications here..."
                      required
                    />
                  </FormField>

                  {/* Attachments */}
                  <FormField label="Attachments (Drawings, Specifications, etc.)">
                    <div className="flex flex-col p-4 rounded-xl border border-zinc-200 text-sm">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-zinc-900 font-medium">
                          {selectedFiles.length > 0
                            ? `${selectedFiles.length} file(s) selected`
                            : "No files selected"}
                        </span>
                        <div>
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileSelection}
                            className="hidden"
                            multiple
                            accept=".pdf,.dwg,.dxf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                          />
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="text-indigo-600 font-bold underline"
                          >
                            Browse...
                          </button>
                        </div>
                      </div>

                      {selectedFiles.length > 0 && (
                        <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                          {selectedFiles.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between bg-gray-50 p-2 rounded"
                            >
                              <div className="flex items-center gap-2 overflow-hidden">
                                <span className="text-zinc-900 truncate max-w-[200px]">
                                  {file.name}
                                </span>
                                <span className="text-zinc-500 text-xs whitespace-nowrap">
                                  ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFile(file)}
                                className="text-red-500 text-xs hover:text-red-700"
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </FormField>
                  
                  {/* Additional Requirements */}
                  <FormField label="Additional Requirements">
                    <textarea
                      name="additionalRequirements"
                      value={formData.additionalRequirements}
                      onChange={handleChange}
                      rows={5}
                      className="w-full p-4 rounded-xl border border-zinc-200 text-sm text-zinc-900"
                      placeholder="Any additional requirements..."
                    />
                  </FormField>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4">
                    <button 
                      type="button"
                      onClick={() => window.history.back()}
                      className="w-full sm:w-48 h-12 border border-indigo-600 text-indigo-600 text-lg rounded-[10px]">
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full sm:w-auto px-6 h-12 bg-indigo-600 text-white text-lg rounded-[10px] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-700'}`}>
                      {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </form>
        </div>
      </section>
    </>
  );
}

// Reusable Label + Content wrapper
function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-base text-black font-normal">{label}</label>
      {children}
    </div>
  );
}