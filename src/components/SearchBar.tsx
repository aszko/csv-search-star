import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isSearching?: boolean;
}

export const SearchBar = ({ onSearch, isSearching = false }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative group">
          <Input
            type="text"
            placeholder="Rechercher par nom, prénom, email, ville, téléphone..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 pr-20 py-6 text-lg bg-secondary/50 border-border/30 rounded-xl 
                     focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-smooth
                     group-hover:shadow-glow"
            disabled={isSearching}
          />
          
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="absolute right-16 top-1/2 transform -translate-y-1/2 p-1 h-8 w-8 hover:bg-destructive/20 hover:text-destructive"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
          
          <Button
            type="submit"
            disabled={!query.trim() || isSearching}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 
                     hover:shadow-elegant disabled:opacity-50 disabled:cursor-not-allowed"
            variant="gradient"
          >
            {isSearching ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Rechercher"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};