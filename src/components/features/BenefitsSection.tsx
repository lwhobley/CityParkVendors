import { DollarSign, MapPin, Calendar, Users, Sparkles, Shield } from "lucide-react";
import foodTrucksImage from "@/assets/food-trucks.jpg";
import crowdImage from "@/assets/crowd-event.jpg";

const benefits = [
  {
    icon: DollarSign,
    title: "High Revenue Potential",
    description: "Access to consistent daily foot traffic plus premium event opportunities"
  },
  {
    icon: MapPin,
    title: "Prime Location",
    description: "Strategic positioning in high-traffic areas throughout the 1,300-acre park"
  },
  {
    icon: Calendar,
    title: "Flexible Scheduling",
    description: "Choose from daily service, weekends only, or special events based on your availability"
  },
  {
    icon: Users,
    title: "Diverse Audience",
    description: "Serve families, tourists, locals, and event attendees from all backgrounds"
  },
  {
    icon: Sparkles,
    title: "Marketing Support",
    description: "Featured in park promotions, social media, and event marketing materials"
  },
  {
    icon: Shield,
    title: "Trusted Partnership",
    description: "Work with one of New Orleans' most respected institutions since 1854"
  }
];

const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Partnership Benefits
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to grow your food and beverage business in one of the South's most visited parks
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="grid sm:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div 
                  key={index}
                  className="bg-card rounded-lg p-6 border border-border hover:border-primary transition-colors"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-4">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              );
            })}
          </div>
          
          <div className="space-y-6">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src={foodTrucksImage} 
                alt="Food trucks at City Park events" 
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src={crowdImage} 
                alt="Crowds enjoying City Park events" 
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
