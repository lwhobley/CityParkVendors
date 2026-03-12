import { VendorApplication } from "@/types/vendor";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Mail, Phone, Eye, Send } from "lucide-react";

interface ApplicationsTableProps {
  applications: VendorApplication[];
  onStatusChange: (id: string, status: VendorApplication["status"]) => void;
  onViewDetails: (application: VendorApplication) => void;
  onSendEmail?: (application: VendorApplication) => void;
}

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Reviewed: "bg-blue-100 text-blue-800 border-blue-200",
  Approved: "bg-green-100 text-green-800 border-green-200",
  Rejected: "bg-red-100 text-red-800 border-red-200",
};

const ApplicationsTable = ({ applications, onStatusChange, onViewDetails, onSendEmail }: ApplicationsTableProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (applications.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/30 rounded-lg">
        <p className="text-muted-foreground text-lg">No applications found</p>
        <p className="text-sm text-muted-foreground mt-2">Applications will appear here once vendors submit their information</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Business Name</TableHead>
            <TableHead className="font-semibold">Contact</TableHead>
            <TableHead className="font-semibold">Vendor Type</TableHead>
            <TableHead className="font-semibold">Experience</TableHead>
            <TableHead className="font-semibold">Submitted</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Quick Actions</TableHead>
            <TableHead className="font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app) => (
            <TableRow key={app.id} className="hover:bg-muted/20">
              <TableCell className="font-medium">
                <div>
                  <div className="font-semibold text-foreground">{app.businessName}</div>
                  {app.website && (
                    <a 
                      href={app.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline inline-flex items-center gap-1 mt-1"
                    >
                      Website <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  {app.instagram && (
                    <div className="text-xs text-muted-foreground mt-1">{app.instagram}</div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="text-sm font-medium">{app.contactName}</div>
                  <a 
                    href={`mailto:${app.email}`}
                    className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                  >
                    <Mail className="h-3 w-3" />
                    {app.email}
                  </a>
                  <div className="text-xs text-muted-foreground inline-flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {app.phone}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="font-normal">
                  {app.vendorType}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {app.yearsInBusiness}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {formatDate(app.submittedAt)}
              </TableCell>
              <TableCell>
                <Badge 
                  variant="outline" 
                  className={statusColors[app.status]}
                >
                  {app.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Select
                  value={app.status}
                  onValueChange={(value) => onStatusChange(app.id, value as VendorApplication["status"])}
                >
                  <SelectTrigger className="w-[130px] h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Reviewed">Reviewed</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewDetails(app)}
                    className="h-8 text-xs"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    Details
                  </Button>
                  {onSendEmail && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onSendEmail(app)}
                      className="h-8 text-xs"
                      title="Send email template"
                    >
                      <Send className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicationsTable;
