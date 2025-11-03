# 📋 CHANGELOG - ClubSportFrance

Toutes les modifications notables de ce projet seront documentees dans ce fichier.

Le format est base sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet respecte [Semantic Versioning](https://semver.org/lang/fr/).

---

## [Non publie]

### En cours
- Initialisation du projet en cours...

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

**Derniere mise a jour :** 03/11/2025
