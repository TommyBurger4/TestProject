# 🌐 ClubSportFrance (Site Web Next.js)

> Carte interactive repertoriant tous les clubs de sport en France

**Public cible :** Francais en general + internationaux voulant rejoindre des clubs en France

**Editeur :** Topal - Strasbourg, France

**Status :** 🚧 En cours de developpement - Phase 1/15 completee

**Version :** 0.1.0

---

## 🎯 Description

ClubSportFrance est un site web permettant de :
- **Decouvrir** tous les clubs sportifs en France sur une carte interactive
- **Rechercher** des clubs par sport, ville, departement et niveau
- **Contacter** les clubs via messagerie privee
- **Sauvegarder** ses clubs favoris
- **Partager** les clubs sur les reseaux sociaux

---

## 🏗️ Stack Technique

### Frontend
- **Framework :** Next.js 16 (App Router + React 19)
- **Langage :** TypeScript (strict mode)
- **Styling :** Tailwind CSS v4
- **State Management :** Zustand + Context API
- **Carte :** Google Maps JavaScript API
- **Animations :** Framer Motion
- **i18n :** next-intl (francais, anglais)

### Backend
- **BaaS :** Firebase
  - Authentication (Email, Google, Apple)
  - Firestore Database
  - Storage (photos/videos)
  - Cloud Functions
  - Analytics

### Deploiement
- **Hosting :** Vercel
- **CI/CD :** GitHub Actions

---

## 🚀 Installation (Developpement)

### Prerequis
- Node.js 18+
- npm
- Git
- Compte Firebase

### Etapes

```bash
# Cloner le repo
git clone https://github.com/TommyBurger4/TestProject.git
cd TestProject/clubsportfrance

# Installer les dependances
npm install

# Copier .env.example vers .env.local
cp .env.example .env.local

# Ajouter vos credentials Firebase dans .env.local

# Lancer le serveur de developpement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur pour voir le resultat.

---

## 📁 Structure du Projet

```
clubsportfrance/
├── src/
│   ├── app/              # Pages Next.js (App Router)
│   ├── components/       # Composants React reutilisables
│   │   └── ui/           # Composants UI de base
│   ├── services/         # Services Firebase
│   │   ├── firebase/     # Configuration Firebase
│   │   ├── auth/         # Service d'authentification
│   │   ├── user/         # Service utilisateur
│   │   └── image/        # Service upload images
│   ├── hooks/            # Hooks React personnalises
│   ├── contexts/         # Context providers
│   └── lib/              # Utilitaires
├── public/               # Fichiers statiques
└── .env.local            # Variables d'environnement (non commite)
```

---

## 📊 Collections Firestore

- **users/** - Profils utilisateurs
- **clubs/** - Base de donnees clubs sportifs
- **conversations/** + **messages/** - Chat prive
- **favorites/** - Clubs favoris par user

---

## 🔒 Securite

- Firestore Rules strictes par collection
- Storage Rules pour photos
- Validation donnees cote Cloud Functions
- Credentials Firebase dans .env.local (jamais commite)
- Conformite RGPD (export donnees, suppression compte)

---

## 📄 Documentation

- **ANALYSE_CODE_EXISTANT.md** - Analyse complete du code React Native + TodoList
- **PROJECT.md** - Memoire permanente du projet (pas encore cree)
- **CHANGELOG.md** - Historique des versions (pas encore cree)
- **CONTRIBUTING.md** - Guide de contribution

---

## 📝 Progression

**Phase 1/15 : Initialisation** ✅ TERMINEE
- Next.js initialise avec TypeScript + Tailwind
- Firebase configure (Auth, Firestore, Storage)
- Structure de dossiers creee
- Theme Tailwind personnalise
- Page d'accueil temporaire

**Phase 2/15 : Services & Authentification** (en cours)

---

## 👥 Contribution

Les contributions sont les bienvenues ! Voir **CONTRIBUTING.md** pour details.

**Regles importantes :**
- Commentaires en francais SANS accents
- Code en anglais
- TypeScript strict mode
- Conventions de commits (feat, fix, docs, etc.)

---

## 📄 Licence

**Proprietaire** - Topal, Strasbourg, France

**Responsable legal :** Tom Burger
**Contact :** contact@topal.fr

---

## 🔗 Liens

- **GitHub :** https://github.com/TommyBurger4/TestProject
- **Version Web :** https://clubsportfrance.vercel.app (bientot)

---

**Cree le 02/12/2025**

🤖 _Genere avec [Claude Code](https://claude.com/claude-code)_
