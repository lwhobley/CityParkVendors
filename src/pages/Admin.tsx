import { useState, useMemo } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ApplicationsTable from "@/components/features/ApplicationsTable";
import ApplicationDetailsModal from "@/components/features/ApplicationDetailsModal";
import EmailTemplateModal from "@/components/features/EmailTemplateModal";
import { useApplications } from "@/hooks/useApplications";
import { VendorApplication } from "@/types/vendor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, FileText, CheckCircle2, XCircle, Clock } from "lucide-react";
import { VENDOR_TYPES } from "@/types/vendor";

const Admin = () => {
  const { applications, updateApplicationStatus, deleteApplication } = useApplications();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterVendorType, setFilterVendorType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedApplication, setSelectedApplication] = useState<VendorApplication | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  // Filter and search applications
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch = app.businessName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesVendorType = filterVendorType === "all" || app.vendorType === filterVendorType;
      const matchesStatus = filterStatus === "all" || app.status === filterStatus;
      return matchesSearch && matchesVendorType && matchesStatus;
    });
  }, [applications, searchQuery, filterVendorType, filterStatus]);

  // Statistics
  const stats = useMemo(() => {
    return {
      total: applications.length,
      pending: applications.filter(app => app.status === "Pending").length,
      approved: applications.filter(app => app.status === "Approved").length,
      rejected: applications.filter(app => app.status === "Rejected").length,
    };
  }, [applications]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Vendor Applications Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage and review all vendor partnership applications
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Applications</p>
                  <p className="text-3xl font-bold text-foreground">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Pending Review</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Approved</p>
                  <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Rejected</p>
                  <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border border-border rounded-lg p-6 mb-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="search" className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Search by Business Name
                </Label>
                <Input
                  id="search"
                  type="text"
                  placeholder="Search businesses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="vendor-type" className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter by Vendor Type
                </Label>
                <Select value={filterVendorType} onValueChange={setFilterVendorType}>
                  <SelectTrigger id="vendor-type" className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {VENDOR_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="status" className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter by Status
                </Label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger id="status" className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Reviewed">Reviewed</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {(searchQuery || filterVendorType !== "all" || filterStatus !== "all") && (
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <span>Showing {filteredApplications.length} of {applications.length} applications</span>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setFilterVendorType("all");
                    setFilterStatus("all");
                  }}
                  className="text-primary hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>

          {/* Applications Table */}
          <ApplicationsTable
            applications={filteredApplications}
            onStatusChange={updateApplicationStatus}
            onViewDetails={(app) => {
              setSelectedApplication(app);
              setIsDetailsModalOpen(true);
            }}
            onSendEmail={(app) => {
              setSelectedApplication(app);
              setIsEmailModalOpen(true);
            }}
          />

          {/* Application Details Modal */}
          <ApplicationDetailsModal
            application={selectedApplication}
            open={isDetailsModalOpen}
            onOpenChange={setIsDetailsModalOpen}
            onStatusChange={updateApplicationStatus}
            onDelete={deleteApplication}
          />
          
          {/* Email Template Modal */}
          <EmailTemplateModal
            application={selectedApplication}
            open={isEmailModalOpen}
            onOpenChange={setIsEmailModalOpen}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
