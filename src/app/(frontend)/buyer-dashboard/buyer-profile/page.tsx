'use client';

import Navbar from '@/components/dashboard/Navbar';
import React, { useState, ChangeEvent } from 'react';


type Profile = {
  name: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  industry: string;
  about: string;
};

export default function Page() {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile>({
    name: 'XYZ Industries',
    email: 'procurement@xyzindustries.com',
    phone: '+91 98765 12345',
    website: 'https://www.xyzindustries.com',
    address:
      '456 Industrial Zone, Pimpri-Chinchwad, Pune, Maharashtra, India - 411019',
    industry: 'Automotive',
    about:
      'XYZ Industries is a leading manufacturer of automotive components with a focus on high-quality precision parts. We supply to major OEMs across India and have been in business for over 20 years.',
  });

  const handleChange = (field: keyof Profile, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  return (
    <>
    <Navbar />
     <section className="flex flex-col md:flex-row gap-10 px-6 py-6">
      {/* Sidebar */}
      <div className="w-full md:w-80 flex flex-col items-start gap-6">
        {/* Company Card */}
        <div className="p-4 bg-white rounded-xl shadow-md w-full flex flex-col items-center gap-4">
          <div className="w-64 h-44 bg-neutral-200 rounded-xl" />
          <div className="text-center">
            <h2 className="text-lg font-medium text-black">XYZ Industries</h2>
            <p className="text-sm text-stone-500">
              Automotive Components Manufacturer, Pune, India
            </p>
          </div>
          <button className="text-indigo-500 text-xs font-bold outline outline-1 outline-indigo-500 px-3 py-1 rounded-lg">
            Change Photo
          </button>
        </div>

        {/* Procurement Categories */}
        <div className="p-4 bg-white rounded-xl shadow-md w-full">
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
          <button className="text-indigo-500 text-xs font-bold outline outline-1 outline-indigo-500 px-3 py-1 rounded-lg">
            Edit Categories
          </button>
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
              { label: 'Company Name', key: 'name' },
              { label: 'Email', key: 'email' },
              { label: 'Phone', key: 'phone' },
              { label: 'Website', key: 'website' },
              { label: 'Address', key: 'address', textarea: true },
              { label: 'Industry', key: 'industry' },
              { label: 'About Company', key: 'about', textarea: true },
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
              onClick={() => {
                setIsEditing(false);
                alert('Changes saved!');
              }}
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
