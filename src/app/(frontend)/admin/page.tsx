'use client';
import { useAdminContext } from '@/context/AdminContex';
import Dashboard from '@/components/dashboard/AdminDashboard';
import AdminLeads from '@/components/dashboard/AminLeads';
import Offer from '@/components/dashboard/Offer';
import UserManagement from '@/components/dashboard/UserManagement';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function Page() {  
  // Use context instead of props
  const { activeComponent } = useAdminContext();
  const router = useRouter();
  const accessToken = Cookies.get("accessToken");
  
  useEffect(() => {
    if (!accessToken) {
      router.push("/signin");
    }
  }, [accessToken, router]);
  
  // Render the appropriate component based on context
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