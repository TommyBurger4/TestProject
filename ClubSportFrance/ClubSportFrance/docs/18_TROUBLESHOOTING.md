# 🔧 Guide 18 - Troubleshooting React Native/Expo

> **Guide universel des erreurs courantes lors de l'initialisation et du developpement de projets React Native/Expo**

---

## 🎯 Objectif

Ce guide documente **toutes les erreurs recurrentes** rencontrees lors de l'initialisation de projets React Native/Expo, avec leurs solutions testees et validees.

**Utilisation:**
- Consulter AVANT d'initialiser un nouveau projet
- Utiliser comme reference lors du debug
- Copier dans le projet comme `docs/TROUBLESHOOTING.md`

---

## 📱 Erreurs au Demarrage (npm start)

### ❌ Erreur 1: "Failed to resolve plugin for module 'expo-router'"

**Symptome:**
```
PluginError: Failed to resolve plugin for module "expo-router"
relative to "/path/to/project"
```

**Cause:**
Le plugin `'expo-router'` a ete ajoute dans `app.config.js` alors que le projet utilise **React Navigation**.

**Solution:**
1. Ouvrir `app.config.js`
2. Retirer `'expo-router'` du tableau `plugins`
3. Retirer la section `experiments: { typedRoutes: true }` si presente

**Prevention:**
Ne JAMAIS ajouter `'expo-router'` dans les plugins si le projet utilise React Navigation.

---

### ❌ Erreur 2: "static and server rendering requires the expo-router package"

**Symptome:**
```
CommandError: static and server rendering requires the expo-router package
to be installed in your project. Either install the expo-router package
or change 'web.output' to 'single' in your app.json.
```

**Cause:**
`web.output: 'static'` necessite expo-router. React Navigation necessite `'single'`.

**Solution:**
Dans `app.config.js`, ligne ~40-44:
```javascript
web: {
  bundler: 'metro',
  output: 'single', // ← IMPORTANT: PAS 'static'
  favicon: './assets/images/favicon.png'
}
```

**Regle absolue:**
- **expo-router** → `output: 'static'`
- **React Navigation** → `output: 'single'`

**Prevention:**
Toujours verifier le systeme de navigation utilise avant de configurer `web.output`.

---

### ❌ Erreur 3: "Cannot find module 'react-native-worklets/plugin'"

**Symptome:**
```
ERROR: [BABEL] Cannot find module 'react-native-worklets/plugin'
Require stack:
- .../react-native-reanimated/plugin/index.js
```

**Cause:**
`react-native-reanimated` est installe mais necessite:
1. Le package `react-native-worklets-core`
2. Une configuration Babel complexe
3. Cree des conflits de dependances au debut du projet

**Solution immediate:**
Desinstaller temporairement:
```bash
npm uninstall react-native-reanimated --legacy-peer-deps
```

**Solution definitive (quand necessaire):**
1. Installer les dependances:
```bash
npm install react-native-reanimated react-native-worklets-core --legacy-peer-deps
```

2. Creer `babel.config.js`:
```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin', // ← Doit etre en DERNIER
    ],
  };
};
```

3. Nettoyer cache:
```bash
npm start -- --clear
```

**Prevention:**
- **NE PAS installer `react-native-reanimated` au debut du projet**
- L'ajouter uniquement quand on code des animations complexes (gestes, transitions)
- React Navigation fonctionne sans reanimated pour les transitions de base

---

### ❌ Erreur 4: "Unable to resolve asset './assets/images/icon.png'"

**Symptome:**
```
Unable to resolve asset "./assets/images/icon.png" from "icon"
in your app.json or app.config.js
```

**Cause:**
Les images generees par `create-expo-app` sont directement dans `assets/`, mais `app.config.js` reference `./assets/images/icon.png`.

**Solution:**
```bash
# Creer les dossiers
mkdir -p assets/images assets/sounds

# Deplacer les images
mv assets/*.png assets/images/

# Creer les assets manquants (si necessaire)
cp assets/images/icon.png assets/images/notification-icon.png
cp assets/images/splash-icon.png assets/images/splash.png

# Creer placeholder son (fichier vide temporaire)
touch assets/sounds/notification.wav
```

**Structure finale:**
```
assets/
├── images/
│   ├── icon.png              # Icone principale app
│   ├── adaptive-icon.png     # Icone Android adaptive
│   ├── splash.png            # Splash screen
│   ├── notification-icon.png # Icone notifications (copie de icon.png)
│   └── favicon.png           # Favicon web
└── sounds/
    └── notification.wav      # Son notification (placeholder vide OK)
```

**Prevention:**
Apres `create-expo-app`, TOUJOURS reorganiser les assets avant `npm start`.

---

## 📦 Erreurs d'Installation (npm install)

### ❌ Erreur 5: "ERESOLVE could not resolve" (Peer Dependencies)

**Symptome:**
```
npm error ERESOLVE could not resolve
npm error Conflicting peer dependency
npm error Could not resolve dependency:
npm error peer react@"^19.2.0" from react-test-renderer@19.2.0
```

**Cause:**
Conflits de versions entre dependances (ex: React 19.1 vs 19.2, AsyncStorage 2.2 vs 1.18).

**Solution:**
TOUJOURS utiliser `--legacy-peer-deps` pour TOUS les `npm install`:
```bash
# Installation initiale
npm install --legacy-peer-deps

# Ajouter package
npm install <package> --legacy-peer-deps

# Desinstaller package
npm uninstall <package> --legacy-peer-deps
```

**Prevention:**
Creer un alias dans `.bashrc` ou `.zshrc`:
```bash
alias npmi="npm install --legacy-peer-deps"
```

**Pourquoi c'est necessaire:**
React Native/Expo evolue rapidement et les packages ne sont pas toujours synchronises sur les memes versions de React.

---

### ❌ Erreur 6: "Cannot find module 'babel-preset-expo'"

**Symptome:**
```
ERROR: Cannot find module 'babel-preset-expo'
Require stack:
- .../babel/core/lib/config/files/plugins.js
```

**Cause:**
Un `babel.config.js` a ete cree manuellement mais `babel-preset-expo` n'est pas installe comme dependance.

**Solution:**
**Option 1 (recommandee):** Supprimer le fichier
```bash
rm babel.config.js
```

Expo genere automatiquement sa configuration Babel interne.

**Option 2:** Installer babel-preset-expo
```bash
npm install --save-dev babel-preset-expo --legacy-peer-deps
```

**Prevention:**
- **NE PAS creer `babel.config.js` au debut du projet**
- Le creer uniquement si besoin d'un plugin specifique (ex: reanimated)
- Laisser Expo gerer Babel automatiquement

---

## 🔥 Erreurs Firebase

### ❌ Erreur 7: Firebase Config WEB vs iOS/Android

**Symptome:**
- Firebase ne se connecte pas
- Erreurs d'authentification etranges
- Firestore inaccessible

**Cause:**
Utilisation de la config **iOS** ou **Android** au lieu de **WEB** dans Expo.

**Solution:**
Dans Firebase Console:
1. **Project Settings** → **General**
2. Section **"Your apps"**
3. Cliquer sur l'icone **WEB** (`</>`) - PAS iOS ou Android
4. Copier les 7 credentials

**Dans `.env`:**
```bash
EXPO_PUBLIC_FIREBASE_API_KEY=AIza...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
EXPO_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=G-ABC123XYZ
```

**Regle absolue:**
- **Expo** → Config **WEB** (meme pour iOS/Android natifs)
- **Native pur** (sans Expo) → Config iOS/Android

**Prevention:**
Documenter dans `guides/04_SETUP.md` section 3.2 : "TOUJOURS config WEB".

---

## 🌐 Erreurs React Native Web

### ❌ Erreur 8: "Module not found" (uniquement sur Web)

**Symptome:**
L'app fonctionne sur iOS/Android mais crash sur web avec `Module not found`.

**Cause:**
Certains packages React Native natifs ne fonctionnent pas sur web (ex: CameraRoll, Bluetooth).

**Solution:**
Utiliser des conditions de plateforme:
```typescript
import { Platform } from 'react-native';

if (Platform.OS === 'web') {
  // Alternative web ou desactiver feature
  console.log('Feature non disponible sur web');
} else {
  // Code React Native
  import('./nativeModule');
}
```

**Prevention:**
Toujours tester sur les 3 plateformes (iOS, Android, Web) regulierement.

---

## 🔄 Cache et Nettoyage

### Problemes persistants apres corrections

**Symptome:**
Les corrections ne resolvent pas l'erreur, meme apres restart.

**Solution - Nettoyage complet:**
```bash
# 1. Nettoyer cache npm
npm cache clean --force

# 2. Nettoyer cache Metro (bundler Expo)
npm start -- --clear

# 3. Supprimer tous les caches Expo
rm -rf .expo

# 4. Reinstaller node_modules
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# 5. Redemarrer avec cache vide
npm start -- --clear
```

**Prevention:**
Faire un `npm start -- --clear` apres chaque modification majeure de config.

---

## ⚠️ Bonnes Pratiques pour Eviter les Erreurs

### ✅ A FAIRE

**1. Toujours utiliser `--legacy-peer-deps`**
```bash
npm install --legacy-peer-deps
npm install <package> --legacy-peer-deps
```

**2. Verifier la structure assets/ avant npm start**
```
assets/
├── images/  → Toutes les images (.png)
└── sounds/  → Tous les sons (.wav)
```

**3. Ne PAS creer babel.config.js manuellement**
Laisser Expo gerer la config Babel automatiquement.

**4. Installer packages uniquement quand necessaire**
- Ne PAS installer `react-native-reanimated` au debut
- L'ajouter uniquement pour animations complexes

**5. Utiliser config Firebase WEB pour Expo**
Jamais iOS/Android, meme pour builds natifs.

**6. Tester npm start apres chaque modification majeure**
Detecter les erreurs tot avant de continuer le dev.

**7. Documenter les packages installes**
Ajouter un commentaire dans `package.json` ou `PROJECT.md` expliquant pourquoi.

### ❌ NE PAS FAIRE

**1. Ne JAMAIS melanger expo-router et React Navigation**
Choisir un seul systeme de navigation des le debut.

**2. Ne PAS ignorer les warnings npm**
Les peer dependencies conflicts peuvent causer des crashes silencieux.

**3. Ne PAS copier babel.config.js d'autres projets**
Chaque projet Expo a ses propres besoins de plugins.

**4. Ne PAS pusher `.env` sur GitHub**
Toujours dans `.gitignore`. Creer `.env.example` avec valeurs factices.

**5. Ne PAS installer tous les packages "au cas ou"**
Installer uniquement quand la feature est developpee.

---

## 🆘 Checklist de Debug (Ordre de Verification)

Quand `npm start` echoue, verifier dans cet ordre:

### Phase 1: Configuration
- [ ] `app.config.js` : Pas de `'expo-router'` si React Navigation
- [ ] `app.config.js` : `web.output: 'single'` (pas `'static'`)
- [ ] `babel.config.js` : Supprimer si present (sauf si vraiment necessaire)

### Phase 2: Assets
- [ ] Structure: `assets/images/*.png` et `assets/sounds/*.wav`
- [ ] Tous les fichiers references dans `app.config.js` existent

### Phase 3: Dependencies
- [ ] Packages installes avec `--legacy-peer-deps`
- [ ] `react-native-reanimated` desinstalle (sauf si animations complexes)

### Phase 4: Firebase
- [ ] `.env` : 7 credentials Firebase WEB (pas iOS/Android)
- [ ] `.env` : Pas de guillemets autour des valeurs

### Phase 5: Cache
- [ ] Nettoyer: `npm start -- --clear`
- [ ] Si persiste: `rm -rf node_modules && npm install --legacy-peer-deps`
- [ ] Si toujours persiste: `rm -rf .expo && npm start -- --clear`

---

## 📊 Tableau Recapitulatif Erreurs

| Erreur | Cause | Solution Rapide |
|--------|-------|-----------------|
| Failed to resolve expo-router | Plugin expo-router avec React Nav | Retirer du `plugins[]` |
| static rendering requires expo-router | `web.output: 'static'` avec React Nav | Changer a `'single'` |
| Cannot find react-native-worklets | react-native-reanimated installe | Desinstaller temporairement |
| Unable to resolve asset | Images dans `assets/` au lieu de `assets/images/` | `mv assets/*.png assets/images/` |
| ERESOLVE peer dependencies | Conflits versions React/packages | `npm install --legacy-peer-deps` |
| Cannot find babel-preset-expo | babel.config.js cree manuellement | Supprimer `babel.config.js` |
| Firebase ne connecte pas | Config iOS/Android au lieu de WEB | Utiliser config WEB |

---

## 🔗 Ressources

**Documentation officielle:**
- Expo: https://docs.expo.dev
- React Navigation: https://reactnavigation.org
- Firebase pour Expo: https://docs.expo.dev/guides/using-firebase/

**Guides internes lies:**
- `02_MASTER_RULES.md` : Regles absolues
- `04_SETUP.md` : Installation et configuration
- `12_SECURITY.md` : Firebase et securite

---

## 📝 Notes pour Claude

**Quand utiliser ce guide:**
- AVANT d'initialiser un nouveau projet (lire prevention)
- PENDANT le debug (consulter solutions)
- APRES avoir rencontre une nouvelle erreur (documenter)

**Maintenir a jour:**
- Ajouter TOUTES les nouvelles erreurs rencontrees
- Documenter la cause exacte et la solution validee
- Inclure la prevention pour eviter l'erreur

**Copier dans projet:**
Creer `docs/TROUBLESHOOTING.md` dans chaque nouveau projet avec ce contenu.

---

🤖 _Guide universel pour Claude Code - React Native/Expo Troubleshooting_

**Derniere mise a jour:** 03/11/2025
**Version:** 1.0.0
