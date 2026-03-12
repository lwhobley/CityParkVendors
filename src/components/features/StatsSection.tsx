import { Users, Calendar, TrendingUp, Award } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "12M+",
    label: "Annual Visitors",
    description: "Millions explore the park yearly"
  },
  {
    icon: Calendar,
    value: "100+",
    label: "Events Annually",
    description: "Festivals, concerts & celebrations"
  },
  {
    icon: TrendingUp,
    value: "1,300",
    label: "Acres",
    description: "5th largest urban park in the U.S."
  },
  {
    icon: Award,
    value: "150+",
    label: "Years of History",
    description: "Established in 1854"
  }
];

const StatsSection = () => {
  return (
    <section id="stats" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Partner with City Park?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join a thriving ecosystem where your business meets consistent high foot traffic in an iconic New Orleans destination
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-lg p-8 text-center shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-foreground mb-2">{stat.label}</div>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
