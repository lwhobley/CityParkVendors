import { Link } from "react-router-dom";
import { TreePine } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <TreePine className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-xl font-bold text-foreground">New Orleans City Park</h1>
            <p className="text-xs text-muted-foreground">Vendor Partnerships</p>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/#benefits" className="text-foreground hover:text-primary transition-colors font-medium">
            Benefits
          </Link>
          <Link to="/#stats" className="text-foreground hover:text-primary transition-colors font-medium">
            Why Partner
          </Link>
          <Link to="/admin" className="text-foreground hover:text-primary transition-colors font-medium">
            Admin
          </Link>
          <Link 
            to="/apply" 
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-md font-semibold hover:bg-primary/90 transition-colors"
          >
            Apply Now
          </Link>
        </nav>
        <Link 
          to="/apply" 
          className="md:hidden bg-primary text-primary-foreground px-4 py-2 rounded-md font-semibold hover:bg-primary/90 transition-colors text-sm"
        >
          Apply
        </Link>
      </div>
    </header>
  );
};

export default Header;
