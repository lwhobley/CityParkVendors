import { useState } from "react";
import { VendorApplication } from "@/types/vendor";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EMAIL_TEMPLATES, EmailTemplateType, getEmailTemplate } from "@/constants/emailTemplates";
import { Mail, Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface EmailTemplateModalProps {
  application: VendorApplication | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EmailTemplateModal = ({
  application,
  open,
  onOpenChange,
}: EmailTemplateModalProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplateType>("follow-up");
  const [customSubject, setCustomSubject] = useState("");
  const [customBody, setCustomBody] = useState("");

  if (!application) return null;

  const template = getEmailTemplate(selectedTemplate);
  const subject = customSubject || (template ? template.subject(application) : "");
  const body = customBody || (template ? template.body(application) : "");

  const handleTemplateChange = (type: EmailTemplateType) => {
    setSelectedTemplate(type);
    const newTemplate = getEmailTemplate(type);
    if (newTemplate) {
      setCustomSubject(newTemplate.subject(application));
      setCustomBody(newTemplate.body(application));
    }
  };

  const handleSendEmail = () => {
    const mailtoLink = `mailto:${application.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    toast.success("Opening email client...");
  };

  const handleCopyToClipboard = () => {
    const emailContent = `To: ${application.email}\nSubject: ${subject}\n\n${body}`;
    navigator.clipboard.writeText(emailContent);
    toast.success("Email content copied to clipboard!");
  };

  const resetToTemplate = () => {
    if (template) {
      setCustomSubject(template.subject(application));
      setCustomBody(template.body(application));
      toast.info("Reset to original template");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Mail className="h-6 w-6 text-primary" />
            Email Templates
          </DialogTitle>
          <DialogDescription>
            Send pre-written emails to {application.contactName} ({application.email})
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Template Selection */}
          <div>
            <Label htmlFor="template" className="text-base font-semibold">
              Select Template Type
            </Label>
            <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
              <SelectTrigger id="template" className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {EMAIL_TEMPLATES.map((tmpl) => (
                  <SelectItem key={tmpl.type} value={tmpl.type}>
                    <div>
                      <div className="font-medium">{tmpl.name}</div>
                      <div className="text-xs text-muted-foreground">{tmpl.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Vendor Information */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2 text-sm">Recipient Information</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Business:</span>{" "}
                <span className="font-medium">{application.businessName}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Contact:</span>{" "}
                <span className="font-medium">{application.contactName}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Email:</span>{" "}
                <span className="font-medium">{application.email}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Type:</span>{" "}
                <span className="font-medium">{application.vendorType}</span>
              </div>
            </div>
          </div>

          {/* Subject Line */}
          <div>
            <Label htmlFor="subject" className="text-base font-semibold">
              Email Subject
            </Label>
            <Input
              id="subject"
              value={customSubject}
              onChange={(e) => setCustomSubject(e.target.value)}
              placeholder="Email subject line"
              className="mt-2"
            />
          </div>

          {/* Email Body */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="body" className="text-base font-semibold">
                Email Body
              </Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetToTemplate}
                className="text-xs"
              >
                Reset to Template
              </Button>
            </div>
            <Textarea
              id="body"
              value={customBody}
              onChange={(e) => setCustomBody(e.target.value)}
              placeholder="Email body content"
              rows={16}
              className="mt-2 font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Customize the template above before sending. All vendor details are auto-populated.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-4 border-t gap-2">
            <Button variant="outline" onClick={handleCopyToClipboard} className="flex items-center gap-2">
              <Copy className="h-4 w-4" />
              Copy to Clipboard
            </Button>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendEmail} className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                Open in Email Client
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailTemplateModal;
