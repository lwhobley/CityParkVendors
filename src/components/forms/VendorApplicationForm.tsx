import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { vendorApplicationSchema, VendorApplicationFormData } from "@/lib/validations";
import { VENDOR_TYPES } from "@/types/vendor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const VendorApplicationForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<VendorApplicationFormData>({
    resolver: zodResolver(vendorApplicationSchema),
  });

  const onSubmit = async (data: VendorApplicationFormData) => {
    console.log("Form submitted:", data);
    
    // Mock submission - store in localStorage
    const application = {
      id: crypto.randomUUID(),
      ...data,
      submittedAt: new Date().toISOString(),
      status: "Pending" as const,
    };
    
    const existingApplications = JSON.parse(localStorage.getItem("vendorApplications") || "[]");
    existingApplications.push(application);
    localStorage.setItem("vendorApplications", JSON.stringify(existingApplications));
    
    console.log("Application saved:", application);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    navigate("/success");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="bg-muted/50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-foreground">Business Information</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="businessName">Business Name *</Label>
            <Input
              id="businessName"
              {...register("businessName")}
              placeholder="Your Business Name"
              className="mt-1.5"
            />
            {errors.businessName && (
              <p className="text-destructive text-sm mt-1">{errors.businessName.message}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="vendorType">Vendor Type *</Label>
            <Select onValueChange={(value) => setValue("vendorType", value)}>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select vendor type" />
              </SelectTrigger>
              <SelectContent>
                {VENDOR_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.vendorType && (
              <p className="text-destructive text-sm mt-1">{errors.vendorType.message}</p>
            )}
          </div>
          
          <div className="md:col-span-2">
            <Label htmlFor="description">What do you offer? *</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Describe your menu, specialties, and what makes your offerings unique..."
              rows={4}
              className="mt-1.5"
            />
            {errors.description && (
              <p className="text-destructive text-sm mt-1">{errors.description.message}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="yearsInBusiness">Years in Business *</Label>
            <Select onValueChange={(value) => setValue("yearsInBusiness", value)}>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select years" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="less-than-1">Less than 1 year</SelectItem>
                <SelectItem value="1-2">1-2 years</SelectItem>
                <SelectItem value="3-5">3-5 years</SelectItem>
                <SelectItem value="6-10">6-10 years</SelectItem>
                <SelectItem value="10-plus">10+ years</SelectItem>
              </SelectContent>
            </Select>
            {errors.yearsInBusiness && (
              <p className="text-destructive text-sm mt-1">{errors.yearsInBusiness.message}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-muted/50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-foreground">Contact Information</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="contactName">Contact Name *</Label>
            <Input
              id="contactName"
              {...register("contactName")}
              placeholder="Your Full Name"
              className="mt-1.5"
            />
            {errors.contactName && (
              <p className="text-destructive text-sm mt-1">{errors.contactName.message}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="your@email.com"
              className="mt-1.5"
            />
            {errors.email && (
              <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              {...register("phone")}
              placeholder="(504) 123-4567"
              className="mt-1.5"
            />
            {errors.phone && (
              <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="website">Website (Optional)</Label>
            <Input
              id="website"
              type="url"
              {...register("website")}
              placeholder="https://yourbusiness.com"
              className="mt-1.5"
            />
            {errors.website && (
              <p className="text-destructive text-sm mt-1">{errors.website.message}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="instagram">Instagram Handle (Optional)</Label>
            <Input
              id="instagram"
              {...register("instagram")}
              placeholder="@yourbusiness"
              className="mt-1.5"
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          type="submit" 
          size="lg"
          disabled={isSubmitting}
          className="px-8 font-semibold"
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </Button>
      </div>
    </form>
  );
};

export default VendorApplicationForm;
