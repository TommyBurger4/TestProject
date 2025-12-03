# 📋 CHANGELOG - ClubSportFrance

Toutes les modifications notables de ce projet seront documentees dans ce fichier.

Le format est base sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet respecte [Semantic Versioning](https://semver.org/lang/fr/).

---

## [Non publie]

### En cours
- Integration avec Firebase Firestore pour clubs reels (remplacer mock data)
- Configuration OAuth Firebase Console (Google Sign-In + Apple Sign-In)
- Creation route /dashboard pour clubs connectes
- Middleware protection routes privees

---

## [0.3.1] - 2025-12-03

### 🧹 Nettoyage arborescence

#### Modifie
- **Reorganisation complete repository** :
  - TestProject/ (repo parent) : Documentation universelle (guides/, templates/) + Config Firebase
  - clubsportfrance/ (sous-repo) : Projet Next.js complet avec tout le code
- **Deplacements vers clubsportfrance/** :
  - Fichiers .md : PROJECT.md, CHANGELOG.md, README.md, ANALYSE_CODE_EXISTANT.md
  - Config projet : package.json, tsconfig.json, next.config.ts, eslint.config.mjs, postcss.config.mjs
  - Storage rules : storage.rules (pour usage futur)
  - Code source : src/, public/
- **Arborescence propre** :
  - Separation claire documentation universelle vs projet specifique
  - Sous-repo Git pour clubsportfrance/ (gitignore dans parent)
  - Navigation facilitee dans Fork

#### Supprime
- ClubSportFrance_backup_mobile/ (backup React Native obsolete)
- Debugscreen/ (screenshots debug)
- Fichiers dupliques a la racine (35 fichiers)

#### Technique
- 35 fichiers supprimes de TestProject/ (12 195 lignes)
- Tous les fichiers essentiels deplaces dans clubsportfrance/
- .gitignore parent mis a jour (ignore clubsportfrance/)

---

## [0.3.0] - 2025-12-03

### 🔐 Authentification clubs complete

#### Ajoute
- **Systeme d'authentification complet** :
  - authService.ts avec toutes les methodes Firebase Auth :
    - registerWithEmail (creation compte + doc Firestore automatique)
    - loginWithEmail (signInWithEmailAndPassword)
    - loginWithGoogle (signInWithPopup + GoogleAuthProvider)
    - loginWithApple (signInWithPopup + OAuthProvider 'apple.com')
    - resetPassword (sendPasswordResetEmail)
    - getUserData (recuperation userData depuis Firestore)
  - Validation formulaires : isValidEmail, validatePassword, passwordsMatch
  - Interface UserData (uid, email, displayName, photoURL, role, timestamps)
- **AuthContext Provider** :
  - Hook useAuth expose toutes les methodes auth
  - State user (Firebase Auth) + userData (Firestore avec role)
  - Auto-fetch userData sur auth state change (onAuthStateChanged)
  - Gestion erreurs et loading states
  - clearError pour reset erreurs
- **Composants UI reutilisables** :
  - Button : 4 variants (primary/secondary/danger/ghost), 3 tailles (sm/md/lg), loading state, fullWidth
  - Input : label, error, helperText, fullWidth, support type password/email/text
  - Card : container avec padding et shadow
- **Pages authentification** :
  - /login : Connexion Email/Password + Google + Apple, lien vers /register et /forgot-password
  - /register : Inscription club (clubName + email + password + confirm), role='club' FORCE
  - /forgot-password : Reinitialisation mot de passe par email avec message succes
  - Toutes les pages : min-w-[400px] pour eviter word-wrapping
  - Header avec logo et titre "ClubSportFrance"
  - Lien retour vers / (carte)
- **Architecture decisionnelle IMPORTANTE** :
  - **Seuls les clubs ont besoin de se connecter** (role='club' automatique)
  - **Les utilisateurs reguliers acceent a TOUT sans authentification** (carte, recherche, detail clubs)
  - Bouton navigation "Se connecter" renomme en "Espace Club" pour clarifier
  - Redirection apres login/register : /dashboard (route a creer)

#### Modifie
- Navigation /map : "Se connecter" → "Espace Club" (clarification)
- globals.css : min-w-[400px] sur containers auth pour fix word-wrapping

#### Corrige
- Word-wrapping : texte coupait a chaque mot (fix: min-w-[400px] sur containers)
- Nettoyage repository : suppression dossiers dupliques ClubSportFrance/ et ClubSportFrance_backup_mobile/ (157 fichiers)
- Suppression .DS_Store

#### A completer
- Configuration OAuth Firebase Console (Google + Apple credentials)
- Middleware protection routes /dashboard/*
- Creation route /dashboard (inexistante actuellement)
- Redirection conditionnelle selon role user/club

#### Technique
- Firebase Auth v11.1.0 (createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, OAuthProvider)
- Firestore users/ collection (uid, email, displayName, photoURL, role, createdAt, updatedAt)
- React Context API pour AuthContext
- Tailwind CSS pour styling composants UI
- Next.js App Router pages /login, /register, /forgot-password

---

## [0.2.0] - 2025-12-03

### 🗺️ Carte interactive complete

#### Ajoute
- **Carte interactive Leaflet** :
  - Integration Leaflet 1.9.4 + react-leaflet
  - Tiles OpenStreetMap (gratuit, sans API key)
  - Carte centree sur la France (lat 46.6, lng 1.9)
  - Dynamic import avec ssr: false pour Next.js
- **Geolocalisation utilisateur** :
  - Detection position automatique (navigator.geolocation)
  - Centrage automatique sur position utilisateur
  - Bouton recentrage sur position
  - Marker utilisateur personnalise (pin bleu avec emoji 📍)
- **Markers personnalises** :
  - 15 sports avec emojis (⚽🎾🏀🏊🏐🏉🤾🚴🏃🧗🥊🥋🏇⛳⛷️)
  - Pin rouge avec emoji du sport au centre
  - Marker utilisateur en pin bleu
  - Popup au clic (nom club, sport, emoji)
- **Clustering intelligent** :
  - react-leaflet-cluster pour grouper markers proches
  - 3 niveaux de clusters :
    - Small (< 50 clubs): bleu semi-transparent
    - Medium (50-99 clubs): orange semi-transparent
    - Large (100+ clubs): rouge semi-transparent
  - Opacite 50% pour transparence
  - Animation hover scale(1.1)
  - Border blanc et box-shadow
- **200 clubs de demo** :
  - Generation aleatoire pour tester clustering
  - 15 sports, 35 villes francaises
  - Coordonnees aleatoires France (lat 42-51, lng -5 a 8)
  - Noms generes : "Prefixe Sport Ville"
- **Page /map** :
  - Page principale (redirection depuis /)
  - Header avec navigation
  - Legende explicative en overlay
  - Stats rapides (nombre de clubs)
  - Layout fullscreen responsive

#### Modifie
- Passage de Google Maps a Leaflet (open source, gratuit)
- Structure Next.js 16.0.6 avec React 19
- Tailwind CSS v4

#### Corrige
- SSR error "window is not defined" (dynamic import)
- Clusters invisibles (import CSS manquants)
- Styles clusters override (ajout !important)
- Position emoji dans pin (translateY 0px)

#### Technique
- Leaflet 1.9.4, react-leaflet, react-leaflet-cluster
- OpenStreetMap tiles (CDN gratuit)
- CSS personnalise pour pins et clusters
- Geolocalisation browser native

---

## [0.1.0] - 2025-11-03

### 🎉 Version initiale

#### Ajoute
- Configuration initiale du projet
- Onboarding complet (16 questions)
- Configuration Firebase Console
  - Authentication (Email/Password activé)
  - Firestore Database (mode test, region europe-west1)
  - Firebase Analytics
- Definition architecture technique
- Definition patterns Firestore Rules
- Generation TodoList complete (78 taches)
- Documents legaux prepares (Topal, Strasbourg)

#### Configuration
- **Plateformes :** iOS + Android + Web (React Native Web)
- **Authentification :** Email + Google + Apple Sign-In (Google/Apple a configurer)
- **Fonctionnalites prevues :**
  - Carte interactive France avec clubs sportifs
  - Geolocalisation utilisateur
  - Recherche avancee avec filtres (sport, ville, niveau)
  - Profils utilisateurs publics
  - Chat 1-to-1 prive
  - Systeme de favoris
  - Notifications push (nouveaux messages)
  - Partage social et deep linking
  - Export donnees RGPD (JSON + PDF + CSV)
  - Analytics Firebase
  - Accessibilite WCAG 2.1 AA

#### Decisions techniques
- React Native + Expo v54
- TypeScript (strict mode)
- Firebase (Auth, Firestore, Storage, Analytics, Cloud Functions)
- React Navigation v7
- Zustand (state management)
- react-native-maps (Google Maps)
- React Native Web (Firebase Hosting)
- i18n (francais + anglais)
- Theme clair/sombre

#### Notes
- Firebase Storage a activer plus tard
- Google Sign-In OAuth credentials a configurer
- Apple Sign-In certificats a configurer

---

🤖 _Genere avec [Claude Code](https://claude.com/claude-code)_

**Derniere mise a jour :** 03/12/2025
