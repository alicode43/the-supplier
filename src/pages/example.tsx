import React from 'react';
import AboutJob from '../components/frontend/aboutJob';
import { Briefcase, Clock, Users } from 'lucide-react';

function ExamplePage() {
  // Define job items with all required properties
  const jobItems = [
    {
      icon: Briefcase,
      title: "Job Requirements",
      description: "Candidates must have experience in waste management and environmental services."
    },
    {
      icon: Clock,
      title: "Working Hours",
      description: "This position requires 40 hours per week with flexible scheduling options."
    },
    {
      icon: Users,
      title: "Team Environment",
      description: "You'll be working with a dedicated team committed to environmental sustainability."
    }
  ];

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold my-8 text-center">About This Job</h1>
      <AboutJob items={jobItems} />
    </div>
  );
}

export default ExamplePage;
