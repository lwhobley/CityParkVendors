import { TreePine, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TreePine className="h-6 w-6" />
              <span className="font-bold text-lg">New Orleans City Park</span>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              One of the nation's oldest and most beautiful urban parks, welcoming millions of visitors annually.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/80">1 Palm Drive<br />New Orleans, LA 70124</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span className="text-primary-foreground/80">(504) 482-4888</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="text-primary-foreground/80">vendors@nolacitypark.com</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://neworleanscitypark.com" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Main Website
                </a>
              </li>
              <li>
                <a href="https://neworleanscitypark.com/events" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Events Calendar
                </a>
              </li>
              <li>
                <a href="https://neworleanscitypark.com/visit" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Visitor Information
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} New Orleans City Park. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
