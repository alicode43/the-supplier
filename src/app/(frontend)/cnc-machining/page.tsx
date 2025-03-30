'use client'
import { useState } from 'react';
import Navbar from '@/components/frontend/Navbar'   
import HeroInput from '@/components/frontend/HeroInput'

function Page() {
      const [openAccordion, setOpenAccordion] = useState<string | null>("copper");
    
      // Function to toggle accordion
      const toggleAccordion = (id: string) => {
        setOpenAccordion(openAccordion === id ? null : id);
      };
    
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
    
      // Custom description for Die Casting
      const dieCastingDescription = (
        <>
          <span className="text-white font-bold">
            High-Precision Manufacturing:
          </span>{" "}
          Our advanced die casting process delivers exceptional precision and intricate
          detail, ensuring components meet exact functional specifications.
          <br />
          <span className="text-white font-bold">
            Material Expertise:{" "}
          </span>
          We work with premium aluminum, zinc, magnesium, and copper alloys to create
          customized solutions perfectly tailored to your application requirements.
          <br />
          <span className="text-white font-bold">
            Superior Surface Finishing:
          </span>{" "}
          All components undergo comprehensive refinement through state-of-the-art
          CNC machining, shot-blasting, texturing, plating, and painting processes
          to achieve flawless surface quality.
        </>
      );

  return (
    <div>
      <Navbar/>
      <HeroInput 
        title="Die Casting Excellence"
        subtitle="Premium Forging"
        description={dieCastingDescription}
        uploadTitle="Upload Your CAD Files"
        dragDropText="Drag & drop your design files here, or"
        browseButtonText="Select Files"
        addMoreButtonText="Add More Files"
        submitButtonText="Submit for Quote"
        maxFileSize={100}
        fileSizeText="Maximum file size: {maxFileSize}MB. Contact our team for larger files."
      />
    </div>
  )
}

export default Page
