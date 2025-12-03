# 📚 INDEX COMPLET DES GUIDES

> **Vue d'ensemble de tous les guides disponibles dans init/guides/**

---

## 🗺️ Navigation Rapide

| # | Guide | Phase | Quand l'utiliser |
|---|-------|-------|------------------|
| 01 | [ONBOARDING](#01_onboardingmd) | Init | Debut nouveau projet |
| 02 | [MASTER_RULES](#02_master_rulesmd) | Toujours | AVANT toute action |
| 03 | [WORKFLOW](#03_workflowmd) | Init | Process complet d'init |
| 04 | [SETUP](#04_setupmd) | Init | Commandes installation |
| 05 | [ARCHITECTURE](#05_architecturemd) | Dev | Structurer le code |
| 06 | [CONVENTIONS](#06_conventionsmd) | Dev | Nommage, commentaires |
| 07 | [FIREBASE](#07_firebasemd) | Dev | Patterns Firestore |
| 08 | [TESTS](#08_testsmd) | Dev | Philosophie de test |
| 09 | [VERSIONING](#09_versioningmd) | Release | Bump version |
| 10 | [GIT_WORKFLOW](#10_git_workflowmd) | Dev | Commits, PR, branches |
| 11 | [PROJECT_MD](#11_project_mdmd) | Dev | Memoire permanente |
| 12 | [SECURITY](#12_securitymd) | Secu | Firestore Rules, legal |
| 13 | [DEPLOYMENT](#13_deploymentmd) | Release | App Store / Play Store |
| 14 | [AMBIGUITIES](#14_ambiguitiesmd) | Toujours | Demandes floues |
| 15 | [ACCESSIBILITY](#15_accessibilitymd) | Dev | WCAG 2.1 AA/AAA |
| 16 | [INCREMENTAL_UPDATES](#16_incremental_updatesmd) | Init | Mises a jour progressives MD |
| 17 | [FIREBASE_SETUP_GUIDE](#17_firebase_setup_guidemd) | Init | Setup Firebase Console |

---

## 📖 Description Detaillee de Chaque Guide

### 01_ONBOARDING.md

**Phase** : Initialisation
**Objectif** : Collecter les informations necessaires pour initialiser un projet

**Contenu** :
- 16 questions a poser UNE PAR UNE au developpeur
- Detection automatique des fonctionnalites selon reponses
- Recapitulatif complet avant de commencer

**Quand lire** :
- ✅ Developpeur dit "Je veux creer une nouvelle app"
- ✅ APRES avoir lu 02_MASTER_RULES.md
- ✅ AVANT de commencer a generer du code

**Questions typiques** :
1. Nom du projet ?
2. Description ?
3. Type d'authentification ?
4. Besoin de paiements ?
5. Notifications push ?
6. ... (16 questions au total)

---

### 02_MASTER_RULES.md

**Phase** : TOUJOURS
**Objectif** : Regles absolues qui ne peuvent JAMAIS etre violees

**Contenu** :
- Conventions de code (francais SANS ACCENTS)
- Firebase config WEB pour Expo (JAMAIS iOS/Android)
- Conventions Git (Conventional Commits)
- Regles de proactivite
- Regles de permissions

**Quand lire** :
- ✅ TOUJOURS en debut de session
- ✅ AVANT toute action importante
- ✅ En cas de doute sur une regle

**Regles critiques** :
- Commentaires en francais SANS ACCENTS (é→e, è→e, à→a)
- Firebase WEB config pour Expo
- Demander permission par FEATURE (groupe de fichiers), pas par fichier
- Ne JAMAIS deviner quand ambigu

---

### 03_WORKFLOW.md

**Phase** : Initialisation
**Objectif** : Workflow complet etape par etape pour initialiser un projet

**Contenu** :
- 10 etapes d'initialisation dans l'ordre EXACT
- Dialogue type entre dev et Claude
- Regles de granularite des permissions
- Detection automatique des fonctionnalites
- Points d'attention critiques

**Quand lire** :
- ✅ Apres avoir pose les 16 questions d'onboarding
- ✅ Avant de commencer a generer le code
- ✅ Suivre les etapes dans l'ordre exact

**Etapes principales** :
1. Onboarding (16 questions)
2. Analyse reponses
3. Collecte infos legales
4. Questions structure Firestore
5. Recapitulatif complet
6. Demande permission globale
7. Init projet
8. Generation code
9. Verification
10. Premier commit

---

### 04_SETUP.md

**Phase** : Initialisation
**Objectif** : Commandes d'installation et configuration technique

**Contenu** :
- Prerequis (Node, npm, Expo CLI, EAS CLI)
- Commandes create-expo-app
- Installation dependances (obligatoires + conditionnelles)
- Configuration Firebase (WEB config)
- Configuration .env
- Structure de dossiers
- Depannage
- Tests sur appareils physiques

**Quand lire** :
- ✅ Pendant l'etape 7 du workflow (Init projet)
- ✅ Pour reference des commandes d'installation
- ✅ En cas de probleme technique (section depannage)

**Sections importantes** :
- Configuration Firebase (section 3.2 : WEB config)
- Depandances conditionnelles selon onboarding
- Depannage (Metro, build, pods, modules, port)

---

### 05_ARCHITECTURE.md

**Phase** : Developpement
**Objectif** : Architecture par features - comment structurer le code

**Contenu** :
- Regle d'or : separation des responsabilites
- Anatomie d'une feature (components/, hooks/, screens/, services/, types/)
- Structure d'un service (patterns CRUD)
- Structure d'un hook custom
- Structure d'un screen
- Composants UI reutilisables
- State management (Zustand, Redux, Context)
- Tests (unitaires, integration, E2E)
- Performance (memoisation, lazy loading, optimisation listes)

**Quand lire** :
- ✅ Avant de creer une nouvelle feature
- ✅ Pour comprendre ou placer le code
- ✅ Pour reference des patterns de service/hook/screen

**Principes cles** :
```
FEATURES (src/features/) = LOGIQUE METIER + UI SPECIFIQUE
    ↓
COMPONENTS (src/components/) = UI REUTILISABLE PURE
    ↓
SERVICES (src/services/) = LOGIQUE GLOBALE (Firebase, API)
    ↓
HOOKS (src/hooks/) = LOGIQUE CUSTOM GENERIQUE
```

---

### 06_CONVENTIONS.md

**Phase** : Developpement
**Objectif** : Conventions de nommage, commentaires, imports, erreurs

**Contenu** :
- Nommage (camelCase, PascalCase, SCREAMING_SNAKE_CASE)
- Commentaires en francais SANS ACCENTS (regle critique)
- Structure des imports
- Gestion des erreurs
- Best practices TypeScript

**Quand lire** :
- ✅ Avant de coder
- ✅ En cas de doute sur nommage
- ✅ Pour verifier format commentaires

**Regle CRITIQUE** :
```typescript
// ✅ BON (sans accents)
/**
 * Fichier: authService.ts
 *
 * Service d'authentification pour gerer la connexion
 */

// ❌ MAUVAIS (avec accents)
/**
 * Service d'authentification pour gérer la connexion
 */
```

---

### 07_FIREBASE.md

**Phase** : Developpement
**Objectif** : Patterns Firestore - CRUD, services, listeners, Firestore Rules

**Contenu** :
- Template de discussion structure Firestore
- Service CRUD template
- Patterns (pagination, listeners temps reel, batch operations)
- Generation REACTIVE des Firestore Rules
- Exemples collections (users, posts, groups, etc.)

**Quand lire** :
- ✅ Avant de creer un service qui ecrit dans Firestore
- ✅ Pour reference des patterns CRUD
- ✅ Quand une feature necessite stockage Firestore

**Approche REACTIVE** :
- NE PAS demander structure Firestore pendant onboarding
- Demander au fur et a mesure que features ajoutees
- Generer Firestore Rules PROGRESSIVEMENT

---

### 08_TESTS.md

**Phase** : Developpement
**Objectif** : Philosophie de test - Claude GUIDE, dev TESTE

**Contenu** :
- Philosophie : proposer, pas creer automatiquement
- Configuration Jest
- Exemples tests (utils, services, hooks, components)
- Quand proposer des tests
- Comment proposer des tests

**Quand lire** :
- ✅ Apres avoir code une fonctionnalite
- ✅ Avant de proposer des tests au dev
- ✅ Pour reference des patterns de test

**Regle d'or** :
```
✅ TOUJOURS proposer des tests manuels d'abord
✅ EXPLIQUER comment verifier que ca marche
✅ DONNER le code du test SI le dev le demande
❌ NE PAS creer automatiquement des fichiers de tests
```

---

### 09_VERSIONING.md

**Phase** : Release
**Objectif** : Semantic Versioning (MAJOR.MINOR.PATCH) et bump de version

**Contenu** :
- Regles SemVer
- Script bump-version.js
- Quand proposer bump version
- Process de release
- Format de version (package.json, app.json, iOS, Android)

**Quand lire** :
- ✅ Apres avoir termine une feature
- ✅ Avant de proposer bump version
- ✅ Pour comprendre MAJOR vs MINOR vs PATCH

**Regle** : Proposer systematiquement apres chaque feature completee
```
"J'ai termine l'implementation de [FEATURE].
 Veux-tu que je mette a jour la version ? (MINOR: 1.2.0 → 1.3.0)"
```

---

### 10_GIT_WORKFLOW.md

**Phase** : Developpement
**Objectif** : Git workflow complet - commits, branches, PR, code review

**Contenu** :
- Convention Conventional Commits (feat, fix, docs, etc.)
- Types de branches (feature/, fix/, hotfix/, refactor/)
- Workflow quotidien detaille
- Workflow par type de tache
- Collaboration en equipe (pair programming, code review)
- Gestion des conflits
- Release process
- Checklists (avant commit, avant PR, avant/apres merge)

**Quand lire** :
- ✅ Avant de creer un commit
- ✅ Avant de creer une branche
- ✅ Avant de creer une PR
- ✅ Pour reference format de commit

**Format commit** :
```bash
type(scope): description courte

feat(auth): add Google Sign-In
fix(profile): correct avatar upload on iOS
docs(readme): update installation steps
```

---

### 11_PROJECT_MD.md

**Phase** : Developpement
**Objectif** : PROJECT.md comme memoire permanente entre sessions

**Contenu** :
- Role de PROJECT.md (memoire permanente)
- Format TodoList standardise
- Journal de developpement (avec date/heure)
- Decisions techniques
- Problemes connus
- Notes importantes
- Regles de mise a jour
- Nettoyage securise des todos termines

**Quand lire** :
- ✅ DEBUT de chaque session (lire PROJECT.md du projet)
- ✅ APRES chaque tache significative (mettre a jour)
- ✅ Pour reference format TodoList/Journal

**TodoList Format** :
```markdown
### ⏳ EN COURS (1)
- [⏳] [FEATURE] Notifications push | Started: 2025-10-29

### ⬜ A FAIRE (5)
- [ ] [FEATURE] Mode hors ligne | Added: 2025-10-27

### ✅ TERMINE (3)
- [x] [FEATURE] Chat groupe | Completed: 2025-10-28
```

---

### 12_SECURITY.md

**Phase** : Securite
**Objectif** : Firestore Rules reactives, validation, secrets, documents legaux

**Contenu** :
- Regles Firestore - approche REACTIVE
- Template firestore.rules complet
- Validation cote client (Yup schemas)
- Validation cote serveur (Cloud Functions)
- Gestion des secrets (.env)
- Generation AUTOMATIQUE documents legaux (CGU, Politique confidentialite)

**Quand lire** :
- ✅ Quand une feature ecrit dans Firestore (mettre a jour rules)
- ✅ Debut de projet (generer documents legaux)
- ✅ Pour reference templates firestore.rules

**Approche REACTIVE** :
```
User demande feature → Claude detecte besoin Firestore
    ↓
"Je vais creer la collection 'favorites' et
 mettre a jour les Firestore Rules. D'accord ?"
    ↓
Creation SIMULTANEE :
1. Service (favoritesService.ts)
2. Firestore Rules
3. Documentation PROJECT.md
```

---

### 13_DEPLOYMENT.md

**Phase** : Release
**Objectif** : Deploiement App Store et Play Store avec EAS

**Contenu** :
- Pre-requis (comptes Apple/Google)
- Configuration eas.json
- Workflow de deploiement (3 etapes)
- Checklists pre-soumission (App Store + Play Store)
- Automatisation avec Claude
- Assets visuels requis

**Quand lire** :
- ✅ Avant premier deploiement
- ✅ Pour preparer une release production
- ✅ Pour reference checklists App Store/Play Store

**Workflow** :
```bash
1. Preparer release (tests, lint, build preview)
2. Build production (eas build --profile production)
3. Soumettre stores (eas submit --latest)
```

---

### 14_AMBIGUITIES.md

**Phase** : TOUJOURS
**Objectif** : Comment gerer les demandes floues ou ambigues

**Contenu** :
- Principe fondamental : TOUJOURS demander clarification
- Phrases a utiliser selon type d'ambiguite
- Quand demander vs quand ne pas demander
- Technique de reformulation
- Template de question de clarification
- Exemples complets

**Quand lire** :
- ✅ Quand demande du dev est floue
- ✅ Quand plusieurs interpretations possibles
- ✅ Avant de deviner quoi que ce soit

**Regle d'or** :
```
"Mieux vaut poser 3 questions de trop
 que coder 1 feature de travers."
```

**Template** :
```
"Je veux m'assurer de bien comprendre ta demande.

Tu veux : [REFORMULATION]

Est-ce correct ? Si non, peux-tu preciser :
- [QUESTION SPECIFIQUE 1] ?
- [QUESTION SPECIFIQUE 2] ?"
```

---

### 15_ACCESSIBILITY.md

**Phase** : Developpement
**Objectif** : Accessibilite WCAG 2.1 - Niveau AA et AAA

**Contenu** :
- Principes WCAG 2.1 (Perceptible, Utilisable, Comprehensible, Robuste)
- Props accessibilite React Native
- Contrastes couleurs conformes
- Tailles tactiles minimales
- Support VoiceOver / TalkBack
- Tests accessibilite
- Checklist conformite

**Quand lire** :
- ✅ Si WCAG 2.1 AA/AAA requis pendant onboarding
- ✅ Avant de creer composants UI
- ✅ Pour reference props accessibilite
- ✅ Pour tests accessibilite

**Niveaux conformite** :
- **AA (standard)** : Contraste 4.5:1 texte, 3:1 UI, tailles tactiles 44x44
- **AAA (maximal)** : Contraste 7:1 texte, 4.5:1 UI, navigation clavier complete

---

### 16_INCREMENTAL_UPDATES.md

**Phase** : Initialisation
**Objectif** : Mettre a jour les fichiers MD immediatement apres chaque reponse onboarding

**Contenu** :
- Philosophie mise a jour incrementale vs batch
- Mapping Question → Fichiers a mettre a jour
- Format exact pour chaque mise a jour
- Exemple dialogue avec mises a jour en temps reel
- Avantages approche progressive

**Quand lire** :
- ✅ AVANT de commencer onboarding
- ✅ Pour comprendre quelle question met a jour quel fichier
- ✅ Pour reference format exact des mises a jour

**Principe** :
```
Question 1 → Creer PROJECT.md et README.md immediatement
Question 2 → Mettre a jour PROJECT.md section Auth immediatement
Question 3 → Mettre a jour PROJECT.md section Monetisation immediatement
...
Question 16 → Mettre a jour PROJECT.md section Permissions immediatement
Fin → Generer TodoList complete + finaliser fichiers
```

**Avantages** :
- Sauvegarde progressive (pas de perte si interruption)
- Progression visible en temps reel
- Experience plus interactive
- Feedback immediat

---

### 17_FIREBASE_SETUP_GUIDE.md

**Phase** : Initialisation
**Objectif** : Guider l'utilisateur pour setup Firebase Console AVANT d'init Expo

**Contenu** :
- Verifier si projet Firebase existe
- Guide complet creation projet Firebase
- Activer services necessaires (Auth, Firestore, Storage)
- Recuperer configuration WEB (7 credentials)
- Validation automatique des credentials
- Gestion des problemes frequents

**Quand lire** :
- ✅ Immediatement APRES les 16 questions onboarding
- ✅ AVANT d'initialiser le projet Expo
- ✅ Pour guider utilisateur etape par etape

**Process** :
```
Question 1-16 (onboarding)
    ↓
ETAPE 6 : Setup Firebase Console (17_FIREBASE_SETUP_GUIDE.md)
    ↓
ETAPE 7 : Demande permission globale
    ↓
ETAPE 8 : Init projet Expo
```

**Points cles** :
- TOUJOURS config WEB (jamais iOS/Android pour Expo)
- Valider les 7 credentials avant de continuer
- Expliquer POURQUOI chaque service est active
- Proposer mode TEST pour Firestore/Storage pendant dev
- Meme region pour tous les services (europe-west1 recommande)

---

## 🎯 Guides par Cas d'Usage

### Cas : "Cree une nouvelle app"
1. `02_MASTER_RULES.md` ⚠️
2. `16_INCREMENTAL_UPDATES.md` (comprendre approche)
3. `01_ONBOARDING.md` (16 questions)
4. `17_FIREBASE_SETUP_GUIDE.md` (setup Firebase Console)
5. `03_WORKFLOW.md` (workflow complet)
6. `04_SETUP.md` (commandes techniques)

### Cas : "Ajoute une feature"
1. `05_ARCHITECTURE.md` (structure)
2. `06_CONVENTIONS.md` (nommage)
3. `07_FIREBASE.md` (si Firestore)
4. `11_PROJECT_MD.md` (mise a jour)
5. `09_VERSIONING.md` (bump version)

### Cas : "Fix un bug"
1. `10_GIT_WORKFLOW.md` (branche fix/)
2. `08_TESTS.md` (proposer test regression)
3. `11_PROJECT_MD.md` (journal)

### Cas : "Deploie l'app"
1. `09_VERSIONING.md` (bump version)
2. `13_DEPLOYMENT.md` (EAS, stores)

### Cas : "Demande floue"
1. `14_AMBIGUITIES.md` ⚠️

---

## 📊 Ordre de Priorite

### Priorite 1 (CRITIQUE - TOUJOURS)
- `02_MASTER_RULES.md`
- `14_AMBIGUITIES.md`

### Priorite 2 (INIT PROJET)
- `01_ONBOARDING.md`
- `03_WORKFLOW.md`
- `04_SETUP.md`

### Priorite 3 (DEVELOPPEMENT QUOTIDIEN)
- `05_ARCHITECTURE.md`
- `06_CONVENTIONS.md`
- `10_GIT_WORKFLOW.md`
- `11_PROJECT_MD.md`

### Priorite 4 (SELON BESOIN)
- `07_FIREBASE.md` (si Firestore)
- `08_TESTS.md` (apres feature)
- `09_VERSIONING.md` (apres feature)
- `12_SECURITY.md` (debut + features Firestore)
- `13_DEPLOYMENT.md` (release)

---

## 🔗 Liens Croises Entre Guides

```
01_ONBOARDING → 03_WORKFLOW → 04_SETUP
                     ↓
              05_ARCHITECTURE ←→ 06_CONVENTIONS
                     ↓
              07_FIREBASE → 12_SECURITY (Firestore Rules)
                     ↓
              08_TESTS ←→ 10_GIT_WORKFLOW
                     ↓
              11_PROJECT_MD (memoire permanente)
                     ↓
              09_VERSIONING → 13_DEPLOYMENT

              14_AMBIGUITIES (toujours consulter si doute)
              02_MASTER_RULES (toujours respecter)
```

---

🤖 _Index destine a Claude Code - Vue d'ensemble complete du systeme de guides_

**Derniere mise a jour** : 01/11/2025
