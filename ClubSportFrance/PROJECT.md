# 📱 ClubSportFrance

**Cree le :** 03/11/2025
**Derniere mise a jour :** 03/11/2025
**Version actuelle :** 0.1.0 (Build 1 / versionCode 1)

---

## 🎯 RESUME DU PROJET

**Description :** Application qui sera une map de la France ou sera repertorie tous les clubs de sport de France

**Public cible :** Les francais en general mais aussi des internationaux voulant rejoindre des clubs en France

**Plateformes :** iOS, Android, Web

**Technologies principales :**
- React Native + Expo v54+
- Firebase (details a venir)
- TypeScript
- Zustand (state management)
- React Navigation v7

---

## 📝 REPONSES ONBOARDING

### Authentification
- **Type :** Email + Google + Apple Sign-In
- **Details :** Authentification complete multi-providers pour meilleure UX

### Monetisation
- **Type :** Gratuit
- **Prix :** Application 100% gratuite
- **Features premium :** Aucune

### Fonctionnalites Principales

#### Fonctionnalites de base
- [X] Notifications Push
- [X] Stockage Photos/Videos
- [X] Geolocalisation & Cartes
- [X] Recherche & Filtres
- [X] Export de Donnees (RGPD)

#### Fonctionnalites sociales
- [X] Chat / Messagerie
- [X] Profils Utilisateurs
- [X] Partage Social

#### Analyse & Suivi
- [X] Analytics

#### Technique
- [X] Backend Automatise (Cloud Functions)
- [X] Deep Linking
- [X] Multi-langue (OBLIGATOIRE)
- [X] Theme Clair/Sombre (OBLIGATOIRE)

### Plateforme Cible
- **Plateformes :** iOS + Android + Web (React Native Web)
- **Priorite :** Traitement egal mobile/web
- **Version Web :** Complete (toutes les fonctionnalites disponibles sur Web)
- **Hebergement Web :** Firebase Hosting (domaine custom possible)
- **URL prevue :** clubsportfrance.web.app ou domaine custom
- **Avantages Web :**
  - Utilisateurs desktop peuvent utiliser l'app sans installation
  - Meilleur SEO pour trouver les clubs
  - Partage de liens directs vers clubs specifiques
  - Decouverte des clubs avant venue en France pour internationaux

### Notifications Push
- **Active :** Oui
- **Types :** Notifications automatiques (evenements)
- **Exemples :**
  - Nouveau message dans le chat

### Stockage Fichiers
- **Active :** Oui
- **Types :** Photos/avatars + Videos + Documents
- **Usage prevu :**
  - Photos de profil utilisateurs
  - Photos clubs (logo, photos installations/gymnase)
  - Videos de presentation clubs (optionnel)
- **Limite taille par fichier :**
  - Photos : 10 MB max (largement suffisant avec compression)
  - Videos : 100 MB max (videos courtes de presentation)
  - Documents : 10 MB max
- **Limite totale par user :** Aucune limite
- **Compression automatique :** Oui (photos compressees a 70% qualite, max 1920px largeur)

### Geolocalisation
- **Active :** Oui
- **Type :** Localisation temps reel avec carte interactive
- **Tracking arriere-plan :** Non
- **Usage :** Centrer la carte sur la position de l'utilisateur pour afficher clubs a proximite
- **Integration :** Google Maps (recommande pour multi-plateforme iOS/Android/Web)

### Recherche
- **Active :** Oui
- **Type :** Recherche avancee + filtres multiples (Firestore)
- **Migration Algolia :** Prevue plus tard si necessaire (>10k clubs ou performance)
- **Donnees :** Clubs (nom, sport, ville, departement, niveau)
- **Filtres prevus :**
  - Type de sport (football, basketball, tennis, etc.)
  - Ville/region/departement
  - Nom du club
  - Niveau (debutant, amateur, competition)

### Analytics
- **Active :** Oui
- **Outil :** Firebase Analytics (gratuit, basique)
- **Evenements a tracker :**
  - Inscription utilisateur
  - Recherche de club (avec filtres utilises)
  - Consultation profil club
  - Message envoye
  - Partage vers reseaux sociaux
  - Ajout club aux favoris

### Mode Offline
- **Active :** Non
- **Type :** Connexion internet obligatoire
- **Donnees offline :** Aucune

### Cloud Functions
- **Active :** Oui
- **Functions prevues :**
  - Email de bienvenue lors de l'inscription
  - Notification push quand nouveau message recu
  - Compression automatique des photos de clubs
  - Nettoyage des conversations inactives (cron job)

### Export Donnees (RGPD)
- **Active :** Oui (OBLIGATOIRE)
- **Formats :** JSON + PDF + CSV (tous les formats)
- **Donnees exportees :**
  - Profil utilisateur
  - Messages envoyes/recus
  - Clubs favoris
  - Historique de recherches

### Pagination
- **Active :** Oui
- **Type :** Infinite scroll (chargement automatique en scrollant)
- **Collections concernees :**
  - Liste des clubs (potentiellement des milliers)
  - Messages dans le chat
  - Resultats de recherche

### Chat
- **Active :** Oui
- **Type :** Chat 1-to-1 (prive)
- **Medias :** Texte uniquement
- **Notifications push :** Oui (des reception nouveau message)

### Calendrier
- **Active :** Non
- **Type :** Pas de gestion d'evenements
- **Integration calendrier natif :** Non
- **Rappels automatiques :** Non

### Accessibilite WCAG 2.1
- **Active :** Oui
- **Niveau conformite :** AA (standard international)
- **Implementations prevues :**
  - Props accessibilite (Label, Hint, Role)
  - Contrastes couleurs conformes (≥ 4.5:1 texte, ≥ 3:1 UI)
  - Tailles tactiles minimales (44x44 iOS / 48x48 Android)
  - Support VoiceOver / TalkBack
  - Annonces dynamiques lecteurs ecran
  - Tests accessibilite automatises

### Permissions
- [X] Camera (photos de profil et photos de clubs)
- [X] Galerie photos (selection photos existantes)
- [X] Localisation (deja incluse - centrer carte sur utilisateur)

### Informations Legales
- **Entite legale :** Topal
- **Adresse :** 4 Boulevard de Metz, 67000 Strasbourg, France
- **SIRET/SIREN :** En cours d'obtention
- **Email contact :** contact@topal.fr
- **Responsable legal/DPO :** Tom Burger
- **Hebergeur :** Firebase (Google LLC)
  - Firestore Database (donnees)
  - Firebase Storage (fichiers)
  - Firebase Hosting (version Web)

### Configuration Firebase
- **Project ID :** clubsportfrance-99127
- **Auth Domain :** clubsportfrance-99127.firebaseapp.com
- **Storage Bucket :** clubsportfrance-99127.firebasestorage.app
- **Region :** europe-west1 (Belgique)
- **Services actives :**
  - Authentication (Email/Password activé, Google et Apple à configurer)
  - Firestore Database (mode test)
  - Storage (à activer plus tard)
  - Analytics (activé)

---

## 📊 TODOLIST

**Progression globale : 0/78 (0%)**

### ⏳ EN COURS (0)
_Aucune tache en cours_

### ⬜ A FAIRE (78)

#### 🚀 PHASE 1 : INITIALISATION (0/12) ⬜
- [ ] [FEATURE] Creer structure dossiers | Added: 03/11/2025
- [ ] [FEATURE] Installer dependances Expo + TypeScript | Added: 03/11/2025
- [ ] [FEATURE] Configurer Firebase (creer .env avec credentials) | Added: 03/11/2025
- [ ] [CONFIG] Activer Firebase Storage | Added: 03/11/2025
- [ ] [CONFIG] Configurer Google Sign-In (OAuth credentials) | Added: 03/11/2025
- [ ] [CONFIG] Configurer Apple Sign-In (certificats) | Added: 03/11/2025
- [ ] [FEATURE] Setup Git et premier commit | Added: 03/11/2025
- [ ] [FEATURE] Creer theme (colors, typography, spacing, WCAG 2.1 AA) | Added: 03/11/2025
- [ ] [FEATURE] Setup i18n (fr, en) | Added: 03/11/2025
- [ ] [FEATURE] Configurer navigation | Added: 03/11/2025
- [ ] [FEATURE] Creer composants UI de base (Button, Input, Card) | Added: 03/11/2025
- [ ] [FEATURE] Setup tests (Jest config) | Added: 03/11/2025

#### 🔐 PHASE 2 : AUTHENTIFICATION (0/7) ⬜
- [ ] [FEATURE] Creer AuthContext | Added: 03/11/2025
- [ ] [FEATURE] Creer authService.ts | Added: 03/11/2025
- [ ] [FEATURE] Ecran Login | Added: 03/11/2025
- [ ] [FEATURE] Ecran Register | Added: 03/11/2025
- [ ] [FEATURE] Google Sign-In integration | Added: 03/11/2025
- [ ] [FEATURE] Apple Sign-In integration | Added: 03/11/2025
- [ ] [FEATURE] Forgot Password / Reset Password | Added: 03/11/2025

#### 👤 PHASE 3 : PROFILS UTILISATEURS (0/5) ⬜
- [ ] [FEATURE] Collection users/ Firestore | Added: 03/11/2025
- [ ] [FEATURE] Creer userService.ts | Added: 03/11/2025
- [ ] [FEATURE] Ecran Profil utilisateur | Added: 03/11/2025
- [ ] [FEATURE] Edit Profil (nom, photo) | Added: 03/11/2025
- [ ] [FEATURE] Upload photo de profil (Camera + Galerie) | Added: 03/11/2025

#### 🗺️ PHASE 4 : CARTE & GEOLOCALISATION (0/6) ⬜
- [ ] [FEATURE] Setup react-native-maps (Google Maps) | Added: 03/11/2025
- [ ] [FEATURE] Creer locationService.ts | Added: 03/11/2025
- [ ] [FEATURE] Composant MapView principal | Added: 03/11/2025
- [ ] [FEATURE] Centrer carte sur position utilisateur | Added: 03/11/2025
- [ ] [FEATURE] Afficher marqueurs clubs sur carte | Added: 03/11/2025
- [ ] [FEATURE] Modal detail club au clic sur marqueur | Added: 03/11/2025

#### 🏅 PHASE 5 : CLUBS SPORTIFS (0/8) ⬜
- [ ] [FEATURE] Collection clubs/ Firestore | Added: 03/11/2025
- [ ] [FEATURE] Creer clubService.ts (CRUD) | Added: 03/11/2025
- [ ] [FEATURE] Ecran Liste clubs | Added: 03/11/2025
- [ ] [FEATURE] Ecran Detail club | Added: 03/11/2025
- [ ] [FEATURE] Ecran Creer/Modifier club | Added: 03/11/2025
- [ ] [FEATURE] Upload photos club (logo + photos installations) | Added: 03/11/2025
- [ ] [FEATURE] Formulaire club (nom, sport, ville, departement, niveau, contact) | Added: 03/11/2025
- [ ] [FEATURE] Validation formulaire club | Added: 03/11/2025

#### 🔍 PHASE 6 : RECHERCHE & FILTRES (0/6) ⬜
- [ ] [FEATURE] Composant SearchBar | Added: 03/11/2025
- [ ] [FEATURE] Creer searchService.ts | Added: 03/11/2025
- [ ] [FEATURE] Composant FilterPanel | Added: 03/11/2025
- [ ] [FEATURE] Filtres : Sport (football, basketball, tennis, etc.) | Added: 03/11/2025
- [ ] [FEATURE] Filtres : Ville / Departement / Region | Added: 03/11/2025
- [ ] [FEATURE] Filtres : Niveau (debutant, amateur, competition) | Added: 03/11/2025

#### ⭐ PHASE 7 : FAVORIS (0/4) ⬜
- [ ] [FEATURE] Collection favorites/ Firestore | Added: 03/11/2025
- [ ] [FEATURE] Creer favoriteService.ts | Added: 03/11/2025
- [ ] [FEATURE] Bouton Ajouter/Retirer favoris | Added: 03/11/2025
- [ ] [FEATURE] Ecran Liste favoris | Added: 03/11/2025

#### 💬 PHASE 8 : CHAT (0/7) ⬜
- [ ] [FEATURE] Collection conversations/ + messages/ Firestore | Added: 03/11/2025
- [ ] [FEATURE] Creer chatService.ts | Added: 03/11/2025
- [ ] [FEATURE] Ecran ChatList (liste conversations) | Added: 03/11/2025
- [ ] [FEATURE] Ecran ChatRoom (conversation 1-to-1) | Added: 03/11/2025
- [ ] [FEATURE] Envoyer message texte | Added: 03/11/2025
- [ ] [FEATURE] Real-time updates (listener Firestore) | Added: 03/11/2025
- [ ] [FEATURE] Indicateur message lu/non lu | Added: 03/11/2025

#### 🔔 PHASE 9 : NOTIFICATIONS PUSH (0/5) ⬜
- [ ] [FEATURE] Setup Expo Notifications | Added: 03/11/2025
- [ ] [FEATURE] Creer notificationService.ts | Added: 03/11/2025
- [ ] [FEATURE] Gestion permissions notifications | Added: 03/11/2025
- [ ] [FEATURE] Enregistrer token FCM dans Firestore | Added: 03/11/2025
- [ ] [BACKEND] Cloud Function onMessageCreated (send push) | Added: 03/11/2025

#### 🔗 PHASE 10 : PARTAGE SOCIAL & DEEP LINKING (0/4) ⬜
- [ ] [FEATURE] Setup Deep Linking (Expo Linking) | Added: 03/11/2025
- [ ] [FEATURE] Partage profil club vers reseaux sociaux | Added: 03/11/2025
- [ ] [FEATURE] Generation lien partage club | Added: 03/11/2025
- [ ] [FEATURE] Navigation depuis deep link vers detail club | Added: 03/11/2025

#### 📊 PHASE 11 : ANALYTICS (0/3) ⬜
- [ ] [FEATURE] Setup Firebase Analytics | Added: 03/11/2025
- [ ] [FEATURE] Creer analyticsService.ts | Added: 03/11/2025
- [ ] [FEATURE] Tracker evenements (inscription, recherche, consultation club, message, partage, favoris) | Added: 03/11/2025

#### 📤 PHASE 12 : EXPORT DONNEES (RGPD) (0/4) ⬜
- [ ] [FEATURE] Collection searches/ (historique recherches) | Added: 03/11/2025
- [ ] [FEATURE] Creer exportService.ts | Added: 03/11/2025
- [ ] [FEATURE] Export JSON (profil + messages + favoris + recherches) | Added: 03/11/2025
- [ ] [FEATURE] Export PDF et CSV | Added: 03/11/2025

#### ⚡ PHASE 13 : CLOUD FUNCTIONS (0/4) ⬜
- [ ] [BACKEND] Cloud Function onUserCreated (email bienvenue) | Added: 03/11/2025
- [ ] [BACKEND] Cloud Function onMessageCreated (notification push) | Added: 03/11/2025
- [ ] [BACKEND] Cloud Function onPhotoUploaded (compression automatique) | Added: 03/11/2025
- [ ] [BACKEND] Cron job cleanInactiveConversations (nettoyage) | Added: 03/11/2025

#### 🌍 PHASE 14 : REACT NATIVE WEB (0/5) ⬜
- [ ] [FEATURE] Setup React Native Web | Added: 03/11/2025
- [ ] [FEATURE] Configuration Webpack | Added: 03/11/2025
- [ ] [FEATURE] Adapter navigation pour Web | Added: 03/11/2025
- [ ] [FEATURE] Adapter MapView pour Web (Google Maps JS API) | Added: 03/11/2025
- [ ] [FEATURE] Deploy Firebase Hosting | Added: 03/11/2025

#### 🔒 PHASE 15 : SECURITE (0/4) ⬜
- [ ] [SECURITY] Generer Firestore Rules (users, clubs, conversations, favorites, searches) | Added: 03/11/2025
- [ ] [SECURITY] Generer Storage Rules (photos profils + clubs) | Added: 03/11/2025
- [ ] [SECURITY] Validation donnees cote Cloud Functions | Added: 03/11/2025
- [ ] [SECURITY] Rate limiting Cloud Functions | Added: 03/11/2025

#### 📄 PHASE 16 : DOCUMENTS LEGAUX (0/2) ⬜
- [ ] [DOCS] Generer CGU (Conditions Generales d'Utilisation) | Added: 03/11/2025
- [ ] [DOCS] Generer Politique de Confidentialite (RGPD) | Added: 03/11/2025

#### 🧪 PHASE 17 : TESTS (0/3) ⬜
- [ ] [TEST] Tests unitaires services (auth, club, chat, favorite) | Added: 03/11/2025
- [ ] [TEST] Tests integration | Added: 03/11/2025
- [ ] [TEST] Tests accessibilite (WCAG 2.1 AA) | Added: 03/11/2025

#### 🚀 PHASE 18 : DEPLOIEMENT (0/5) ⬜
- [ ] [DEPLOY] Setup EAS Build | Added: 03/11/2025
- [ ] [DEPLOY] Build iOS (TestFlight) | Added: 03/11/2025
- [ ] [DEPLOY] Build Android (Internal Testing) | Added: 03/11/2025
- [ ] [DEPLOY] Deploy Web (Firebase Hosting) | Added: 03/11/2025
- [ ] [DEPLOY] Soumission App Store + Play Store | Added: 03/11/2025

### ✅ TERMINE (0)
_Aucune tache terminee_

---

## 📅 JOURNAL DE DEVELOPPEMENT

### 03/11/2025 - Onboarding et configuration Firebase
- Collecte complete des 16 questions onboarding
- Configuration Firebase Console (Auth, Firestore, Analytics)
- Collecte credentials Firebase WEB
- Collecte informations legales (Topal, Tom Burger, Strasbourg)
- Definition patterns Firestore Rules
- Generation TodoList complete (78 taches)
- Pret pour initialisation projet Expo

---

## 🎯 DECISIONS TECHNIQUES

### Architecture
- **State Management :** Zustand pour global, Context API pour features specifiques (auth, theme)
- **Navigation :** React Navigation Stack + Bottom Tabs (5 tabs : Carte, Recherche, Favoris, Chat, Profil)
- **Styling :** StyleSheet natif + theme system centralise (WCAG 2.1 AA)
- **Animations :** React Native Reanimated 3
- **Maps :** react-native-maps (Google Maps API)

### Firebase
- **Auth :** Email/Password + Google + Apple Sign-In
- **Firestore Collections prevues :**
  - users/ (profils utilisateurs - public visible)
  - clubs/ (base clubs sportifs - contributif libre)
  - conversations/ + messages/ (chat 1-to-1 - prive)
  - favorites/ (clubs favoris - prive)
  - searches/ (historique recherches - prive RGPD)
- **Storage Structure :**
  - users/{userId}/profile.jpg (photo profil)
  - clubs/{clubId}/logo.jpg (logo club)
  - clubs/{clubId}/photos/{photoId}.jpg (photos installations)
- **Cloud Functions prevues :**
  - onUserCreated (email bienvenue)
  - onMessageCreated (notification push)
  - onPhotoUploaded (compression automatique)
  - cleanInactiveConversations (cron job)

### Performance
- **Optimisations prevues :**
  - React.memo pour composants couteux (ClubCard, MapMarker)
  - useCallback pour handlers dans listes
  - FlatList avec windowSize optimise (liste clubs)
  - Pagination infinite scroll (clubs, messages)
- **Images :** Compression a 70%, max 1920px largeur
- **Cache :** AsyncStorage avec TTL 1h (recherches recentes)

### Accessibilite
- **Niveau conformite :** WCAG 2.1 AA
- **Props accessibilite systematiques** sur tous composants UI
- **Contrastes conformes :** ≥ 4.5:1 (texte), ≥ 3:1 (UI)
- **Tailles tactiles minimales :** 44x44 iOS / 48x48 Android
- **Tests automatises accessibilite**

### Regles Firestore
- **users/** : Public visible (lecture: tous, modification: owner)
- **clubs/** : Contributif libre (lecture: tous, creation: auth, modification: createur)
- **conversations/** : Prive strict (lecture/ecriture: participants uniquement)
- **favorites/** : Prive (lecture/ecriture: owner uniquement)
- **searches/** : Prive (lecture/ecriture: owner uniquement)

### React Native Web
- **Hebergement :** Firebase Hosting
- **URL :** clubsportfrance.web.app (ou domaine custom)
- **Adaptations Web :**
  - MapView avec Google Maps JS API
  - Navigation responsive (sidebar desktop vs tabs mobile)
  - SEO optimise pour referencement clubs

---

## 🐛 PROBLEMES CONNUS

_Aucun probleme connu pour le moment_

---

**Derniere mise a jour par Claude Code le 03/11/2025**

🤖 _Genere avec [Claude Code](https://claude.com/claude-code)_
