# 🚀 GUIDE D'INITIALISATION DE PROJET

> **Étapes pour créer un nouveau projet Next.js depuis zéro**

---

## 📝 Prérequis

Avant de commencer, le développeur doit avoir :

- **Node.js** 18+ installé
- **npm** ou **yarn** ou **pnpm**
- **Git** installé et configuré
- **Compte Firebase** créé
- **Compte Vercel** (recommandé pour déploiement)

---

## 🎯 Étape 1 : Créer le Projet Next.js

```bash
# Créer le projet avec TypeScript et Tailwind CSS
npx create-next-app@latest [NOM_PROJET] --typescript --tailwind --app --eslint --src-dir --import-alias "@/*"

# Options expliquées:
# --typescript : Active TypeScript
# --tailwind : Installe Tailwind CSS
# --app : Utilise App Router (Next.js 13+)
# --eslint : Configure ESLint
# --src-dir : Crée un dossier src/
# --import-alias "@/*" : Alias pour imports (ex: @/components)

# Se déplacer dans le dossier
cd [NOM_PROJET]

# Initialiser Git (si pas fait automatiquement)
git init
git branch -M main
```

---

## 📦 Étape 2 : Installer les Dépendances de Base

### Dépendances OBLIGATOIRES

```bash
# Firebase
npm install firebase

# State Management
npm install zustand

# i18n (OBLIGATOIRE)
npm install next-intl

# Utilitaires
npm install clsx tailwind-merge
npm install class-variance-authority # Pour variants de composants

# Dates (si nécessaire)
npm install date-fns
```

### Dépendances CONDITIONNELLES (selon onboarding)

```bash
# Si Auth Google/Apple
# Note: Google/Apple Sign-In se fait via Firebase Auth Web SDK

# Si Stripe (paiements)
npm install @stripe/stripe-js stripe

# Si Stockage fichiers/images
# Firebase Storage est suffisant, mais si besoin de manipulation d'images:
npm install sharp # Sera utilisé par Next.js automatiquement

# Si Géolocalisation
# Google Maps JavaScript API via script tag ou:
npm install @googlemaps/js-api-loader

# Si Recherche Algolia
npm install algoliasearch react-instantsearch

# Si Analytics avancés
npm install @amplitude/analytics-browser
# ou
npm install mixpanel-browser

# Si Forms complexes
npm install react-hook-form
npm install zod # Pour validation
npm install @hookform/resolvers

# Si Notifications navigateur (Web Push)
# Utiliser l'API Web Push native du navigateur

# Si Charts/Graphiques
npm install recharts
# ou
npm install chart.js react-chartjs-2
```

### Dev Dependencies

```bash
npm install --save-dev \
  @types/react \
  @types/node \
  @testing-library/react \
  @testing-library/jest-dom \
  @playwright/test \
  prettier \
  prettier-plugin-tailwindcss
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

**⚠️ IMPORTANT : Pour Next.js, TOUJOURS utiliser la config WEB**

```
Claude DOIT dire :
"Pour Next.js, utilise la configuration WEB de Firebase.
Va sur Firebase Console > Paramètres projet > Ajouter app > Web (</>)
Copie la config JavaScript et donne-moi les valeurs."
```

**Étapes :**

1. Firebase Console > **Paramètres projet** (icône engrenage)
2. Section "Vos applications" > Cliquer sur **"Web"** (icône `</>`)
3. Surnom : `[NOM_APP] Web`
4. **NE PAS cocher** "Configurer Firebase Hosting" (sauf si déploiement sur Firebase Hosting)
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

### 3.3 Créer le fichier .env.local

**Créer `.env.local` à la racine :**

```bash
# Firebase Configuration (WEB)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abc123def456
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Créer `.env.example` (à commiter) :**

```bash
# Firebase Configuration (WEB)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

**Ajouter .env.local au .gitignore :**

```gitignore
# Environment variables
.env*.local
.env.local
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
- Région : **europe-west1** (Belgique) ou plus proche de vos utilisateurs

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

**Architecture Next.js App Router avec features (OBLIGATOIRE) :**

```
[NOM_PROJET]/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # Groupe de routes auth
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── (main)/             # Groupe de routes principales
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── profile/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── api/                # API Routes
│   │   │   └── hello/
│   │   │       └── route.ts
│   │   │
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   ├── error.tsx           # Error boundary
│   │   ├── loading.tsx         # Loading UI
│   │   └── not-found.tsx       # 404 page
│   │
│   ├── components/             # UI réutilisable
│   │   ├── ui/                 # Button, Input, Card
│   │   └── forms/              # Composants formulaires
│   │
│   ├── features/               # Features métier (logique)
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   └── types/
│   │   │
│   │   └── [feature-name]/     # Autres features
│   │
│   ├── services/               # Services globaux
│   │   ├── firebase/
│   │   │   ├── firebase.ts
│   │   │   ├── firestore.ts
│   │   │   └── storage.ts
│   │   └── api/
│   │
│   ├── hooks/                  # Hooks globaux
│   ├── store/                  # Zustand stores
│   ├── lib/                    # Utilitaires
│   │   └── utils.ts
│   ├── constants/              # Constantes
│   ├── types/                  # Types globaux
│   ├── locales/                # Traductions i18n
│   └── styles/                 # Styles globaux
│       └── globals.css
│
├── public/                     # Assets statiques
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── __tests__/                  # Tests
├── docs/                       # Documentation projet
│   ├── ARCHITECTURE.md         # Architecture detaillee
│   ├── API.md                  # Documentation API/services
│   ├── FEATURES.md             # Liste des features implementees
│   └── DEPLOYMENT.md           # Guide de deploiement
│
├── .env.local                  # Variables (NE PAS COMMITER)
├── .env.example                # Template (À COMMITER)
├── .gitignore
├── PROJECT.md                  # Mémoire permanente
├── CONTRIBUTING.md
├── package.json
├── tsconfig.json
├── next.config.js              # Config Next.js
├── tailwind.config.ts          # Config Tailwind
├── postcss.config.js           # Config PostCSS
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
 * Utilise la config WEB pour Next.js.
 */

import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Configuration Firebase depuis .env.local
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialiser Firebase (eviter re-initialisation en dev mode)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialiser les services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Analytics uniquement cote client
let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { auth, db, storage, analytics };
```

---

## ✅ Étape 6 : Vérification

```bash
# Vérifier que tout compile
npm run build

# Lancer les tests de base (si configurés)
npm test

# Démarrer le serveur de dev
npm run dev
```

**Vérifier dans le navigateur :**
- Ouvrir http://localhost:3000
- ✅ Page d'accueil s'affiche
- ✅ Aucune erreur Firebase dans la console

**Si erreur "auth/invalid-api-key" :**
- Vérifier que les clés .env.local sont correctes
- Vérifier le préfixe NEXT_PUBLIC_
- Relancer le serveur après modification du .env.local (IMPORTANT)

---

## 📝 Étape 7 : Premier Commit

```bash
# Ajouter tous les fichiers
git add .

# Créer le commit
git commit -m "chore: initial project setup

- Init Next.js 14+ with App Router
- Install base dependencies (Firebase, Zustand, Tailwind)
- Configure Firebase
- Setup project structure
- Add .env.local configuration

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
- ✅ Structure de dossiers complète (src/app/, src/components/, src/features/)
- ✅ Configuration Firebase
- ✅ .env.local + .env.example
- ✅ package.json avec toutes les dépendances
- ✅ tsconfig.json
- ✅ next.config.js
- ✅ tailwind.config.ts
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
5. Déployer sur Vercel quand prêt

---

## 🐛 Depannage

### Probleme : "Build echoue"

```bash
# Nettoyer le cache Next.js
rm -rf .next

# Rebuild
npm run build
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
# Trouver le processus sur le port 3000
lsof -i :3000

# Tuer le processus
kill -9 [PID]

# Ou utiliser un autre port
npm run dev -- -p 3001
```

### Probleme : "auth/invalid-api-key" (Firebase)

```bash
# Verifier que les cles .env.local sont correctes
# Verifier le format NEXT_PUBLIC_*
# ⚠️ IMPORTANT : Relancer le serveur apres modification du .env.local
npm run dev
```

### Probleme : "Hydration error"

```
Cause : Difference entre HTML server et client
Solution :
- Verifier que les composants ne dependent pas de window/document en SSR
- Utiliser useEffect pour code client-only
- Utiliser dynamic import avec ssr: false si necessaire
```

```typescript
// Exemple : Importer un composant client-only
import dynamic from 'next/dynamic';

const ClientOnlyComponent = dynamic(
  () => import('@/components/ClientOnlyComponent'),
  { ssr: false }
);
```

### Probleme : "Firebase not initialized"

```typescript
// Verifier que firebase.ts est bien importe
// Verifier que les variables d'environnement sont definies
// Verifier que le serveur a ete relance apres ajout du .env.local
```

---

## 🚀 Configuration Vercel (Déploiement)

### Deploiement automatique sur Vercel :

1. Aller sur https://vercel.com
2. Importer le projet depuis GitHub
3. Configurer les variables d'environnement :
   - Copier toutes les variables du .env.local
   - Les ajouter dans Settings > Environment Variables
4. Déployer

**Variables à ajouter sur Vercel :**
```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=...
```

---

🤖 _Guide destiné à Claude Code - Initialisation standardisée de projets Next.js_
