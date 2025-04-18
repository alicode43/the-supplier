import Navbar from '@/components/dashboard/Navbar'
import React from 'react'
 
function page() {
  return (
    <>   
    <Navbar />
    <div className="w-full px-4 md:px-8 lg:px-14 py-2.5 flex flex-col md:flex-row justify-start items-start gap-5 md:gap-10">
    {/* Left Column - Lead Details */}
    <div className="w-full md:w-auto flex flex-col justify-center items-start gap-5">
      <div className="justify-start text-neutral-800 text-2xl md:text-3xl font-bold ">Lead Details</div>
      <div className="w-full md:w-72 p-3 bg-white rounded-xl flex flex-col justify-start items-start gap-2.5 overflow-hidden shadow-sm">
        <div className="self-stretch flex flex-col justify-start items-start gap-5">
          <div className="flex flex-col justify-start items-start gap-0.5">
            <div className="justify-center text-black text-lg font-medium font-['Inter']">Metal Bracket</div>
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-3">
            <div className="self-stretch flex justify-between">
              <span className="text-black text-sm font-semibold font-['Inter']">Lead ID:</span>
              <span className="text-stone-500 text-sm font-normal font-['Inter']">1001</span>
            </div>
            <div className="self-stretch flex justify-between">
              <span className="text-black text-sm font-semibold font-['Inter']">Quantity:</span>
              <span className="text-stone-500 text-sm font-normal font-['Inter']">500</span>
            </div>
            <div className="self-stretch flex justify-between">
              <span className="text-black text-sm font-semibold font-['Inter']">Lead Time:</span>
              <span className="text-stone-500 text-sm font-normal font-['Inter']">30 days</span>
            </div>
            <div className="self-stretch flex justify-between">
              <span className="text-black text-sm font-semibold font-['Inter']">Category:</span>
              <span className="text-stone-500 text-sm font-normal font-['Inter']">Metal Parts</span>
            </div>
            <div className="self-stretch flex justify-between">
              <span className="text-black text-sm font-semibold font-['Inter']">Target Price/Pcs:</span>
              <span className="text-stone-500 text-sm font-normal font-['Inter']">$12.50</span>
            </div>
            <div className="self-stretch">
              <span className="text-black text-sm font-semibold font-['Inter']">Production Notes:</span>
              <span className="text-stone-500 text-sm font-normal font-['Inter']"> Stainless steel, brushed finish</span>
            </div>
          </div>
          <button className="h-7 px-2.5 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-indigo-500 flex justify-center items-center">
            <div className="text-indigo-500 text-xs font-bold ">View Drawing</div>
          </button>
        </div>
      </div>
    </div>

    {/* Right Column - Submit Offer Form */}
    <div className="w-full flex-1 flex flex-col justify-start items-start gap-5 mt-5 md:mt-0">
      <div className="flex justify-start items-center gap-2.5">
        <div className="text-neutral-800 text-2xl md:text-3xl font-bold ">Submit Your Offer</div>
      </div>
      <div className="w-full flex flex-col justify-start items-start gap-2.5">
        <div className="w-full rounded-xl bg-white shadow-sm">
          <div className="p-4 md:p-8">
            <form className="flex flex-col gap-9">
              <div className="w-full flex flex-col gap-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-black text-base font-normal font-['Inter']">Your Price Per Piece ($)</label>
                    <input 
                      type="text" 
                      placeholder="Your Price Per Piece ($)" 
                      className="w-full p-4 rounded-xl border border-zinc-100 text-sm"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-black text-base font-normal font-['Inter']">Your Lead Time (days)</label>
                    <input 
                      type="text" 
                      placeholder="Your Lead Time (days)" 
                      className="w-full p-4 rounded-xl border border-zinc-100 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-black text-base font-normal font-['Inter']">Material</label>
                    <input 
                      type="text" 
                      placeholder="Material" 
                      className="w-full p-4 rounded-xl border border-zinc-100 text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-black text-base font-normal font-['Inter']">Manufacturing Process</label>
                    <select className="w-full p-4 rounded-xl border border-zinc-100 text-sm">
                      <option>Select a process</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-black text-base font-normal font-['Inter']">Additional Notes</label>
                  <textarea 
                    placeholder="Additional Notes" 
                    className="w-full p-4 rounded-xl border border-zinc-100 text-sm min-h-[100px]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-black text-base font-normal font-['Inter']">Upload Sample/Portfolio (optional)</label>
                  <div className="w-full p-4 rounded-xl border border-zinc-100 flex justify-between items-center">
                    <span className="text-zinc-900 text-sm font-normal">No file selected.</span>
                    <button className="text-indigo-600 text-sm font-bold underline">Browse..</button>
                  </div>
                </div>
              </div>
              <button className="w-full sm:w-48 h-12 p-4 bg-indigo-600 rounded-[10px] flex justify-center items-center text-white text-lg font-normal font-['Inter']">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
    </>
 
  )
}

export default page
