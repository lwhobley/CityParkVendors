import { useState, useEffect } from "react";
import { VendorApplication } from "@/types/vendor";

export const useApplications = () => {
  const [applications, setApplications] = useState<VendorApplication[]>([]);

  const loadApplications = () => {
    const stored = localStorage.getItem("vendorApplications");
    if (stored) {
      setApplications(JSON.parse(stored));
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const updateApplicationStatus = (id: string, status: VendorApplication["status"]) => {
    const updated = applications.map(app => 
      app.id === id ? { ...app, status } : app
    );
    setApplications(updated);
    localStorage.setItem("vendorApplications", JSON.stringify(updated));
    console.log(`Updated application ${id} status to ${status}`);
  };

  const deleteApplication = (id: string) => {
    const updated = applications.filter(app => app.id !== id);
    setApplications(updated);
    localStorage.setItem("vendorApplications", JSON.stringify(updated));
    console.log(`Deleted application ${id}`);
  };

  return {
    applications,
    updateApplicationStatus,
    deleteApplication,
    refreshApplications: loadApplications,
  };
};
