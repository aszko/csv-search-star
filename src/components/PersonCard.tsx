import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Person } from "@/data/testData";
import { Mail, Phone, MapPin, Calendar, CreditCard, User } from "lucide-react";

interface PersonCardProps {
  person: Person;
}

export const PersonCard = ({ person }: PersonCardProps) => {
  return (
    <Card className="bg-gradient-card shadow-card border-border/20 hover:shadow-glow transition-smooth hover:scale-[1.02]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            {person.Prénom} {person.Nom}
          </CardTitle>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            ID: {person["Département de Naissance"]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground truncate">{person.Email}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">{person.Téléphone}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">
              {person.Adresse}, {person.Ville} {person["Code Postal"]}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">
              {new Date(person["Date de Naissance"]).toLocaleDateString('fr-FR')}
            </span>
          </div>
        </div>
        
        {person.IBAN !== "Non renseigné" && (
          <div className="mt-4 p-3 bg-secondary/30 rounded-md">
            <div className="flex items-center gap-2 text-sm">
              <CreditCard className="w-4 h-4 text-primary" />
              <span className="font-mono text-xs text-muted-foreground">{person.IBAN}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};