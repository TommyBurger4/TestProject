# 🔧 Guide de Depannage - ClubSportFrance

Ce document liste les erreurs courantes rencontrees lors de l'initialisation et du developpement, avec leurs solutions.

---

## 📱 Erreurs au Demarrage (npm start)

### ❌ Erreur 1: "Failed to resolve plugin for module 'expo-router'"

**Symptome:**
```
PluginError: Failed to resolve plugin for module "expo-router"
```

**Cause:**
Le plugin `'expo-router'` a ete ajoute dans `app.config.js` alors que le projet utilise React Navigation.

**Solution:**
1. Ouvrir `app.config.js`
2. Retirer `'expo-router'` du tableau `plugins`
3. Retirer la section `experiments: { typedRoutes: true }` si presente

---

### ❌ Erreur 2: "static and server rendering requires the expo-router package"

**Symptome:**
```
CommandError: static and server rendering requires the expo-router package
to be installed in your project.
```

**Cause:**
`web.output: 'static'` necessite expo-router. React Navigation utilise `'single'`.

**Solution:**
Dans `app.config.js`, changer:
```javascript
web: {
  bundler: 'metro',
  output: 'single', // PAS 'static'
  favicon: './assets/images/favicon.png'
}
```

**Regle:**
- `output: 'static'` → Uniquement avec expo-router
- `output: 'single'` → Avec React Navigation

---

### ❌ Erreur 3: "Cannot find module 'react-native-worklets/plugin'"

**Symptome:**
```
ERROR: Cannot find module 'react-native-worklets/plugin'
Require stack: .../react-native-reanimated/plugin/index.js
```

**Cause:**
`react-native-reanimated` est installe mais necessite une configuration Babel complexe qui cree des conflits.

**Solution:**
Desinstaller temporairement:
```bash
npm uninstall react-native-reanimated --legacy-peer-deps
```

**Quand reinstaller:**
Uniquement quand vous devez coder des animations complexes (gestes, transitions avancees).

**Configuration requise:**
Creer `babel.config.js`:
```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
  };
};
```

---

### ❌ Erreur 4: "Unable to resolve asset './assets/images/icon.png'"

**Symptome:**
```
Unable to resolve asset "./assets/images/icon.png" from "icon"
in your app.json or app.config.js
```

**Cause:**
Les images sont directement dans `assets/` au lieu de `assets/images/`.

**Solution:**
```bash
# Deplacer les images
mv assets/*.png assets/images/

# Creer les assets manquants
cp assets/images/icon.png assets/images/notification-icon.png
cp assets/images/splash-icon.png assets/images/splash.png

# Creer placeholder son
touch assets/sounds/notification.wav
```

**Structure correcte:**
```
assets/
├── images/
│   ├── icon.png
│   ├── adaptive-icon.png
│   ├── splash.png
│   ├── notification-icon.png
│   └── favicon.png
└── sounds/
    └── notification.wav
```

---

## 📦 Erreurs d'Installation (npm install)

### ❌ Erreur 5: "ERESOLVE could not resolve" (Peer Dependencies)

**Symptome:**
```
npm error ERESOLVE could not resolve
npm error Conflicting peer dependency
```

**Cause:**
Conflits de versions entre dependances (ex: React 19.1 vs 19.2).

**Solution:**
TOUJOURS utiliser `--legacy-peer-deps`:
```bash
npm install --legacy-peer-deps
npm install <package> --legacy-peer-deps
npm uninstall <package> --legacy-peer-deps
```

---

### ❌ Erreur 6: "Cannot find module 'babel-preset-expo'"

**Symptome:**
```
ERROR: Cannot find module 'babel-preset-expo'
```

**Cause:**
Un `babel.config.js` a ete cree manuellement mais `babel-preset-expo` n'est pas installe.

**Solution:**
Supprimer le fichier:
```bash
rm babel.config.js
```

Expo genere automatiquement sa configuration Babel. Ne creer `babel.config.js` que si absolument necessaire (plugins specifiques).

---

## 🔥 Erreurs Firebase

### ❌ Erreur 7: Firebase Config WEB vs iOS/Android

**Symptome:**
Firebase ne se connecte pas correctement.

**Cause:**
Utilisation de la config iOS ou Android au lieu de WEB.

**Solution:**
TOUJOURS utiliser la configuration **WEB** dans Firebase Console:
- Firebase Console → Project Settings → General
- Section "Your apps" → Web app (icon `</>`
- PAS iOS ou Android

**Dans `.env`:**
```bash
EXPO_PUBLIC_FIREBASE_API_KEY=...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=...
EXPO_PUBLIC_FIREBASE_PROJECT_ID=...
# ... (7 credentials WEB)
```

---

## 🌐 Erreurs React Native Web

### ❌ Erreur 8: Module not found (Web only)

**Cause:**
Certains packages React Native ne fonctionnent pas sur web.

**Solution:**
Utiliser des conditions de plateforme:
```typescript
import { Platform } from 'react-native';

if (Platform.OS === 'web') {
  // Alternative web
} else {
  // Code React Native
}
```

---

## 🔄 Cache et Nettoyage

### Problemes persistants apres corrections

**Solution:**
Nettoyer tous les caches:
```bash
# Nettoyer cache npm
npm cache clean --force

# Nettoyer cache Metro
npm start -- --clear

# Supprimer node_modules et reinstaller
rm -rf node_modules
npm install --legacy-peer-deps

# Supprimer cache Expo (iOS/Android)
rm -rf .expo
```

---

## ⚠️ Bonnes Pratiques pour Eviter les Erreurs

### ✅ A FAIRE

1. **Toujours utiliser `--legacy-peer-deps`**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Verifier la structure assets/ avant npm start**
   ```
   assets/images/  → Toutes les images
   assets/sounds/  → Tous les sons
   ```

3. **Ne PAS creer babel.config.js manuellement**
   Laisser Expo gerer la config Babel

4. **Installer packages uniquement quand necessaire**
   - Ne PAS installer `react-native-reanimated` au debut
   - L'ajouter uniquement pour animations complexes

5. **Utiliser config Firebase WEB**
   Jamais iOS/Android pour Expo

6. **Tester npm start apres chaque modification majeure**
   Detecter les erreurs tot

### ❌ NE PAS FAIRE

1. **Ne JAMAIS melanger expo-router et React Navigation**
   Choisir un seul systeme de navigation

2. **Ne PAS ignorer les warnings npm**
   Les peer dependencies conflicts peuvent causer des crashes

3. **Ne PAS copier babel.config.js d'autres projets**
   Chaque projet Expo a ses propres besoins

4. **Ne PAS pusher .env sur GitHub**
   Toujours dans `.gitignore`

---

## 🆘 Checklist de Debug

Quand `npm start` echoue:

- [ ] Verifier `app.config.js` (pas d'expo-router si React Navigation)
- [ ] Verifier `web.output: 'single'` (pas 'static')
- [ ] Verifier structure `assets/images/` et `assets/sounds/`
- [ ] Supprimer `babel.config.js` si present
- [ ] Nettoyer cache: `npm start -- --clear`
- [ ] Reinstaller: `rm -rf node_modules && npm install --legacy-peer-deps`
- [ ] Verifier `.env` (7 credentials Firebase WEB)

---

## 📞 Ressources

- **Documentation Expo:** https://docs.expo.dev
- **React Navigation:** https://reactnavigation.org
- **Firebase pour Expo:** https://docs.expo.dev/guides/using-firebase/

---

🤖 _Genere avec [Claude Code](https://claude.com/claude-code)_

**Derniere mise a jour:** 03/11/2025
