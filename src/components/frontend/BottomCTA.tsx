import React from 'react';
import { ArrowRight, LucideIcon } from "lucide-react";
import CustomButton from "@/components/ui/CustomButton";

interface BottomCTAProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonIcon?: LucideIcon;
  backgroundColor?: string;
  className?: string;
}

function BottomCTA({
  title = "Simplifying for Growing Business",
  description = "Join over 300+ customers already growing with TheSupplier",
  buttonText = "Contact Sales",
  buttonIcon = ArrowRight,
  backgroundColor = "bg-primary", // Default blue background
  className = "",
}: BottomCTAProps) {
  return (
    <div className={`relative px-4 sm:px-6 md:px-10 lg:px-20 py-6 md:py-10 flex flex-col gap-8 md:gap-16 ${className}`}>
      {/* CTA Section */}
      <div className={`w-full py-10 md:py-20 ${backgroundColor} shadow-lg md:shadow-xl rounded-lg flex flex-col justify-center items-center gap-6 md:gap-10`}>
        {/* Text Content */}
        <div className="w-full flex flex-col justify-center items-center gap-2 md:gap-4 px-4 md:px-6">
          <h2 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold text-center">
            {title}
          </h2>
          <p className="opacity-70 text-white text-base md:text-lg text-center max-w-4/5">
            {description}
          </p>
        </div>

        {/* Button */}
        <div className="flex justify-center items-center">
          <CustomButton
            icon={buttonIcon}
            text={buttonText}
            className="bg-white hover:text-black"
          />
        </div>
      </div>
    </div>
  );
}

export default BottomCTA;