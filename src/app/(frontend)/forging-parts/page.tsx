"use client"
import { useState } from 'react'
import Navbar from '@/components/frontend/Navbar'
import Feature from '@/components/frontend/Feature'
import HeroInput from '@/components/frontend/HeroInput'
import DrawingShowCase from '@/components/frontend/DrawingShowCase'
import AboutJob from '@/components/frontend/aboutJob'
import { FileCheck,Clock,} from 'lucide-react'
import Footer from '@/components/frontend/Footer'
import BottomCTA from '@/components/frontend/BottomCTA'


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
  // Materials data
  const materials = [
    { id: "stainless", name: "Stainless Steel",
      subOptions: [
        "Mechanical Properties of Common Copper Alloys",
        "Mechanical Properties of Copper Development Association (CDA) Copper Alloys",
        "Comparison of Copper Alloy Standards",
        "Chemical Composition of Copper Alloys",
      ],
     },
    { id: "carbon", name: "Carbon Steel",
      subOptions: [
        "Mechanical Properties of Common Copper Alloys",
        "Mechanical Properties of Copper Development Association (CDA) Copper Alloys",
        "Comparison of Copper Alloy Standards",
        "Chemical Composition of Copper Alloys",
      ],
     },
    { id: "alloy", name: "Alloy Steels",
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
    { id: "aluminum", name: "Aluminum",
      subOptions: [
        "Mechanical Properties of Common Copper Alloys",
        "Mechanical Properties of Copper Development Association (CDA) Copper Alloys",
        "Comparison of Copper Alloy Standards",
        "Chemical Composition of Copper Alloys",
      ],
     },
  ];

function ForgingPartsPage() {
    const [openAccordion, setOpenAccordion] = useState<string | null>("copper");
  
    // Function to toggle accordion
    const toggleAccordion = (id: string) => {
      setOpenAccordion(openAccordion === id ? null : id);
    };

  const forgingDescription = (
    <>
      <span className="text-white font-bold">
        High-Precision Forging:
      </span>{" "}
      Our advanced forging processes deliver exceptional strength and structural integrity,
      ensuring components meet exact functional specifications and performance requirements.
      <br />
      <span className="text-white font-bold">
        Material Expertise:{" "}
      </span>
      We work with premium steel, aluminum, titanium, and various alloys to create
      customized forging solutions perfectly tailored to your application requirements.
      <br />
      <span className="text-white font-bold">
        Superior Finishing & Quality:
      </span>{" "}
      All forged components undergo comprehensive refinement through state-of-the-art
      heat treatment, machining, and finishing processes to achieve optimal mechanical 
      properties and surface quality.
    </>
  );
  return (
    
    <div>
        <Navbar/>
        <section className="w-full py-8 md:py-12 lg:py-16">
        <div className="container mx-auto">
          <h1 className="w-full text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold font-['Inter'] leading-tight md:leading-snug lg:leading-[1.15] text-neutral-950 max-w-5xl mx-auto">
            TheSupplier – Metal Parts Marketplace!
          </h1>
        </div>
        <Feature
        img="/features.png"
        isButton={false}
        subTitle="Introduction to Forging"
        title="Introduction to Forging"
        direction="row"
        description="Forging is a manufacturing process that involves shaping metal through intense pressure, typically by hammering, pressing, or rolling. The resultant components, known as forgings, possess exceptional strength and durability, making them ideal for applications where reliability and safety are paramount.

At TheSupplier.in, we specialize in providing high-quality forging solutions tailored to meet your specific requirements. Our commitment to precision, quality, and customer satisfaction ensures that you receive top-notch forgings delivered on schedule."
      />
              <Feature
        img="/features.png"
        isButton={false}
        subTitle="Our Forging Capabilities"
        title="Our Forging Capabilities"
        direction="row"
        description="At TheSupplier.in, we leverage state-of-the-art technology and industry expertise to deliver best-in-class forging solutions. Our capabilities include:
Open-Die Forging: Utilizing flat dies without pre-cut profiles, we perform open-die forging to shape large parts weighing over 150 tons and up to 25 meters in length. This method allows for the creation of prototypes and low-volume production with excellent grain flow orientation and deformation characteristics.
Closed-Die Forging: Employing dies containing impressions of the desired shape, we achieve precise and complex geometries with closer tolerances. This process is suitable for a wide range of metals and alloys, including carbon and alloy steels, stainless steel, aluminum, and copper alloys.
Cold Forging: We offer cold forging processes such as bending, drawing, and extruding, ideal for creating shapes with superior dimensional control and surface finish. Cold forging is particularly effective for parts weighing up to 5 kg and offers advantages in product uniformity and contamination control.
Rolled Ring Forging: Our expertise extends to rolled ring forging, where thick metal pieces are punched to create donut shapes and then rolled or pounded into thin rings. This process is suitable for various applications across industries."
      />
        
      </section>

      <HeroInput 
        title="Forging Excellence"
        subtitle="Premium Forging Services"
        description={forgingDescription}
        uploadTitle="Upload Your CAD Files"
        dragDropText="Drag & drop your design files here, or"
        browseButtonText="Select Files"
        addMoreButtonText="Add More Files"
        submitButtonText="Submit for Quote"
        maxFileSize={100}
        fileSizeText="Maximum file size: {maxFileSize}MB. Contact our team for larger files."
      />
      <DrawingShowCase/>

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
                          className={`px-3 py-4 transition-colors hover:bg-gray-50 cursor-pointer ${
                            index === 1
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
export default ForgingPartsPage
