'use client';
import Dashboard from '@/components/dashboard/AdminDashboard';
import AdminLeads from '@/components/dashboard/AminLeads';
import Offer from '@/components/dashboard/Offer';
import UserManagement from '@/components/dashboard/UserManagement';

function Page({ activeComponent = 'dashboard' }) {  
  // Render the appropriate component based on passed prop
  const renderComponent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <Dashboard />;
      case 'leads':
        return <AdminLeads />;
      case 'offers':
        return <Offer />;
      case 'users':
        return <UserManagement />;
      case 'settings':
        return <div className="p-5"><h1 className="text-3xl font-bold">Settings</h1></div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex-1 p-4">
      {renderComponent()}
    </div>
  );
}

export default Page;