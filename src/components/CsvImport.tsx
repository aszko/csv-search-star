import { useState, useRef } from "react";
import { Upload, Loader2 } from "lucide-react";
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

    const rows: Record<string, string>[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      const values = line.split(',');
      
      if (values.length >= 9) {
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
      toast.error("Fichier CSV requis");
      return;
    }

    setIsImporting(true);
    setProgress(0);

    try {
      const text = await file.text();
      const rows = parseCSV(text);

      if (rows.length === 0) {
        toast.error("Aucune donnée trouvée");
        setIsImporting(false);
        return;
      }

      toast.info(`Import de ${rows.length} contacts...`);

      const batchSize = 500;
      let imported = 0;

      for (let i = 0; i < rows.length; i += batchSize) {
        const batch = rows.slice(i, i + batchSize);
        
        const { error } = await supabase.from('contacts').insert(batch);
        
        if (error) throw error;

        imported += batch.length;
        setProgress(Math.round((imported / rows.length) * 100));
      }

      toast.success(`${imported} contacts importés`);
      onImportComplete();
    } catch (error: any) {
      console.error('Import error:', error);
      toast.error(`Erreur: ${error.message}`);
    } finally {
      setIsImporting(false);
      setProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileSelect}
        className="hidden"
        disabled={isImporting}
      />
      
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={isImporting}
        className="h-10 px-4 bg-card border border-border rounded text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors flex items-center gap-2 disabled:opacity-50"
      >
        {isImporting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
            <span>{progress}%</span>
          </>
        ) : (
          <>
            <Upload className="w-4 h-4" />
            <span>Import CSV</span>
          </>
        )}
      </button>
    </>
  );
};
