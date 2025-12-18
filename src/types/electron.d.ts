interface ElectronAPI {
  minimize: () => void;
  maximize: () => void;
  close: () => void;
  isElectron: boolean;
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}

export {};
