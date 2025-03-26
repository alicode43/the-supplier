"use client";
import { Button } from "@/components/ui/button";
import Navbar from "../../components/frontend/Navbar";

import {
  ChevronLeft,
  ChevronRight,
  Star,
  DollarSign,
  Clock,
  ArrowRight,
  Factory,
  Wrench,
  Package,
  Timer,
} from "lucide-react";
// Link
import Footer from "../../components/frontend/Footer";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import CustomButton from "@/components/ui/CustomButton";

const services = [
  {
    title: "Stamping",
    // image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=800&auto=format&fit=crop",
    image: "/cnc.webp",
    quote: "Get Your Quote",
  },
  {
    title: "Laser Cutting",
    // image: "https://images.unsplash.com/photo-1574170623305-62f9d09d4f7a?q=80&w=800&auto=format&fit=crop",
    image: "/cnc.webp",
    quote: "Get Your Quote",
  },
  {
    title: "WaterJet Cutting",
    // image: "https://images.unsplash.com/photo-1562204839-c557f89c80b1?q=80&w=800&auto=format&fit=crop",
    image: "/cnc.webp",
    quote: "Get Your Quote",
  },
  {
    title: "CNC Machining",
    // image: "https://images.unsplash.com/photo-1565439371131-f6c9a3bf2826?q=80&w=800&auto=format&fit=crop",
    image: "/",
    quote: "Get Your Quote",
  },
];
const features = [
  {
    title: "Quality",
    description:
      "Discover a new standard of quality at TheSupplier. We meticulously vet every product and service to meet the highest standards, ensuring your satisfaction and trust in every transaction.",
    icon: <Package className="w-12 h-12 text-blue-600" />,
  },
  {
    title: "Competitive Price",
    description:
      "Unlock unbeatable value at TheSupplier. Benefit from our commitment to competitive pricing, ensuring you access high-quality products and services at the most cost-effective rates in the market.",
    icon: <Factory className="w-12 h-12 text-blue-600" />,
  },
  {
    title: "Delivery",
    description:
      "Reliable and timely delivery is our promise at TheSupplier. Count on us for on-time delivery, ensuring your products reach you promptly and efficiently, meeting your deadlines with precision.",
    icon: <Timer className="w-12 h-12 text-blue-600" />,
  },
];

const advantages = [
  {
    title: "Expand Production with Our Supplier Network",
    description:
      "Dive into a vast manufacturing network of 10,000+ providers. Unlock diverse capabilities and certifications seamlessly. Connect with global experts right from your desktop. Explore limitless possibilities in our Supplier Network today.",
    icon: <Factory className="w-8 h-8 text-blue-600" />,
  },
  {
    title: "Wide Range of Materials",
    description:
      "TheSupplier provides wide range of materials like all types of ferrous and non ferrous( Copper, Brass, Aluminum, All types of Stainless Steel in 200,300,400 Series and many more)",
    icon: <Wrench className="w-8 h-8 text-blue-600" />,
  },
  {
    title: "Quality Control",
    description:
      "Quality assured. TheSupplier, we uphold the highest standards. Our stringent quality control guarantees that every product and service on our platform is held to meticulous scrutiny, ensuring your satisfaction and trust in every transaction.",
    icon: <Package className="w-8 h-8 text-blue-600" />,
  },
  {
    title: "Delivery on Time",
    description:
      "Punctual delivery, guaranteed. At TheSupplier, we pride ourselves on timely service. Count on us for on-time delivery, ensuring your products reach you promptly and seamlessly, meeting your deadlines with precision.",
    icon: <Timer className="w-8 h-8 text-blue-600" />,
  },
];
export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };
// console.log(isPaused ?)
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
  };

  useEffect(() => {
    // Start the interval when component mounts
    startSlideshow();
    
    // Clean up on unmount
    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, []);

  // // Pause/resume when isPaused changes
  useEffect(() => {
    if (isPaused) {
      clearInterval(0);
    } else {
      startSlideshow();
    }
  }, [isPaused]);

  const startSlideshow = () => {
    // Clear any existing interval
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
    
    // Set new interval
    slideInterval.current = setInterval(() => {
      nextSlide();
    }, 2000); // 1 second interval
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-primary text-white py-12 md:py-20 ">
        <div className="container mx-auto md:px-0 px-4  flex flex-col md:flex-row items-center gap-8 md:w-4/5 md:p-20">
          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white/10 mb-4">
              <span>Looking for Manufacturer?</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              Precision Metal Parts On Demand
            </h1>
            <p className="md:text-lg">
              Join TheSupplier, the fastest-growing startup, connecting you to a
              vast network of 12,000+ suppliers for premium CNC components,
              sheet metal stamping, and more.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="border border-white md:px-6 md:py-3 bg-white hover:bg-white/10 px-4 py-2  text-[#0A0A0A] font-medium rounded-full text-lg">
                Contact Sales
              </button>
              <button className="border border-white md:px-6 md:py-3 bg-white hover:bg-white/10 px-4 py-2  text-[#0A0A0A] font-medium rounded-full text-lg">
                Submit Drawing
              </button>
            </div>
          </div>
          <div className="flex-1">
            <div className="rounded overflow-hidden shadow-lg">
              <img
                src="header.png"
                alt="CNC Machine"
                width={500}
                height={400}
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature  */}
      <section className="w-4/5 m-auto my-14 ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center md:mb-8 mb-12 ">
            TheSupplier – Metal Parts Marketplace!
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="feature-card flex flex-col items-center text-center md:p-6">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center md:mb-6 mb-4">
                <Star className="text-[#0066cc]" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Components</h3>
            </div>

            <div className="feature-card flex flex-col items-center text-center md:p-6">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center md:mb-6 mb-4">
                <DollarSign className="text-[#0066cc]" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Competitive Rates</h3>
            </div>

            <div className="feature-card flex flex-col items-center text-center md:p-6">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center md:mb-6 mb-4">
                <Clock className="text-[#0066cc]" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Timely Delivery</h3>
            </div>
          </div>
        </div>
        {/* Benefits */}
        <div className="md:pt-14   pt-12 bg-gray-50">
          <div className=" space-y-8">
            <div className="space-y-2">
              <h3 className="text-lg font-medium flex items-center leading-[150%]">
                <span className="inline-block w-2 h-2 bg-black rounded-full mr-2"></span>
                Connect with Expert Manufacturers
              </h3>
              <p className="text-gray-600 pl-4">
                Explore a diverse network of specialists in CNC, sheet metal
                stamping, forging, casting, and more—your ideal supplier is just
                a click away.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium flex items-center leading-[150%]">
                <span className="inline-block w-2 h-2 bg-black rounded-full mr-2"></span>
                Submit Your Enquiry with Ease
              </h3>
              <p className="text-gray-600 pl-4">
                Let our dedicated team handle the rest. Our innovative platform
                guarantees competitive pricing while maintaining top-notch
                quality.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium flex items-center leading-[150%]">
                <span className="inline-block w-2 h-2 bg-black rounded-full mr-2"></span>
                Enjoy Hassle-Free Service
              </h3>
              <p className="text-gray-600 pl-4">
                Experience seamless transactions and guaranteed on-time delivery
                from top-rated suppliers, evaluated on Cost, Delivery, Packing,
                and Quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Account Section */}
      <section className="md:w-4/5  pt-16 md:pt-24 md:mx-auto">
        <div className="container  px-4">
          <div className=" max-w-3xl   mb-16">
            <span className="text-[#737373] font-medium">Solutions</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Open Your Business Account Online
            </h2>
            <p className="text-gray-600">
              Keep your business account and all your finance needs safely
              organized under one roof. Manage money quickly, easily &
              efficiently. Whether you&apos;re alone or leading a team.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}

      <section className="md:w-4/5 mx-auto">
        {/* Prototype Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&q=80"
                alt="Prototype development"
                className="rounded-lg shadow-xl"
                width={600}
                height={400}
              />
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <span className="text-blue-600 font-medium">
                RFQ for Prototype
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">
                Precision in Every Prototype
              </h2>
              <p className="text-gray-600">
                Start your path to innovation by submitting your RFQ for
                prototyping solutions that are fast, customized, and focused on
                quality. You&apos;ll receive a quick and efficient response to
                your request, with services tailored to your specific needs.
              </p>
 
              <CustomButton icon={ArrowRight} text="Instant Quote" />
            </div>
          </div>
        </section>

        {/* feature 2 */}
        <section className="container mx-auto px-4 py-16 md:py-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-blue-600 font-medium">
                High Volume Production
              </span>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Large-Scale Manufacturing
              </h1>
              <p className="text-gray-600 text-lg">
                Securely upload your production files with ease, ensuring a
                smooth and hassle-free start to your project. Schedule a
                consultation with our experienced team to discuss your specific
                production needs and gain clarity every step of the way.
              </p>
              <div className="flex flex-wrap gap-4">
                <CustomButton icon={ArrowRight} text="Contact Our Team" />
                <CustomButton icon={ArrowRight} text=" Submit Drawings" />
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
                alt="Manufacturing facility"
                className="rounded-lg shadow-xl"
                width={600}
                height={400}
              />
            </div>
          </div>
        </section>

        {/* Product Journey Section */}

        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80"
                alt="Product development process"
                className="rounded-lg shadow-xl"
                width={600}
                height={400}
              />
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <span className="text-blue-600 font-medium">
                End to End Product Development
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">
                Guiding Your Product Journey
              </h2>
              <p className="text-gray-600">
                Experience a seamless journey from idea to production with our
                expert guidance through every phase—conceptualization, pilot
                runs, and full-scale manufacturing. Leveraging our reliable
                supplier connections, advanced manufacturing precision, and
                in-house production mastery.
              </p>

              <CustomButton icon={ArrowRight} text="Contact Our Team" />
            </div>
          </div>
        </section>
      </section>

      {/* Achievements */}
      <section className="py-16 mx-auto md:py-24 px-4 bg-white">
        <div className="md:w-4/5 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Customers */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left border-b sm:border-b-0 sm:border-r border-gray-200 pb-8 sm:pb-0 sm:pr-8">
              <div className="text-4xl md:text-5xl font-semibold text-[#046BD2] mb-2">
                330+
              </div>
              <div className="text-lg md:text-xl text-gray-800">Customers</div>
            </div>

            {/* Suppliers */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left border-b lg:border-b-0 lg:border-r border-gray-200 pb-8 lg:pb-0 lg:pr-8">
              <div className="text-4xl md:text-5xl font-semibold text-[#046BD2] mb-2">
                500+
              </div>
              <div className="text-lg md:text-xl text-gray-800">Suppliers</div>
            </div>

            {/* Items Developed */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left border-b sm:border-b-0 sm:border-r border-gray-200 pb-8 sm:pb-0 sm:pr-8">
              <div className="text-4xl md:text-5xl font-semibold text-[#046BD2] mb-2">
                20K+
              </div>
              <div className="text-lg md:text-xl text-gray-800">
                Items Developed
              </div>
            </div>

            {/* Countries */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="text-4xl md:text-5xl font-semibold text-[#046BD2] mb-2">
                30+
              </div>
              <div className="text-lg md:text-xl text-gray-800">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="md:text-5xl text-3xl font-medium mb-4 ">
            Supercharge CNC and Sheet Metal Stamping Component Manufacturing
          </h2>
          <p className=" text-gray-600 mb-12">
            Utilize Our Digital Manufacturing Network to Your Advantage
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="flex flex-col gap-6 p-6 bg-white rounded-md shadow-sm border border-neutral-200"
              >
                {/* Icon container */}
                <div className="flex items-center justify-center size-15 bg-stone-200 rounded-full">
                  {advantage.icon}
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3">
                  <h3 className="text-2xl font-semibold text-neutral-950 font-['Inter'] leading-7">
                    {advantage.title}
                  </h3>
                  <p className="text-neutral-500 text-lg font-normal font-['Inter'] leading-relaxed">
                    {advantage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="md:w-4/5 max-w-7xl  mx-auto">
          <div className="flex flex-col md:items-start items-center text-center w-full space-y-3 md:space-y-4 px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-neutral-950  leading-tight md:leading-snug">
              Your Procurement Manager
            </h2>
            <p className="text-base md:text-lg text-neutral-500 font-normal font-['Inter'] leading-relaxed max-w-xl md:max-w-2xl">
              What You Expect From Your Manager
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col gap-6">
                {/* Image container */}
                <div className="relative bg-white shadow-sm border border-neutral-200 rounded-lg overflow-hidden p-4 flex justify-center items-center h-auto aspect-video">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3">
                  <h3 className="text-2xl md:text-3xl font-semibold text-neutral-950 font-['Inter'] leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-500 text-base md:text-lg font-normal font-['Inter'] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
              // <Card key={index} className="p-6 text-center">
              //   <div className="flex justify-center mb-4">{feature.icon}</div>
              //   <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              //   <p className="text-gray-600">{feature.description}</p>
              // </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Carousel */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Industry Dominance in CNC and Sheet Metal Stamping Parts with 12K+
            Supplier
          </h2>
          <div 
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {services.map((service, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="relative h-[400px] rounded-lg overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent text-white">
                        <h3 className="group relative text-2xl font-bold mb-4 inline-block cursor-pointer">
                          <span
                            className="relative z-10 text-black transition-all duration-300
    tracking-wide
    white-text-stroke
    group-hover:text-blue-700 "
                          >
                            {service.title}
                          </span>
                        </h3>
                        <CustomButton variant="secondary" text={service.quote} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2"
              onClick={() => {
                prevSlide();
                setIsPaused(true);
                // Resume auto-cycling after a pause
                setTimeout(() => setIsPaused(false), 3000);
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2"
              onClick={() => {
                nextSlide();
                setIsPaused(true);
                // Resume auto-cycling after a pause
                setTimeout(() => setIsPaused(false), 3000);
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Content Container */}
      <div className="relative px-4 sm:px-6 md:px-10 lg:px-20 py-6 md:py-10 flex flex-col gap-8 md:gap-16">
        {/* Blue CTA Section */}
        <div className="w-full py-10 md:py-20 bg-primary shadow-lg md:shadow-xl rounded-lg flex flex-col justify-center items-center gap-6 md:gap-10">
          {/* Text Content */}
          <div className="w-full flex flex-col justify-center items-center gap-2 md:gap-4 px-4 md:px-6">
            <h2 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold text-center">
              Simplifying for Growing Business
            </h2>
            <p className="opacity-70 text-white text-base md:text-lg text-center max-w-2xl">
              Join over 300+ customers already growing with TheSupplier
            </p>
          </div>

          {/* Button */}
          <div className="flex justify-center items-center">
            <CustomButton
              icon={ArrowRight}
              text="   Contact Sales"
              className="bg-white hover:text-black"
            />
            {/* <button className="p-3 md:p-4 bg-white rounded-full  outline-1 outline-offset-[-1px] outline-neutral-200 flex justify-center items-center gap-2 text-sm md:text-base font-semibold hover:bg-gray-50 transition-colors">
          Contact Sales
        </button> */}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
