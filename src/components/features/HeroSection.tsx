import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-park.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-[600px] md:h-[700px] flex items-center">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Partner with New Orleans' Premier Urban Park
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            Bring your food truck or vendor business to one of America's most beloved parks. Serve thousands of visitors daily.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/apply"
              className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-lg font-bold text-lg hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl"
            >
              Apply Now
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a 
              href="#benefits"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-all"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
