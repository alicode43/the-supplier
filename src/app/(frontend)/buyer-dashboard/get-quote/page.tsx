"use client";

import Navbar from "@/components/dashboard/Navbar";
import { Inter } from "next/font/google";

// Initialize the Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function Page() {
  return (
    <>
      <Navbar />
      <section className={`w-full px-4 sm:px-10 py-8 ${inter.className}`}>
        <div className="flex flex-col gap-5">
          <h1 className="text-start text-neutral-800 text-3xl font-bold transition-all duration-300 hover:text-blue-600 cursor-pointer sm:text-4xl md:text-5xl">
            Get a Quote
          </h1>
          <div className="w-24 h-1 bg-blue-500 mt-2 rounded-full hover:w-32 transition-all duration-300"></div>
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
                    <FormField label="Part Name/Description">
                      <input
                        className="w-full p-4 rounded-xl border border-indigo-500 text-sm text-zinc-900"
                        placeholder="Enter description"
                      />
                    </FormField>

                    <FormField label="Quantity">
                      <input
                        className="w-full p-4 rounded-xl border border-zinc-200 text-sm text-zinc-900"
                        placeholder="Enter quantity"
                      />
                    </FormField>

                    <FormField label="Required Lead Time (Days)">
                      <input
                        className="w-full p-4 rounded-xl border border-zinc-200 text-sm text-zinc-900"
                        placeholder="Enter days"
                      />
                    </FormField>
                  </div>

                  {/* Right Column */}
                  <div className="flex flex-col gap-4">
                    <FormField label="Category">
                      <input
                        className="w-full p-4 rounded-xl border border-zinc-200 text-sm text-zinc-900"
                        placeholder="Select category"
                      />
                    </FormField>

                    <FormField label="Target Price per Piece (INR)">
                      <input
                        className="w-full p-4 rounded-xl border border-zinc-200 text-sm text-zinc-900"
                        placeholder="Enter price"
                      />
                    </FormField>

                    <FormField label="Preferred Supplier Location">
                      <input
                        className="w-full p-4 rounded-xl border border-zinc-200 text-sm text-zinc-900"
                        placeholder="Any location"
                      />
                    </FormField>
                  </div>
                </div>

                {/* Detailed Specs */}
                <FormField label="Detailed Specifications">
                  <textarea
                    rows={5}
                    className="w-full p-4 rounded-xl border border-zinc-200 text-sm text-zinc-900"
                    placeholder="Write detailed specifications here..."
                  />
                </FormField>

                {/* Attachments */}
                <FormField label="Attachments (Drawings, Specifications, etc.)">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 text-sm">
                    <span className="text-zinc-900">No file selected.</span>
                    <button className="text-indigo-600 font-bold underline">
                      Browse...
                    </button>
                  </div>
                </FormField>

                {/* Additional Requirements */}
                <FormField label="Additional Requirements">
                  <textarea
                    rows={5}
                    className="w-full p-4 rounded-xl border border-zinc-200 text-sm text-zinc-900"
                    placeholder="Any additional requirements..."
                  />
                </FormField>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4">
                  <button className="w-full sm:w-48 h-12 border border-indigo-600 text-indigo-600 text-lg rounded-[10px]">
                    Cancel
                  </button>
                  <button className="w-full sm:w-auto px-6 h-12 bg-indigo-600 text-white text-lg rounded-[10px]">
                    Submit Quote Request
                  </button>
                </div>
              </div>
            </div>
          </section>
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
