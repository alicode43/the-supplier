'use client'
import Navbar from '@/components/frontend/Navbar'
import CustomButton from '@/components/ui/CustomButton'
import { ChevronRight } from 'lucide-react'
import React, { useState } from 'react'
import BottomCTA from "@/components/frontend/BottomCTA";
import Footer from '@/components/frontend/Footer';
import Image from 'next/image'

function Page() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const faqItems = [
    {
      id: "1",
      question: "What is TheSupplier Partner Network?",
      answer: "TheSupplier Partner Network is a global community of manufacturers and suppliers who collaborate with TheSupplier to fulfill orders from clients worldwide. It creates opportunities for businesses to expand their reach and grow without financial constraints."
    },
    {
      id: "2",
      question: "How does TheSupplier Partner Network function?",
      answer: "Once you join the network, you'll have 24/7 access to orders through our platform. You can browse opportunities, submit quotes, and fulfill orders directly through our streamlined system. TheSupplier handles the client relationships, marketing, and logistics while you focus on what you do best."
    },
    {
      id: "3",
      question: "Why should I join TheSupplier Partner Network?",
      answer: "Joining TheSupplier Partner Network provides you with consistent order flow, global exposure without customer acquisition costs, and the freedom to work on your terms. You'll benefit from our established client base while maintaining your independence."
    },
    {
      id: "4",
      question: "What is the cost of joining TheSupplier Partner Network?",
      answer: "There is no cost to join TheSupplier Partner Network. We believe in creating opportunities without financial barriers. There are no transaction fees, service charges, or membership costs associated with being part of our network."
    }
  ];

  return (
  <main>
         <Navbar />

{/* Hero Section */}
<section className="bg-primary text-white py-12 md:py-20 ">
  <div className="container mx-auto md:px-0 px-4  flex flex-col md:flex-row items-center gap-8 md:w-4/5 md:p-20">
    <div className="flex-1 space-y-4">
      <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white/10 mb-4">
        <span>Become a Supplier</span>
        <ChevronRight className="h-4 w-4 ml-1" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold">
      Unleash Your Potential: Join TheSupplier Partner Network Today!
      </h1>
      <p className="md:text-lg">
      Unlock new horizons without financial constraints. Joining TheSupplier Partner Network is your gateway to limitless growth, free from transaction fees and commitments. Seize the opportunity and empower your business.

      </p>
      <div className="flex flex-wrap gap-4 pt-4">

        <button className="border w-full border-white md:px-6 md:py-3 bg-white hover:bg-white/10 px-4 py-2  text-[#0A0A0A] font-medium rounded-full text-lg">
          Submit Drawing
        </button>
      </div>
    </div>
    <div className="flex-1">
      <div className="rounded overflow-hidden shadow-lg">
      <Image
  src="/header.png"
  alt="CNC Machine"
  width={500}
  height={400}
  className="w-full object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
/>
      </div>
    </div>
  </div>
</section>

{/* Why Become Our Supplier Section */}
<section className="py-14 md:py-20">
  <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-28 flex flex-col justify-start items-start gap-10">
    {/* Heading Area */}
    <div className="w-full flex flex-col justify-start items-start gap-4">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-neutral-950 leading-tight">TheSupplier</h2>
      <p className="text-lg text-neutral-500 leading-relaxed max-w-3xl">Why Become Our Supplier?</p>
    </div>

    {/* Content Area */}
    <div className="w-full flex flex-col justify-start items-start gap-10">
      <div className="space-y-6">
        <div>
          <span className="text-black text-lg font-medium leading-relaxed block">Expansive Network</span>
          <span className="text-neutral-500 text-lg leading-relaxed">With thousands of partners globally, TheSupplier offers a vast network to amplify your reach and opportunities.</span>
        </div>
        
        <div>
          <span className="text-black text-lg font-medium leading-relaxed block">Trusted by Prominent Businesses</span>
          <span className="text-neutral-500 text-lg leading-relaxed">Our client base comprises large and influential companies, highlighting the trust they place in TheSupplier. Partnering with us means aligning your business with leaders in various industries.</span>
        </div>
        
        <div>
          <span className="text-black text-lg font-medium leading-relaxed block">Access 24/7</span>
          <span className="text-neutral-500 text-lg leading-relaxed">As a valued partner, you&apos;ll have round-the-clock access to orders from our diverse client base. TheSupplier Partner Network is designed to fit your schedule and fuel your growth</span>
        </div>
        
        <div>
          <span className="text-black text-lg font-medium leading-relaxed block">No Cost, All Benefit</span>
          <span className="text-neutral-500 text-lg leading-relaxed">Access to our Partner account is not only powerful but also free. We believe in empowering our partners without financial barriers.</span>
        </div>
        
        <div className="pt-4">
          <span className="text-neutral-500 text-lg leading-relaxed">Embark on a journey where your business expands its horizons, connects with industry leaders, and thrives in a supportive and vibrant community. Join TheSupplier Partner Network and elevate your business to new heights!</span>
        </div>
      </div>
    </div>
    
    {/* CTA Button */}
    <CustomButton text='Register Now' className='m-auto'/>
 
  </div>
</section>

{/* How to Become a Supplier Section */}
<section className="py-14 md:py-20 bg-white">
  <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-28 flex flex-col justify-start items-start gap-10 md:gap-14">
    {/* Heading Area */}
    <div className="w-full flex flex-col justify-start items-start gap-4">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-neutral-950 leading-tight">Become A Supplier</h2>
      <p className="text-lg text-neutral-500 leading-relaxed max-w-3xl">Why Become Our Supplier?</p>
    </div>

    {/* Content Area */}
    <div className="w-full flex flex-col justify-start items-start gap-8 md:gap-10">
      <div className="space-y-6 md:space-y-8">
        <div>
          <span className="text-black text-lg font-medium leading-relaxed block">Create Your Account</span>
          <span className="text-neutral-500 text-lg leading-relaxed">Initiate your partnership by creating your account. This step ensures you have a personalized space within TheSupplier, tailored to your business needs.</span>
        </div>
        
        <div>
          <span className="text-black text-lg font-medium leading-relaxed block">Confirm Your Email</span>
          <span className="text-neutral-500 text-lg leading-relaxed">Verify your email to complete the essential account setup. This confirmation is your key to staying connected and receiving timely updates.</span>
        </div>
        
        <div>
          <span className="text-black text-lg font-medium leading-relaxed block">Unlock 24/7 Order Access</span>
          <span className="text-neutral-500 text-lg leading-relaxed">After confirming your email, unlock the power to access orders 24/7. Seamlessly manage your business, explore opportunities, and maximize your potential on TheSupplier platform.</span>
        </div>
      </div>
    </div>
  </div>
</section>



{/* Bottom CTA Section */}
<BottomCTA  title='TheSupplier Welcome
you to Become Our Partner' buttonText='Register & Start'/>



{/* Benefits of Partnership Section */}
<section className="py-14 md:py-20 bg-white">
  <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-28 flex flex-col justify-start items-start gap-10 md:gap-14">
    {/* Heading Area */}
    <div className="w-full flex flex-col justify-start items-start gap-4">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-neutral-950 leading-tight">Become A Supplier</h2>
    </div>

    {/* Content Area */}
    <div className="w-full flex flex-col justify-start items-start gap-8 md:gap-10">
      <div className="space-y-6 md:space-y-8">
        <div>
          <span className="text-black text-lg font-medium leading-relaxed block">Consistent Flow of New Orders</span>
          <span className="text-neutral-500 text-lg leading-relaxed">Join a network that grows every day, ensuring a steady stream of genuine orders from diverse clientele.</span>
        </div>
        
        <div>
          <span className="text-black text-lg font-medium leading-relaxed block">Simple and Cost-Free Partnership</span>
            <span className="text-neutral-500 text-lg leading-relaxed">Experience a hassle-free partnership with TheSupplier &#8211; no transaction or service fees, and no commitments to fulfill a specific number of jobs per month.</span>
        </div>
        
        <div>
          <span className="text-black text-lg font-medium leading-relaxed block">Global Exposure, Local Independence</span>
          <span className="text-neutral-500 text-lg leading-relaxed">Gain global exposure for your products through TheSupplier&apos;s platform, attracting potential clients worldwide while maintaining your independence. Directly interact with TheSupplier without the need for customer engagement.</span>
        </div>
        
        <div>
          <span className="text-black text-lg font-medium leading-relaxed block">Inclusive Collaboration</span>
          <span className="text-neutral-500 text-lg leading-relaxed">TheSupplier values diversity, welcoming businesses of all sizes and specialties to collaborate and thrive.</span>
        </div>
        
        <div>
          <span className="text-black text-lg font-medium leading-relaxed block">Effortless Management</span>
          <span className="text-neutral-500 text-lg leading-relaxed">Let go of logistics, marketing, and communication challenges as TheSupplier handles these aspects, allowing you to focus solely on your expertise.</span>
        </div>
      </div>
    </div>
  </div>
</section>

{/* FAQ Section */}
<section className="py-14 md:py-20 bg-white">
  <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-28 flex flex-col lg:flex-row justify-start items-start gap-8 lg:gap-14">
    {/* Left Column - Title */}
    <div className="w-full lg:w-72 flex flex-col justify-start items-start gap-4">
      <h2 className="text-3xl font-semibold text-neutral-950 font-['Inter'] leading-10">Frequently Asked Questions</h2>
    </div>
    
    {/* Right Column - Accordion */}
    <div className="flex-1 w-full flex flex-col justify-center items-center gap-3">
      {faqItems.map((item) => (
        <div key={item.id} className="w-full">
          {/* Accordion Header */}
          <button 
            onClick={() => toggleFaq(item.id)}
            className="w-full h-auto min-h-14 p-4 bg-white border border-neutral-200 flex justify-between items-center gap-2"
            aria-expanded={openFaq === item.id}
          >
            <div className="flex-1 text-left text-zinc-950 text-base sm:text-lg font-semibold font-['Inter'] leading-relaxed">
              {item.question}
            </div>
            <div className="w-5 h-5 relative flex items-center justify-center">
              <div className="w-2 h-0.5 bg-neutral-950"></div>
              {openFaq !== item.id && (
                <div className="w-0.5 h-2 bg-neutral-950 absolute"></div>
              )}
            </div>
          </button>
          
          {/* Accordion Content */}
          {openFaq === item.id && (
            <div className="w-full p-4 border border-t-0 border-neutral-200 bg-white">
              <p className="text-neutral-600 text-sm sm:text-base font-normal">
                {item.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
</section>

<Footer/>

  </main>
  )
}

export default Page
