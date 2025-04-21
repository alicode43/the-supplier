'use client';

import Navbar from '../Navbar';
import axios from 'axios';
import React, { useState, ChangeEvent, useEffect } from 'react';
import { useRouter } from "next/navigation"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from "js-cookie"
import Image from 'next/image';

type Profile = {
  companyLogo: string ;
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
    companyLogo: '', // Default value for companyLogo
    companyName: '',
    email: '',
    phone: '',
    website: '',
    address:'',
    industry: '',
    aboutCompany:'',
  });

  const fetchProfileData = async () => {
    try {
      
      const url2= url+"getBuyerProfile";
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




  const submitProfile = async () => {
    try {
      setIsEditing(false);
      
      // Get access token from cookies
  
      
      console.log("Submitting profile data:", profile);
      
      // Make API request with authorization header
      const response = await axios.post(
        url+"registerBuyer", 
        { profile },
        { 
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log(response.data.data);
      toast.success("Profile updated successfully!");
      
    } 
    catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
      
      // Handle authentication errors
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        router.push('/signin');
      }
    }
  }
  const handleChange = (field: keyof Profile, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleCategory=async()=>{
    console.log("Procurement categories:", procurementCategories);
    setIsEditingCategories(false);
    try {
      const response = await axios.post(
        url+"updateCatagory", 
        { 
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log("Procurement categories:", response.data.data);
      setProcurementCategories(response.data.data);  
    } catch (error) {
      console.error("Error fetching procurement categories:", error);
    }

  }
  

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
          <div className="w-64 h-44 bg-neutral-200 rounded-xl" >
           
            
            <Image
              src={profile?.companyLogo}
              alt="Company Logo"
              width={256}
              height={176}
              className="object-cover rounded-xl"
            />
            
             </div>
          <div className="text-center">
            <h2 className="text-lg font-medium text-black">{profile.companyName}</h2>
            <p className="text-sm text-stone-500">
             {profile.industry}
             <br />
             {profile.address}
            </p>
          </div>
          <button className="text-indigo-500 text-xs font-bold outline-1 outline-indigo-500 px-3 py-1 rounded-lg">
            Change Photo
          </button>
        </div>

        {/* Procurement Categories */}
        {/* <div className="p-4 bg-white rounded-xl shadow-md w-full">
          <h3 className="text-lg font-medium mb-4">Procurement Categories</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {['Metal Parts', 'Plastic Components', 'Electronics', 'Rubber Parts'].map(
              (item) => (
                <span
                  key={item}
                  className="bg-indigo-400 text-white text-xs font-bold px-3 py-1 rounded-full"
                >
                  {item}
                </span>
              )
            )}
          </div>
          <button className="text-indigo-500 text-xs font-bold outline-1 outline-indigo-500 px-3 py-1 rounded-lg">
            Edit Categories
          </button>
        </div> */}
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
      // onClick={() => setIsEditingCategories(true)}
      className="text-indigo-500 text-xs font-bold outline-1 outline-indigo-500 px-3 py-1 rounded-lg"
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
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
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

          {isEditing && (
            <button
              onClick={submitProfile}
              className="mt-6 px-4 py-3 bg-indigo-600 text-white text-lg rounded-md hover:bg-indigo-700"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </section></>
   
  );
}
