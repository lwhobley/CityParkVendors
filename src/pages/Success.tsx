import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CheckCircle2, Home, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Success = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-20 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
              <CheckCircle2 className="h-12 w-12 text-primary" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Application Submitted!
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              Thank you for your interest in partnering with New Orleans City Park. We've received your application and will review it carefully.
            </p>
            
            <div className="bg-muted/50 border border-border rounded-lg p-8 mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">What happens next?</h2>
              <ul className="text-left space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-primary text-sm font-semibold">1</span>
                  </div>
                  <span>Our vendor relations team will review your application within 5-7 business days</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-primary text-sm font-semibold">2</span>
                  </div>
                  <span>You'll receive an email with next steps or a request for additional information</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-primary text-sm font-semibold">3</span>
                  </div>
                  <span>If approved, we'll schedule a meeting to discuss partnership details and opportunities</span>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="mailto:vendors@nolacitypark.com">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Us
                </a>
              </Button>
            </div>
            
            <p className="mt-8 text-sm text-muted-foreground">
              Need to make changes? Email us at{" "}
              <a href="mailto:vendors@nolacitypark.com" className="text-primary hover:underline">
                vendors@nolacitypark.com
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Success;
