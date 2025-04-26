"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type AdminContextType = {
  activeComponent: string;
  setActiveComponent: (component: string) => void;
};

const AdminContext = createContext<AdminContextType>({
  activeComponent: "dashboard",
  setActiveComponent: () => {},
});

export const useAdminContext = () => useContext(AdminContext);

export const AdminContextProvider = ({ children }: { children: ReactNode }) => {
  const [activeComponent, setActiveComponent] = useState("dashboard");

  return (
    <AdminContext.Provider value={{ activeComponent, setActiveComponent }}>
      {children}
    </AdminContext.Provider>
  );
};