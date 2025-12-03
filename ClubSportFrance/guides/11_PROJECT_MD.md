# 📋 PROJECT.MD - MEMOIRE PERMANENTE

> **PROJECT.md est LE fichier central qui permet a Claude de reprendre le contexte entre sessions**

---

## 🎯 Role de PROJECT.md

PROJECT.md sert de **memoire permanente** pour :

1. Reprendre le contexte apres des jours/semaines sans travailler sur le projet
2. Eviter de reposer les memes questions au developpeur
3. Tracer l'historique des decisions techniques
4. Suivre la progression des taches (TodoList)
5. Documenter les problemes connus

---

## 📊 Format TodoList Standardise

```markdown
## 📊 TODOLIST

**Progression globale : 35/120 (29%)**

### ⏳ EN COURS (1)
- [⏳] [FEATURE] Notifications Web Push | Started: 2025-10-29
  Description: Implementation complete du systeme de notifications navigateur

### ⬜ A FAIRE (5)
- [ ] [FEATURE] Mode hors ligne (PWA) | Added: 2025-10-27
- [ ] [BUG] Crash au login sur Safari | Added: 2025-10-29
- [ ] [REFACTOR] Simplifier authService | Added: 2025-10-26
- [ ] [TEST] Ajouter tests unitaires | Added: 2025-10-25
- [ ] [DOCS] Mettre a jour README | Added: 2025-10-24

### ✅ TERMINE (3)
- [x] [FEATURE] Chat groupe temps reel | Completed: 2025-10-28
- [x] [FEATURE] Authentification Apple | Completed: 2025-10-27
- [x] [FEATURE] Theme clair/sombre | Completed: 2025-10-26
```

### Legende des Categories

- `[FEATURE]` : Nouvelle fonctionnalite
- `[BUG]` : Correction de bug
- `[REFACTOR]` : Refactoring de code
- `[DOCS]` : Documentation
- `[TEST]` : Tests unitaires/integration

### Legende des Status

- `[ ]` : Pending (a faire)
- `[⏳]` : In Progress (en cours)
- `[x]` : Completed (termine)

---

## 📅 Journal de Developpement

**Format standardise avec date/heure :**

```markdown
## 📅 JOURNAL DE DEVELOPPEMENT

### 30/10/2025 15:45 - Ajout animations Framer Motion
- Installation framer-motion
- Creation FadeIn, ScaleIn, SlideIn components
- Integration animations dans HomePage et ProfilePage
- Tests : OK sur desktop et mobile

### 30/10/2025 14:20 - Creation ProfilePage
- Composant ProfileHeader avec avatar
- ProfileStats (posts, followers, following)
- Integration useProfile hook
- Navigation vers /profile/edit
- Tests : OK

### 30/10/2025 10:15 - Mise a jour version 1.3.0
- MINOR : Ajout mode sombre + selecteur langue
- Mise a jour package.json, PROJECT.md
- Commit : chore: bump version to 1.3.0
```

**Points cles :**
- **Date + Heure** au format DD/MM/YYYY HH:MM
- **Titre** : Résumé en 1 phrase
- **Details** : Liste a puces des changements
- **Tests** : Statut des tests (OK, KO, en cours)

---

## 🎯 Decisions Techniques

**Documenter les choix importants avec justification :**

```markdown
## 🎯 DECISIONS TECHNIQUES

### Architecture
- **State Management :** Zustand pour global, Context API pour features specifiques
  *Raison :* Zustand plus simple que Redux, Context suffisant pour features isolees

- **Routing :** Next.js App Router avec file-based routing
  *Raison :* Standard Next.js, SSR/ISR integres, tres flexible

- **Styling :** Tailwind CSS + theme system centralise
  *Raison :* Productivite elevee, design system facile a maintenir

### Firebase
- **Firestore Structure :**
  ```
  users/{userId}
    - displayName, email, avatarUrl, bio
    - createdAt, updatedAt

  posts/{postId}
    - userId, content, imageUrl
    - likes (array), commentsCount
    - createdAt
  ```
  *Raison :* Structure plate pour performance, denormalisation calculee

- **Storage :** `avatars/{userId}.jpg`, `posts/{postId}_{timestamp}.jpg`
  *Raison :* Organisation claire, facile a gerer cascade delete
```

---

## 🐛 Problemes Connus

**Documenter les bugs/limitations avec statut :**

```markdown
## 🐛 PROBLEMES CONNUS

### 1. Avatar upload lent sur connexions lentes
- **Statut :** En cours d'investigation
- **Impact :** Utilisateurs attendent 5-10s
- **Piste :** Compression avant upload pas optimale
- **TODO :** Tester sharp avec format JPEG optimise

### 2. Notifications Web Push ne fonctionnent pas sur Safari
- **Statut :** Limitation connue
- **Impact :** Utilisateurs Safari sans notifications
- **Solution :** Attendre support natif Safari ou utiliser alternative
```

---

## 📝 Notes Importantes

**Rappels pour futures sessions :**

```markdown
## 📝 NOTES IMPORTANTES

### A faire avant production
- [ ] Implementer cascade delete (user → posts, conversations)
- [ ] Ajouter rate limiting sur Cloud Functions
- [ ] Tester avec 1000+ posts pour verifier pagination
- [ ] Generer Privacy Policy et Terms of Service
- [ ] Configurer Sentry pour monitoring erreurs
- [ ] Tests E2E avec Playwright

### Dependances a surveiller
- next : Maj majeure tous les 3-4 mois environ
- firebase : Verifier breaking changes
- tailwindcss : Stable mais verifier maj

### Conventions equipe
- Code review obligatoire (1 approbation minimum)
- Tests obligatoires pour nouveaux services
- Commentaires en francais SANS ACCENTS
- Commits suivent convention (feat, fix, etc.)
```

---

## 🔄 Regles de Mise a Jour

**Claude DOIT mettre a jour PROJECT.md :**

1. **Apres chaque tache significative** (ajout feature, fix bug)
2. **Apres changement de version**
3. **Apres decision technique importante**
4. **Si nouveau probleme detecte**
5. **A la fin de chaque session**

**Sections a mettre a jour :**
- TodoList : marquer taches completees, ajouter nouvelles
- Journal : ajouter entree avec date/heure + description
- Decisions techniques : documenter choix importants
- Problemes connus : ajouter/mettre a jour bugs
- Notes importantes : rappels pour futures sessions

---

## 🧹 Nettoyage des TODOs Termines

```typescript
/**
 * REGLE CRITIQUE DE SECURITE
 *
 * ❌ NE JAMAIS nettoyer les todos termines SAUF SI :
 * 1. TOUTES les infos sont repertoriees dans PROJECT.md
 * 2. Verification explicite que rien n'est perdu
 * 3. Les todos termines sont archives dans "JOURNAL DE DEVELOPPEMENT"
 *
 * Claude propose le nettoyage uniquement quand :
 * - Il y a 10+ todos termines qui encombrent
 * - Tout est deja documente dans le journal
 *
 * Phrase exacte a utiliser :
 * "J'ai remarque qu'il y a [X] todos termines. Tout est repertorie
 *  dans le JOURNAL DE DEVELOPPEMENT. Veux-tu que je nettoie la section
 *  TERMINE pour alleger le fichier ?"
 */
```

### Process de Nettoyage Securise

1. **Verification** : Checker que chaque todo termine a une entree correspondante dans le JOURNAL
2. **Proposition** : Demander explicitement au dev avant de nettoyer
3. **Archive** : Garder une trace dans le JOURNAL avec dates et details
4. **Nettoyage** : Supprimer de la section TERMINE uniquement apres confirmation

### Exemple de Verification

```markdown
TODO termine : [x] [FEATURE] Chat groupe | Completed: 2025-10-28

Verification dans JOURNAL :
✅ Trouve : "28/10/2025 14:20 - Implementation chat groupe
            - Creation chatService.ts
            - Ajout page /chat
            - Tests : OK"

→ Peut etre nettoye en toute securite
```

---

## 🔗 Liens Utiles

```markdown
## 🔗 LIENS UTILES

- **GitHub Repo :** https://github.com/username/project
- **Firebase Console :** https://console.firebase.google.com/project/project-id
- **Vercel Dashboard :** https://vercel.com/username/project
- **Figma Design :** https://figma.com/file/...
```

---

**Derniere mise a jour par Claude Code le 30/10/2025 a 15:45**

🤖 _Guide destine a Claude Code - PROJECT.md comme memoire permanente essentielle_
