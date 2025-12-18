import { Minus, Square, X } from "lucide-react";

export const TitleBar = () => {
  const isElectron = typeof window !== 'undefined' && window.electronAPI?.isElectron;

  const handleMinimize = () => {
    if (isElectron) {
      window.electronAPI?.minimize();
    }
  };

  const handleMaximize = () => {
    if (isElectron) {
      window.electronAPI?.maximize();
    }
  };

  const handleClose = () => {
    if (isElectron) {
      window.electronAPI?.close();
    }
  };

  return (
    <div 
      className="h-8 bg-card border-b border-border flex items-center justify-between px-3 select-none"
      style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
    >
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-primary" />
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Everland Dox Searcher
        </span>
      </div>
      
      <div className="flex items-center" style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}>
        <button 
          onClick={handleMinimize}
          className="w-10 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <button 
          onClick={handleMaximize}
          className="w-10 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          <Square className="w-3 h-3" />
        </button>
        <button 
          onClick={handleClose}
          className="w-10 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-destructive transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
