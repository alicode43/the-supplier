import React from "react";
import Navbar from "@/components/frontend/Navbar";
import BottomCTA from "@/components/frontend/BottomCTA";
import Feature from "@/components/frontend/Feature";
import AboutJob from "@/components/frontend/aboutJob";
import { FileCheck, Clock } from "lucide-react";
import Footer from "@/components/frontend/Footer";




const serviceItems = [
  {
    icon: FileCheck,
    title: "Strategic Partner",
    description:
      "At TheSupplier, we’re not just your strategic partner; we streamline procurement and redefine sourcing experiences, ensuring every moment counts in your dynamic business landscape.",
  },
  {
    icon: Clock,
    title: "Assign the Responsibility",
    description:
      "Delegate procurement to TheSupplier for streamlined sourcing, negotiation, and supplier management, allowing you to excel in your core business endeavors effortlessly.",
  },
];
const steps = [
  {
    title: "Step 1: Create an Account",
    content: [
      "Visit TheSupplier.in: Go to our website and click on the \"Sign Up\" or \"Create an Account\" button.",
      "Fill in Your Details: Provide accurate and complete information to create your account.",
      "Verify Your Email: Check your email for a verification link and click on it to activate your account."
    ]
  },
  {
    title: "Step 2: Log In",
    content: [
      "Visit TheSupplier.in: Go to our website and click on the \"Log In\" button.",
      "Enter Your Credentials: Input your registered email address and password to access your account."
    ]
  },
  {
    title: "Step 3: Request a Quote",
    content: [
      "Navigate to Quote Form: Once logged in, click on the \"Request a Quote\" or \"Submit RFQ\" button.",
      "Complete the Quotation Form: Fill in details such as quantity, lead time, and upload relevant drawings or specifications.",
      "Submit Your Request: Click on \"Submit\" to send your quotation request to TheSupplier."
    ]
  },
  {
    title: "Step 4: Receive and Review Offer",
    content: [
      "Our Offer: Our team reviews your request and responds with a tailored offer, including pricing and delivery details.",
      "Review and Approve: Review the offer details, and if satisfied, approve it to proceed."
    ]
  },
  {
    title: "Step 5: Relax",
    content: [
      "Order Confirmation: Once you approve the offer, your order is confirmed.",
      "Sit Back and Relax: Let us handle the procurement process, ensuring your order is delivered on time."
    ]
  },
  {
    title: "Step 6: Track and Receive",
    content: [
      "Real-Time Tracking: Track the status of your order in real-time through our platform.",
      "Order Dispatch: We dispatch your order as per the agreed-upon lead time, ensuring timely delivery."
    ]
  },
  {
    title: "Congratulations!",
    content: [
      "You've successfully navigated the process of using TheSupplier.in for your procurement needs. If you have any questions or need assistance, our support team is ready to help."
    ]
  }
];
const qualityCommitments = [
  {
    title: "Certification and Compliance",
    content: [
      "ISO Certification: We proudly hold ISO certification, a testament to our adherence to international quality standards.",
      "Material Certification: Our commitment to quality starts with the materials we use. Each material is accompanied by certification, ensuring it meets the required specifications."
    ]
  },
  {
    title: "Experienced Team",
    content: [
      "Skilled Professionals: Our team consists of experienced professionals with a deep understanding of CNC machining and sheet metal stamping.",
      "Continuous Training: We invest in the continuous training of our team to stay abreast of industry advancements and maintain high standards of craftsmanship."
    ]
  },
  {
    title: "Rigorous Testing Procedures",
    content: [
      "Precision Testing Equipment: Our state-of-the-art testing equipment ensures precision and accuracy in assessing the quality of each metal part.",
      "Material Testing: Rigorous material testing is conducted to verify properties such as strength, durability, and composition."
    ]
  },
  {
    title: "Quality Control Reports",
    content: [
      "Comprehensive QC Reports: Each metal part undergoes a comprehensive Quality Control (QC) process, and detailed reports are generated to provide you with insights into the manufacturing and inspection processes.",
      "Traceability: Our QC reports include traceability information, allowing you to track the origin and production details of each part."
    ]
  },
  {
    title: "Customer Satisfaction",
    content: [
      "Feedback Loop: We value your feedback. Our commitment to quality is strengthened by actively seeking and incorporating customer feedback into our improvement processes.",
      "Continuous Improvement: We are dedicated to continuously improving our processes to meet and exceed customer expectations."
    ]
  }
];

const comparisonData = [
  {
    criteria: "Product Range",
    traditional: "Limited selection, often restricted to specific suppliers",
    theSupplier: "Extensive catalog with access to over 12,000 suppliers offering a diverse range of products"
  },
  {
    criteria: "Supplier Engagement",
    traditional: "Difficulty in attracting top-tier suppliers for small orders",
    theSupplier: "A large pool of suppliers willing to work on various order sizes, ensuring access to high-quality suppliers for all your needs"
  },
  {
    criteria: "Bargaining Power",
    traditional: "Limited negotiation leverage due to small order volumes",
    theSupplier: "Strong bargaining power, thanks to aggregating orders across multiple customers, resulting in competitive pricing"
  },
  {
    criteria: "Customization",
    traditional: "Limited flexibility in tailoring orders to unique requirements",
    theSupplier: "Tailored solutions to meet specific needs, ensuring a perfect match for your business"
  },
  {
    criteria: "Efficiency",
    traditional: "Lengthy procurement processes with potential delays",
    theSupplier: "Streamlined process, from order placement to delivery, saving time and reducing potential delays"
  },
  {
    criteria: "Quality Assurance",
    traditional: "Dependence on supplier reputation without a robust vetting process",
    theSupplier: "Rigorous supplier vetting process to ensure top-quality products every time"
  },
  {
    criteria: "Cost Savings",
    traditional: "Higher costs due to limited bargaining power",
    theSupplier: "Competitive pricing achieved through bulk orders and strategic supplier partnerships"
  },
  {
    criteria: "Time Savings",
    traditional: "Significant time investment in managing procurement internally or hiring dedicated staff",
    theSupplier: "Outsourcing procurement to TheSupplier saves valuable time and resources, eliminating the need for dedicated in-house procurement management"
  },
  {
    criteria: "Order Tracking",
    traditional: "Limited visibility into order status and delivery times",
    theSupplier: "Real-time tracking and updates, providing transparency throughout the entire procurement process"
  },
  {
    criteria: "Dedicated Support",
    traditional: "Generalized customer service with limited assistance",
    theSupplier: "Personalized support from TheSupplier team, ensuring a smooth and hassle-free experience"
  },
  {
    criteria: "Market Insights",
    traditional: "Lack of data-driven insights for informed decision-making",
    theSupplier: "Access to market trends and data analytics, empowering you with valuable insights for strategic decision-making"
  },
  {
    criteria: "Risk Management",
    traditional: "Limited ability to assess and mitigate risks in the supply chain",
    theSupplier: "Robust risk management strategies, including supplier vetting and continuous monitoring, ensuring a secure and stable supply chain"
  },
  {
    criteria: "Flexibility",
    traditional: "Rigidity in adapting to changing market demands or unexpected disruptions",
    theSupplier: "Agile and adaptable solutions to swiftly respond to market changes or unforeseen challenges"
  },
  {
    criteria: "Innovation",
    traditional: "Limited access to innovative products or technologies",
    theSupplier: "Exposure to cutting-edge technologies and innovative solutions through a diverse network of suppliers"
  },
  {
    criteria: "Environmental Impact",
    traditional: "Challenges in ensuring sustainable and environmentally-friendly sourcing",
    theSupplier: "Commitment to sustainable practices, allowing buyers to align with eco-friendly suppliers and products"
  },
  {
    criteria: "Strategic Partnerships",
    traditional: "Limited ability to build long-term relationships with suppliers",
    theSupplier: "Facilitation of strong, long-term partnerships between buyers and reliable suppliers, fostering trust and collaboration"
  },
  {
    criteria: "Regulatory Compliance",
    traditional: "Potential difficulties in staying compliant with evolving regulations",
    theSupplier: "Proactive adherence to regulatory standards, providing assurance that your procurement aligns with industry regulations"
  },
  {
    criteria: "Payment Terms",
    traditional: "Limited negotiation power for favorable payment terms",
    theSupplier: "Negotiable and flexible payment terms, improving cash flow management for your business"
  },
  {
    criteria: "Global Sourcing",
    traditional: "Challenges in exploring international suppliers for diverse sourcing options",
    theSupplier: "Access to a global network of suppliers, expanding your sourcing possibilities across borders"
  }
];



function page() {
  // Define service items for AboutJob component


  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <section className="relative bg-primary overflow-hidden pb-10 md:pb-20">
        {/* Content Container */}
        <div className="relative w-full px-4 sm:px-6 md:px-12 lg:px-36 py-12 md:py-20">
          <div className="flex flex-col items-center justify-center gap-6 md:gap-10 max-w-4xl mx-auto">
            {/* Badge */}
            <div className="h-8 px-3 py-1.5 bg-lime-50 rounded-full inline-flex justify-center items-center">
              <span className="text-sky-600 text-sm font-medium font-['Inter']">
                How it works
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center text-white font-normal font-['Inter'] leading-tight md:leading-tight lg:leading-[81.60px]">
              TheSupplier
            </h1>

            {/* Subtitle */}
            <p className="text-center text-white text-base md:text-lg font-normal font-['Inter'] leading-relaxed max-w-md md:max-w-xl lg:max-w-2xl">
              Your Trusted Partner in Procurement!
            </p>
          </div>
        </div>
      </section>

      <Feature
        img="/features.png"
        isButton={false}
        subTitle="Perks and Benefits"
        title="Perks and Benefit"
        description="At TheSupplier, we serve as your dedicated purchase manager, accessible with a few clicks, saving on staffing costs.
Our mission? Revolutionize your sourcing experience with unparalleled convenience and personalized service."
      />

      <AboutJob items={serviceItems} />

      <BottomCTA
        title="Start From Here"
        description="JSAT | STEP | STP | SLDPRT | STL | CATPART | IPT | 3DXML | PTC | PRT | DWG | PDF"
        buttonText="Submit Drawing"
      />

<section className="w-full py-10 md:py-14 px-4 sm:px-6 md:px-10 lg:px-20 bg-white">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 md:gap-7">
        <h2 className="text-2xl md:text-3xl font-semibold text-neutral-950 font-['Inter'] leading-tight text-center mb-2 md:mb-4">
          Step-by-Step Guide to Using TheSupplier.in
        </h2>
        
        {steps.map((step, index) => (
          <div key={index} className="w-full flex flex-col gap-3 md:gap-5 pb-6 border-b border-gray-100 last:border-b-0">
            <h3 className="text-xl md:text-2xl font-semibold text-neutral-950 font-['Inter'] leading-tight">
              {step.title}
            </h3>
            <div className="text-neutral-500 text-base md:text-lg font-normal font-['Inter'] leading-relaxed space-y-2">
              {step.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>


    <section className="w-full py-10 md:py-14 px-4 sm:px-6 md:px-10 lg:px-20 bg-white">
  <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 md:gap-8">
    {/* Header section */}
    <div className="w-full flex flex-col gap-4 mb-4 md:mb-6">
      <h2 className="text-2xl md:text-3xl font-semibold text-neutral-950 font-['Inter'] leading-tight text-center">
        TheSupplier&apos;s Commitment to Quality
      </h2>
      <p className="text-neutral-500 text-base md:text-lg font-normal font-['Inter'] leading-relaxed text-center">
        At TheSupplier.in, we are committed to delivering metal parts of the highest quality. 
        Our dedication to quality assurance is evident in every step of our process, 
        from CNC machining to sheet metal stamping. Here&apos;s a closer look at how we ensure excellence:
      </p>
    </div>

    {/* Quality sections */}
    {qualityCommitments.map((commitment, index) => (
      <div 
        key={index} 
        className="w-full flex flex-col gap-3 md:gap-5 pb-6 border-b border-gray-100 last:border-b-0"
      >
        <h3 className="text-xl md:text-2xl font-semibold text-neutral-950 font-['Inter'] leading-tight">
          {commitment.title}
        </h3>
        <div className="text-neutral-500 text-base md:text-lg font-normal font-['Inter'] leading-relaxed space-y-3">
          {commitment.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    ))}
  </div>
</section>

<section className="w-full py-10 md:py-14 px-4 sm:px-6 md:px-10 lg:px-20 bg-white">
  <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 md:gap-8">
    {/* Header section */}
    <div className="w-full flex flex-col gap-4 mb-4 md:mb-6">
      <h2 className="text-2xl md:text-3xl font-semibold text-neutral-950 font-['Inter'] leading-tight text-center">
        Your Partners in Procurement Excellence
      </h2>
      <p className="text-neutral-500 text-base md:text-lg font-normal font-['Inter'] leading-relaxed text-center">
        At TheSupplier, we understand that exceptional customer service is integral to a seamless procurement experience. 
        Our dedicated support team is committed to assisting you at every step of your journey.
      </p>
    </div>

    {/* Support sections */}
    <div className="w-full flex flex-col gap-3 md:gap-5 pb-6 border-b border-gray-100">
      <h3 className="text-xl md:text-2xl font-semibold text-neutral-950 font-['Inter'] leading-tight">
        Expert Assistance
      </h3>
      <div className="text-neutral-500 text-base md:text-lg font-normal font-['Inter'] leading-relaxed space-y-3">
        <p>Industry Knowledge: Our support team comprises experts with in-depth knowledge of the metal parts industry, including CNC machining and sheet metal stamping.</p>
        <p>Technical Insight: Whether you have technical queries or need guidance on product specifications, our team is well-equipped to provide the necessary insight.</p>
      </div>
    </div>

    <div className="w-full flex flex-col gap-3 md:gap-5 pb-6 border-b border-gray-100">
      <h3 className="text-xl md:text-2xl font-semibold text-neutral-950 font-['Inter'] leading-tight">
        Responsive Communication
      </h3>
      <div className="text-neutral-500 text-base md:text-lg font-normal font-['Inter'] leading-relaxed space-y-3">
        <p>Prompt Responses: We value your time. Our support team is dedicated to providing prompt and efficient responses to your inquiries.</p>
        <p>Multi-Channel Support: Reach out to us via email, phone, or through our online portal. We&apos;re here to make communication convenient for you.</p>
      </div>
    </div>

    <div className="w-full flex flex-col gap-3 md:gap-5 pb-6 border-b border-gray-100">
      <h3 className="text-xl md:text-2xl font-semibold text-neutral-950 font-['Inter'] leading-tight">
        Problem Resolution
      </h3>
      <div className="text-neutral-500 text-base md:text-lg font-normal font-['Inter'] leading-relaxed space-y-3">
        <p>Issue Resolution: Should you encounter any challenges or issues, our support team is proactive in resolving them swiftly.</p>
        <p>Collaborative Approach: We believe in working closely with our customers to understand their unique needs and provide tailored solutions.</p>
      </div>
    </div>

    <div className="w-full flex flex-col gap-3 md:gap-5 pb-6 border-b border-gray-100">
      <h3 className="text-xl md:text-2xl font-semibold text-neutral-950 font-['Inter'] leading-tight">
        Order Tracking and Updates
      </h3>
      <div className="text-neutral-500 text-base md:text-lg font-normal font-['Inter'] leading-relaxed space-y-3">
        <p>Real-Time Tracking: Our support team assists you with real-time tracking of your orders, ensuring transparency in the procurement process.</p>
        <p>Regular Updates: Receive timely updates on the status of your orders, from production to dispatch.</p>
      </div>
    </div>

    <div className="w-full flex flex-col gap-3 md:gap-5 pb-6">
      <h3 className="text-xl md:text-2xl font-semibold text-neutral-950 font-['Inter'] leading-tight">
        Personalized Service
      </h3>
      <div className="text-neutral-500 text-base md:text-lg font-normal font-['Inter'] leading-relaxed space-y-3">
        <p>Tailored Solutions: We understand that each customer is unique. Our support team provides personalized solutions to meet your specific requirements.</p>
        <p>Customer Feedback: Your feedback is invaluable to us. We actively seek your input to enhance our services continually.</p>
      </div>
    </div>
  </div>
</section>

<section className="w-full py-10 md:py-14 px-4 sm:px-6 md:px-10 lg:px-20 bg-white overflow-x-auto">
  <div className="max-w-7xl mx-auto flex flex-col gap-6 md:gap-8">
    {/* Header section */}
    <div className="w-full flex flex-col gap-4 mb-4 md:mb-6">
      <h2 className="text-2xl md:text-3xl font-semibold text-neutral-950 font-['Inter'] leading-tight text-center">
        Choose TheSupplier for Procurement Excellence
      </h2>
      <p className="text-neutral-500 text-base md:text-lg font-normal font-['Inter'] leading-relaxed text-center">
        Experience a transformative approach to procurement with TheSupplier. Our platform is your strategic partner, 
        offering an extensive product range, dedicated support, and advanced market insights. Discover a procurement 
        process that goes beyond expectations and empowers your business. Join TheSupplier today for innovation, 
        efficiency, and unmatched excellence. Explore the detailed advantages in the comparison table below, 
        showcasing how TheSupplier redefines traditional purchasing methods.
      </p>
    </div>

    {/* Interactive Comparison Table */}
    <div className="w-full overflow-hidden shadow-lg rounded-xl border border-gray-200">
      {/* Table Header - Visible on all screen sizes */}
      <div className="relative overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-blue-50">
              <th scope="col" className="p-4 md:p-6 text-sm md:text-base font-semibold text-gray-900 whitespace-nowrap border-b border-r border-gray-200">
                Comparison Criteria
              </th>
              <th scope="col" className="p-4 md:p-6 text-sm md:text-base font-semibold text-gray-700 whitespace-nowrap border-b border-r border-gray-200">
                Traditional Purchasing
              </th>
              <th scope="col" className="p-4 md:p-6 text-sm md:text-base font-semibold text-primary whitespace-nowrap border-b border-gray-200 bg-blue-50">
                <span className="flex items-center">
                  TheSupplier Advantage
                  <svg className="w-5 h-5 ml-1 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row, index) => (
              <tr 
                key={index} 
                className={`
                  border-b border-gray-200 last:border-none 
                  transition-colors hover:bg-blue-50/30 group
                  ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                `}
              >
                <td className="p-4 md:p-6 text-sm md:text-base font-medium text-gray-900 border-r border-gray-200">
                  {row.criteria}
                </td>
                <td className="p-4 md:p-6 text-sm md:text-base text-gray-600 border-r border-gray-200">
                  {row.traditional}
                </td>
                <td className="p-4 md:p-6 text-sm md:text-base text-gray-800 bg-blue-50/40 group-hover:bg-blue-50/70 transition-colors">
                  <div className="flex items-start">
                    <span className="inline-block w-2 h-2 mt-1.5 mr-2 bg-primary rounded-full shrink-0"></span>
                    <span>{row.theSupplier}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Mobile Cards View for better responsiveness on small screens */}
    <div className="md:hidden space-y-6 mt-4">
      {comparisonData.map((row, index) => (
        <div 
          key={`mobile-${index}`} 
          className="border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md hover:border-primary/30"
        >
          <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 font-semibold text-base text-gray-900 font-['Inter']">
            {row.criteria}
          </div>
          <div className="border-t border-gray-200 p-4">
            <h4 className="font-medium text-sm mb-2 text-gray-700">Traditional Purchasing:</h4>
            <p className="text-sm text-gray-600">{row.traditional}</p>
          </div>
          <div className="border-t border-gray-200 p-4 bg-blue-50/40">
            <h4 className="font-medium text-sm mb-2 text-primary flex items-center">
              TheSupplier Advantage:
              <svg className="w-4 h-4 ml-1 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </h4>
            <div className="flex items-start">
              <span className="inline-block w-2 h-2 mt-1.5 mr-2 bg-primary rounded-full shrink-0"></span>
              <p className="text-sm text-gray-800">{row.theSupplier}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>




<Footer />

    </>
  );
}

export default page;
