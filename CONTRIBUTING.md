# 📖 Guide de Contribution

Bienvenue ! Ce document contient **toutes les regles et bonnes pratiques** pour contribuer au projet de maniere professionnelle.

## 📚 Table des Matières

1. [Branches](#-branches)
2. [Commits](#-commits)
3. [Pull Requests](#-pull-requests)
4. [Workflow Complet](#-workflow-complet)
5. [Code Review](#-code-review)
6. [Sécurité](#-sécurité)
7. [Best Practices](#-best-practices)

---

## 🌿 Branches

### Stratégie de Branches (GitHub Flow)

Nous utilisons **GitHub Flow** - simple, efficace et professionnel.

```
main (production)
  ├── feature/nouvelle-fonctionnalite
  ├── fix/correction-bug
  └── hotfix/urgence-production
```

### Types de Branches

| Préfixe     | Usage                                  | Exemple                          |
|-------------|----------------------------------------|----------------------------------|
| `feature/`  | Nouvelle fonctionnalité                | `feature/login-screen`           |
| `fix/`      | Correction de bug                      | `fix/crash-on-startup`           |
| `hotfix/`   | Correction urgente en production       | `hotfix/critical-security-patch` |
| `refactor/` | Refactorisation du code                | `refactor/api-service`           |
| `docs/`     | Documentation uniquement               | `docs/update-readme`             |
| `test/`     | Ajout de tests                         | `test/auth-unit-tests`           |

### Règles des Branches

✅ **À FAIRE**
- Créer une branche depuis `main` à jour
- Utiliser un nom descriptif en kebab-case
- Une branche = une fonctionnalité/fix
- Supprimer la branche après merge

❌ **NE PAS FAIRE**
- Pusher directement sur `main` (INTERDIT)
- Créer des branches avec des noms vagues (`test`, `fix`, `temp`)
- Garder des branches après merge

### Commandes

```bash
# Créer une nouvelle branche
git checkout main
git pull origin main
git checkout -b feature/nom-de-la-feature

# Mettre à jour depuis main
git checkout main
git pull origin main
git checkout feature/nom-de-la-feature
git merge main

# Supprimer une branche après merge
git branch -d feature/nom-de-la-feature
```

---

## 💬 Commits

### Convention de Commits (Conventional Commits)

Format standard :

```
type(scope): description courte

Corps du message (optionnel)
Explications détaillées si nécessaire

Footer (optionnel)
Refs: #123
```

### Types de Commits

| Type         | Description                                                              | Emoji |
|--------------|--------------------------------------------------------------------------|-------|
| `feat`       | Nouvelle fonctionnalité                                                  | ✨    |
| `fix`        | Correction de bug                                                        | 🐛    |
| `docs`       | Documentation uniquement                                                 | 📚    |
| `style`      | Changement de style (indentation, espaces, etc.) sans impact sur le code | 💄    |
| `refactor`   | Réécriture du code sans changement de comportement                       | ♻️    |
| `perf`       | Amélioration de performance                                              | ⚡    |
| `test`       | Ajout/modif de tests                                                     | ✅    |
| `chore`      | Tâches diverses (CI, dépendances, scripts, etc.)                         | 🔧    |
| `build`      | Changements sur le système de build ou les dépendances                   | 📦    |
| `ci`         | Changements liés à la configuration d'intégration continue               | 👷    |

### Exemples de Commits

✅ **BONS EXEMPLES**

```bash
feat(auth): ajouter l'écran de connexion

Création de l'écran de login avec :
- Formulaire email/password
- Validation des champs
- Intégration avec l'API Auth

Refs: #42
```

```bash
fix(navigation): corriger le crash au retour arrière

Le bouton retour provoquait un crash sur Safari.
Ajout d'une vérification de navigation history.

Fixes: #156
```

```bash
docs(readme): mettre à jour les instructions d'installation
```

```bash
refactor(api): simplifier le service HTTP

Suppression du code dupliqué et amélioration
de la gestion des erreurs.
```

❌ **MAUVAIS EXEMPLES**

```bash
update stuff
fix bug
wip
test
asdfghjkl
fix fix fix
```

### Règles des Commits

✅ **À FAIRE**
- Utiliser le format Conventional Commits
- Description claire et concise
- Message en français
- Un commit = une modification logique
- Commiter régulièrement

❌ **NE PAS FAIRE**
- Messages vagues ("fix", "update", "wip")
- Gros commits avec plein de changements
- Commiter des secrets (API keys, passwords)
- Commiter du code qui ne compile pas

### Template de Commit

Pour utiliser automatiquement le template :

```bash
git config --local commit.template .github/commit_template.txt
```

---

## 🔀 Pull Requests

### Quand Créer une PR ?

- ✅ La fonctionnalité est terminée
- ✅ Le code compile sans erreur
- ✅ Les tests passent
- ✅ Le code est propre et commenté
- ✅ La documentation est à jour

### Titre de la PR

Format : `[Type] Description courte`

**Exemples :**
- `[Feature] Écran de profil utilisateur`
- `[Fix] Correction crash au démarrage`
- `[Refactor] Restructuration du service API`

### Description de la PR

Utilisez le template automatique (`.github/pull_request_template.md`).

**Doit contenir :**
1. **Description** - Qu'est-ce qui a été fait ?
2. **Changements** - Liste des modifications
3. **Tests** - Comment tester ?
4. **Screenshots** - Captures d'écran (si UI)
5. **Checklist** - Vérifications avant merge

### Regles des PRs

✅ **A FAIRE**
- Assigner un reviewer
- Lier les issues concernees (`Fixes #123`)
- Repondre aux commentaires de review
- Mettre a jour la branche si `main` a evolue
- Tester une derniere fois avant merge

❌ **NE PAS FAIRE**
- Merger sans review
- Ignorer les commentaires de review
- Créer des PRs gigantesques (> 500 lignes)
- Merger avec des conflits

### Commandes

```bash
# Créer une PR depuis GitHub CLI
gh pr create --title "[Feature] Nouvelle fonctionnalité" --body "Description..."

# Voir les PRs ouvertes
gh pr list

# Review une PR
gh pr review 123 --approve
gh pr review 123 --request-changes --body "Commentaires..."

# Merger une PR
gh pr merge 123 --squash
```

---

## 🔄 Workflow Complet

### Workflow Standard (Step by Step)

#### 1️⃣ **Préparer l'Environnement**

```bash
# S'assurer d'être sur main à jour
git checkout main
git pull origin main
```

#### 2️⃣ **Créer une Branche**

```bash
# Créer la branche feature
git checkout -b feature/mon-feature
```

#### 3️⃣ **Développer**

```bash
# Coder la fonctionnalité
# ...

# Tester localement
npm test
npm run dev

# Commiter régulièrement
git add .
git commit -m "feat(scope): description"
```

#### 4️⃣ **Vérifications Avant Push**

```bash
# Vérifier le code
npm run lint

# Lancer les tests
npm test

# Vérifier que tout compile
npm run build
```

#### 5️⃣ **Pusher la Branche**

```bash
git push origin feature/mon-feature
```

#### 6️⃣ **Créer la Pull Request**

```bash
# Via GitHub CLI
gh pr create --title "[Feature] Mon feature" --body "..."

# Ou via l'interface GitHub
```

#### 7️⃣ **Code Review**

- Attendre la review d'un membre de l'équipe
- Répondre aux commentaires
- Corriger si nécessaire
- Re-push les modifications

#### 8️⃣ **Merge**

```bash
# Une fois approuvée, merger (squash)
gh pr merge 123 --squash --delete-branch
```

#### 9️⃣ **Nettoyage**

```bash
# Revenir sur main
git checkout main
git pull origin main

# Supprimer la branche locale
git branch -d feature/mon-feature
```

---

## 👀 Code Review

### En tant qu'Auteur

✅ **À FAIRE**
- Tester votre code avant de demander review
- Expliquer les choix techniques complexes
- Être ouvert aux critiques constructives
- Répondre rapidement aux commentaires

### En tant que Reviewer

✅ **À VÉRIFIER**
- Code clair et maintenable
- Pas de bugs évidents
- Tests présents et pertinents
- Performance acceptable
- Sécurité (pas de secrets, validation inputs)
- Respect des conventions

**Commentaires constructifs :**
- ✅ "Pourquoi ne pas utiliser X au lieu de Y ?"
- ✅ "Attention, cette fonction pourrait causer un memory leak"
- ❌ "C'est nul" (non constructif)

---

## 🔒 Sécurité

### Règles de Sécurité STRICTES

❌ **JAMAIS COMMITER**
- API keys
- Tokens d'authentification
- Passwords
- Certificats
- `.env` avec des vraies valeurs
- Données personnelles

✅ **TOUJOURS**
- Utiliser `.env.example` avec des valeurs factices
- Ajouter les fichiers sensibles dans `.gitignore`
- Utiliser des variables d'environnement
- Valider tous les inputs utilisateur
- Chiffrer les données sensibles

### Vérification Avant Commit

```bash
# Vérifier qu'aucun secret n'est présent
git diff

# Si un secret a été commité par erreur
git reset HEAD~1  # Annuler le commit
# Supprimer le secret du fichier
git add .
git commit -m "fix: retirer les secrets"
```

---

## 🎯 Best Practices

### Code Quality

✅ **À FAIRE**
- Nommer les variables de manière explicite
- Commenter le code complexe
- Éviter la duplication de code (DRY)
- Garder les fonctions petites et focalisées
- Utiliser TypeScript pour le typage

### Performance

- Optimiser les rendus React (useMemo, useCallback)
- Lazy loading pour les images
- Pagination pour les listes longues
- Caching des données API

### Tests

- Tests unitaires pour la logique métier
- Tests d'intégration pour les flows importants
- Au moins 70% de code coverage

### Communication

- Communiquer avec l'équipe sur Slack/Teams
- Mettre à jour les issues GitHub
- Documenter les décisions importantes
- Demander de l'aide si bloqué

---

## 📞 Besoin d'Aide ?

- **Questions ?** Contactez l'equipe
- **Bug GitHub ?** Ouvrez une issue
- **Urgent ?** Contactez directement l'equipe

---

✨ **Merci de contribuer professionnellement au projet !**
