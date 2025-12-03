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
fix(profile): correct avatar upload
docs(readme): update installation steps
refactor(api): simplify error handling
perf(list): optimize pagination rendering
test(auth): add login flow tests
chore(deps): update dependencies
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
fix/avatar-upload
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
- Upload depuis fichier local
- Crop automatique en 300x300
- Compression avant upload Firebase Storage

## Tests
- [x] Teste sur Chrome
- [x] Teste sur Firefox
- [x] Teste sur Safari
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
- [ ] Teste sur Chrome
- [ ] Teste sur Firefox
- [ ] Teste sur Safari
- [ ] Teste sur Mobile (responsive)

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

# 5. Tester le site
npm run dev

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
  - [x] Build
- [x] Require branches to be up to date before merging
- [x] Require linear history (squash or rebase only)
- [x] Do not allow bypassing the above settings
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
- Deploiement automatise vers Vercel
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
        run: npx tsc --noEmit

      - name: Run linter
        run: npm run lint

      - name: Run tests
        run: npm test -- --coverage

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
  # JOB 3 : BUILD NEXT.JS
  # ============================================
  build:
    name: Build Next.js
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

      - name: Install dependencies
        run: npm ci

      - name: Build Next.js
        run: npm run build
        env:
          NEXT_PUBLIC_FIREBASE_API_KEY: ${{ secrets.NEXT_PUBLIC_FIREBASE_API_KEY }}
          NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: ${{ secrets.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN }}
          NEXT_PUBLIC_FIREBASE_PROJECT_ID: ${{ secrets.NEXT_PUBLIC_FIREBASE_PROJECT_ID }}
          NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: ${{ secrets.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET }}
          NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID }}
          NEXT_PUBLIC_FIREBASE_APP_ID: ${{ secrets.NEXT_PUBLIC_FIREBASE_APP_ID }}

      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: nextjs-build
          path: .next
```

---

### Deploiement Automatique Vercel

**Fichier `.github/workflows/deploy.yml`** :

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    name: Deploy to Vercel
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

### Configuration Secrets GitHub

**GitHub > Settings > Secrets and variables > Actions** :

```
VERCEL_TOKEN              # Token Vercel pour deploiement
VERCEL_ORG_ID             # ID organisation Vercel
VERCEL_PROJECT_ID         # ID projet Vercel
SNYK_TOKEN                # Token Snyk pour scans securite
GITGUARDIAN_API_KEY       # Token GitGuardian pour scan secrets
CODECOV_TOKEN             # Token Codecov pour coverage (optionnel)

# Firebase (pour build Next.js)
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
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
   ✓ Build Next.js
4. Si TOUT passe → Reviewer peut approuver
5. Si echec → Developer fixe et push
6. Apres merge sur main → Deploiement automatique Vercel
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
    - build

✓ Require conversation resolution before merging

✓ Do not allow bypassing the above settings
```

**Resultat** : IMPOSSIBLE de merger sur main sans :
- PR approuvee
- Tous les tests passent
- Tous les scans securite OK
- Build Next.js reussi
- Pas de conflits

---

### Badges pour README.md

Ajouter badges CI/CD dans README.md :

```markdown
# Mon Site

![CI](https://github.com/username/repo/workflows/CI/badge.svg)
![Deploy](https://github.com/username/repo/workflows/Deploy%20to%20Vercel/badge.svg)
![Security](https://img.shields.io/snyk/vulnerabilities/github/username/repo)
![CodeQL](https://github.com/username/repo/workflows/CodeQL/badge.svg)
![Coverage](https://codecov.io/gh/username/repo/branch/main/graph/badge.svg)

...
```

**Avantage** : Voir en un coup d'oeil l'etat du projet.

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
- [ ] Build fonctionne (`npm run build`)
- [ ] Teste sur desktop et mobile
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
- [ ] Deploiement Vercel verifie

---

🤖 _Guide destine a Claude Code - Git workflow standardise et securise_
