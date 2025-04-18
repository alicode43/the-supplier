import React from 'react'
import Navbar from '@/components/dashboard/Navbar'
import { ChevronRightIcon } from 'lucide-react'
 
function page() {
  return (
    <div>
      <div className="w-full min-h-screen bg-white flex flex-col items-center">
  {/* Header */}
  <Navbar />

 

  {/* Content */}
  <div className="w-full max-w-screen-xl px-4 sm:px-8 lg:px-14 py-6 flex flex-col gap-6">
    {/* Navigation Tabs */}
    <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 font-medium">
      {["My Offers", "My Submitted Offers", "View Offer"].map((label, index) => (
        <div key={index} className={`flex items-center gap-2 ${label === "View Offer" ? "text-indigo-800" : ""}`}>
          <span>{label}</span>
          <div className="w-5 h-5 relative"> 
             <ChevronRightIcon/>
          </div>
        </div>
      ))}
    </div>

    {/* Page Header */}
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-neutral-800">View Offer</h2>
      <button className="h-7 px-3 py-1 rounded-lg border border-indigo-500 text-indigo-500 text-xs font-bold">
        Back to My Offices
      </button>
    </div>

    <hr className="border border-black opacity-60" />

    {/* Offer Details */}
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Lead Details */}
      <div className="flex-1 bg-white p-6 rounded-xl flex flex-col gap-6">
        <div>
          <h3 className="text-lg font-medium text-black">Lead Details</h3>
          <p className="text-sm text-stone-500">Metal Bracket</p>
        </div>
        {[
          ["Lead ID", "1001"],
          ["Category", "Metal Parts"],
          ["Quantity", "500"],
          ["Target Price/Pcs", "$12.50"],
          ["Lead Time", "30 days"],
          ["Production Notes", "Stainless Steel, Brushed Finish"]
        ].map(([label, value], i) => (
          <div key={i}>
            <div className="flex justify-between">
              <span className="text-sm text-stone-500">{label}</span>
              <span className="text-sm font-medium text-neutral-900">{value}</span>
            </div>
            <div className="h-px bg-neutral-200 my-2" />
          </div>
        ))}
        <button className="mt-4 w-fit px-3 py-1 text-xs font-bold text-indigo-500 border border-indigo-500 rounded-lg">
          View Drawing
        </button>
      </div>

      {/* Your Offer */}
      <div className="flex-1 bg-white p-6 rounded-xl flex flex-col gap-6">
        <div>
          <h3 className="text-lg font-medium text-black">Your Offer</h3>
          <p className="text-sm text-stone-500">Pending</p>
        </div>
        {[
          ["Offer ID", "2001"],
          ["Your Price/Pcs", "$11.75"],
          ["Your Lead Time", "25 days"],
          ["Material", "Stainless Steel 304"],
          ["Manufacturing Process", "CNC Machining"],
          ["Submitted On", "15-May-2023"],
        ].map(([label, value], i) => (
          <div key={i}>
            <div className="flex justify-between">
              <span className="text-sm text-stone-500">{label}</span>
              <span className="text-sm font-medium text-neutral-900">{value}</span>
            </div>
            <div className="h-px bg-neutral-200 my-2" />
          </div>
        ))}
        {/* Additional Notes */}
        <div>
          <p className="text-sm text-stone-500">
            Additional Notes:
            <br />
            We can provide brushed finish as requested. Our facility has experience with similar parts for automotive applications.
          </p>
        </div>
        <button className="mt-4 w-fit px-3 py-1 text-xs font-bold text-indigo-500 border border-indigo-500 rounded-lg">
          View Sample/Portfolio
        </button>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}

export default page
