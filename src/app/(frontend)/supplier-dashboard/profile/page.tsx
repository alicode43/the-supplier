"use client";

import Navbar from "@/components/dashboard/Navbar";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import RequireAuth from "@/components/auth/RequireAuth";
import axios from "axios";

export default function Page() {
  // Loading state
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Edit mode state
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // State for company logo - use File type for actual upload
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  
  // Add a separate state for the logo preview URL
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  
  // Store original logo for cancellation
  const [originalLogo, setOriginalLogo] = useState<File | null>(null);
  const [originalLogoPreview, setOriginalLogoPreview] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // State for form data
  const [formData, setFormData] = useState({
    companyName: "",
    yearEstablished: "",
    companyType: "",
    employees: "",
    description: "",
    website: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    plan:""
  });

  // Store original data for cancellation
  const [originalData, setOriginalData] = useState({...formData});

  // Refs for select elements
  const companyTypeRef = useRef<HTMLSelectElement>(null);
  const employeesRef = useRef<HTMLSelectElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);

  // Function to fetch supplier profile data
  const getSupplierProfile = async () => {
    try {
      setIsLoading(true);
      
      // Get access token
      const accessToken = Cookies.get("accessToken");
      
      if (!accessToken) {
        toast.error("You must be logged in to view your profile");
        return;
      }
      
      // Make API request to get profile data
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/supply/getSupplierProfile`, 
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );
      
      // Check response and update state
      if (response.status === 200 && response.data) {
        const profileData = response.data.data;
        console.log("Profile Data:", profileData);
        
        // Update form data with fetched profile
        setFormData({
          companyName: profileData.companyName || "",
          yearEstablished: profileData.yearEstablished || "",
          companyType: profileData.companyType || "",
          employees: profileData.employees || "",
          description: profileData.companyDescription || "",
          website: profileData.contactInfo.website || "",
          phone: profileData.contactInfo.phoneNumber || "",
          email: profileData.contactInfo.companyEmail|| "",
          address: profileData.address.streetAddress || "",
          city: profileData.address.city || "",
          state: profileData.address.state || "",
          postalCode: profileData.address.postalCode || "",
          country: profileData.address.country || "",
           plan:""
        });
        setLogoPreview(profileData.companyLogo || null);
        // Set original data for cancellation
        setOriginalData({
          companyName: profileData.companyName || "",
          yearEstablished: profileData.yearEstablished || "",
          companyType: profileData.companyType || "",
          employees: profileData.employees || "",
          description: profileData.description || "",
          website: profileData.website || "",
          phone: profileData.phone || "",
          email: profileData.email || "",
          address: profileData.address || "",
          city: profileData.city || "",
          state: profileData.state || "",
          postalCode: profileData.postalCode || "",
          country: profileData.country || "",
           plan:""
        });
        
        // Set logo preview if available
        if (profileData.logoUrl) {
          setLogoPreview(profileData.logoUrl);
        }
      }
    } catch (error) {
      console.error("Error fetching supplier profile:", error);
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to load profile data. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch profile data when component mounts
  useEffect(() => {
    getSupplierProfile();
  }, []);

  // Handle file selection for company logo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Size validation (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      
      // Store the actual File object
      setCompanyLogo(file);
      
      // Create a preview of the selected image
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          // Set the preview as a string
          setLogoPreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to open select dropdown
  const openDropdown = (ref: React.RefObject<HTMLSelectElement | null>) => {
    if (ref.current && isEditing) {
      ref.current.focus();
      ref.current.click();
    }
  };

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!isEditing) return;
    
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Start editing
  const startEditing = () => {
    setOriginalData({...formData});
    setOriginalLogo(companyLogo);
    setOriginalLogoPreview(logoPreview);
    setIsEditing(true);
  };

  // Cancel editing
  const cancelEditing = () => {
    setFormData({...originalData});
    setCompanyLogo(originalLogo);
    setLogoPreview(originalLogoPreview);
    setIsEditing(false);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsEditing(false); // Disable editing mode immediately
      
      // Create form data object for file uploads
      const submitData = new FormData();
      
      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value);
      });
      
      // Append company logo if it exists
      if (companyLogo) {
        submitData.append("companyLogo", companyLogo);
      }
      
      // Get access token
      const accessToken = Cookies.get("accessToken");
      
      if (!accessToken) {
        toast.error("You must be logged in to update your profile");
        return;
      }
      
      // Submit the form
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/supply/registerSupplier`, 
        submitData,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      // Check response and show success message
      if (response.status === 200 || response.status === 201) {
        toast.success("Profile updated successfully!");
        
        // Refresh profile data after successful update
        getSupplierProfile();
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
      
      // If there's an error, allow user to continue editing
      setIsEditing(true);
    }
  };

  return (
    <RequireAuth>
      <div className="min-h-screen bg-gray-50 font-inter">
        <Navbar />
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
        />
        
        {isLoading ? (
          <div className="min-h-[60vh] flex flex-col items-center justify-center">
            <Loader2 className="h-12 w-12 text-indigo-600 animate-spin mb-4" />
            <p className="text-lg text-gray-700">Loading profile data...</p>
          </div>
        ) : (
          <section className="container mx-auto px-4 py-6 sm:w-11/12">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
              {/* Left Sidebar */}
              <div className="w-full lg:w-auto lg:pt-28 flex flex-col gap-5">
                {/* Company Photo/Logo */}
                <div className="p-3 bg-white rounded-xl flex flex-col items-center gap-2.5 overflow-hidden">
                  <div className="flex flex-col items-start gap-6">
                    <div className="w-64 h-44 relative bg-neutral-200 rounded-xl overflow-hidden">
                      {logoPreview ? (
                        <img 
                          src={logoPreview} 
                          alt="Company Logo" 
                          className="w-full h-full object-cover rounded-xl" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                          <span>No logo uploaded</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-start gap-1 w-full">
                      <div className="self-stretch text-center text-black text-lg font-medium">
                        {formData.companyName || "Your Company Name"}
                      </div>
                      <div className="w-64 text-center text-stone-500 text-sm">Premium Supplier</div>
                    </div>
                  </div>
                  
                  {/* Hidden file input for logo upload */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/jpeg,image/png,image/gif"
                    className="hidden"
                  />
                  
                  {/* Change Photo button - show only in edit mode */}
                  {isEditing && (
                    <button 
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="h-7 px-2.5 py-2 rounded-lg outline outline-indigo-500 flex justify-center items-center"
                    >
                      <div className="text-indigo-500 text-xs font-bold">Change Photo</div>
                    </button>
                  )}
                </div>

                {/* Account Status */}
                <div className="w-full lg:w-72 p-6 bg-white rounded-xl flex flex-col gap-2.5 overflow-hidden">
                  <div className="self-stretch flex flex-col gap-6">
                    {/* Account Status Section */}
                    <div className="self-stretch flex flex-col gap-3.5">
                      <div className="flex flex-col gap-0.5">
                        <div className="text-black text-lg font-medium">Account Status</div>
                      </div>
                      <div className="self-stretch flex flex-col gap-5">
                        <div className="self-stretch flex justify-between items-center">
                          <div className="text-stone-500 text-sm">Email Verified</div>
                          <div className="w-3.5 h-3.5 relative overflow-hidden">
                            <div className="w-3.5 h-3.5 left-0 top-0 absolute bg-lime-700"></div>
                          </div>
                        </div>
                        <div className="self-stretch flex justify-between items-center">
                          <div className="text-stone-500 text-sm">Phone Verified</div>
                          <div className="w-3.5 h-3.5 relative overflow-hidden">
                            <div className="w-3.5 h-3.5 left-0 top-0 absolute bg-lime-700"></div>
                          </div>
                        </div>
                        <div className="self-stretch flex justify-between items-center">
                          <div className="text-stone-500 text-sm">Business Verified</div>
                          <div className="w-3.5 h-3.5 relative overflow-hidden">
                            <div className="w-3.5 h-3.5 left-0 top-0 absolute bg-lime-700"></div>
                          </div>
                        </div>
                        <div className="self-stretch flex justify-between items-center">
                          <div className="text-stone-500 text-sm">Premium Member</div>
                          <div className="w-3.5 h-3.5 relative overflow-hidden">
                            <div className="w-3.5 h-3.5 left-[0.63px] top-[0.63px] absolute bg-yellow-500"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="self-stretch h-px bg-neutral-200"></div>

                    {/* Membership Section */}
                    <div className="self-stretch flex flex-col gap-3.5">
                      <div className="flex flex-col gap-0.5">
                        <div className="text-black text-lg font-medium">Membership</div>
                      </div>
                      <div className="self-stretch flex flex-col gap-2.5">
                        <div className="self-stretch flex gap-24">
                          <div className="text-stone-500 text-sm">Plan: Premium</div>
                        </div>
                        <div className="self-stretch flex gap-24">
                          <div className="text-stone-500 text-sm">Renewal Date: 15 Dec, 2025</div>
                        </div>
                      </div>
                      <button className="h-7 px-2.5 py-2 rounded-lg outline-1 outline-indigo-500 flex justify-center items-center">
                        <div className="text-indigo-500 text-xs font-bold">Upgrade Plan</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 flex flex-col gap-5">
                {/* Header */}
                <div className="flex items-center gap-2.5">
                  <h1 className="text-neutral-800 text-3xl font-bold">My Profile</h1>
                </div>

                {/* Form Section */}
                <div className="self-stretch flex flex-col gap-2.5">
                  <div className="self-stretch flex flex-col gap-2.5">
                    <div className="self-stretch rounded-xl">
                      <form onSubmit={handleSubmit} className="self-stretch px-8 pt-8 pb-11 bg-white rounded-tl-xl rounded-tr-xl flex flex-col gap-9">
                        {/* Header with Edit button */}
                        <div className="flex justify-between items-center">
                          <div className="text-black text-xl font-medium">Company Info</div>
                          {!isEditing && (
                            <button
                              type="button"
                              onClick={startEditing}
                              className="px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-colors"
                            >
                              Edit Profile
                            </button>
                          )}
                        </div>
                        
                        <div className="self-stretch flex flex-col gap-4">
                          {/* First row */}
                          <div className="self-stretch flex flex-col lg:flex-row gap-6 lg:gap-14">
                            <div className="flex-1 self-stretch flex flex-col gap-4">
                              <div className="self-stretch flex gap-3">
                                <div className="flex-1 flex flex-col gap-2">
                                  <label className="text-black text-base">Company Name</label>
                                  <input 
                                    type="text" 
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`self-stretch p-4 rounded-xl ${
                                      isEditing ? "outline outline-indigo-500" : "bg-gray-50 outline outline-zinc-100"
                                    } text-zinc-900 text-sm`}
                                  />
                                </div>
                              </div>
                              
                              <div className="self-stretch flex gap-3">
                                <div className="flex-1 flex flex-col gap-2">
                                  <label className="text-black text-base">Year Established</label>
                                  <div className={`self-stretch p-4 rounded-xl outline outline-zinc-100 flex gap-px ${!isEditing ? "bg-gray-50" : ""}`}>
                                    <div className="flex items-center gap-2.5">
                                      <div className="w-4 h-4 relative overflow-hidden">
                                        <div className="w-4 h-4 left-0 top-0 absolute bg-black" />
                                        <div className="w-0.5 h-0.5 left-[7.88px] top-[10.12px] absolute bg-black" />
                                        <div className="w-0.5 h-0.5 left-[4.12px] top-[10.12px] absolute bg-black" />
                                        <div className="w-0.5 h-0.5 left-[11.62px] top-[10.12px] absolute bg-black" />
                                      </div>
                                      <input
                                        type="date"
                                        name="yearEstablished"
                                        value={formData.yearEstablished}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className={`text-zinc-900 text-sm bg-transparent border-none outline-none ${!isEditing ? "bg-gray-50" : ""}`}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex-1 self-stretch flex flex-col gap-4">
                              <div className="self-stretch flex gap-3">
                                <div className="flex-1 flex flex-col gap-2">
                                  <label className="text-black text-base">Company Type</label>
                                  <div className={`self-stretch p-4 rounded-xl outline outline-zinc-100 relative flex items-center ${!isEditing ? "bg-gray-50" : ""}`}>
                                    <select
                                      ref={companyTypeRef}
                                      name="companyType"
                                      value={formData.companyType}
                                      onChange={handleChange}
                                      disabled={!isEditing}
                                      className="w-full appearance-none bg-transparent text-zinc-900 text-sm"
                                    >
                                      <option value="">Select Company Type</option>
                                      <option value="Manufacturer">Manufacturer</option> 
                                      <option value="Distributor">Distributor</option>
                                      <option value="Service Provider">Service Provider</option>
                                      <option value="Retailer">Retailer</option>
                                    </select>
                                    {isEditing && (
                                      <div 
                                        className="cursor-pointer" 
                                        onClick={() => openDropdown(companyTypeRef)}
                                      >
                                        <ChevronDown />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="self-stretch flex gap-3">
                                <div className="flex-1 flex flex-col gap-2">
                                  <label className="text-black text-base">Number of Employees</label>
                                  <div className={`self-stretch p-4 rounded-xl outline outline-zinc-100 relative flex items-center ${!isEditing ? "bg-gray-50" : ""}`}>
                                    <select
                                      ref={employeesRef}
                                      name="employees"
                                      value={formData.employees}
                                      onChange={handleChange}
                                      disabled={!isEditing}
                                      className="w-full appearance-none bg-transparent text-zinc-900 text-sm"
                                    >
                                      <option value="">Select Number of Employees</option>
                                      <option value="1 - 10">1 - 10</option>
                                      <option value="11 - 50">11 - 50</option>
                                      <option value="51 - 200">51 - 200</option>
                                      <option value="201 - 500">201 - 500</option>
                                      <option value="500+">500+</option>
                                    </select>
                                    {isEditing && (
                                      <div 
                                        className="cursor-pointer" 
                                        onClick={() => openDropdown(employeesRef)}
                                      >
                                        <ChevronDown />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Description */}
                          <div className="self-stretch flex gap-3">
                            <div className="flex-1 flex flex-col gap-2">
                              <label className="text-black text-base">Company Description</label>
                              <div className={`self-stretch rounded-xl outline outline-zinc-100 ${!isEditing ? "bg-gray-50" : ""}`}>
                                <textarea
                                  name="description"
                                  value={formData.description}
                                  onChange={handleChange}
                                  disabled={!isEditing}
                                  className="w-full px-4 pt-4 pb-16 rounded-xl text-zinc-900 text-sm resize-none border-0 outline-none bg-transparent"
                                ></textarea>
                              </div>
                            </div>
                          </div>
                          
                          {/* Contact info */}
                          <div className="self-stretch flex flex-col lg:flex-row gap-6 lg:gap-14">
                            <div className="flex-1 self-stretch flex flex-col gap-4">
                              <div className="self-stretch flex gap-3">
                                <div className="flex-1 flex flex-col gap-2">
                                  <label className="text-black text-base">Website</label>
                                  <input
                                    // type="url"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`self-stretch p-4 rounded-xl outline ${
                                      isEditing ? "outline-indigo-500" : "bg-gray-50 outline-zinc-100"
                                    } text-zinc-900 text-sm`}
                                  />
                                </div>
                              </div>
                              
                              <div className="self-stretch flex gap-3">
                                <div className="flex-1 flex flex-col gap-2">
                                  <label className="text-black text-base">Phone Number</label>
                                  <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`self-stretch p-4 rounded-xl outline outline-zinc-100 text-zinc-900 text-sm ${!isEditing ? "bg-gray-50" : ""}`}
                                  />
                                </div>
                              </div>
                              
                              <div className="self-stretch flex gap-3">
                                <div className="flex-1 flex flex-col gap-2">
                                  <label className="text-black text-base">City</label>
                                  <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`self-stretch p-4 rounded-xl outline outline-zinc-100 text-zinc-900 text-sm ${!isEditing ? "bg-gray-50" : ""}`}
                                  />
                                </div>
                              </div>
                              
                              <div className="self-stretch flex gap-3">
                                <div className="flex-1 flex flex-col gap-2">
                                  <label className="text-black text-base">Postal Code</label>
                                  <input
                                    type="text"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`self-stretch p-4 rounded-xl outline outline-zinc-100 text-zinc-900 text-sm ${!isEditing ? "bg-gray-50" : ""}`}
                                  />
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex-1 self-stretch flex flex-col gap-4">
                              <div className="self-stretch flex gap-3">
                                <div className="flex-1 flex flex-col gap-2">
                                  <label className="text-black text-base">Company Email</label>
                                  <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`self-stretch p-4 rounded-xl outline outline-zinc-100 text-zinc-900 text-sm ${!isEditing ? "bg-gray-50" : ""}`}
                                  />
                                </div>
                              </div>
                              
                              <div className="self-stretch flex gap-3">
                                <div className="flex-1 flex flex-col gap-2">
                                  <label className="text-black text-base">Address</label>
                                  <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`self-stretch p-4 rounded-xl outline outline-zinc-100 text-zinc-900 text-sm ${!isEditing ? "bg-gray-50" : ""}`}
                                  />
                                </div>
                              </div>
                              
                              <div className="self-stretch flex gap-3">
                                <div className="flex-1 flex flex-col gap-2">
                                  <label className="text-black text-base">State</label>
                                  <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`self-stretch p-4 rounded-xl outline outline-zinc-100 text-zinc-900 text-sm ${!isEditing ? "bg-gray-50" : ""}`}
                                  />
                                </div>
                              </div>
                              
                              <div className="self-stretch flex gap-3">
                                <div className="flex-1 flex flex-col gap-2">
                                  <label className="text-black text-base">Country</label>
                                  <div className={`self-stretch p-4 rounded-xl outline outline-zinc-100 relative flex items-center ${!isEditing ? "bg-gray-50" : ""}`}>
                                    <select
                                      ref={countryRef}
                                      name="country"
                                      value={formData.country}
                                      onChange={handleChange}
                                      disabled={!isEditing}
                                      className="w-full appearance-none bg-transparent text-zinc-900 text-sm"
                                    >
                                      <option value="">Select Country</option>
                                      <option value="India">India</option>
                                      <option value="United States">United States</option>
                                      <option value="United Kingdom">United Kingdom</option>
                                      <option value="Germany">Germany</option>
                                      <option value="Japan">Japan</option>
                                    </select>
                                    {isEditing && (
                                      <div 
                                        className="cursor-pointer" 
                                        onClick={() => openDropdown(countryRef)}
                                      >
                                        <ChevronDown />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Show buttons only in edit mode */}
                        {isEditing && (
                          <div className="flex gap-4">
                            <button
                              type="button"
                              onClick={cancelEditing}
                              className="w-48 h-12 p-4 border border-indigo-600 rounded-[10px] flex justify-center items-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors"
                            >
                              <div className="text-indigo-600 text-lg">Cancel</div>
                            </button>
                            <button
                              type="submit"
                              className="w-48 h-12 p-4 bg-indigo-600 rounded-[10px] flex justify-center items-center gap-2 cursor-pointer hover:bg-indigo-700 transition-colors"
                            >
                              <p className="text-white text-lg">Save Changes</p>
                            </button>
                          </div>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </RequireAuth>
  );
}