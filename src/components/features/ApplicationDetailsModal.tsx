import { useState } from "react";
import { VendorApplication } from "@/types/vendor";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ExternalLink, Mail, Phone, Calendar, Building2, User, Globe, Instagram, Send } from "lucide-react";
import EmailTemplateModal from "./EmailTemplateModal";

interface ApplicationDetailsModalProps {
  application: VendorApplication | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusChange: (id: string, status: VendorApplication["status"]) => void;
  onDelete: (id: string) => void;
}

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Reviewed: "bg-blue-100 text-blue-800 border-blue-200",
  Approved: "bg-green-100 text-green-800 border-green-200",
  Rejected: "bg-red-100 text-red-800 border-red-200",
};

const ApplicationDetailsModal = ({
  application,
  open,
  onOpenChange,
  onStatusChange,
  onDelete,
}: ApplicationDetailsModalProps) => {
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  
  if (!application) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete the application from ${application.businessName}? This action cannot be undone.`)) {
      onDelete(application.id);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{application.businessName}</DialogTitle>
          <DialogDescription>
            Application submitted on {formatDate(application.submittedAt)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Status Section */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-base font-semibold">Application Status</Label>
              <Badge variant="outline" className={statusColors[application.status]}>
                {application.status}
              </Badge>
            </div>
            <Select
              value={application.status}
              onValueChange={(value) => onStatusChange(application.id, value as VendorApplication["status"])}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending Review</SelectItem>
                <SelectItem value="Reviewed">Reviewed</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Business Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Business Information</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <Label className="text-xs text-muted-foreground">Business Name</Label>
                  <p className="font-medium">{application.businessName}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Badge variant="outline" className="h-fit">
                  {application.vendorType}
                </Badge>
              </div>
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">Years in Business</Label>
              <p className="font-medium">{application.yearsInBusiness}</p>
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">Business Description</Label>
              <p className="text-sm mt-1 leading-relaxed text-foreground bg-muted/30 p-3 rounded">
                {application.description}
              </p>
            </div>

            {application.website && (
              <div className="flex items-start gap-3">
                <Globe className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <Label className="text-xs text-muted-foreground">Website</Label>
                  <a 
                    href={application.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center gap-1 font-medium"
                  >
                    {application.website} <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            )}

            {application.instagram && (
              <div className="flex items-start gap-3">
                <Instagram className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <Label className="text-xs text-muted-foreground">Instagram</Label>
                  <a 
                    href={`https://instagram.com/${application.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    {application.instagram}
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Contact Information</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <Label className="text-xs text-muted-foreground">Contact Name</Label>
                  <p className="font-medium">{application.contactName}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <Label className="text-xs text-muted-foreground">Email</Label>
                  <a 
                    href={`mailto:${application.email}`}
                    className="text-primary hover:underline font-medium"
                  >
                    {application.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <Label className="text-xs text-muted-foreground">Phone</Label>
                  <a 
                    href={`tel:${application.phone}`}
                    className="text-primary hover:underline font-medium"
                  >
                    {application.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <Label className="text-xs text-muted-foreground">Submitted</Label>
                  <p className="font-medium text-sm">{formatDate(application.submittedAt)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-4 border-t">
            <Button 
              variant="destructive" 
              onClick={handleDelete}
            >
              Delete Application
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
              <Button
                variant="outline"
                onClick={() => setEmailModalOpen(true)}
                className="flex items-center gap-2"
              >
                <Send className="h-4 w-4" />
                Email Templates
              </Button>
              <Button asChild>
                <a href={`mailto:${application.email}`}>
                  <Mail className="h-4 w-4 mr-2" />
                  Quick Email
                </a>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
      
      {/* Email Template Modal */}
      <EmailTemplateModal
        application={application}
        open={emailModalOpen}
        onOpenChange={setEmailModalOpen}
      />
    </Dialog>
  );
};

export default ApplicationDetailsModal;
