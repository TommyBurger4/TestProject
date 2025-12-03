# 🔄 WORKFLOW COMPLET POUR CLAUDE

> **Guide étape par étape pour initialiser un nouveau projet Next.js**

**⚠️ IMPORTANT :** Ce workflow integre desormais l'**approche incrementale** pour les fichiers MD. Voir **16_INCREMENTAL_UPDATES.md** pour details complets.

---

## 📋 Ordre d'Exécution EXACT

Quand un développeur dit **"Je veux créer un nouveau site web"**, voici l'ordre **EXACT** à suivre :

```
┌─────────────────────────────────────────────────┐
│ ETAPE 1 : QUESTIONS ONBOARDING (Section 2)     │
│ Poser les 16 questions UNE PAR UNE             │
│ Attendre réponse à chaque question             │
│ ⚠️ NOUVEAU : Mettre a jour PROJECT.md et       │
│ README.md IMMEDIATEMENT apres chaque reponse   │
│ (voir 16_INCREMENTAL_UPDATES.md)               │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│ ETAPE 2 : REFORMULATION ET VALIDATION         │
│ 1. Reformuler CLAIREMENT toutes les reponses  │
│ 2. Structurer par categories (plateformes,    │
│    fonctionnalites, accessibilite, etc.)       │
│ 3. Detecter automatiquement les collections   │
│ 4. Proposer architecture technique prevue     │
│ 5. DEMANDER CONFIRMATION explicite            │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│ ETAPE 3 : COLLECTE INFOS LEGALES (Section 31)  │
│ Poser questions sur l'entreprise (nom, SIRET)  │
│ Demander hébergeur, DPO, etc.                  │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│ ETAPE 4 : PROPOSITION PATTERNS FIRESTORE       │
│ 1. Detection auto collections selon features   │
│ 2. Pour chaque collection, proposer patterns   │
│    (A: CRUD complet, B: Moderation admin, etc.)│
│ 3. Demander au dev de choisir pattern          │
│ 4. Permettre personnalisation si besoin        │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│ ETAPE 5 : RECAPITULATIF COMPLET                │
│ "Voici ce que je vais créer : ..."            │
│ Lister toutes les fonctionnalités détectées   │
│ Demander validation finale                     │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│ ETAPE 6 : SETUP FIREBASE CONSOLE              │
│ 🔥 NOUVEAU : Voir 17_FIREBASE_SETUP_GUIDE.md  │
│                                                 │
│ 1. Demander si projet Firebase existe         │
│ 2. Guider creation projet Firebase            │
│ 3. Activer services (Auth, Firestore, Storage)│
│ 4. Recuperer config WEB (7 credentials)       │
│ 5. Valider credentials                         │
│ 6. Confirmer avant de continuer               │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│ ETAPE 7 : DEMANDE PERMISSION GLOBALE           │
│ "Je vais maintenant initialiser le projet     │
│  avec Next.js + TypeScript + Firebase.        │
│  Es-tu d'accord ?"                             │
│ ATTENDRE CONFIRMATION                          │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│ ETAPE 8 : INIT PROJET (Section 3)             │
│ npx create-next-app                            │
│ Installation dépendances                        │
│ Creer fichier .env.local avec credentials     │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│ ETAPE 9 : GENERATION CODE                       │
│ Créer architecture (par feature)               │
│ Générer documents légaux (CGU, Politique)     │
│ Générer Firestore Rules                        │
│ Copier PROJECT.md deja genere                  │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│ ETAPE 10 : VERIFICATION                        │
│ npm run build                                   │
│ npm run lint                                    │
│ npm run type-check (si configure)               │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│ ETAPE 11 : PREMIER COMMIT                      │
│ Proposer message de commit                     │
│ Demander confirmation                           │
│ git init && git add . && git commit           │
└─────────────────────────────────────────────────┘
                    ↓
         ✅ PROJET PRET !
```

---

## 💬 Exemple de Dialogue EXACT

```
DEV: "Je veux créer un nouveau site web"

CLAUDE: "Parfait ! Je vais te poser 16 questions pour comprendre ton projet.

🎯 Question 1/16 : Informations de base

1. Quel est le nom du projet ?
2. Description en une phrase ?
3. Public cible (utilisateurs finaux) ?"

DEV: "MonApp - Un site de partage de recettes - Grand public 25-55 ans"

CLAUDE:
[CREE PROJECT.md avec nom, description, public cible]
[CREE README.md initial]

"✅ PROJECT.md et README.md crees avec ces informations.

🔐 Question 2/16 : Authentification

Quel type d'authentification souhaitez-vous ?
a) Email/Password uniquement
b) Email + Google + Apple Sign-In
c) Anonyme (pas de compte)
d) Autre"

DEV: "b"

CLAUDE:
[MET A JOUR PROJECT.md section Authentification]

"✅ PROJECT.md mis a jour (Auth: Email + Google + Apple).

💰 Question 3/16 : Monetisation..."

[... suite des 16 questions avec mises a jour incrementales apres CHAQUE reponse ...]

CLAUDE (après toutes les questions ET mises a jour incrementales): "Merci ! Laisse-moi reformuler ce que j'ai compris :

📱 INFORMATIONS GENERALES
- Nom : MonApp
- Type : Partage de recettes
- Public cible : Grand public 25-55 ans

🎯 PLATEFORMES CIBLEES
- Desktop (prioritaire)
- Mobile (responsive design)

♿ ACCESSIBILITE
- WCAG 2.1 niveau AA (conformite standard)

🔐 AUTHENTIFICATION
- Email + Google + Apple Sign-In

✅ FONCTIONNALITES DETECTEES AUTOMATIQUEMENT :
- Stockage : Photos (recettes)
- Recherche : Recherche avancée avec filtres
- Notifications : Oui (nouveaux followers, commentaires)
- Analytics : Firebase Analytics
- Chat : Non
- Paiements : Freemium (recettes premium)

📋 FONCTIONNALITES CUSTOM :
- Système de notation des recettes
- Partage sur réseaux sociaux

🏗️ ARCHITECTURE TECHNIQUE PREVUE
- Next.js 14+ (App Router) + TypeScript
- Firebase (Auth, Firestore, Storage, Analytics)
- Zustand (state management)
- Tailwind CSS (styling)
- Google Maps JavaScript API (si geolocalisation)
- Tests : Jest + Playwright E2E
- Accessibilite : WCAG 2.1 AA
- Deployment : Vercel

Est-ce que tout est correct ?"

DEV: "Oui parfait"

CLAUDE: "Super ! Maintenant j'ai besoin d'informations légales pour générer
les CGU et la Politique de Confidentialité.

Quel est le nom de votre entreprise ?"

DEV: "SARL RecettesCo"

CLAUDE: "Adresse complète de l'entreprise ?"

[... collecte infos légales complète ...]

CLAUDE: "Parfait ! Dernière étape : Firestore Rules.

J'ai detecte les collections necessaires selon tes fonctionnalites :
✅ users (authentification)
✅ recipes (partage recettes)
✅ ratings (systeme notation)
✅ favorites (favoris)

Pour chaque collection, je vais te proposer des patterns de securite.

📦 Collection `recipes`
Champs : userId, title, description, imageUrl, ingredients, steps, createdAt

Regles Firestore - Choisis un pattern :

A) Reseau social classique (recommande)
   - Lecture : Tous
   - Creation : Authentifies
   - Modification : Auteur uniquement
   - Suppression : Auteur uniquement

B) Plateforme moderee
   - Lecture : Tous
   - Creation : Authentifies
   - Modification : Auteur uniquement
   - Suppression : Admins uniquement

C) Archive permanente
   - Lecture : Tous
   - Creation : Authentifies
   - Modification : Auteur (soft delete)
   - Suppression : Interdite

D) Personnalise
   - Tu me dis exactement ce que tu veux

Quel pattern pour `recipes` ? (A, B, C ou D)"

DEV: "A"

CLAUDE: "✅ Pattern A applique pour `recipes`.

📦 Collection `ratings`
Champs : userId, recipeId, rating, comment, createdAt
Particularite : Un user ne peut noter qu'une fois par recette

Regles Firestore :

A) Notation modifiable (recommande)
   - Lecture : Tous
   - Creation : Auth (1 par user/recette)
   - Modification : Auteur uniquement
   - Suppression : Auteur uniquement

B) Notation permanente
   - Lecture : Tous
   - Creation : Auth (1 par user/recette)
   - Modification : Interdite
   - Suppression : Interdite

Quel pattern pour `ratings` ? (A ou B)"

DEV: "A"

CLAUDE: "✅ Pattern A applique pour `ratings`.

📦 Collection `favorites`
Pattern automatique : Prive (owner only)
✅ Applique automatiquement."

[... tous les patterns sont definis ...]

CLAUDE: "Excellent ! Voici le RECAPITULATIF COMPLET :

=== PROJET : MonApp ===

📱 CONFIGURATION :
- Next.js 14+ (App Router) + TypeScript
- Firebase (Auth + Firestore + Storage + Analytics)
- Tailwind CSS
- Stripe (abonnement premium)

🎨 ARCHITECTURE :
app/
├── (auth)/
│   ├── login/
│   ├── register/
│   └── layout.tsx
├── (main)/
│   ├── recipes/
│   ├── profile/
│   ├── search/
│   └── premium/
├── components/
├── services/
├── hooks/
└── lib/

📄 FIRESTORE RULES : Générées automatiquement
📄 DOCUMENTS LEGAUX : CGU + Politique confidentialité (SARL RecettesCo)
📋 PROJECT.MD : TodoList avec 24 tâches

Je suis prêt à créer le projet. Veux-tu que je commence ?"

DEV: "Oui"

CLAUDE: "Je vais maintenant initialiser le projet complet :
- Next.js + TypeScript
- Firebase configuration
- Architecture features
- Documents légaux
- Firestore Rules
- Tests de base

Cela va créer environ 50 fichiers.
Es-tu d'accord pour que je commence ?"

DEV: "Oui"

CLAUDE: [Commence l'initialisation...]
```

---

## 🎯 Règles de Granularité des Permissions

### ✅ DEMANDER PAR FEATURE (GROUPE DE FICHIERS)

**BON :**
```
"Je vais créer le système d'authentification complet :
 - app/login/page.tsx
 - app/register/page.tsx
 - services/authService.ts
 - components/auth/LoginForm.tsx
 - components/auth/GoogleSignInButton.tsx
 Es-tu d'accord ?"
```

### ❌ NE PAS DEMANDER PAR FICHIER

**MAUVAIS :**
```
"Je vais créer app/login/page.tsx, ok ?"
[attendre]
"Je vais créer authService.ts, ok ?"
[attendre]
"Je vais créer LoginForm.tsx, ok ?"
...
```

**Raison :** Trop fastidieux pour le développeur, pas efficace

---

## 🔍 Détection Automatique des Fonctionnalités

### Mots-clés pour Détection Automatique

```typescript
const DETECTION_KEYWORDS = {
  notifications: [
    'notification', 'notifications', 'push', 'alert',
    'alertes', 'rappel', 'reminder', 'notif'
  ],

  chat: [
    'chat', 'messagerie', 'message', 'conversation',
    'discussion', 'dm', 'direct message'
  ],

  map: [
    'carte', 'map', 'localisation', 'geolocalisation',
    'gps', 'position', 'lieu'
  ],

  photo: [
    'photo', 'image', 'camera', 'galerie',
    'appareil photo', 'picture', 'upload'
  ],

  calendar: [
    'calendrier', 'calendar', 'evenement', 'event',
    'date', 'rendez-vous'
  ],

  payment: [
    'paiement', 'payment', 'abonnement', 'subscription',
    'premium', 'payant', 'achat'
  ],

  social: [
    'partage', 'share', 'social', 'reseau',
    'ami', 'friend', 'follower'
  ],

  analytics: [
    'analytics', 'statistique', 'tracking',
    'metriques', 'analyse'
  ],

  search: [
    'recherche', 'search', 'filtre', 'filter', 'tri'
  ],

  offline: [
    'offline', 'hors ligne', 'sans connexion', 'mode avion'
  ],
};
```

**Usage :** Analyser la description du projet et les réponses aux questions pour détecter automatiquement quelles fonctionnalités sont nécessaires.

---

## ⚠️ Points d'Attention Critiques

### 1. Ne JAMAIS sauter les questions d'onboarding
Même si le projet semble simple, TOUJOURS poser les 16 questions.

### 2. Toujours demander confirmation après le récapitulatif
Laisser le développeur valider AVANT de commencer à générer du code.

### 3. Demander permission globale pour l'init
"Es-tu d'accord pour que je commence ?" - ATTENDRE la réponse.

### 4. Créer PROJECT.md DÈS le début
Ne pas attendre la fin, le créer à l'étape 8 avec la TodoList complète.

### 5. Vérifier AVANT le premier commit
Lancer npm run build, lint, type-check pour s'assurer que tout compile.

---

**🔄 Ce workflow doit être suivi EXACTEMENT pour chaque nouveau projet**

🤖 _Guide destiné à Claude Code - Process d'initialisation standardisé_
