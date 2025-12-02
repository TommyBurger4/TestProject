# 🚀 GUIDE D'INITIALISATION DE PROJET

> **Étapes pour créer un nouveau projet React Native/Expo depuis zéro**

---

## 📝 Prérequis

Avant de commencer, le développeur doit avoir :

- **Node.js** 18+ installé
- **npm** ou **yarn**
- **Git** installé et configuré
- **Compte Firebase** créé
- **Expo CLI** (`npm install -g expo-cli`)
- **EAS CLI** (`npm install -g eas-cli`)

---

## 🎯 Étape 1 : Créer le Projet Expo

```bash
# Créer le projet avec TypeScript
npx create-expo-app [NOM_PROJET] --template expo-template-blank-typescript

# Se déplacer dans le dossier
cd [NOM_PROJET]

# Initialiser Git
git init
git branch -M main
```

---

## 📦 Étape 2 : Installer les Dépendances de Base

### Dépendances OBLIGATOIRES

```bash
# Navigation
npx expo install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context

# Firebase
npm install firebase

# State Management
npm install zustand

# i18n (OBLIGATOIRE)
npx expo install expo-localization
npm install i18n-js

# Animations
npx expo install react-native-reanimated react-native-gesture-handler

# Utils
npx expo install expo-constants expo-status-bar expo-splash-screen expo-font

# Storage
npx expo install @react-native-async-storage/async-storage
```

### Dépendances CONDITIONNELLES (selon onboarding)

```bash
# Si React Native Web (plateforme Web)
npx expo install react-native-web react-dom @expo/webpack-config

# Si Auth Google/Apple
npx expo install @react-native-google-signin/google-signin expo-apple-authentication

# Si RevenueCat (paiements)
npm install react-native-purchases

# Si Stockage fichiers
npx expo install expo-file-system expo-document-picker expo-image-picker

# Si Géolocalisation
npx expo install expo-location react-native-maps

# Si Recherche Algolia
npm install algoliasearch react-instantsearch-native

# Si Analytics avancés
npm install @amplitude/analytics-react-native
# ou
npm install mixpanel-react-native

# Si Camera
npx expo install expo-camera

# Si Contacts
npx expo install expo-contacts

# Si Calendrier
npx expo install expo-calendar

# Si Notifications
npx expo install expo-notifications
```

### Dev Dependencies

```bash
npm install --save-dev \
  @types/react \
  @types/jest \
  typescript \
  jest \
  @testing-library/react-native \
  @testing-library/jest-native \
  eslint \
  eslint-config-expo \
  prettier
```

---

## 🔥 Étape 3 : Configuration Firebase

### 3.1 Créer un Projet Firebase

1. Aller sur https://console.firebase.google.com
2. Cliquer "Ajouter un projet"
3. Nom du projet : `[NOM_APP]`
4. Activer Google Analytics : **Oui**
5. Choisir compte Analytics ou créer nouveau
6. Cliquer "Créer le projet"

### 3.2 Récupérer les Clés Firebase WEB

**⚠️ IMPORTANT : Pour Expo, TOUJOURS utiliser la config WEB**

```
Claude DOIT dire :
"Pour Expo, utilise la configuration WEB de Firebase.
Va sur Firebase Console > Paramètres projet > Ajouter app > Web (</>)
Copie la config JavaScript et donne-moi les valeurs."
```

**Étapes :**

1. Firebase Console > **Paramètres projet** (icône engrenage)
2. Section "Vos applications" > Cliquer sur **"Web"** (icône `</>`)
3. Surnom : `[NOM_APP] Web`
4. **NE PAS cocher** "Configurer Firebase Hosting"
5. Cliquer "Enregistrer"
6. **Copier la configuration** :

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "project-id.firebaseapp.com",
  projectId: "project-id",
  storageBucket: "project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456",
  measurementId: "G-XXXXXXXXXX"
};
```

### 3.3 Créer le fichier .env

**Créer `.env` à la racine :**

```bash
# Firebase Configuration (WEB)
EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSyC...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=project-id.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=project-id.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
EXPO_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abc123def456
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Créer `.env.example` (à commiter) :**

```bash
# Firebase Configuration (WEB)
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key_here
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

**Ajouter .env au .gitignore :**

```gitignore
# Environment variables
.env
.env.local
.env.*.local
```

### 3.4 Activer les Services Firebase

**1. Authentication (OBLIGATOIRE) :**
- Firebase Console > **Authentication** > **Sign-in method**
- Activer **Email/Password**
- Si besoin : activer **Google**, **Apple**, **Anonymous**

**2. Firestore Database (OBLIGATOIRE) :**
- Firebase Console > **Firestore Database**
- "Créer une base de données"
- Mode : **Test** (dev) ou **Production** (avec rules)
- Région : **europe-west1** (Paris)

**3. Storage (SI stockage fichiers) :**
- Firebase Console > **Storage**
- "Commencer"
- Mode : **Test** (dev) ou **Production**

**4. Cloud Functions (SI Cloud Functions) :**
- Firebase Console > **Functions**
- "Commencer"
- Plan Blaze (gratuit jusqu'à un seuil)

---

## 📁 Étape 4 : Créer la Structure de Dossiers

**Architecture par features (OBLIGATOIRE) :**

```
[NOM_PROJET]/
├── src/
│   ├── components/          # UI réutilisable
│   │   ├── ui/              # Button, Input, Card
│   │   └── forms/           # Composants formulaires
│   │
│   ├── features/            # Features métier
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── screens/
│   │   │   ├── services/
│   │   │   └── types/
│   │   │
│   │   └── [feature-name]/  # Autres features
│   │
│   ├── navigation/
│   │   ├── AppNavigator.tsx
│   │   └── types.ts
│   │
│   ├── services/            # Services globaux
│   │   ├── firebase/
│   │   │   ├── firebase.ts
│   │   │   ├── firestore.ts
│   │   │   └── storage.ts
│   │   └── api/
│   │
│   ├── hooks/               # Hooks globaux
│   ├── store/               # Zustand stores
│   ├── theme/               # Thème (colors, typography)
│   ├── utils/               # Utilitaires
│   ├── constants/           # Constantes
│   ├── types/               # Types globaux
│   ├── locales/             # Traductions i18n
│   ├── assets/              # Images, fonts
│   └── App.tsx
│
├── __tests__/               # Tests
├── docs/                    # Documentation projet
│   ├── ARCHITECTURE.md      # Architecture detaillee
│   ├── API.md               # Documentation API/services
│   ├── FEATURES.md          # Liste des features implementees
│   └── DEPLOYMENT.md        # Guide de deploiement
│
├── .env                     # Variables (NE PAS COMMITER)
├── .env.example             # Template (À COMMITER)
├── .gitignore
├── PROJECT.md               # Mémoire permanente
├── CONTRIBUTING.md
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Étape 5 : Configuration Firebase

**Créer `src/services/firebase/firebase.ts` :**

```typescript
/**
 * Fichier: firebase.ts
 *
 * Configuration et initialisation de Firebase.
 * Utilise la config WEB pour compatibilite Expo.
 */

import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Configuration Firebase depuis .env
const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: Constants.expoConfig?.extra?.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: Constants.expoConfig?.extra?.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: Constants.expoConfig?.extra?.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Constants.expoConfig?.extra?.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: Constants.expoConfig?.extra?.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: Constants.expoConfig?.extra?.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser Auth avec persistence React Native
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (error) {
  // Si deja initialise (hot reload)
  auth = getAuth(app);
}

// Initialiser les autres services
const db = getFirestore(app);
const storage = getStorage(app);

// Analytics uniquement sur web
const analytics = Platform.OS === 'web' ? getAnalytics(app) : null;

export { auth, db, storage, analytics };
```

---

## ✅ Étape 6 : Vérification

```bash
# Vérifier que tout compile
npm run type-check

# Lancer les tests de base
npm test

# Démarrer l'app
npm start
```

**Vérifier dans la console :**
- ✅ Aucune erreur Firebase
- ✅ Message "Firebase initialized successfully"

**Si erreur "auth/invalid-api-key" :**
- Vérifier que les clés .env sont correctes
- Relancer l'app après modification du .env

---

## 📝 Étape 7 : Premier Commit

```bash
# Ajouter tous les fichiers
git add .

# Créer le commit
git commit -m "chore: initial project setup

- Init Expo with TypeScript
- Install base dependencies
- Configure Firebase
- Setup project structure
- Add .env configuration

🤖 Generated with Claude Code"

# Créer le repository sur GitHub (optionnel)
gh repo create [NOM_PROJET] --private
git remote add origin [GIT_URL]
git push -u origin main
```

---

## 🎉 Projet Initialisé !

Le projet est maintenant prêt pour le développement.

**Fichiers générés :**
- ✅ Structure de dossiers complète (src/, docs/, __tests__/)
- ✅ Configuration Firebase
- ✅ .env + .env.example
- ✅ package.json avec toutes les dépendances
- ✅ tsconfig.json
- ✅ .gitignore
- ✅ README.md
- ✅ CONTRIBUTING.md
- ✅ PROJECT.md
- ✅ docs/ (ARCHITECTURE.md, API.md, FEATURES.md, DEPLOYMENT.md)

**Prochaines étapes :**
1. Développer les features selon le TodoList
2. Mettre à jour PROJECT.md régulièrement
3. Suivre les conventions de commit
4. Créer des Pull Requests pour chaque feature

---

## 🐛 Depannage

### Probleme : "Metro Bundler ne demarre pas"

```bash
# Nettoyer le cache
npm start -- --reset-cache
```

### Probleme : "Build Android echoue"

```bash
# Nettoyer le build
cd android
./gradlew clean
cd ..

# Rebuild
npm run android
```

### Probleme : "Pods installation echoue" (iOS)

```bash
cd ios
pod deintegrate
pod install
cd ..
```

### Probleme : "Module not found"

```bash
# Reinstaller les dependances
rm -rf node_modules
npm install

# Si probleme persiste
rm -rf node_modules package-lock.json
npm install
```

### Probleme : "Port deja utilise"

```bash
# Trouver le processus sur le port 8081
lsof -i :8081

# Tuer le processus
kill -9 [PID]
```

### Probleme : "auth/invalid-api-key" (Firebase)

```bash
# Verifier que les cles .env sont correctes
# Verifier le format EXPO_PUBLIC_*
# Relancer l'app apres modification du .env
npm start
```

---

## 📱 Tester sur un Appareil Physique

### Android

1. Activer "Options pour les developpeurs" sur votre telephone
2. Activer "Debogage USB"
3. Connecter via USB
4. Verifier : `adb devices`
5. Lancer : `npm run android`

### iOS

1. Connecter l'iPhone/iPad via USB
2. Ouvrir `ios/[NOM_PROJET].xcworkspace` dans Xcode
3. Selectionner votre appareil
4. Configurer le signing (certificat developpeur)
5. Appuyer sur Run

---

🤖 _Guide destiné à Claude Code - Initialisation standardisée de projets Expo_
