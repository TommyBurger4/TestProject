# 🔀 GIT WORKFLOW COMPLET

> **Git workflow base sur GitHub Flow avec conventions strictes**

---

## 📝 Convention de Commits (OBLIGATOIRE)

**Format :** `type(scope): message`

### Types Autorises

```
feat     : Nouvelle fonctionnalite
fix      : Correction de bug
docs     : Documentation
style    : Formatage (pas de changement de code)
refactor : Refactoring (ni feat ni fix)
perf     : Optimisation de performance
test     : Ajout/modification de tests
chore    : Taches de maintenance (deps, config, etc.)
ci       : CI/CD
build    : Build system
revert   : Annulation d'un commit precedent
```

### Exemples

```bash
feat(auth): add Google Sign-In
fix(profile): correct avatar upload on iOS
docs(readme): update installation steps
refactor(api): simplify error handling
perf(list): optimize FlatList rendering
test(auth): add login flow tests
chore(deps): update expo to v54
```

---

## 🌿 Branches

### Regles

- `main` : Production (toujours stable)
- `feature/*` : Nouvelles fonctionnalites
- `fix/*` : Corrections de bugs
- `refactor/*` : Refactoring
- `hotfix/*` : Corrections urgentes en production

### Exemples

```bash
feature/user-profile
feature/dark-mode
fix/login-crash
fix/avatar-upload-ios
refactor/api-service
hotfix/critical-security-patch
```

---

## 🚀 Workflow Quotidien

```bash
# ============================================
# DEBUT DE JOURNEE
# ============================================

# 1. Mettre a jour main
git checkout main
git pull origin main

# 2. Creer une nouvelle branche
git checkout -b feature/ma-feature

# ============================================
# DEVELOPPEMENT
# ============================================

# 3. Faire des modifications
# ... coder ...

# 4. Verifier les changements
git status
git diff

# 5. Ajouter les fichiers
git add .
# ou selectif
git add src/features/profile/

# 6. Commit avec convention
git commit -m "feat(profile): add avatar upload"

# 7. Push regulierement
git push origin feature/ma-feature

# ============================================
# SI MAIN A EVOLUE
# ============================================

# 8. Mettre a jour depuis main
git checkout main
git pull origin main
git checkout feature/ma-feature
git merge main
# Resoudre conflits si necessaire
git push origin feature/ma-feature

# ============================================
# FIN DE TACHE
# ============================================

# 9. Creer une Pull Request (via GitHub CLI)
gh pr create --title "feat(profile): add avatar upload" \
  --body "## Description
Ajout de la fonctionnalite d'upload d'avatar

## Changements
- Upload depuis galerie
- Crop automatique en 300x300
- Compression avant upload Firebase Storage

## Tests
- [x] Teste sur iOS 17
- [x] Teste sur Android 14
- [x] Tests unitaires ajoutes

## Screenshots
[Images]"

# 10. Assigner un reviewer
gh pr edit [PR_NUMBER] --add-reviewer TommyBurger4
```

---

## 📋 Pull Request Template

**.github/pull_request_template.md**

```markdown
## 📝 Description

[Description courte du changement]

## 🔄 Type de changement

- [ ] 🐛 Bug fix (PATCH)
- [ ] ✨ Nouvelle fonctionnalite (MINOR)
- [ ] 💥 Breaking change (MAJOR)
- [ ] 📚 Documentation
- [ ] ♻️ Refactoring
- [ ] ⚡ Performance
- [ ] 🧪 Tests

## 📋 Changements

- [x] Changement 1
- [x] Changement 2
- [ ] Changement 3 (en cours)

## 🧪 Tests

- [ ] Tests unitaires ajoutes/mis a jour
- [ ] Tests manuels effectues
- [ ] Teste sur iOS
- [ ] Teste sur Android

## 📸 Screenshots / Videos

[Si changement UI]

## 📝 Checklist

- [ ] Code respecte les conventions
- [ ] Commentaires en francais SANS ACCENTS
- [ ] Tests passent (`npm test`)
- [ ] Lint passe (`npm run lint`)
- [ ] Build fonctionne (`npm run build`)
- [ ] PROJECT.md mis a jour
- [ ] Pas de console.log oublies
- [ ] Pas de secrets dans le code

## 🔗 Issues liees

Closes #[issue_number]
```

---

## 👀 Workflow de Review

**En tant que reviewer :**

```bash
# 1. Lister les PRs a reviewer
gh pr list --assignee @me

# 2. Checkout la PR
gh pr checkout 123

# 3. Verifier les changements
git diff main...feature/ma-feature

# 4. Lancer les tests
npm install
npm test
npm run lint

# 5. Tester l'app
npm start

# 6. Approuver ou demander des changements
gh pr review 123 --approve -b "LGTM! Code propre et bien teste."

# ou
gh pr review 123 --request-changes -b "Suggestions :
- Ajouter validation email
- Corriger typo ligne 42
- Ajouter test pour cas d'erreur"

# 7. Apres corrections, re-review
gh pr review 123 --approve

# 8. Merger (squash recommande)
gh pr merge 123 --squash --delete-branch
```

---

## 🔒 Protection de main

**A configurer sur GitHub :**

```yaml
Branch protection rules for 'main':
- [x] Require pull request reviews before merging
  - Required approvals: 1
- [x] Require status checks to pass before merging
  - [x] Tests
  - [x] Lint
  - [x] Type-check
- [x] Require branches to be up to date before merging
- [x] Require linear history (squash or rebase only)
- [x] Do not allow bypassing the above settings
```

---

## 📅 Workflow Quotidien Detaille

### Debut de Journee

```bash
# 1. Se mettre a jour
git checkout main
git pull origin main

# 2. Verifier les nouvelles PRs
gh pr list

# 3. Voir les taches assignees
# (Verifier GitHub Issues ou board de projet)
```

### Demarrer une Nouvelle Tache

```bash
# 1. Creer une branche depuis main a jour
git checkout main
git pull origin main
git checkout -b feature/nom-de-la-feature

# 2. Faire un premier commit (optionnel)
git commit --allow-empty -m "chore: init feature/nom-de-la-feature"
git push origin feature/nom-de-la-feature

# 3. Developper
# ... coder ...
```

### Pendant le Developpement

```bash
# Commiter regulierement (toutes les 30min - 1h)
git add .
git commit -m "feat(auth): ajouter validation email"

# Pousser regulierement
git push origin feature/nom-de-la-feature

# Si main a evolue, se mettre a jour
git checkout main
git pull origin main
git checkout feature/nom-de-la-feature
git merge main
# ou
git rebase main
```

### Fin de Tache

```bash
# 1. Dernieres verifications
npm run lint
npm test
npm run build

# 2. Push final
git push origin feature/nom-de-la-feature

# 3. Creer la PR
gh pr create --title "[Feature] Nom de la feature" \
  --body "Description..."

# 4. Assigner un reviewer
gh pr edit [PR_NUMBER] --add-reviewer [REVIEWER_USERNAME]
```

### Fin de Journee

```bash
# 1. Commiter le travail en cours (WIP si incomplet)
git add .
git commit -m "wip: en cours de developpement"
git push origin feature/nom-de-la-feature

# 2. Documenter ce qu'il reste a faire
# (Ajouter des TODO dans le code ou une note)
```

---

## 🎯 Workflow par Type de Tache

### ✨ Nouvelle Fonctionnalite

```bash
# 1. Creer la branche
git checkout -b feature/user-profile

# 2. Developper
# - Creer les composants
# - Ajouter les tests
# - Mettre a jour la doc

# 3. Tester
npm test
npm run lint

# 4. PR
gh pr create --title "[Feature] Profil utilisateur" \
  --body "Ajout de l'ecran de profil avec :
- Photo de profil
- Infos personnelles
- Bouton de deconnexion

## Screenshots
[Ajouter captures d'ecran]

## Test
1. Lancer l'app
2. Se connecter
3. Aller sur Profil
4. Verifier que les donnees s'affichent"

# 5. Apres merge
git checkout main
git pull origin main
git branch -d feature/user-profile
```

### 🐛 Correction de Bug

```bash
# 1. Creer la branche
git checkout -b fix/crash-on-login

# 2. Reproduire le bug
# 3. Identifier la cause
# 4. Corriger
# 5. Ajouter un test pour eviter regression

# 6. Commit
git add .
git commit -m "fix(auth): corriger crash lors du login

Le bouton de login causait un crash si presse
deux fois rapidement.

Ajout d'un debounce de 500ms et d'un etat loading.

Fixes: #123"

# 7. PR
gh pr create --title "[Fix] Crash au login" \
  --body "## Bug
Crash quand on clique 2 fois rapidement sur Login

## Cause
Appels API multiples simultanes

## Solution
- Ajout debounce 500ms
- Etat loading pendant l'appel
- Test ajoute

Fixes #123"
```

### 🔥 Hotfix (Urgence Production)

```bash
# 1. Creer depuis main
git checkout main
git pull origin main
git checkout -b hotfix/critical-security-patch

# 2. Fix rapide
# 3. Tests critiques
npm test

# 4. PR prioritaire
gh pr create --title "[HOTFIX] Critical security patch" \
  --body "🚨 URGENT - Security vulnerability fix

## Issue
[Description de la faille]

## Fix
[Explication de la correction]

## Tests
✅ Tests passed
✅ Tested on iOS
✅ Tested on Android" \
  --label "priority:critical"

# 5. Demander review immediate
# 6. Merge des validation
gh pr merge [PR_NUMBER] --squash

# 7. Verifier le deploiement
```

### ♻️ Refactoring

```bash
# 1. Branche
git checkout -b refactor/api-service

# 2. Refactorer progressivement
# - Garder les tests verts a chaque etape
# - Commiter regulierement

# 3. S'assurer qu'aucun comportement n'a change
npm test -- --coverage

# 4. PR
gh pr create --title "[Refactor] Simplification du service API" \
  --body "## Objectif
Reduire la complexite du service API

## Changements
- Suppression code duplique
- Simplification error handling
- Meilleure organisation

## Impact
✅ Aucun changement de comportement
✅ Tous les tests passent
✅ Code coverage maintenu"
```

---

## 👥 Collaboration en Equipe

### Travailler sur une Branche d'un Collegue

```bash
# 1. Recuperer la branche
git fetch origin
git checkout feature/branche-de-collegue

# 2. Travailler dessus
# ... modifications ...

# 3. Commiter
git add .
git commit -m "feat(feature): amelioration XYZ"

# 4. Push
git push origin feature/branche-de-collegue
```

### Pair Programming

```bash
# Personne 1 (Driver) :
git checkout -b feature/pair-programming
# ... code ...
git add .
git commit -m "feat: partie 1"
git push origin feature/pair-programming

# Personne 2 (Navigator devenant Driver) :
git fetch origin
git checkout feature/pair-programming
# ... code ...
git add .
git commit -m "feat: partie 2"
git push origin feature/pair-programming
```

### Code Review Process

#### En tant qu'Auteur

```bash
# 1. Creer la PR avec description complete
gh pr create --title "[Feature] Ma feature" \
  --body "$(cat <<EOF
## Description
[Description detaillee]

## Changements
- [ ] Changement 1
- [ ] Changement 2

## Screenshots
[Images]

## Checklist
- [x] Tests ajoutes
- [x] Documentation mise a jour
- [x] Lint passed
- [x] Teste sur iOS
- [x] Teste sur Android
EOF
)"

# 2. Assigner reviewer
gh pr edit [PR_NUMBER] --add-reviewer [REVIEWER_USERNAME]

# 3. Attendre review et repondre aux commentaires
```

#### En tant que Reviewer

```bash
# 1. Voir les PRs a review
gh pr list --assignee @me

# 2. Checkout la branche
gh pr checkout [PR_NUMBER]

# 3. Tester localement
npm install
npm test
npm start

# 4. Review
gh pr review [PR_NUMBER] --approve
# ou
gh pr review [PR_NUMBER] --request-changes \
  --body "Suggestions d'amelioration :
- [Commentaire 1]
- [Commentaire 2]"

# 5. Apres corrections
gh pr review [PR_NUMBER] --approve
```

---

## ⚔️ Gestion des Conflits

### Conflits lors du Merge de main

```bash
# 1. Mettre a jour main
git checkout main
git pull origin main

# 2. Retourner sur votre branche
git checkout feature/ma-feature

# 3. Merger main
git merge main
# Conflits detectes !

# 4. Resoudre les conflits
# - Ouvrir les fichiers en conflit
# - Chercher les marqueurs <<<<<, =====, >>>>>
# - Choisir la bonne version ou combiner
# - Supprimer les marqueurs

# 5. Marquer comme resolu
git add fichier-en-conflit.ts

# 6. Finaliser le merge
git commit -m "merge: resolution conflits avec main"

# 7. Push
git push origin feature/ma-feature

# 8. Tester que tout fonctionne
npm test
npm start
```

### Conflits dans une PR

```bash
# GitHub vous dira "This branch has conflicts"

# 1. Mettre a jour
git checkout main
git pull origin main
git checkout feature/ma-feature
git merge main

# 2. Resoudre conflits (comme ci-dessus)

# 3. Push
git push origin feature/ma-feature

# La PR sera automatiquement mise a jour
```

---

## 🚀 Release Process

### Preparer une Release

```bash
# 1. S'assurer que main est stable
git checkout main
git pull origin main
npm test

# 2. Creer une branche de release
git checkout -b release/v1.2.0

# 3. Mettre a jour les versions
# - package.json
# - app.json (pour Expo)
# - ios/Info.plist (si applicable)
# - android/app/build.gradle (si applicable)

# 4. Mettre a jour CHANGELOG.md
# Ajouter toutes les features/fixes depuis la derniere version

# 5. Commit
git add .
git commit -m "chore: prepare release v1.2.0"

# 6. PR vers main
gh pr create --title "[Release] v1.2.0" \
  --body "Release v1.2.0

## Features
- Feature 1
- Feature 2

## Fixes
- Fix 1
- Fix 2

## Breaking Changes
- Aucun"

# 7. Apres merge, creer le tag
git checkout main
git pull origin main
git tag -a v1.2.0 -m "Release v1.2.0"
git push origin v1.2.0

# 8. Creer la release sur GitHub
gh release create v1.2.0 \
  --title "v1.2.0" \
  --notes "Notes de version..."
```

---

## 🤖 CI/CD et Securite

### Qu'est-ce que le CI/CD ?

**CI (Continuous Integration)** : Integration continue du code avec tests automatises
**CD (Continuous Deployment)** : Deploiement automatise vers les environnements

**Avantages** :
- Detection rapide des bugs
- Tests automatiques sur chaque PR
- Scans de securite automatises
- Deploiement automatise vers Expo/App Stores
- Qualite du code garantie

---

### Configuration GitHub Actions

**Fichier `.github/workflows/ci.yml`** :

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  # ============================================
  # JOB 1 : TESTS ET LINT
  # ============================================
  test:
    name: Tests & Lint
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run TypeScript check
        run: npm run type-check

      - name: Run linter
        run: npm run lint

      - name: Run tests
        run: npm run test:ci

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
          flags: unittests
          name: codecov-umbrella

  # ============================================
  # JOB 2 : SCANS DE SECURITE
  # ============================================
  security:
    name: Security Scans
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      # Scan vulnerabilites npm
      - name: NPM Audit
        run: npm audit --audit-level=moderate
        continue-on-error: true

      # Scan avec Snyk (recommande)
      - name: Run Snyk Security Scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=high
        continue-on-error: true

      # Scan secrets avec GitGuardian
      - name: GitGuardian Scan
        uses: GitGuardian/ggshield-action@v1
        env:
          GITHUB_PUSH_BEFORE_SHA: ${{ github.event.before }}
          GITHUB_PUSH_BASE_SHA: ${{ github.event.base }}
          GITHUB_DEFAULT_BRANCH: ${{ github.event.repository.default_branch }}
          GITGUARDIAN_API_KEY: ${{ secrets.GITGUARDIAN_API_KEY }}

      # Scan code statique avec CodeQL
      - name: Initialize CodeQL
        uses: github/codeql-action/init@v2
        with:
          languages: javascript, typescript

      - name: Perform CodeQL Analysis
        uses: github/codeql-action/analyze@v2

  # ============================================
  # JOB 3 : BUILD EXPO (optionnel)
  # ============================================
  build:
    name: Build Expo
    runs-on: ubuntu-latest
    needs: [test, security]

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Setup Expo
        uses: expo/expo-github-action@v8
        with:
          expo-version: latest
          token: ${{ secrets.EXPO_TOKEN }}

      - name: Install dependencies
        run: npm ci

      - name: Build for development
        run: npx eas-cli build --platform all --profile development --non-interactive
```

---

### Scans de Securite Detailles

#### 1. NPM Audit (Gratuit)

Verifie les vulnerabilites connues dans les dependances npm.

```bash
# Scan local
npm audit

# Voir details
npm audit --json

# Fix automatique
npm audit fix

# Fix avec breaking changes
npm audit fix --force
```

**Dans CI/CD** : Bloque le merge si vulnerabilites critiques/high.

---

#### 2. Snyk (Gratuit pour Open Source)

Scan avance de vulnerabilites avec suggestions de fix.

**Setup** :
1. Creer compte sur https://snyk.io
2. Connecter repository GitHub
3. Ajouter `SNYK_TOKEN` dans GitHub Secrets

**Features** :
- Detection vulnerabilites npm
- Detection code vulnerabilities
- Suggestions de fix automatiques
- Alertes en temps reel

**Commandes** :

```bash
# Installer Snyk CLI
npm install -g snyk

# Authentifier
snyk auth

# Scanner le projet
snyk test

# Monitorer le projet
snyk monitor

# Fix automatique
snyk fix
```

---

#### 3. GitGuardian (Gratuit pour repos publics)

Detecte les secrets/credentials/API keys dans le code.

**Setup** :
1. Creer compte sur https://gitguardian.com
2. Ajouter `GITGUARDIAN_API_KEY` dans GitHub Secrets

**Ce qu'il detecte** :
- API keys (Firebase, AWS, Stripe, etc.)
- Tokens d'acces
- Mots de passe
- Cles SSH
- Certificats

**Prevention** :
- Toujours utiliser .env
- Ne JAMAIS commiter .env
- Utiliser secrets management (Expo Secrets, Doppler)

---

#### 4. CodeQL (Gratuit pour repos publics)

Analyse statique du code pour detecter bugs et vulnerabilites.

**Setup** : Deja inclus dans le workflow ci-dessus

**Ce qu'il detecte** :
- Injections SQL
- XSS (Cross-Site Scripting)
- Path traversal
- Code smell
- Problemes de securite courants

---

### Configuration Secrets GitHub

**GitHub > Settings > Secrets and variables > Actions** :

```
EXPO_TOKEN              # Token Expo pour builds EAS
SNYK_TOKEN              # Token Snyk pour scans securite
GITGUARDIAN_API_KEY     # Token GitGuardian pour scan secrets
CODECOV_TOKEN           # Token Codecov pour coverage (optionnel)

# Firebase (pour tests E2E en CI)
EXPO_PUBLIC_FIREBASE_API_KEY
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN
EXPO_PUBLIC_FIREBASE_PROJECT_ID
# ... etc
```

**⚠️ IMPORTANT** : Ne JAMAIS mettre de secrets en clair dans le code ou .github/workflows/

---

### Workflow de PR avec CI/CD

```
1. Developer cree une branche feature/xxx
2. Developer push le code
3. GitHub Actions demarre automatiquement :
   ✓ Tests unitaires
   ✓ Lint
   ✓ TypeScript check
   ✓ NPM Audit
   ✓ Snyk scan
   ✓ GitGuardian scan
   ✓ CodeQL analysis
4. Si TOUT passe → Reviewer peut approuver
5. Si echec → Developer fixe et push
6. Apres merge → Optionnel : Build automatique
```

---

### Protection de Branche main

**GitHub > Settings > Branches > Branch protection rules** :

```
Branch name pattern: main

✓ Require a pull request before merging
  ✓ Require approvals (1+)
  ✓ Dismiss stale pull request approvals

✓ Require status checks to pass before merging
  ✓ Require branches to be up to date before merging
  Status checks required:
    - test
    - security
    - build (optionnel)

✓ Require conversation resolution before merging

✓ Do not allow bypassing the above settings
```

**Resultat** : IMPOSSIBLE de merger sur main sans :
- PR approuvee
- Tous les tests passent
- Tous les scans securite OK
- Pas de conflits

---

### Badges pour README.md

Ajouter badges CI/CD dans README.md :

```markdown
# Mon App

![CI](https://github.com/username/repo/workflows/CI/badge.svg)
![Security](https://img.shields.io/snyk/vulnerabilities/github/username/repo)
![CodeQL](https://github.com/username/repo/workflows/CodeQL/badge.svg)
![Coverage](https://codecov.io/gh/username/repo/branch/main/graph/badge.svg)

...
```

**Avantage** : Voir en un coup d'oeil l'etat du projet.

---

### Notifications

**Recevoir alertes securite** :

1. GitHub > Settings > Notifications
2. Activer "Dependabot alerts"
3. Activer "Code scanning alerts"
4. Choisir email ou Slack

**Snyk** : Notifications automatiques par email + Slack integration

**GitGuardian** : Alertes immediates si secret detecte

---

### Checklist CI/CD Setup

#### Setup Initial

- [ ] Creer `.github/workflows/ci.yml`
- [ ] Configurer secrets GitHub (EXPO_TOKEN, SNYK_TOKEN, etc.)
- [ ] Activer Snyk sur le repository
- [ ] Activer GitGuardian sur le repository
- [ ] Activer CodeQL dans GitHub Security
- [ ] Configurer protection branche main
- [ ] Ajouter badges dans README.md

#### Verification

- [ ] Push sur une branche de test
- [ ] Verifier que CI demarre automatiquement
- [ ] Verifier que tous les jobs passent
- [ ] Creer une PR de test
- [ ] Verifier que les checks bloquent le merge si echec

#### Maintenance

- [ ] Verifier alertes securite chaque semaine
- [ ] Mettre a jour dependances regulierement (`npm outdated`)
- [ ] Revoir workflow CI tous les 3 mois
- [ ] Verifier que les secrets sont toujours valides

---

## 📊 Checklists Completes

### Avant de Commiter

- [ ] Code fonctionne
- [ ] Tests passent (`npm test`)
- [ ] Lint OK (`npm run lint`)
- [ ] Pas de `console.log` oublies
- [ ] Pas de secrets dans le code
- [ ] Message de commit clair

### Avant de Creer une PR

- [ ] Branche a jour avec main
- [ ] Tous les commits pushed
- [ ] Tests passent
- [ ] Build fonctionne
- [ ] Teste sur iOS et Android (si mobile)
- [ ] Description PR complete
- [ ] Screenshots ajoutes (si UI)

### Avant de Merger

- [ ] Review approuvee
- [ ] Tous les commentaires resolus
- [ ] CI/CD passe (si configure)
- [ ] Pas de conflits
- [ ] Tests passent

### Apres le Merge

- [ ] Branche supprimee
- [ ] Retour sur main
- [ ] Pull main a jour
- [ ] Issue fermee (si applicable)

---

🤖 _Guide destine a Claude Code - Git workflow standardise et securise_
