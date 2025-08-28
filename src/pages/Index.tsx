import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { PersonCard } from "@/components/PersonCard";
import { testPersons, type Person } from "@/data/testData";
import { Database, Users, Search as SearchIcon } from "lucide-react";

const Index = () => {
  const [results, setResults] = useState<Person[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setIsSearching(true);
    
    // Simulate API delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const searchTerm = query.toLowerCase();
    const filteredResults = testPersons.filter(person => {
      const searchableText = `${person.Nom} ${person.Prénom} ${person.Email} ${person.Adresse} ${person.Ville} ${person.Téléphone} ${person["Code Postal"]} ${person["Date de Naissance"]} ${person["Département de Naissance"]} ${person.IBAN}`.toLowerCase();
      return searchableText.includes(searchTerm);
    });
    
    setResults(filteredResults);
    setIsSearching(false);
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-primary rounded-2xl shadow-elegant">
              <Database className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">
            Recherche de Données
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Effectuez une recherche complète dans la base de données. 
            Recherchez par nom, prénom, email, ville, téléphone ou toute autre information.
          </p>
          
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-12">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span>{testPersons.length} personnes</span>
            </div>
            <div className="flex items-center gap-2">
              <SearchIcon className="w-4 h-4 text-primary" />
              <span>Recherche instantanée</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} isSearching={isSearching} />
      </div>

      {/* Results Section */}
      {hasSearched && (
        <div className="container mx-auto px-4 pb-16">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">
                {results.length > 0 
                  ? `${results.length} résultat${results.length > 1 ? 's' : ''} trouvé${results.length > 1 ? 's' : ''}`
                  : "Aucun résultat trouvé"
                }
              </h2>
              
              {results.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  Cliquez sur une carte pour voir les détails
                </div>
              )}
            </div>
          </div>

          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((person, index) => (
                <div key={index} className="animate-in fade-in slide-in-from-bottom-4 duration-300"
                     style={{ animationDelay: `${index * 100}ms` }}>
                  <PersonCard person={person} />
                </div>
              ))}
            </div>
          ) : hasSearched && !isSearching && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <SearchIcon className="w-12 h-12 text-muted-foreground" />
              </div>
              
              <h3 className="text-xl font-semibold mb-2">Aucun résultat</h3>
              <p className="text-muted-foreground">
                Essayez avec d'autres termes de recherche ou vérifiez l'orthographe.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Initial State */}
      {!hasSearched && !isSearching && (
        <div className="container mx-auto px-4 pb-16">
          <div className="text-center py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-md mx-auto mb-8">
              {["Nom", "Email", "Ville", "Téléphone"].map((type) => (
                <div key={type} className="p-4 bg-secondary/30 rounded-lg border border-border/20">
                  <div className="text-sm font-medium">{type}</div>
                </div>
              ))}
            </div>
            
            <p className="text-muted-foreground">
              Utilisez la barre de recherche ci-dessus pour commencer votre recherche
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;