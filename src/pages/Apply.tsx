import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import VendorApplicationForm from "@/components/forms/VendorApplicationForm";
import { FileText } from "lucide-react";

const Apply = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Vendor Application
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tell us about your business and how you'd like to serve our park community. We'll review your application and get back to you within 5-7 business days.
            </p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
            <VendorApplicationForm />
          </div>
          
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>Questions? Contact us at <a href="mailto:vendors@nolacitypark.com" className="text-primary hover:underline">vendors@nolacitypark.com</a> or call <a href="tel:5044824888" className="text-primary hover:underline">(504) 482-4888</a></p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Apply;
