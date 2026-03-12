export interface VendorApplication {
  id: string;
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  vendorType: string;
  description: string;
  website?: string;
  instagram?: string;
  yearsInBusiness: string;
  submittedAt: string;
  status: "Pending" | "Reviewed" | "Approved" | "Rejected";
}

export const VENDOR_TYPES = [
  "Food Truck",
  "Beverage Vendor",
  "Pop-up Stand",
  "Specialty Vendor (Ice Cream, Snacks, etc.)",
  "Other"
] as const;

export const APPLICATION_STATUSES = [
  "Pending",
  "Reviewed",
  "Approved",
  "Rejected"
] as const;
