'use client';

import Navbar from '../Navbar';
import axios from 'axios';
import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";
import Image from 'next/image';

type Profile = {
  companyLogo: string;
  companyName: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  industry: string;
  aboutCompany: string;
};

export default function Page() {
  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_BACKEND_URL + '/api/v1/supply/';
  const accessToken = Cookies.get("accessToken");
  
  // File input reference
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // State for upload handling
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  
  const [procurementCategories, setProcurementCategories] = useState<string[]>([
    'Metal Parts', 
    'Plastic Components', 
    'Electronics', 
    'Rubber Parts'
  ]);

  const [isEditingCategories, setIsEditingCategories] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile>({
    companyLogo: '', 
    companyName: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    industry: '',
    aboutCompany: '',
  });

  // Handle file selection - MODIFIED to not upload immediately
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Size validation (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      
      // Type validation - only allow images
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
      
      // Store the file for later submission
      setCompanyLogo(file);
      
      // Create a preview immediately
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setLogoPreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
      
      // No immediate upload - will be sent with profile
    }
  };

  const fetchProfileData = async () => {
    try {
      const url2 = url + "getBuyerProfile";
      console.log("Fetching profile data from:", url2);
      const response = await axios.get(
        url2, 
        { 
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log("Profile data:", response.data.data);
      setProfile(response.data.data);  
      
    } catch (error) {
      console.error("Error fetching profile:", error);
      
      // Handle authentication errors
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        router.push('/signin');
      }
    }
  };

  useEffect(() => {
    // Call the fetch function when component mounts
    if (!accessToken) {
      console.error("No access token found");
      toast.error("Authentication required. Please login again.");
      router.push('/signin');
      return;
    }
    fetchProfileData();
    
    // Empty dependency array means this effect runs only once on mount
  }, []);

  // MODIFIED to include the logo in the profile submission
  const submitProfile = async () => {
    try {
      setIsEditing(false);
      setIsUploading(true); // Show loading state for form submission
      
      console.log("Submitting profile data with logo:", profile);
      
      // Use FormData to handle both text and file data
      const formData = new FormData();
      
      // Add all profile fields
      Object.entries(profile).forEach(([key, value]) => {
        // Skip the logo as we'll add it separately if needed
        if (key !== 'companyLogo') {
          formData.append(`profile[${key}]`, value || '');
        }
      });
      
      // Add the company logo from profile if no new one was selected
      if (profile.companyLogo && !companyLogo) {
        formData.append("profile[companyLogo]", profile.companyLogo);
      }
      
      // Add new logo if available
      if (companyLogo) {
        formData.append("companyLogo", companyLogo);
      }
      
      // Make API request with authorization header
      console.log("sending profile Data is:", profile);
      const response = await axios.post(
        url + "registerBuyer", 
        formData,
        { 
          headers: {
            'Authorization': `Bearer ${accessToken}`
            // Let Axios set the correct Content-Type with boundary
          }
        }
      );
      
      console.log("Profile update response:", response.data);
      
      // Update with returned data if available
      if (response.data && response.data.data) {
        setProfile(response.data.data);
      }
      
      // Clear temporary states
      setCompanyLogo(null);
      setLogoPreview(null);
      
      toast.success("Profile updated successfully!");
      
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
      
      // Handle authentication errors
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        router.push('/signin');
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleChange = (field: keyof Profile, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleCategory = async () => {
    console.log("Procurement categories:", procurementCategories);
    setIsEditingCategories(false);
    try {
      const response = await axios.post(
        url + "updateCatagory", 
        { categories: procurementCategories },
        { 
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log("Procurement categories:", response.data.data);
      
      if (response.data && response.data.data) {
        setProcurementCategories(response.data.data);
      }
      
      toast.success("Categories updated successfully!");
    } catch (error) {
      console.error("Error updating procurement categories:", error);
      toast.error("Failed to update categories");
    }
  };

  const addCategory = () => {
    if (newCategory.trim() && !procurementCategories.includes(newCategory.trim())) {
      setProcurementCategories([...procurementCategories, newCategory.trim()]);
      setNewCategory('');
    }
  };
  
  const removeCategory = (categoryToRemove: string) => {
    setProcurementCategories(procurementCategories.filter(
      category => category !== categoryToRemove
    ));
  };

  // Handle edit mode cancel
  const cancelEdit = () => {
    setIsEditing(false);
    setIsEditingCategories(false);
    setCompanyLogo(null);
    setLogoPreview(null);
    
    // Reload profile data to reset any changes
    fetchProfileData();
  };

  return (
    <>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <section className="flex flex-col md:flex-row gap-10 px-6 py-6">
        {/* Sidebar */}
        <div className="w-full md:w-80 flex flex-col items-start gap-6">
          {/* Company Card */}
          <div className="p-4 bg-white rounded-xl shadow-md w-full flex flex-col items-center gap-4">
            <div className="w-64 h-44 bg-neutral-200 rounded-xl relative">
              {logoPreview ? (
                // Show preview if available
                <Image
                  src={logoPreview}
                  alt="Company Logo Preview"
                  width={256}
                  height={176}
                  className="object-cover rounded-xl w-full h-full"
                />
              ) : profile.companyLogo ? (
                // Otherwise show existing logo
                <Image
                  src={profile.companyLogo}
                  alt="Company Logo"
                  width={256}
                  height={176}
                  className="object-cover rounded-xl w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No logo uploaded
                </div>
              )}
              
              {/* Loading indicator */}
              {isUploading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-t-indigo-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            
            <div className="text-center">
              <h2 className="text-lg font-medium text-black">{profile.companyName}</h2>
              <p className="text-sm text-stone-500">
                {profile.industry}
                <br />
                {profile.address}
              </p>
            </div>
            
            {/* Hidden file input */}
            <input 
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            
            {/* Change Photo button - only enabled in edit mode */}
            <button 
              onClick={() => isEditing && fileInputRef.current?.click()}
              disabled={!isEditing || isUploading}
              className={`text-xs font-bold px-3 py-1 rounded-lg ${
                isEditing 
                  ? "text-indigo-500 border border-indigo-500 hover:bg-indigo-50 cursor-pointer" 
                  : "text-gray-400 border border-gray-300 cursor-not-allowed"
              }`}
            >
              {companyLogo ? 'Photo Selected' : 'Change Photo'}
            </button>
          </div>

          {/* Procurement Categories */}
          <div className="p-4 bg-white rounded-xl shadow-md w-full">
            <h3 className="text-lg font-medium mb-4">Procurement Categories</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {procurementCategories.map((item) => (
                <span
                  key={item}
                  className="bg-indigo-400 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center"
                >
                  {item}
                  {isEditingCategories && (
                    <button
                      onClick={() => removeCategory(item)}
                      className="ml-2 text-white hover:text-red-200"
                    >
                      ×
                    </button>
                  )}
                </span>
              ))}
            </div>
            
            {isEditingCategories ? (
              <div className="flex items-center gap-2 mb-4">
                <input
                  type="text"
                  placeholder="New category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="flex-1 p-2 text-sm border border-gray-300 rounded-md"
                />
                <button
                  onClick={addCategory}
                  className="px-3 py-1 text-xs font-bold text-white bg-indigo-500 rounded-md hover:bg-indigo-600"
                >
                  Add
                </button>
                <button
                  onClick={handleCategory}
                  className="px-3 py-1 text-xs font-bold text-indigo-500 border border-indigo-500 rounded-md"
                >
                  Done
                </button>
              </div>
            ) : (
              <button 
                onClick={() => isEditing && setIsEditingCategories(true)}
                disabled={!isEditing}
                className={`text-xs font-bold px-3 py-1 rounded-lg ${
                  isEditing 
                    ? "text-indigo-500 border border-indigo-500 hover:bg-indigo-50 cursor-pointer" 
                    : "text-gray-400 border border-gray-300 cursor-not-allowed"
                }`}
              >
                Edit Categories
              </button>
            )}
          </div>
        </div>

        {/* Main Profile Section */}
        <div className="flex-1 flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-neutral-800">Buyer Profile</h1>
            <div className="flex gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={cancelEdit}
                    className="px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitProfile}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-6">
            <h2 className="text-xl font-medium">Company Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {([
                { label: 'Company Name', key: 'companyName' },
                { label: 'Email', key: 'email' },
                { label: 'Phone', key: 'phone' },
                { label: 'Website', key: 'website' },
                { label: 'Address', key: 'address', textarea: true },
                { label: 'Industry', key: 'industry' },
                { label: 'About Company', key: 'aboutCompany', textarea: true },
              ] as { label: string; key: keyof Profile; textarea?: boolean }[]).map(
                ({ label, key, textarea }) => (
                  <div key={key} className="flex flex-col gap-2">
                    <label className="text-base font-normal text-black">{label}</label>
                    {isEditing ? (
                      textarea ? (
                        <textarea
                          className="p-3 rounded-xl border border-zinc-200 resize-none"
                          rows={4}
                          value={profile[key]}
                          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                            handleChange(key, e.target.value)
                          }
                        />
                      ) : (
                        <input
                          type="text"
                          className="p-3 rounded-xl border border-zinc-200"
                          value={profile[key]}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleChange(key, e.target.value)
                          }
                        />
                      )
                    ) : (
                      <div className="p-3 rounded-xl border border-zinc-100 bg-gray-50 text-sm text-zinc-900">
                        {profile[key]}
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}