"use client";
import { useState } from "react";
import Navbar from "@/components/frontend/Navbar";
import HeroInput from "@/components/frontend/HeroInput";
import Feature from "@/components/frontend/Feature";
import DrawingShowCase from "@/components/frontend/DrawingShowCase";
import Footer from "@/components/frontend/Footer";
import AboutJob from "@/components/frontend/aboutJob"; // Ensure this path is correct
import BottomCTA from "@/components/frontend/BottomCTA";
import { FileCheck, Clock } from "lucide-react"; // Import icons from lucide-react
const serviceItems = [
  {
    icon: FileCheck,
    title: "Quick Turnaround",
    description:
      "TheSupplier provides instant quotes and completed parts in as fast as 10 business days, Combining the latest cutting, bending and punching with automated technologies.",
  },
  {
    icon: Clock,
    title: "Wide Range of Materials",
    description:
      "TheSupplier provides wide range of materials like all types of ferrous and non ferrous( Copper, Brass, Aluminum, All types of Stainless Steel in 200,300,400 Series and many more)",
  },
  {
    icon: FileCheck,
    title: "Delivery on Time",
    description:
      "Punctual delivery, guaranteed. At TheSupplier, we pride ourselves on timely service. Count on us for on-time delivery, ensuring your products reach you promptly and seamlessly, meeting your deadlines with precision.",
  },
  {
    icon: Clock,
    title: "Wide Range of Materials",
    description:
      "TheSupplier provides wide range of materials like all types of ferrous and non ferrous( Copper, Brass, Aluminum, All types of Stainless Steel in 200,300,400 Series and many more)",
  },
];
function Page() {
  const [openAccordion, setOpenAccordion] = useState<string | null>("copper");

  // Function to toggle accordion
  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  // Materials data
  const materials = [
    {
      id: "stainless",
      name: "Stainless Steel",
      subOptions: [
        "Mechanical Properties of Common Copper Alloys",
        "Mechanical Properties of Copper Development Association (CDA) Copper Alloys",
        "Comparison of Copper Alloy Standards",
        "Chemical Composition of Copper Alloys",
      ],
    },
    {
      id: "carbon",
      name: "Carbon Steel",
      subOptions: [
        "Mechanical Properties of Common Copper Alloys",
        "Mechanical Properties of Copper Development Association (CDA) Copper Alloys",
        "Comparison of Copper Alloy Standards",
        "Chemical Composition of Copper Alloys",
      ],
    },
    {
      id: "alloy",
      name: "Alloy Steels",
      subOptions: [
        "Mechanical Properties of Common Copper Alloys",
        "Mechanical Properties of Copper Development Association (CDA) Copper Alloys",
        "Comparison of Copper Alloy Standards",
        "Chemical Composition of Copper Alloys",
      ],
    },
    {
      id: "copper",
      name: "Copper",
      subOptions: [
        "Mechanical Properties of Common Copper Alloys",
        "Mechanical Properties of Copper Development Association (CDA) Copper Alloys",
        "Comparison of Copper Alloy Standards",
        "Chemical Composition of Copper Alloys",
      ],
    },
    {
      id: "aluminum",
      name: "Aluminum",
      subOptions: [
        "Mechanical Properties of Common Copper Alloys",
        "Mechanical Properties of Copper Development Association (CDA) Copper Alloys",
        "Comparison of Copper Alloy Standards",
        "Chemical Composition of Copper Alloys",
      ],
    },
  ];

  // Custom description for Die Casting
  const dieCastingDescription = (
    <div className="self-stretch flex flex-col space-y-2 md:space-y-3 text-white">
     
    <ul className="pl-5 space-y-1 sm:space-y-2 list-disc">
      <li className="font-['Inter'] text-sm sm:text-base md:text-lg leading-tight">
        Steel, Aluminum and All Other Ferrous and Non Ferrous
      </li>
      <li className="font-['Inter'] text-sm sm:text-base md:text-lg leading-tight">
        Prototype 1 Pcs to Large Order Quantity
      </li>
      <li className="font-['Inter'] text-sm sm:text-base md:text-lg leading-tight">
        Inspection Report and Certification
      </li>
      <li className="font-['Inter'] text-sm sm:text-base md:text-lg leading-tight">
        As fast as 3 Days Delivery
      </li>
      <li className="font-['Inter'] text-sm sm:text-base md:text-lg leading-tight">
        All Types of Post-Processing In CNC Machining
      </li>
    </ul>
    </div>
      );

  return (
    <div>
      <Navbar />
      <HeroInput
        title="Sheet Metal"
        subtitle="Sheet Metal"
        description={dieCastingDescription}
        uploadTitle="Upload Your CAD Files"
        dragDropText="Drag & drop your design files here, or"
        browseButtonText="Select Files"
        addMoreButtonText="Add More Files"
        submitButtonText="Submit for Quote"
        maxFileSize={100}
        fileSizeText="Maximum file size: {maxFileSize}MB. Contact our team for larger files."
      />
  <Feature
          img="/features.png"
          isButton={false}
          subTitle=" "
          title="What is CNC Turning"
          direction="row-reverse"
          description="CNC turning, a pivotal process in modern manufacturing, employs computer numerical control technology to automate the precision machining of cylindrical components. It operates by rotating a workpiece while a cutting tool shapes it to exact specifications with remarkable accuracy. This method enables the creation of intricate geometries crucial across industries like automotive, aerospace, medical devices, and electronics.
At its essence, CNC turning begins with a digital design or CAD (Computer-Aided Design) model, guiding the CNC machine to execute precise tool paths. This digital precision ensures components meet stringent quality standards and exact specifications, driving efficiency and reducing production lead times.
As businesses prioritize productivity and precision, CNC turning emerges as a vital technology, offering unmatched capabilities to meet modern production demands. Its ability to deliver high-quality, custom components efficiently continues to shape industries worldwide, driving innovation and setting new standards in precision engineering."
        />

<DrawingShowCase />

<section className="w-full py-10 md:py-16 px-4 sm:px-6 lg:px-8 bg-white">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-neutral-950 text-center leading-tight md:leading-[1.2] font-['Inter'] max-w-5xl mx-auto">
      Advantage To Order Forging Parts From TheSupplier
    </h2>
  </div>
  <AboutJob items={serviceItems} />
</section>
<BottomCTA
  title="Seamless Forging Solutions: Place Your Order Today, Receive Precision Manufacture in Your TIME!"
  description=""
  buttonText="Get Your Quote"
/>

<section className="w-full py-8 md:py-14 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 bg-white">
  <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-14">
    {/* Left column - Title */}
    <div className="w-full lg:w-72">
      <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-950 font-['Inter'] leading-10">
        Advantage To Order Forging Parts From TheSupplier
      </h2>
    </div>

    {/* Right column - Accordion */}
    <div className="flex-1 flex flex-col gap-3">
      {materials.map((material) => (
        <div
          key={material.id}
          className="border border-neutral-200 bg-white"
        >
          {/* Accordion Header */}
          <button
            onClick={() => toggleAccordion(material.id)}
            className="w-full h-14 p-4 flex justify-between items-center transition-colors hover:bg-gray-50"
            aria-expanded={openAccordion === material.id}
          >
            <span className="text-zinc-950 text-base sm:text-lg font-semibold font-['Inter'] leading-relaxed">
              {material.name}
            </span>
            {/* Custom minus icon to match the design */}
            <div className="w-5 h-5 relative flex items-center justify-center">
              <div className="w-2 h-0.5 bg-neutral-950"></div>
              {openAccordion !== material.id && (
                <div className="w-0.5 h-2 bg-neutral-950 absolute"></div>
              )}
            </div>
          </button>

          {/* Accordion Content */}
          {material.subOptions && openAccordion === material.id && (
            <div className="border-t border-neutral-200">
              <div className="flex flex-col">
                {material.subOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`px-3 py-4 transition-colors hover:bg-gray-50 cursor-pointer ${index === 1
                        ? "border border-neutral-200 text-zinc-950"
                        : "text-neutral-500"
                      }`}
                  >
                    <span className="text-sm sm:text-base font-medium font-['Inter'] leading-normal">
                      {option}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
</section>




<Footer />
</div>
  );
}

export default Page;
