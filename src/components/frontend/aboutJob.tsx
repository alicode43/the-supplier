import React from 'react'
import { LucideIcon } from 'lucide-react'

type JobItem = {
    icon?: LucideIcon, 
    title: string,
    description: string
}

type ComponentProps = {
    items: JobItem[]
}

function AboutJob({ items }: ComponentProps) {
  return (
    <div className="w-full p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 md:w-4/5 m-auto  md:grid-cols-2 gap-4 md:gap-8  w-full">
        {items.map((item, index) => (
          <div 
            key={index} 
            className="w-full p-6 bg-white shadow-[0px_4px_11px_-1px_rgba(10,10,10,0.04)] outline-1 outline-offset-[-1px] outline-neutral-200 flex flex-col justify-start items-start gap-6"
          >
            <div className="w-12 h-12 relative bg-stone-200 rounded-full overflow-hidden">
              <div className="w-6 h-6 left-[12px] top-[12px] absolute overflow-hidden">
                {item.icon && <item.icon className="text-sky-600" />}
                {!item.icon && (
                  <>
                    <div className="w-5 h-5 left-[2px] top-[2px] absolute opacity-10 bg-sky-600" />
                    <div className="w-5 h-5 left-[2px] top-[2px] absolute outline-2 outline-offset-[-1px] outline-sky-600" />
                  </>
                )}
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start gap-3">
              <div className="self-stretch text-neutral-950 text-xl md:text-2xl font-semibold font-['Inter'] leading-7">
                {item.title}
              </div>
              <div className="self-stretch text-neutral-500 text-base md:text-lg font-normal font-['Inter'] leading-relaxed">
                {item.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AboutJob
