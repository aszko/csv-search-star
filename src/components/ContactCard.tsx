import { Contact } from "@/types/contact";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";

interface ContactCardProps {
  contact: Contact;
}

export const ContactCard = ({ contact }: ContactCardProps) => {
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return null;
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleDateString('fr-FR');
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="bg-card border border-border rounded p-4 hover:border-primary/50 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-foreground">
          {contact.first_name || ''} {contact.last_name || ''}
        </h3>
        {contact.birth_department && (
          <span className="text-xs px-2 py-0.5 bg-primary/20 text-primary rounded">
            {contact.birth_department}
          </span>
        )}
      </div>
      
      <div className="space-y-2 text-sm">
        {contact.email && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="w-3.5 h-3.5 text-primary" />
            <span className="truncate">{contact.email}</span>
          </div>
        )}
        
        {contact.phone && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="w-3.5 h-3.5 text-primary" />
            <span>{contact.phone}</span>
          </div>
        )}
        
        {(contact.address || contact.city) && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span className="truncate">
              {[contact.city, contact.zipcode].filter(Boolean).join(' ')}
            </span>
          </div>
        )}
        
        {contact.birth_date && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <span>{formatDate(contact.birth_date)}</span>
          </div>
        )}
      </div>
    </div>
  );
};
