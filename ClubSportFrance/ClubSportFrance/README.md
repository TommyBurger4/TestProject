# 📱 ClubSportFrance

> Carte interactive repertoriant tous les clubs de sport en France - iOS, Android & Web

**Public cible :** Francais en general + internationaux voulant rejoindre des clubs en France

**Editeur :** Topal - Strasbourg, France

**Status :** 🚧 En cours d'initialisation

**Version :** 0.1.0 (Build 1)

---

## 🎯 Description

ClubSportFrance est une application mobile et web permettant de :
- **Decouvrir** tous les clubs sportifs en France sur une carte interactive
- **Rechercher** des clubs par sport, ville, departement et niveau
- **Contacter** les clubs via messagerie privee
- **Sauvegarder** ses clubs favoris
- **Partager** les clubs sur les reseaux sociaux

---

## ✨ Fonctionnalites

### 🗺️ Carte Interactive
- Carte Google Maps avec tous les clubs de France
- Geolocalisation pour centrer sur votre position
- Marqueurs cliquables pour afficher details clubs

### 🔍 Recherche Avancee
- Recherche par nom de club
- Filtres multiples : sport, ville, departement, niveau
- Infinite scroll pour parcourir les resultats

### 👤 Profils
- Profils utilisateurs publics (photo, nom)
- Profils clubs detailles (logo, photos installations, contact)
- Systeme contributif : tous peuvent ajouter des clubs

### 💬 Messagerie
- Chat 1-to-1 prive entre utilisateurs
- Messages texte uniquement
- Notifications push a reception

### ⭐ Favoris
- Sauvegarder vos clubs preferes
- Acces rapide depuis votre profil

### 🔗 Partage Social
- Partager clubs sur Facebook, Instagram, Twitter
- Deep linking vers profils clubs
- URL directes vers clubs specifiques

### 📤 Export Donnees (RGPD)
- Export complet de vos donnees personnelles
- Formats : JSON, PDF, CSV

### ♿ Accessibilite
- Conformite WCAG 2.1 niveau AA
- Support VoiceOver (iOS) et TalkBack (Android)
- Contrastes couleurs optimises

---

## 🏗️ Technologies

### Frontend
- **Framework :** React Native + Expo v54
- **Langage :** TypeScript (strict mode)
- **Navigation :** React Navigation v7
- **State Management :** Zustand + Context API
- **Carte :** react-native-maps (Google Maps)
- **Styling :** StyleSheet natif + theme system
- **Animations :** React Native Reanimated 3
- **i18n :** expo-localization + i18n-js (francais, anglais)
- **Web :** React Native Web

### Backend
- **BaaS :** Firebase
  - Authentication (Email, Google, Apple)
  - Firestore Database
  - Storage (photos/videos)
  - Cloud Functions (emails, notifications, compression)
  - Analytics
  - Hosting (version Web)

### Tests
- **Unit :** Jest + React Native Testing Library
- **E2E :** Detox
- **Accessibilite :** Tests automatises WCAG 2.1

### CI/CD
- **Build :** EAS Build
- **Deploy :** EAS Submit + Firebase Hosting

---

## 📱 Plateformes

- **iOS** : iPhone, iPad (App Store)
- **Android** : Smartphones, tablettes (Play Store)
- **Web** : Desktop, tablettes (clubsportfrance.web.app)

**Note :** Version Web complete avec toutes les fonctionnalites mobiles.

---

## 🚀 Installation (Developpement)

### Prerequis

- Node.js 18+
- npm ou yarn
- Git
- Expo CLI (`npm install -g expo-cli`)
- EAS CLI (`npm install -g eas-cli`)
- Compte Firebase

### Etapes

```bash
# Cloner le repo
git clone [URL_REPO]
cd ClubSportFrance

# Installer les dependances
npm install

# Copier .env.example vers .env
cp .env.example .env

# Ajouter vos credentials Firebase dans .env
# (voir .env.example pour format)

# Lancer l'app
npm start

# Ou specifique plateforme
npm run ios       # iOS Simulator
npm run android   # Android Emulator
npm run web       # Navigateur Web
```

---

## 📊 Collections Firestore

- **users/** - Profils utilisateurs (public visible)
- **clubs/** - Base de donnees clubs sportifs
- **conversations/** + **messages/** - Chat prive
- **favorites/** - Clubs favoris par user
- **searches/** - Historique recherches (RGPD)

---

## 🔒 Securite

- Firestore Rules strictes (par collection)
- Storage Rules pour photos
- Validation donnees cote Cloud Functions
- Rate limiting sur API
- Credentials Firebase dans .env (jamais commite)
- Conformite RGPD (export donnees, suppression compte)

---

## 📄 Documentation

- **PROJECT.md** - Memoire permanente du projet (TodoList, journal, decisions)
- **CHANGELOG.md** - Historique des versions
- **CONTRIBUTING.md** - Guide de contribution
- **docs/** - Documentation technique detaillee

---

## 👥 Contribution

Les contributions sont les bienvenues ! Voir **CONTRIBUTING.md** pour details.

**Regles importantes :**
- Commentaires en francais SANS accents
- Code en anglais
- TypeScript strict mode
- Tests pour logique critique
- Accessibilite WCAG 2.1 AA

---

## 📄 Licence

**Proprietaire** - Topal, Strasbourg, France

**Responsable legal :** Tom Burger
**Contact :** contact@topal.fr

---

## 🔗 Liens

- **Version Web :** clubsportfrance.web.app (bientot disponible)
- **App Store :** (bientot disponible)
- **Play Store :** (bientot disponible)

---

## 📝 Mentions Legales

**Editeur :** Topal
**Adresse :** 4 Boulevard de Metz, 67000 Strasbourg, France
**SIRET :** En cours d'obtention
**Email :** contact@topal.fr
**DPO :** Tom Burger

**Hebergeur :** Firebase (Google LLC)

---

**Cree le 03/11/2025**

🤖 _Genere avec [Claude Code](https://claude.com/claude-code)_
