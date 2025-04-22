"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";

interface RequireAuthProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export default function RequireAuth({ 
  children, 
  redirectTo = "/signin" 
}: RequireAuthProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = Cookies.get("accessToken");

  useEffect(() => {
    if (!accessToken) {
      toast.error("Please login to access this page");
      router.push(redirectTo);
    } else {
      setIsLoading(false);
    }
  }, [router, accessToken, redirectTo]);

  if (!accessToken || isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
          <p className="text-gray-600">Redirecting to login page...</p>
        </div>
        <div className="animate-spin text-indigo-600 mt-4">
          <Loader2 size={36} />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}