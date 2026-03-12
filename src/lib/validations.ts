import { z } from "zod";

export const vendorApplicationSchema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  contactName: z.string().min(2, "Contact name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  vendorType: z.string().min(1, "Please select a vendor type"),
  description: z.string().min(20, "Please provide at least 20 characters describing your offerings"),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  instagram: z.string().optional(),
  yearsInBusiness: z.string().min(1, "Please select years in business"),
});

export type VendorApplicationFormData = z.infer<typeof vendorApplicationSchema>;
