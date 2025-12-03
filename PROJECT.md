# 🌐 ClubSportFrance (Site Web)

**Cree le :** 02/12/2025
**Derniere mise a jour :** 03/12/2025 14:20
**Version actuelle :** 0.3.1

---

## 🎯 RESUME DU PROJET

**Description :** Site web qui sera une map de la France ou sera repertorie tous les clubs de sport de France

**Public cible :** Les francais en general mais aussi des internationaux voulant rejoindre des clubs en France

**Plateforme :** Web (Desktop prioritaire, responsive mobile plus tard)

**Technologies principales :**
- Next.js 16.0.6 (React 19 + App Router + SSR)
- Firebase (Auth, Firestore, Storage, Analytics, Cloud Functions)
- TypeScript
- Zustand (state management global)
- Tailwind CSS v4 (styling)
- Leaflet + react-leaflet (cartes interactives OpenStreetMap)
- react-leaflet-cluster (clustering de markers)

---

## 📝 REPONSES ONBOARDING

### Authentification
- **Type :** Email + Google + Apple Sign-In
- **Details :** Authentification complete multi-providers pour meilleure UX

### Monetisation
- **Type :** Gratuit
- **Prix :** Site 100% gratuit
- **Features premium :** Aucune

### Fonctionnalites Principales

#### Fonctionnalites de base
- [X] Stockage Photos/Videos (Firebase Storage)
- [X] Geolocalisation & Cartes (Google Maps JS API)
- [X] Recherche & Filtres (Firestore queries)
- [X] Export de Donnees (RGPD)

#### Fonctionnalites sociales
- [X] Profils Utilisateurs
- [X] Partage Social

#### Analyse & Suivi
- [X] Analytics (Firebase Analytics + Google Analytics 4)

#### Technique
- [X] Backend Automatise (Cloud Functions)
- [X] Multi-langue (OBLIGATOIRE - francais/anglais)
- [X] Theme Clair/Sombre (OBLIGATOIRE)
- [X] SEO optimise (Next.js SSR + metadata)

### Plateforme Cible
- **Plateforme :** Web uniquement
- **Priorite :** Desktop d'abord, responsive mobile plus tard
- **Hebergement :** Vercel (recommande pour Next.js) ou Firebase Hosting
- **URL prevue :** clubsportfrance.com ou clubsportfrance.vercel.app
- **Avantages Web :**
  - Utilisateurs desktop peuvent utiliser le site sans installation
  - Meilleur SEO pour trouver les clubs (Next.js SSR)
  - Partage de liens directs vers clubs specifiques
  - Decouverte des clubs avant venue en France pour internationaux
  - Performance optimale (Server Components)

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
- **Usage :** Centrer la carte sur la position de l'utilisateur pour afficher clubs a proximite
- **Integration :** Leaflet + OpenStreetMap (gratuit, sans API key)
- **Geolocalisation navigateur :** navigator.geolocation API
- **Clustering :** react-leaflet-cluster pour grouper les markers proches

### Recherche
- **Active :** Oui
- **Type :** Recherche avancee + filtres multiples (Firestore)
- **Migration Algolia :** Prevue plus tard si necessaire (>10k clubs ou performance)
- **Donnees :** Clubs (nom, sport, ville, departement, niveau, genre, age)
- **Barre de recherche :** Ville uniquement
- **Filtres prevus :**
  - **Sports** : Par categorie OU sport individuel
    - Sports collectifs (Football, Basketball, Volleyball, Handball, Rugby, Hockey)
    - Sports de raquette (Tennis, Badminton, Squash, Padel, Tennis de table)
    - Sports d'hiver (Ski, Snowboard, Patinage)
    - Sports de combat (Boxe, Judo, Karate, Taekwondo, MMA, Lutte)
    - Sports individuels (Athletisme, Natation, Cyclisme, Running, Triathlon)
    - Fitness & bien-etre (Fitness, Yoga, Pilates, CrossFit, Musculation)
    - Sports artistiques (Danse, Gymnastique, Escalade)
    - Autres (Equitation, Golf, Tir a l'arc)
  - **Distance** : Slider (5km, 10km, 20km, 50km, 100km, France entiere)
  - **Niveau** : Debutant, Intermediaire, Confirme
  - **Genre** : Masculin, Feminin, Mixte
  - **Age** : Enfants (6-12), Ados (13-17), Adultes (18-60), Seniors (60+)

### Analytics
- **Active :** Oui
- **Outil :** Firebase Analytics + Google Analytics 4
- **Evenements a tracker :**
  - Inscription utilisateur (user ou club)
  - Recherche de club (avec filtres utilises)
  - Consultation detail club
  - Partage vers reseaux sociaux
  - Ajout/retrait club aux favoris
  - Contact club (email/telephone/site web)
  - Vues fiche club (pour statistiques clubs)

### Cloud Functions
- **Active :** Oui
- **Functions prevues :**
  - Email de bienvenue lors de l'inscription (user ou club)
  - Compression automatique des photos de clubs
  - Nettoyage recherches anciennes (cron job RGPD)

### Export Donnees (RGPD)
- **Active :** Oui (OBLIGATOIRE)
- **Formats :** JSON + PDF + CSV (tous les formats)
- **Donnees exportees :**
  - Profil utilisateur
  - Clubs favoris
  - Historique de recherches

### Pagination
- **Active :** Oui
- **Type :** Infinite scroll OU pagination classique (a decider)
- **Collections concernees :**
  - Liste des clubs (potentiellement des milliers)
  - Resultats de recherche
  - Liste des favoris

### Accessibilite WCAG 2.1
- **Active :** Oui
- **Niveau conformite :** AA (standard international)
- **Implementations prevues :**
  - HTML semantique (nav, main, section, article, etc.)
  - Attributs ARIA (labels, roles, states)
  - Contrastes couleurs conformes (≥ 4.5:1 texte, ≥ 3:1 UI)
  - Navigation clavier complete (focus visible)
  - Support lecteurs ecran
  - Tests accessibilite automatises (axe-core)

### Permissions
- [X] Geolocalisation navigateur (centrer carte sur utilisateur)
- [X] Upload fichiers (photos de profil et photos de clubs)

### Informations Legales
- **Entite legale :** Topal
- **Adresse :** 4 Boulevard de Metz, 67000 Strasbourg, France
- **SIRET/SIREN :** En cours d'obtention
- **Email contact :** contact@topal.fr
- **Responsable legal/DPO :** Tom Burger
- **Hebergeur :** Firebase (Google LLC)
  - Firestore Database (donnees)
  - Firebase Storage (fichiers)
  - Vercel ou Firebase Hosting (site web)

### Configuration Firebase
- **Project ID :** clubsportfrance-99127
- **Auth Domain :** clubsportfrance-99127.firebaseapp.com
- **Storage Bucket :** clubsportfrance-99127.firebasestorage.app
- **Region :** europe-west1 (Belgique)
- **Services actives :**
  - Authentication (Email/Password active, Google et Apple a configurer)
  - Firestore Database (mode test)
  - Storage (a activer)
  - Analytics (active)

---

## 🏗️ ARCHITECTURE DU SITE WEB

### 2 Types de Comptes

Le site supporte **2 types de comptes distincts** avec des interfaces et fonctionnalites differentes :

#### 👤 Compte Utilisateur (role='user')
- **Objectif :** Trouver et contacter des clubs sportifs
- **Navigation :** Menu principal avec :
  - 🗺️ **Carte** : Voir tous les clubs sur carte interactive avec marqueurs
  - 🔍 **Recherche** : Filtres avances (sport, distance, niveau, genre, age, ville)
  - ⭐ **Favoris** : Clubs sauvegardes (tri recent/proche, filtres)
  - 👤 **Profil** : Gestion compte utilisateur
- **Fonctionnalites :**
  - Voir tous les clubs (carte + liste)
  - Rechercher avec filtres multiples
  - Ajouter clubs en favoris
  - Consulter details club complet
  - Contacter clubs (email/telephone/site web)
  - Partager clubs vers reseaux sociaux

#### 🏢 Compte Club (role='club')
- **Objectif :** Gerer la fiche du club et attirer membres
- **Navigation :** Dashboard club avec :
  - 📋 **Ma Fiche** : Voir/modifier fiche club complete
  - 👥 **Equipes** : Gerer equipes (CRUD)
  - 📊 **Statistiques** : Vues, Favoris
  - ⚙️ **Parametres** : Email, mot de passe, deconnexion
- **Contraintes :**
  - 1 compte = 1 club unique
  - Inscription = formulaire complet club (multi-etapes)
  - PAS d'acces a la carte/recherche/favoris
  - Profil = Fiche club directement
- **Fonctionnalites :**
  - Creer/modifier fiche club complete
  - Gerer equipes (ajouter/modifier/supprimer)
  - Voir statistiques (nombre vues, favoris)
  - Upload photos club (5 max)

### Structure Firestore

```
users/                  → TOUS les comptes (user ET club)
  {userId}/
    - uid: string
    - email: string
    - displayName: string
    - photoURL?: string
    - role: 'user' | 'club'    ← IMPORTANT : determine type compte
    - createdAt: timestamp
    - updatedAt: timestamp

clubs/                  → Fiches clubs (liees par userId createur)
  {clubId}/
    - name: string
    - sport: string
    - logo?: string
    - description: string
    - address: {
        street: string
        city: string
        postalCode: string
        department: string
        departmentCode: string
        region: string
      }
    - coordinates: {
        latitude: number
        longitude: number
      }
    - contact: {
        phone?: string
        email?: string
        website?: string
      }
    - teams: [{               ← Array equipes
        id: string
        name: string
        gender: 'masculin' | 'feminin' | 'mixte'
        ageCategory: 'enfants' | 'ados' | 'adultes' | 'seniors'
        level: 'debutant' | 'intermediaire' | 'confirme'
        coach: {
          name: string
          phone?: string
          email?: string
        }
        schedule?: string      ← Ex: "Lundi 18h-20h, Mercredi 18h-20h"
      }]
    - photos: string[]        ← Max 5 photos
    - facilities: string[]    ← Ex: ["vestiaires", "parking", "douches"]
    - createdBy: string       ← userId du compte club
    - createdAt: timestamp
    - updatedAt: timestamp
    - verified: boolean       ← Validation admin future
    - stats: {                ← Pour statistiques
        views: number
        favorites: number
      }

favorites/              → Favoris utilisateurs (prive)
  {favoriteId}/
    - userId: string
    - clubId: string
    - createdAt: timestamp

searches/               → Historique recherches (prive RGPD)
  {searchId}/
    - userId: string
    - query: string
    - filters?: object
    - createdAt: timestamp
```

### Structure Pages Next.js (App Router)

```
app/
├── layout.tsx                    # Layout principal (Header, Footer)
├── page.tsx                      # Page d'accueil (carte interactive)
├── (auth)/
│   ├── login/page.tsx           # Page connexion
│   ├── register/page.tsx        # Page inscription (choix User/Club)
│   └── forgot-password/page.tsx # Mot de passe oublie
├── carte/page.tsx               # Page carte (meme que accueil)
├── recherche/page.tsx           # Page recherche avec filtres
├── favoris/page.tsx             # Page favoris utilisateur
├── clubs/
│   └── [clubId]/page.tsx        # Page detail club (SSR pour SEO)
├── profil/
│   ├── page.tsx                 # Profil utilisateur
│   └── edit/page.tsx            # Edition profil
├── dashboard/                    # Dashboard club
│   ├── layout.tsx               # Layout dashboard
│   ├── fiche/page.tsx           # Ma fiche club
│   ├── equipes/page.tsx         # Gestion equipes
│   ├── stats/page.tsx           # Statistiques
│   └── parametres/page.tsx      # Parametres compte
└── api/                         # API Routes
    ├── auth/[...nextauth].ts    # NextAuth.js (optionnel)
    └── clubs/route.ts           # API endpoints clubs
```

### Specifications Pages Detaillees

#### 🗺️ Page Carte (/)
- Carte interactive centree sur position utilisateur
- Marqueurs de TOUS les clubs (charges avec pagination/clustering)
- InfoWindow au clic sur marqueur :
  - Nom club
  - Sport
  - Distance
  - Lien "Voir details" → /clubs/[clubId]
- Bouton recentrage sur position utilisateur
- Accessible SANS connexion (page accueil)
- Header avec menu : Carte | Recherche | Favoris | Connexion

#### 📋 Page Detail Club (/clubs/[clubId])
- **SSR (Server-Side Rendering)** pour SEO optimal
- **En-tete** : Logo, nom, sport, distance, bouton favori ⭐
- **Contact rapide** : Boutons call/email/website/partage
- **Description** : Texte complet
- **Equipes disponibles** : Grille avec :
  - Nom equipe, genre, age, niveau
  - Coach (nom, phone, email)
  - Horaires
  - Bouton "Contacter entraineur"
- **Localisation** : Adresse + mini carte Google Maps
- **Equipements** : Liste installations
- **Photos** : Carrousel (5 photos max)
- **Actions** : Bouton "Signaler", Si createur → Bouton "Modifier"

#### 🔍 Page Recherche (/recherche)
- **Barre recherche** : Ville uniquement
- **Filtres** :
  - Sports par categorie (8 categories) OU sport individuel
  - Distance (slider 5-10-20-50-100km, France entiere)
  - Niveau (debutant/intermediaire/confirme)
  - Genre (masculin/feminin/mixte)
  - Age (enfants/ados/adultes/seniors)
- **Resultats** : Grille clubs (tri distance/pertinence)
- Clic sur club → /clubs/[clubId]

#### ⭐ Page Favoris (/favoris)
- Grille clubs favoris (responsive 1-3 colonnes)
- Chaque carte : photo, nom, sport, distance, bouton ❌
- **Tri** : Toggle Recent (defaut) / Proche
- **Filtres** : Modal filtres par sport
- Etat vide : Message + "Explorer les clubs" → /carte
- Clic sur club → /clubs/[clubId]

#### 📋 Dashboard Club (/dashboard/fiche)
- Apercu fiche complete (comme page detail club mais editable)
- Bouton "Modifier" → Modal/Page edition
- Sections modifiables : Infos, Contact, Localisation, Photos, Equipements

#### 👥 Dashboard Equipes (/dashboard/equipes)
- Grille equipes du club
- Chaque carte : nom, genre, age, niveau, coach, horaires
- Bouton "Ajouter equipe" → Modal
- Clic equipe → Modifier equipe
- Bouton supprimer

#### 📊 Dashboard Statistiques (/dashboard/stats)
- Nombre de vues fiche
- Nombre ajouts favoris
- Graphiques simples (optionnel futur)

#### ⚙️ Dashboard Parametres (/dashboard/parametres)
- Modifier email
- Modifier mot de passe
- Deconnexion
- Supprimer compte club

---

## 📊 TODOLIST

**Progression globale : 14/90 (16%)**

### ⏳ EN COURS (0)
_Aucune tache en cours_

### ⬜ A FAIRE (76)

#### 🚀 PHASE 1 : INITIALISATION NEXT.JS (1/15) ⬜
- [ ] [FEATURE] Initialiser projet Next.js 14+ avec TypeScript | Added: 02/12/2025
- [ ] [FEATURE] Configurer Tailwind CSS + theme (colors, typography, WCAG 2.1 AA) | Added: 02/12/2025
- [ ] [FEATURE] Installer dependances Firebase (auth, firestore, storage, analytics) | Added: 02/12/2025
- [ ] [FEATURE] Configurer Firebase client-side (.env.local avec credentials) | Added: 02/12/2025
- [ ] [CONFIG] Configurer variables environnement (.env.local) | Added: 02/12/2025
- [ ] [CONFIG] Configurer Google Maps JavaScript API | Added: 02/12/2025
- [ ] [FEATURE] Creer layout principal (Header, Footer) | Added: 02/12/2025
- [X] [FEATURE] Creer composants UI de base (Button, Input, Card) avec Tailwind | Completed: 03/12/2025
- [ ] [FEATURE] Setup i18n avec next-intl (fr, en) | Added: 02/12/2025
- [ ] [FEATURE] Creer ThemeProvider (clair/sombre) | Added: 02/12/2025
- [ ] [FEATURE] Setup Zustand pour state global | Added: 02/12/2025
- [ ] [FEATURE] Configurer ESLint + Prettier | Added: 02/12/2025
- [ ] [FEATURE] Setup Git et premier commit | Added: 02/12/2025
- [ ] [FEATURE] Setup tests (Jest + React Testing Library) | Added: 02/12/2025
- [ ] [FEATURE] Configurer SEO (metadata, sitemap.xml, robots.txt) | Added: 02/12/2025

#### 🔐 PHASE 2 : AUTHENTIFICATION CLUBS (5/9) ⬜
- [X] [FEATURE] Creer authService.ts (Firebase Auth client Email/Password, Google, Apple) | Completed: 03/12/2025
- [X] [FEATURE] Creer AuthContext avec hooks (useAuth) et userData Firestore | Completed: 03/12/2025
- [X] [FEATURE] Page Login (/login) - Espace Club uniquement | Completed: 03/12/2025
- [X] [FEATURE] Page Register (/register) - Inscription club (role='club' force) | Completed: 03/12/2025
- [X] [FEATURE] Page Forgot Password (/forgot-password) | Completed: 03/12/2025
- [ ] [CONFIG] Configurer Google Sign-In (OAuth credentials Firebase Console) | Added: 02/12/2025
- [ ] [CONFIG] Configurer Apple Sign-In (certificats Firebase Console) | Added: 02/12/2025
- [ ] [FEATURE] Middleware protection routes privees | Added: 02/12/2025
- [ ] [FEATURE] Redirection conditionnelle selon role (user/club) | Added: 02/12/2025

#### 👤 PHASE 3 : PROFILS UTILISATEURS (0/7) ⬜
- [ ] [FEATURE] Collection users/ Firestore | Added: 02/12/2025
- [ ] [FEATURE] Creer userService.ts | Added: 02/12/2025
- [ ] [FEATURE] Page Profil utilisateur (/profil) | Added: 02/12/2025
- [ ] [FEATURE] Page Edit Profil (/profil/edit) | Added: 02/12/2025
- [ ] [FEATURE] Upload photo de profil (Firebase Storage) | Added: 02/12/2025
- [ ] [FEATURE] Composant ImageUpload reutilisable | Added: 02/12/2025
- [ ] [FEATURE] API Route /api/users (CRUD utilisateurs) | Added: 02/12/2025

#### 🗺️ PHASE 4 : CARTE & GEOLOCALISATION (7/8) ✅
- [X] [FEATURE] Installer leaflet + react-leaflet + react-leaflet-cluster | Completed: 03/12/2025
- [X] [FEATURE] Creer composant MapView (Leaflet OpenStreetMap) | Completed: 03/12/2025
- [X] [FEATURE] Geolocalisation utilisateur integree (navigator.geolocation) | Completed: 03/12/2025
- [X] [FEATURE] Page Carte (/map) - page accueil (redirection depuis /) | Completed: 03/12/2025
- [X] [FEATURE] Centrer carte sur position utilisateur | Completed: 03/12/2025
- [X] [FEATURE] Bouton recentrage position | Completed: 03/12/2025
- [X] [FEATURE] Afficher marqueurs clubs sur carte (200 clubs generes) | Completed: 03/12/2025
- [X] [FEATURE] Clustering markers avec react-leaflet-cluster | Completed: 03/12/2025
- [ ] [FEATURE] Popup au clic marqueur (nom, sport, distance, lien) | Added: 02/12/2025

#### 🏅 PHASE 5 : CLUBS SPORTIFS (0/13) ⬜
- [ ] [FEATURE] Collection clubs/ Firestore (structure complete) | Added: 02/12/2025
- [ ] [FEATURE] Creer clubService.ts (CRUD complet) | Added: 02/12/2025
- [ ] [FEATURE] API Route /api/clubs (GET, POST, PUT, DELETE) | Added: 02/12/2025
- [ ] [FEATURE] Page Detail Club SSR (/clubs/[clubId]/page.tsx) | Added: 02/12/2025
- [ ] [FEATURE] generateStaticParams pour clubs populaires (ISR) | Added: 02/12/2025
- [ ] [FEATURE] Composant TeamCard (affichage equipe) | Added: 02/12/2025
- [ ] [FEATURE] Boutons contact dans page detail (call, email, website) | Added: 02/12/2025
- [ ] [FEATURE] Integration mini carte Google Maps dans detail | Added: 02/12/2025
- [ ] [FEATURE] Carrousel photos club (max 5 photos) | Added: 02/12/2025
- [ ] [FEATURE] Bouton favori dans page detail | Added: 02/12/2025
- [ ] [FEATURE] Bouton partage reseaux sociaux | Added: 02/12/2025
- [ ] [FEATURE] Bouton "Signaler" | Added: 02/12/2025
- [ ] [FEATURE] Tracking vues club pour statistiques | Added: 02/12/2025

#### 🔍 PHASE 6 : RECHERCHE & FILTRES (0/11) ⬜
- [ ] [FEATURE] Page Recherche (/recherche) | Added: 02/12/2025
- [ ] [FEATURE] Creer searchService.ts (recherche + filtres Firestore) | Added: 02/12/2025
- [ ] [FEATURE] Composant FilterPanel (sidebar filtres) | Added: 02/12/2025
- [ ] [FEATURE] Barre recherche ville (autocomplete) | Added: 02/12/2025
- [ ] [FEATURE] Filtre Sports par categories (8 categories) | Added: 02/12/2025
- [ ] [FEATURE] Filtre Sports individuels | Added: 02/12/2025
- [ ] [FEATURE] Filtre Distance (slider) | Added: 02/12/2025
- [ ] [FEATURE] Filtre Niveau | Added: 02/12/2025
- [ ] [FEATURE] Filtre Genre | Added: 02/12/2025
- [ ] [FEATURE] Filtre Age | Added: 02/12/2025
- [ ] [FEATURE] Grille resultats recherche (tri distance/pertinence) | Added: 02/12/2025

#### ⭐ PHASE 7 : FAVORIS (0/8) ⬜
- [ ] [FEATURE] Collection favorites/ Firestore | Added: 02/12/2025
- [ ] [FEATURE] Creer favoriteService.ts (add, remove, getByUserId) | Added: 02/12/2025
- [ ] [FEATURE] API Route /api/favorites | Added: 02/12/2025
- [ ] [FEATURE] Page Favoris (/favoris) | Added: 02/12/2025
- [ ] [FEATURE] Bouton Ajouter/Retirer favoris dans page detail | Added: 02/12/2025
- [ ] [FEATURE] Toggle tri (Recent / Proche) | Added: 02/12/2025
- [ ] [FEATURE] Filtres par sport | Added: 02/12/2025
- [ ] [FEATURE] Etat vide avec CTA | Added: 02/12/2025

#### 🏢 PHASE 8 : DASHBOARD CLUB (0/14) ⬜
- [ ] [FEATURE] Layout Dashboard (/dashboard/layout.tsx) | Added: 02/12/2025
- [ ] [FEATURE] Navigation Dashboard (4 pages) | Added: 02/12/2025
- [ ] [FEATURE] Page Ma Fiche (/dashboard/fiche) | Added: 02/12/2025
- [ ] [FEATURE] Page Edit Fiche (/dashboard/fiche/edit) | Added: 02/12/2025
- [ ] [FEATURE] Page Equipes (/dashboard/equipes) | Added: 02/12/2025
- [ ] [FEATURE] Modal/Page Ajouter Equipe | Added: 02/12/2025
- [ ] [FEATURE] Modal/Page Modifier Equipe | Added: 02/12/2025
- [ ] [FEATURE] Suppression equipe avec confirmation | Added: 02/12/2025
- [ ] [FEATURE] Page Statistiques (/dashboard/stats) | Added: 02/12/2025
- [ ] [FEATURE] Page Parametres (/dashboard/parametres) | Added: 02/12/2025
- [ ] [FEATURE] Middleware restriction acces dashboard (role='club' uniquement) | Added: 02/12/2025
- [ ] [FEATURE] Inscription club multi-etapes (6 etapes) | Added: 02/12/2025
- [ ] [FEATURE] Upload photos club (max 5) | Added: 02/12/2025
- [ ] [FEATURE] Upload logo club | Added: 02/12/2025

#### 📊 PHASE 9 : ANALYTICS (0/3) ⬜
- [ ] [FEATURE] Setup Firebase Analytics | Added: 02/12/2025
- [ ] [FEATURE] Setup Google Analytics 4 | Added: 02/12/2025
- [ ] [FEATURE] Tracker evenements (inscription, recherche, consultation, partage, favoris) | Added: 02/12/2025

#### 📤 PHASE 10 : EXPORT DONNEES (RGPD) (0/5) ⬜
- [ ] [FEATURE] Collection searches/ (historique recherches) | Added: 02/12/2025
- [ ] [FEATURE] Creer exportService.ts | Added: 02/12/2025
- [ ] [FEATURE] API Route /api/export (JSON, PDF, CSV) | Added: 02/12/2025
- [ ] [FEATURE] Page Export Donnees (/profil/export) | Added: 02/12/2025
- [ ] [FEATURE] Generation PDF/CSV cote serveur | Added: 02/12/2025

#### ⚡ PHASE 11 : CLOUD FUNCTIONS (0/4) ⬜
- [ ] [BACKEND] Cloud Function onUserCreated (email bienvenue) | Added: 02/12/2025
- [ ] [BACKEND] Cloud Function onClubCreated | Added: 02/12/2025
- [ ] [BACKEND] Cloud Function onPhotoUploaded (compression) | Added: 02/12/2025
- [ ] [BACKEND] Cron job cleanOldSearches (RGPD) | Added: 02/12/2025

#### 🔒 PHASE 12 : SECURITE (0/5) ⬜
- [ ] [SECURITY] Generer Firestore Rules (users, clubs, favorites, searches) | Added: 02/12/2025
- [ ] [SECURITY] Generer Storage Rules (photos profils + clubs) | Added: 02/12/2025
- [ ] [SECURITY] Validation donnees cote API Routes | Added: 02/12/2025
- [ ] [SECURITY] Rate limiting API Routes | Added: 02/12/2025
- [ ] [SECURITY] Setup CORS et CSP (Content Security Policy) | Added: 02/12/2025

#### 📄 PHASE 13 : DOCUMENTS LEGAUX (0/3) ⬜
- [ ] [DOCS] Generer CGU (Conditions Generales d'Utilisation) | Added: 02/12/2025
- [ ] [DOCS] Generer Politique de Confidentialite (RGPD) | Added: 02/12/2025
- [ ] [DOCS] Creer pages /cgu et /confidentialite | Added: 02/12/2025

#### 🧪 PHASE 14 : TESTS (0/4) ⬜
- [ ] [TEST] Tests unitaires services (auth, club, favorite) | Added: 02/12/2025
- [ ] [TEST] Tests integration API Routes | Added: 02/12/2025
- [ ] [TEST] Tests composants (Jest + React Testing Library) | Added: 02/12/2025
- [ ] [TEST] Tests accessibilite (axe-core) | Added: 02/12/2025

#### 🎨 PHASE 15 : RESPONSIVE MOBILE (0/5) ⬜
- [ ] [FEATURE] Adapter Header pour mobile (hamburger menu) | Added: 02/12/2025
- [ ] [FEATURE] Adapter carte pour mobile (touch gestures) | Added: 02/12/2025
- [ ] [FEATURE] Adapter filtres recherche pour mobile (bottom sheet) | Added: 02/12/2025
- [ ] [FEATURE] Adapter grilles pour mobile (1 colonne) | Added: 02/12/2025
- [ ] [TEST] Tests responsive (breakpoints Tailwind) | Added: 02/12/2025

#### 🚀 PHASE 16 : DEPLOIEMENT (0/6) ⬜
- [ ] [DEPLOY] Configurer Vercel ou Firebase Hosting | Added: 02/12/2025
- [ ] [DEPLOY] Configurer domaine custom (clubsportfrance.com) | Added: 02/12/2025
- [ ] [DEPLOY] Setup CI/CD (GitHub Actions) | Added: 02/12/2025
- [ ] [DEPLOY] Deployer Cloud Functions | Added: 02/12/2025
- [ ] [DEPLOY] Deployer Firestore Rules | Added: 02/12/2025
- [ ] [DEPLOY] Deployer Storage Rules | Added: 02/12/2025

### ✅ TERMINE (14)

**Phase 1 (1/15):**
- [X] [FEATURE] Creer composants UI de base (Button, Input, Card) avec Tailwind | Completed: 03/12/2025

**Phase 2 (5/9):**
- [X] [FEATURE] Creer authService.ts (Firebase Auth Email/Password, Google, Apple) | Completed: 03/12/2025
- [X] [FEATURE] Creer AuthContext avec hooks (useAuth) et userData Firestore | Completed: 03/12/2025
- [X] [FEATURE] Page Login (/login) - Espace Club uniquement | Completed: 03/12/2025
- [X] [FEATURE] Page Register (/register) - Inscription club (role='club' force) | Completed: 03/12/2025
- [X] [FEATURE] Page Forgot Password (/forgot-password) | Completed: 03/12/2025

**Phase 4 (7/8):**
- [X] [FEATURE] Installer leaflet + react-leaflet + react-leaflet-cluster | Completed: 03/12/2025
- [X] [FEATURE] Creer composant MapView (Leaflet OpenStreetMap) | Completed: 03/12/2025
- [X] [FEATURE] Geolocalisation utilisateur integree | Completed: 03/12/2025
- [X] [FEATURE] Page Carte (/map) - page accueil | Completed: 03/12/2025
- [X] [FEATURE] Centrer carte sur position utilisateur | Completed: 03/12/2025
- [X] [FEATURE] Bouton recentrage position | Completed: 03/12/2025
- [X] [FEATURE] Afficher marqueurs clubs sur carte (200 clubs generes) | Completed: 03/12/2025
- [X] [FEATURE] Clustering markers avec react-leaflet-cluster | Completed: 03/12/2025

---

## 📅 JOURNAL DE DEVELOPPEMENT

### 03/12/2025 14:20 - Nettoyage arborescence projet (v0.3.1)
- 🧹 **REFACTORING ARBORESCENCE** : Organisation propre et claire du repository
- **Structure finale** :
  - **TestProject/** (repo parent) :
    - Documentation universelle (guides/, templates/)
    - Config Firebase (firebaserc, firebase.json, firestore.rules, firestore.indexes.json)
    - Documentation Claude (CLAUDE.md, CONTRIBUTING.md)
  - **clubsportfrance/** (sous-repo Git) :
    - Projet Next.js complet avec tout le code
    - Tous les fichiers essentiels (.md, config, src/, public/)
- **Fichiers deplaces vers clubsportfrance/** :
  - PROJECT.md, CHANGELOG.md, README.md (documentation projet)
  - ANALYSE_CODE_EXISTANT.md (analyse technique)
  - storage.rules (regles Firebase Storage pour plus tard)
  - package.json, tsconfig.json, next.config.ts, eslint.config.mjs, postcss.config.mjs
  - src/ et public/ (code et assets)
- **Fichiers supprimes** :
  - ClubSportFrance_backup_mobile/ (backup React Native)
  - Debugscreen/ (screenshots debug)
  - Tous les fichiers dupliques a la racine
- **Avantages** :
  - Arborescence claire et logique
  - Separation documentation universelle vs projet specifique
  - Facile a naviguer dans Fork
  - Sous-repo Git pour clubsportfrance/ (gitignore dans parent)
- **Progression** : Pas de changement fonctionnel, juste organisation

### 03/12/2025 12:00 - Authentification clubs complete (v0.3.0)
- 🔐 **SYSTEME AUTHENTIFICATION CLUBS** : Systeme complet pour les comptes clubs
- **Architecture decisionnelle** :
  - **IMPORTANT** : Seuls les clubs ont besoin de se connecter (role='club' force)
  - Les utilisateurs reguliers acceent a TOUT sans authentification (carte, recherche, detail clubs)
  - Navigation map : Bouton "Se connecter" → "Espace Club" pour clarifier
- **Services implementes** :
  - authService.ts complet :
    - Email/Password avec createUserWithEmailAndPassword
    - Google Sign-In (signInWithPopup + GoogleAuthProvider)
    - Apple Sign-In (signInWithPopup + OAuthProvider)
    - Mot de passe oublie (sendPasswordResetEmail)
    - Creation automatique doc Firestore users/ lors inscription
    - getUserData pour recuperer userData depuis Firestore
  - Validation : isValidEmail, validatePassword, passwordsMatch
- **Context Auth** :
  - AuthContext avec user (Firebase Auth) + userData (Firestore avec role)
  - Hook useAuth expose toutes les methodes auth
  - Auto-fetch userData sur auth state change
- **Composants UI** :
  - Button : variants (primary/secondary/danger/ghost), tailles, loading state, fullWidth
  - Input : label, error, helperText, fullWidth
  - Card : container reutilisable
- **Pages authentification** :
  - /login : Email/Password + Google + Apple, redirection /dashboard
  - /register : Inscription club avec clubName + email + password + confirm, role='club' FORCE
  - /forgot-password : Envoi email reinitialisation
  - Fix word-wrapping : min-w-[400px] sur containers pour eviter retours ligne
- **A completer** :
  - Configuration OAuth dans Firebase Console (Google + Apple)
  - Middleware protection routes /dashboard/*
  - Creation route /dashboard (actuellement inexistante)
- **Progression** : Phase 2 Authentification 5/9 taches (56%)

### 03/12/2025 10:30 - Implementation carte interactive Leaflet
- 🗺️ **CARTE INTERACTIVE COMPLETE** : Page principale avec carte OpenStreetMap
- **Technologies** :
  - Leaflet 1.9.4 + react-leaflet pour l'integration React
  - OpenStreetMap tiles (gratuit, sans API key)
  - react-leaflet-cluster pour le clustering de markers
- **Fonctionnalites implementees** :
  - Carte centree sur la France (lat 46.6, lng 1.9, zoom 6)
  - Geolocalisation utilisateur automatique (navigator.geolocation API)
  - Bouton recentrage sur position utilisateur
  - 200 clubs generes aleatoirement pour demo :
    - 15 sports avec emojis (⚽🎾🏀🏊🏐🏉🤾🚴🏃🧗🥊🥋🏇⛳⛷️)
    - 35 villes francaises
    - Coordonnees lat 42-51, lng -5 a 8
  - Markers personnalises (pin rouge avec emoji du sport)
  - Marker utilisateur personnalise (pin bleu avec 📍)
  - Clustering intelligent :
    - Cluster small (< 50 clubs): bleu semi-transparent
    - Cluster medium (50-99 clubs): orange semi-transparent
    - Cluster large (100+ clubs): rouge semi-transparent
    - Opacite 50% pour voir la carte en dessous
  - Popup au clic sur marker (nom club, sport, emoji)
  - Legende explicative en overlay
  - Redirection depuis / vers /map
- **Corrections effectuees** :
  - Fix SSR : dynamic import avec ssr: false pour Leaflet
  - Fix CSS : import styles react-leaflet-cluster manquants
  - Fix override styles : !important pour forcer les styles personnalises
- **Progression** : Phase 4 Carte & Geolocalisation 7/8 taches (87%)
- **Prochaine etape** : Remplacer clubs mock par vraie data Firestore

### 02/12/2025 15:00 - Decision transformation site web Next.js
- 🔄 **TRANSFORMATION MAJEURE** : Passage de React Native/Expo a Next.js site web
- **Raison** : Besoin d'un site web uniquement, pas d'application mobile
- **Stack choisie** :
  - Next.js 14+ (React + App Router + SSR)
  - Tailwind CSS (styling)
  - Firebase (backend identique)
  - Google Maps JavaScript API (au lieu de react-native-maps)
- **Focus** : Desktop prioritaire, responsive mobile plus tard
- **Actions** :
  - Backup projet React Native dans ClubSportFrance_backup_mobile/
  - Mise a jour PROJECT.md pour site web
  - Transformation de tous les guides .md en cours
  - Nouvelle TodoList avec 90 taches
- **Progression** : 0/90 (0%) - Reinitialisation complete

---

## 🎯 DECISIONS TECHNIQUES

### Architecture
- **Framework :** Next.js 16.0.6 (App Router)
- **Rendering :** SSR (Server-Side Rendering) pour pages publiques (SEO), CSR (Client-Side) pour dashboard
- **State Management :** Zustand pour global, Context API pour features specifiques (auth, theme)
- **Routing :** Next.js App Router (file-based routing)
- **Styling :** Tailwind CSS v4 + theme system (WCAG 2.1 AA)
- **Maps :** Leaflet 1.9.4 + react-leaflet + react-leaflet-cluster
  - **Choix Leaflet vs Google Maps** :
    - ✅ Gratuit et open source (OpenStreetMap)
    - ✅ Pas de cle API requise
    - ✅ Pas de quota/limite
    - ✅ Personnalisation CSS facile (markers, clusters)
    - ✅ Performance excellente (tiles CDN OpenStreetMap)
    - ✅ Clustering natif avec react-leaflet-cluster
    - ❌ Moins de features que Google Maps (Street View, Places API)
    - Note : Google Maps pourra etre ajoute plus tard si besoin

### Firebase
- **Auth :** Email/Password + Google + Apple Sign-In
- **Firestore Collections :**
  - **users/** (TOUS les comptes avec role: 'user' | 'club')
  - **clubs/** (fiches clubs sportifs)
  - **favorites/** (clubs favoris utilisateurs)
  - **searches/** (historique recherches RGPD)
- **Storage Structure :**
  - users/{userId}/profile.jpg
  - clubs/{clubId}/logo.jpg
  - clubs/{clubId}/photos/{photoId}.jpg
- **Cloud Functions :**
  - onUserCreated (email bienvenue)
  - onClubCreated
  - onPhotoUploaded (compression)
  - cleanOldSearches (cron RGPD)

### Performance
- **SSR pour SEO** : Pages publiques (/, /clubs/[clubId], /recherche)
- **ISR (Incremental Static Regeneration)** : Pages clubs populaires
- **Image Optimization** : Next.js Image component + compression Firebase
- **Code Splitting** : Automatique avec App Router
- **Caching** : React Server Components cache + SWR pour client

### Accessibilite
- **Niveau conformite :** WCAG 2.1 AA
- **HTML semantique** : nav, main, section, article, etc.
- **Attributs ARIA** : labels, roles, states
- **Contrastes conformes :** ≥ 4.5:1 (texte), ≥ 3:1 (UI)
- **Navigation clavier** : Focus visible sur tous elements interactifs
- **Tests automatises** : axe-core

### Regles Firestore
- **users/** : Public visible (lecture: tous auth, modification: owner uniquement)
- **clubs/** : Contributif libre (lecture: tous meme non-auth pour SEO, creation: auth role='club', modification: createur uniquement)
- **favorites/** : Prive (lecture/ecriture: owner uniquement)
- **searches/** : Prive RGPD (lecture/ecriture: owner uniquement)

### SEO
- **Metadata dynamique** : generateMetadata pour chaque page
- **Sitemap.xml** : Generation automatique
- **Robots.txt** : Allow all + sitemap reference
- **Open Graph** : og:image, og:title, og:description pour partage social
- **Structured Data** : JSON-LD pour clubs (LocalBusiness schema)

---

## 🐛 PROBLEMES CONNUS

_Aucun probleme connu pour le moment_

---

**Derniere mise a jour par Claude Code le 03/12/2025**

🤖 _Genere avec [Claude Code](https://claude.com/claude-code)_
