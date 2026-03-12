import { VendorApplication } from "@/types/vendor";

export type EmailTemplateType = "approval" | "rejection" | "follow-up" | "request-info";

export interface EmailTemplate {
  type: EmailTemplateType;
  name: string;
  subject: (app: VendorApplication) => string;
  body: (app: VendorApplication) => string;
  description: string;
}

export const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    type: "approval",
    name: "Vendor Approval",
    description: "Notify vendor that their application has been approved",
    subject: (app) => `Exciting News! ${app.businessName} - Partnership Approved`,
    body: (app) => `Dear ${app.contactName},

Congratulations! We're thrilled to inform you that ${app.businessName} has been approved to partner with New Orleans City Park.

Your ${app.vendorType.toLowerCase()} will be a wonderful addition to our park events and busy days. We're excited to bring your unique offerings to our visitors.

NEXT STEPS:
1. Review and sign the vendor partnership agreement (attached)
2. Provide proof of insurance and required permits
3. Schedule an orientation call with our events team
4. Discuss upcoming events and preferred dates

We'll be in touch within the next 2-3 business days with detailed partnership information and available dates.

Thank you for your interest in partnering with New Orleans City Park. We look forward to a successful partnership!

Best regards,
New Orleans City Park Events Team

---
Contact: events@nolacitypark.com
Phone: (504) 483-9402`,
  },
  {
    type: "rejection",
    name: "Application Declined",
    description: "Professionally decline a vendor application",
    subject: (app) => `Re: Your Vendor Application - ${app.businessName}`,
    body: (app) => `Dear ${app.contactName},

Thank you for your interest in partnering with New Orleans City Park as a ${app.vendorType.toLowerCase()}.

After careful review of your application, we regret to inform you that we are unable to move forward with a partnership at this time. This decision was made based on our current vendor capacity and event requirements.

We truly appreciate the time you took to submit your application. We encourage you to:
- Reapply for future opportunities as our needs evolve
- Follow us on social media for updates on vendor opportunities
- Consider participating in our community events as a visitor

We wish you the very best with ${app.businessName} and your future endeavors.

Best regards,
New Orleans City Park Events Team

---
Contact: events@nolacitypark.com
Phone: (504) 483-9402`,
  },
  {
    type: "follow-up",
    name: "Application Follow-Up",
    description: "Follow up on pending applications",
    subject: (app) => `Follow-Up: ${app.businessName} Vendor Application`,
    body: (app) => `Dear ${app.contactName},

Thank you for submitting your vendor application for ${app.businessName} to partner with New Orleans City Park.

We wanted to reach out to let you know that we've received your application and it's currently under review by our events team.

CURRENT STATUS: Under Review
EXPECTED DECISION: Within 7-10 business days

In the meantime, please feel free to provide any additional information that might support your application:
- Recent photos of your ${app.vendorType.toLowerCase()} setup
- Sample menus or product lists
- Customer testimonials or reviews
- Social media presence or marketing materials

If you have any questions or would like to discuss your application, please don't hesitate to reach out.

Best regards,
New Orleans City Park Events Team

---
Contact: events@nolacitypark.com
Phone: (504) 483-9402`,
  },
  {
    type: "request-info",
    name: "Request Additional Information",
    description: "Ask vendor for more details or documentation",
    subject: (app) => `Additional Information Needed - ${app.businessName}`,
    body: (app) => `Dear ${app.contactName},

Thank you for your application to partner with New Orleans City Park as a ${app.vendorType.toLowerCase()}.

We're reviewing your application for ${app.businessName} and would like to request some additional information to help us make an informed decision:

REQUESTED INFORMATION:
1. [Please specify what you need - examples below]
   - Proof of current business license
   - Certificate of insurance (minimum $1M general liability)
   - Health department permits (if applicable)
   - Photos of your setup/equipment
   - Sample menu with pricing
   - References from previous events

2. [Add any specific questions about their operation]

3. [Timeline or operational questions]

Please provide this information at your earliest convenience. Once we receive these details, we'll be able to move forward with the review process.

If you have any questions or need clarification on what's needed, please don't hesitate to contact us.

Best regards,
New Orleans City Park Events Team

---
Contact: events@nolacitypark.com
Phone: (504) 483-9402`,
  },
];

export const getEmailTemplate = (type: EmailTemplateType): EmailTemplate | undefined => {
  return EMAIL_TEMPLATES.find(template => template.type === type);
};
