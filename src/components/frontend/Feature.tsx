import React from 'react'
import CustomButton from '../ui/CustomButton'
 import { ArrowRight, LucideIcon } from 'lucide-react'
import Image from 'next/image';
//  Image
interface Feature{
    img?: string,
    subTitle?: string,
    title?: string,
    description?: string,
    buttonText?: string,
    buttonIcon?: LucideIcon,
    direction?: string;
    isButton?: boolean,
}

function Feature({
    img,
    subTitle,
    title,
    description,
    buttonText,
    buttonIcon,
    direction,
    isButton
}: Feature) {
    img = img || "";
    subTitle = subTitle || "";
    title = title || "";
    description = description || "";
    buttonText = buttonText || "";
    buttonIcon = buttonIcon || ArrowRight;
    direction = direction || "row-reverse"; 
    isButton= isButton || false;
    
    // "row" or "row-reverse"
  return (
    <section className="container mx-auto px-4 py-16 md:py-24 md:w-4/5">
    <div className={`flex  md:flex-${direction} md:flex-row flex-col gap-8 lg:gap-44 items-center`}>
    <div className="order-2 lg:order-1 w-full max-w-lg mx-auto">
                    {img && (
                        <div className="relative w-full aspect-[3/2]">
                        <Image
    src={img}
    alt={title || "Feature image"}
    className="w-full h-auto rounded-lg shadow-xl object-cover"
    height={0}
    width={0}
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
    priority
/>
                        </div>
                    )}
                </div>
      <div className="order-1 lg:order-2 space-y-6">
        <span className="text-neutral-500 md:text-lg font-medium md:py-4">
        {subTitle}
        </span>
        <h2 className="text-3xl md:text-5xl font-bold">
        {title}
        </h2>
        <p className="text-gray-600 md:text-lg" >
        {description}
        </p>
        {
            isButton?  <CustomButton icon={buttonIcon} text={buttonText}/>:<></>
        }
      
      </div>
    </div>
  </section>
  )
}

export default Feature
