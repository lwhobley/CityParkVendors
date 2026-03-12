import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary to-primary/80">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
          Ready to Join Our Vendor Community?
        </h2>
        <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
          Submit your application today and start serving New Orleans' most beloved park destination
        </p>
        <Link 
          to="/apply"
          className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-10 py-5 rounded-lg font-bold text-xl hover:bg-accent/90 transition-all shadow-xl hover:shadow-2xl"
        >
          Apply Now
          <ArrowRight className="h-6 w-6" />
        </Link>
        <p className="mt-6 text-primary-foreground/70 text-sm">
          Application takes less than 5 minutes • No fees to apply
        </p>
      </div>
    </section>
  );
};

export default CTASection;
