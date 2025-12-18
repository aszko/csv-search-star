import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileText, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface CsvImportProps {
  onImportComplete: () => void;
}

export const CsvImport = ({ onImportComplete }: CsvImportProps) => {
  const [isImporting, setIsImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseCSV = (text: string): Record<string, string>[] => {
    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length < 2) return [];

    // Parse header - handle the obfuscated column names
    const headerLine = lines[0];
    const headers = headerLine.split(',').map(h => h.trim());
    
    const rows: Record<string, string>[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      const values = line.split(',');
      
      if (values.length >= 9) {
        // Map to our database columns based on position
        // Format: last_name, first_name (may be split), email, address, zipcode, city, birth_date, birth_department, phone
        const row: Record<string, string> = {
          last_name: values[0]?.trim() || '',
          first_name: values[1]?.trim() || '',
          email: values[2]?.trim() || '',
          address: values[3]?.trim() || '',
          zipcode: values[4]?.trim() || '',
          city: values[5]?.trim() || '',
          birth_date: values[6]?.trim() || '',
          birth_department: values[7]?.trim() || '',
          phone: values[8]?.trim() || '',
        };
        rows.push(row);
      }
    }
    
    return rows;
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      toast.error("Veuillez sélectionner un fichier CSV");
      return;
    }

    setIsImporting(true);
    setProgress(0);

    try {
      const text = await file.text();
      const rows = parseCSV(text);

      if (rows.length === 0) {
        toast.error("Aucune donnée trouvée dans le fichier");
        setIsImporting(false);
        return;
      }

      toast.info(`Import de ${rows.length} contacts en cours...`);

      // Insert in batches of 500 for better performance
      const batchSize = 500;
      let imported = 0;

      for (let i = 0; i < rows.length; i += batchSize) {
        const batch = rows.slice(i, i + batchSize);
        
        const { error } = await supabase.from('contacts').insert(batch);
        
        if (error) {
          console.error('Insert error:', error);
          throw error;
        }

        imported += batch.length;
        setProgress(Math.round((imported / rows.length) * 100));
      }

      toast.success(`${imported} contacts importés avec succès`);
      onImportComplete();
    } catch (error: any) {
      console.error('Import error:', error);
      toast.error(`Erreur lors de l'import: ${error.message}`);
    } finally {
      setIsImporting(false);
      setProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="flex items-center gap-4">
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileSelect}
        className="hidden"
        disabled={isImporting}
      />
      
      <Button
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
        disabled={isImporting}
        className="bg-secondary/50 border-border/40"
      >
        {isImporting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Import en cours... {progress}%
          </>
        ) : (
          <>
            <Upload className="w-4 h-4 mr-2" />
            Importer CSV
          </>
        )}
      </Button>
    </div>
  );
};
