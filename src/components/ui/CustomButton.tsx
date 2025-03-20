import React from 'react';
import { LucideIcon } from 'lucide-react'; 

interface CustomButtonProps {
  icon?: LucideIcon;
  text: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ icon: Icon, text }) => {
  return (
    <button className="flex cursor-pointer h-13 p-4 pl-6 justify-center items-center gap-2 rounded-full bg-[rgba(124,189,255,0.5)] text-base md:text-lg lg:text-xl">
      {text}
      {Icon && <Icon className="text-current" />}
    </button>
  );
};

export default CustomButton;