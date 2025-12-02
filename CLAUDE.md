# 📂 DOSSIER INIT/ - MODE D'EMPLOI POUR CLAUDE

> **Ce dossier contient TOUS les guides et templates pour initialiser et developper des projets React Native/Expo de maniere professionnelle.**

---

## 🎯 Objectif

Ce dossier **init/** est ton **manuel de reference universel** pour :
1. Initialiser un nouveau projet React Native/Expo depuis zero
2. Suivre les meilleures pratiques pendant le developpement
3. Gerer le versioning, les commits, et les deployements
4. Assurer la securite et la qualite du code

**IMPORTANT** : Ces guides sont **universels** - ils s'appliquent a TOUS les projets React Native/Expo, pas juste a un projet specifique.

---

## 📁 Structure du Dossier

```
init/
├── CLAUDE.md                  # ← TU ES ICI (mode d'emploi principal)
├── STATUS.md                  # Historique de creation du dossier
│
├── templates/                 # Templates a utiliser pour generer des fichiers
│   ├── README.template.md     # → Generer README.md du projet
│   ├── CHANGELOG.template.md  # → Generer CHANGELOG.md du projet
│   ├── PROJECT.template.md    # → Generer PROJECT.md du projet
│   └── CONTRIBUTING.md        # → Copier tel quel dans le projet
│
└── guides/                    # Guides de reference (16 fichiers)
    ├── 00_INDEX.md            # Index detaille de tous les guides
    ├── 01_ONBOARDING.md       # 16 questions a poser au developpeur
    ├── 02_MASTER_RULES.md     # Regles absolues (TOUJOURS respecter)
    ├── 03_WORKFLOW.md         # Workflow complet d'initialisation
    ├── 04_SETUP.md            # Commandes d'installation
    ├── 05_ARCHITECTURE.md     # Architecture par features (responsive, errors, loading, forms)
    ├── 06_CONVENTIONS.md      # Conventions de code
    ├── 07_FIREBASE.md         # Patterns Firestore
    ├── 08_TESTS.md            # Philosophie de test
    ├── 09_VERSIONING.md       # Semantic Versioning
    ├── 10_GIT_WORKFLOW.md     # Git, commits, PR, branches
    ├── 11_PROJECT_MD.md       # Gestion de PROJECT.md
    ├── 12_SECURITY.md         # Securite, Firestore Rules, legal
    ├── 13_DEPLOYMENT.md       # Deploiement App Store / Play Store
    ├── 14_AMBIGUITIES.md      # Gestion des demandes floues
    ├── 15_ACCESSIBILITY.md    # Accessibilite WCAG 2.1
    ├── 16_INCREMENTAL_UPDATES.md # Mises a jour progressives fichiers MD
    └── 17_FIREBASE_SETUP_GUIDE.md # Setup Firebase Console complet
```

---

## 📖 ORDRE DE LECTURE SELON LA PHASE

### 🚀 PHASE 1 : Initialisation d'un Nouveau Projet

**Quand** : Le developpeur dit "Je veux creer une nouvelle app"

**Ordre de lecture** :

1. **`guides/00_INDEX.md`** (optionnel - vue d'ensemble)
2. **`guides/02_MASTER_RULES.md`** ⚠️ **OBLIGATOIRE** - Regles absolues a respecter
3. **`guides/16_INCREMENTAL_UPDATES.md`** - Comprendre approche mise a jour progressive
4. **`guides/01_ONBOARDING.md`** - Poser les 16 questions UNE PAR UNE (avec mises a jour incrementales)
5. **`guides/17_FIREBASE_SETUP_GUIDE.md`** - Setup Firebase Console (AVANT init Expo)
6. **`guides/03_WORKFLOW.md`** - Suivre le workflow complet etape par etape
7. **`guides/04_SETUP.md`** - Executer les commandes d'installation

**Templates a utiliser** :
- Generer `README.md` depuis `templates/README.template.md`
- Generer `CHANGELOG.md` depuis `templates/CHANGELOG.template.md`
- Generer `PROJECT.md` depuis `templates/PROJECT.template.md`
- Copier `templates/CONTRIBUTING.md` tel quel

---

### 💻 PHASE 2 : Pendant le Developpement

**Quand** : Le developpeur demande une feature, fix, ou refactoring

**Guides de reference** (consulter selon besoin) :

#### Architecture et Code
- **`guides/05_ARCHITECTURE.md`** - Comment structurer le code (features, services, hooks)
- **`guides/06_CONVENTIONS.md`** - Conventions de nommage et commentaires (francais SANS ACCENTS)
- **`guides/07_FIREBASE.md`** - Patterns Firestore (CRUD, services, rules)

#### Tests et Qualite
- **`guides/08_TESTS.md`** - Philosophie de test (proposer, pas creer automatiquement)

#### Git et Collaboration
- **`guides/10_GIT_WORKFLOW.md`** - Commits, branches, PR, code review
- **`guides/11_PROJECT_MD.md`** - Mettre a jour PROJECT.md regulierement

#### Clarification
- **`guides/14_AMBIGUITIES.md`** - Quand et comment demander clarification

**Actions regulieres** :
- Mettre a jour **PROJECT.md** apres chaque tache significative
- Proposer bump de version apres chaque feature complete

---

### 📦 PHASE 3 : Versioning et Deploiement

**Quand** : Feature terminee ou prete pour production

**Guides concernes** :

- **`guides/09_VERSIONING.md`** - SemVer (MAJOR.MINOR.PATCH), quand proposer version bump
- **`guides/13_DEPLOYMENT.md`** - EAS Build, deploiement App Store / Play Store

---

### 🔒 PHASE 4 : Securite et Legal

**Quand** : Debut de projet OU ajout de fonctionnalite qui ecrit dans Firestore

**Guides concernes** :

- **`guides/12_SECURITY.md`** - Firestore Rules (reactif), validation, secrets, documents legaux

**IMPORTANT** : Firestore Rules doivent etre generees **progressivement** au fur et a mesure que des features sont ajoutees (approche reactive).

---

## 🎯 Cas d'Usage Typiques

### Cas 1 : "Claude, cree-moi une nouvelle app"

```
1. Lire guides/02_MASTER_RULES.md
2. Lire guides/16_INCREMENTAL_UPDATES.md (comprendre approche progressive)
3. Lire guides/01_ONBOARDING.md
4. Poser Question 1 → CREER PROJECT.md et README.md immediatement
5. Poser Question 2 → METTRE A JOUR PROJECT.md section Auth immediatement
6. ... (continuer ainsi pour toutes les 16 questions)
7. Apres Q16 → GENERER TodoList complete dans PROJECT.md
8. Suivre guides/17_FIREBASE_SETUP_GUIDE.md (setup Firebase Console)
   - Guider creation projet Firebase
   - Activer Auth, Firestore, Storage
   - Recuperer config WEB (7 credentials)
   - Valider avant de continuer
9. Suivre guides/03_WORKFLOW.md etape par etape
10. Utiliser guides/04_SETUP.md pour les commandes
11. Generer Firestore Rules selon guides/12_SECURITY.md
```

### Cas 2 : "Ajoute une feature de profil utilisateur"

```
1. Consulter guides/05_ARCHITECTURE.md (structure features/)
2. Consulter guides/06_CONVENTIONS.md (nommage, commentaires)
3. Consulter guides/07_FIREBASE.md (service profileService)
4. Coder la feature
5. Consulter guides/12_SECURITY.md (mettre a jour Firestore Rules)
6. Consulter guides/11_PROJECT_MD.md (mettre a jour PROJECT.md)
7. Consulter guides/09_VERSIONING.md (proposer bump version)
```

### Cas 3 : "Fix le bug de crash au login"

```
1. Consulter guides/10_GIT_WORKFLOW.md (branche fix/...)
2. Coder le fix
3. Consulter guides/08_TESTS.md (proposer test pour eviter regression)
4. Consulter guides/11_PROJECT_MD.md (ajouter au journal)
5. Consulter guides/10_GIT_WORKFLOW.md (commit, PR)
```

### Cas 4 : "Je comprends pas ta demande"

```
1. Lire guides/14_AMBIGUITIES.md
2. Utiliser les templates de questions de clarification
3. NE PAS deviner, TOUJOURS demander
```

---

## ⚠️ REGLES CRITIQUES

### 1. TOUJOURS Lire 02_MASTER_RULES.md en Premier

Ce fichier contient les **regles absolues** qui ne peuvent JAMAIS etre violees :
- Commentaires en francais SANS ACCENTS
- Firebase config WEB pour Expo
- Conventions de commits
- Etc.

### 2. NE PAS Melanger les Phases

- **Phase 1 (Init)** : Lire 01-04 dans l'ordre
- **Phase 2 (Dev)** : Consulter 05-08, 10-11, 14 selon besoin
- **Phase 3 (Deploy)** : Consulter 09, 13
- **Phase 4 (Secu)** : Consulter 12

### 3. Mettre a Jour PROJECT.md Regulierement

`guides/11_PROJECT_MD.md` explique comment maintenir PROJECT.md :
- TodoList
- Journal de developpement
- Decisions techniques
- Problemes connus

**PROJECT.md est ta memoire permanente entre sessions.**

### 4. Firestore Rules = Approche Reactive

`guides/12_SECURITY.md` explique :
- NE PAS demander structure Firestore pendant onboarding
- Generer rules PROGRESSIVEMENT quand features ajoutees
- Toujours mettre a jour rules quand nouveau service ecrit dans Firestore

---

## 📝 Notes Importantes

### Francais SANS ACCENTS
Tous les commentaires de code doivent etre en francais MAIS SANS ACCENTS :
- ✅ `// Recupere le profil utilisateur`
- ❌ `// Récupère le profil utilisateur`

Voir `guides/06_CONVENTIONS.md` pour details.

### Firebase Config WEB
Pour Expo, TOUJOURS utiliser la config WEB de Firebase, jamais iOS/Android.

Voir `guides/04_SETUP.md` section 3.2.

### Templates vs Guides
- **templates/** = Fichiers a generer/copier dans le projet
- **guides/** = Documentation de reference pour Claude

---

## 🔗 Fichiers de Reference Rapide

| Question | Fichier |
|----------|---------|
| Comment initialiser un projet ? | `guides/03_WORKFLOW.md` |
| Quelles questions poser ? | `guides/01_ONBOARDING.md` |
| Comment structurer le code ? | `guides/05_ARCHITECTURE.md` |
| Comment nommer les variables ? | `guides/06_CONVENTIONS.md` |
| Comment faire un commit ? | `guides/10_GIT_WORKFLOW.md` |
| Comment gerer les versions ? | `guides/09_VERSIONING.md` |
| Comment deployer ? | `guides/13_DEPLOYMENT.md` |
| Que faire si demande floue ? | `guides/14_AMBIGUITIES.md` |

---

## 🎓 Philosophie Generale

### Proactivite Equilibree
- ✅ Proposer ameliorations evidentes
- ✅ Detecter besoins implicites
- ❌ NE PAS surprendre le dev avec actions non demandees
- ❌ NE PAS deviner quand ambigu

### Clarte Avant Action
Voir `guides/14_AMBIGUITIES.md` :
> "Mieux vaut poser 3 questions de trop que coder 1 feature de travers."

### Memoire Permanente
PROJECT.md est LA memoire entre sessions :
- TodoList avec progression
- Journal de developpement
- Decisions techniques

Voir `guides/11_PROJECT_MD.md`.

---

## ✅ Checklist de Debut de Session

Quand tu commences a travailler sur un projet :

1. [ ] Lire le **PROJECT.md** du projet (memoire)
2. [ ] Verifier la **TodoList** en cours
3. [ ] Consulter les **guides/** selon la tache demandee
4. [ ] Respecter **02_MASTER_RULES.md** (TOUJOURS)

---

🤖 _Ce README est destine a Claude Code - Mode d'emploi complet du systeme init/_

**Derniere mise a jour** : 01/11/2025
