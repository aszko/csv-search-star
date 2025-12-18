import { useState, useEffect } from "react";
import { SearchBar } from "@/components/SearchBar";
import { ContactCard } from "@/components/ContactCard";
import { CsvImport } from "@/components/CsvImport";
import { TitleBar } from "@/components/TitleBar";
import { Contact } from "@/types/contact";
import { supabase } from "@/integrations/supabase/client";
import { Database, Search as SearchIcon } from "lucide-react";

const Index = () => {
  const [results, setResults] = useState<Contact[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const fetchTotalCount = async () => {
    const { count } = await supabase
      .from('contacts')
      .select('*', { count: 'exact', head: true });
    setTotalCount(count || 0);
  };

  useEffect(() => {
    fetchTotalCount();
  }, []);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setIsSearching(true);
    
    try {
      const searchTerm = `%${query}%`;
      
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .or(`last_name.ilike.${searchTerm},first_name.ilike.${searchTerm},email.ilike.${searchTerm},city.ilike.${searchTerm},phone.ilike.${searchTerm},address.ilike.${searchTerm},zipcode.ilike.${searchTerm}`)
        .limit(100);

      if (error) throw error;
      
      setResults(data || []);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsSearching(false);
      setHasSearched(true);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TitleBar />
      
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center">
              <Database className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Recherche</h1>
              <p className="text-xs text-muted-foreground">{totalCount.toLocaleString()} contacts</p>
            </div>
          </div>
          
          <CsvImport onImportComplete={fetchTotalCount} />
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Everland <span className="text-primary">dox searcher</span>
          </h1>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-6">
          <SearchBar onSearch={handleSearch} isSearching={isSearching} />
        </div>

        {/* Results */}
        {hasSearched && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">
                {results.length > 0 
                  ? `${results.length} résultat${results.length > 1 ? 's' : ''}`
                  : "Aucun résultat"
                }
              </span>
              {results.length >= 100 && (
                <span className="text-xs text-muted-foreground">max 100</span>
              )}
            </div>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {results.map((contact) => (
                  <ContactCard key={contact.id} contact={contact} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <SearchIcon className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Aucun résultat trouvé</p>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!hasSearched && (
          <div className="text-center py-16">
            <SearchIcon className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              {totalCount > 0 
                ? "Entrez votre recherche"
                : "Importez un fichier CSV pour commencer"
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
