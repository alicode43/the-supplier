import React from 'react';
import { LucideIcon } from 'lucide-react'; 

interface CustomButtonProps {
  icon?: LucideIcon;
  text: string;
  variant?: 'primary' | 'secondary' | 'outline';
  onClick?: () => void;
  className?: string;
  href?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ 
  icon: Icon, 
  text, 
  variant = 'primary', 
  onClick,
  className = '',
  href
}) => {
  // Determine base styles based on variant
  const baseStyles = "flex cursor-pointer items-center gap-2 font-medium transition-all duration-300 transform active:scale-95 group relative overflow-hidden";
  
  const variantStyles = {
    primary: "bg-[rgba(124,189,255,0.5)] hover:bg-[rgba(124,189,255,0.7)] text-base md:text-lg lg:text-xl rounded-full h-13 p-4 pl-6",
    secondary: "bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 rounded-full p-4 pl-6 text-base md:text-lg",
    outline: "bg-transparent border border-blue-400 text-blue-600 hover:bg-blue-50 rounded-full p-4 pl-6 text-base md:text-lg"
  };

  const Component = href ? 'a' : 'button';
  const componentProps = {
    className: `${baseStyles} ${variantStyles[variant]} ${className}`,
    onClick,
    href,
    type: Component === 'button' ? ('button' as 'button' | 'submit' | 'reset' | undefined) : undefined,
  };

  return (
    <Component {...componentProps}>
      {/* Ripple effect overlay */}
      <span className="absolute inset-0 bg-white/20 transform scale-0 rounded-full transition-transform duration-500 origin-center group-hover:scale-100 group-active:scale-100" />
      
      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2 text-[#0284c7]">
        <span className="transition-all duration-300 group-hover:tracking-wide ">{text}</span>
        {Icon && (
          <Icon 
            className="text-current transform transition-all duration-300 group-hover:translate-x-0.5" 
            size={20}
          />
        )}
      </span>
      
      {/* Bottom border animation */}
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white/40 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left" />
    </Component>
  );
};

export default CustomButton;