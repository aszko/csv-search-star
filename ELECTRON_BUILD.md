# Instructions pour compiler en .exe

## 1. Exporter le projet

1. Clique sur **GitHub** en haut à droite de Lovable
2. Exporte vers ton compte GitHub
3. Clone le repo sur ton PC :
```bash
git clone https://github.com/ton-username/ton-repo.git
cd ton-repo
```

## 2. Installer les dépendances

```bash
npm install
```

Puis installe Electron et les outils de build :
```bash
npm install --save-dev electron electron-builder concurrently wait-on
```

## 3. Modifier package.json

Ajoute ces lignes dans ton `package.json` :

```json
{
  "main": "main.js",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "electron": "electron .",
    "electron:dev": "concurrently \"vite\" \"wait-on http://localhost:5173 && electron .\"",
    "electron:build": "vite build && electron-builder --config electron-builder.json"
  }
}
```

## 4. Compiler l'application

### Mode développement (pour tester) :
```bash
npm run electron:dev
```

### Créer le .exe final :
```bash
npm run electron:build
```

Le fichier `.exe` sera dans le dossier `release/`.

## Structure des fichiers

```
├── main.js              # Script principal Electron
├── preload.js           # Bridge entre Node.js et React
├── electron-builder.json # Configuration du build
├── dist/                # Build React (généré par vite build)
└── release/             # .exe final (généré par electron-builder)
```

## Notes importantes

- Le .exe généré sera dans `release/`
- L'installeur fait ~150-200MB (normal pour Electron)
- Pour un .exe portable, modifie `electron-builder.json` target en `"portable"`
