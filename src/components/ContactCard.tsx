import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Contact } from "@/types/contact";
import { Mail, Phone, MapPin, Calendar, User } from "lucide-react";

interface ContactCardProps {
  contact: Contact;
}

export const ContactCard = ({ contact }: ContactCardProps) => {
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "Non renseigné";
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleDateString('fr-FR');
    } catch {
      return dateStr;
    }
  };

  return (
    <Card className="bg-gradient-card shadow-card border-border/20 hover:shadow-glow transition-smooth hover:scale-[1.02]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            {contact.first_name || ''} {contact.last_name || ''}
          </CardTitle>
          {contact.birth_department && (
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              Dép: {contact.birth_department}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {contact.email && (
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-muted-foreground truncate">{contact.email}</span>
            </div>
          )}
          
          {contact.phone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-muted-foreground">{contact.phone}</span>
            </div>
          )}
          
          {(contact.address || contact.city) && (
            <div className="flex items-center gap-2 text-sm col-span-full">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-muted-foreground">
                {[contact.address, contact.city, contact.zipcode].filter(Boolean).join(', ')}
              </span>
            </div>
          )}
          
          {contact.birth_date && (
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-muted-foreground">{formatDate(contact.birth_date)}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
