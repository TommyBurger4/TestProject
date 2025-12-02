# 🎯 RÈGLES D'OR POUR CLAUDE CODE

> **Guide des principes fondamentaux à suivre pour TOUS les projets Next.js**

---

## 📖 Philosophie de Développement

### 1. Code Anglais, Commentaires Français (SANS ACCENTS)

**Variables, fonctions, composants : TOUJOURS en anglais**
```typescript
// ✅ BON
const UserProfile = () => {};
const handleLogin = () => {};
const isAuthenticated = true;

// ❌ MAUVAIS
const ProfilUtilisateur = () => {};
const gererConnexion = () => {};
const estAuthentifie = true;
```

**Commentaires, documentation : TOUJOURS en français SANS accents**
```typescript
// ✅ BON
/**
 * Verifie si l'utilisateur est authentifie
 * @param userId - Identifiant de l'utilisateur
 * @returns true si authentifie, false sinon
 */

// ❌ MAUVAIS
/**
 * Vérifie si l'utilisateur est authentifié
 * @param userId - Identifiant de l'utilisateur
 * @returns true si authentifié, false sinon
 */
```

**Raison :** Cohérence internationale + lisibilité pour développeur francophone

---

### 2. Demande Permission AVANT de Coder

**JAMAIS commencer à coder sans avoir présenté un plan**

✅ **Bon workflow :**
```
Claude: "Je vais creer le systeme d'authentification complet :
- AuthContext.tsx
- authService.ts
- page /login
- page /register
Es-tu d'accord ?"

Dev: "Oui"

Claude: [commence à coder]
```

❌ **Mauvais workflow :**
```
Claude: [commence à coder directement sans demander]
```

**Exception :** Corrections mineures évidentes (typos, indentation)

---

### 3. Demande Confirmation AVANT de Commit

**JAMAIS créer un commit sans permission explicite**

✅ **Bon workflow :**
```
Claude: "J'ai termine l'implementation de l'authentification.
Fichiers modifies :
- app/login/page.tsx (nouveau)
- services/authService.ts (nouveau)
- contexts/AuthContext.tsx (nouveau)

Message de commit propose :
feat(auth): implement complete authentication system

- Add AuthContext with login/logout
- Add authService with Firebase integration
- Create login page with email/password

Veux-tu que je cree ce commit ?"

Dev: "Oui"

Claude: [crée le commit]
```

**Important :** TOUJOURS proposer message de commit ET attendre validation

---

### 4. Permanent Memory via PROJECT.MD

**Le fichier `PROJECT.md` est LA mémoire permanente entre sessions**

**TOUJOURS mettre à jour après :**
- Ajout/complétion d'une feature
- Changement de version
- Décision technique importante
- Bug découvert
- À la fin de chaque session

**Contenu obligatoire :**
- TodoList (pending, in_progress, completed)
- Journal de développement (avec dates et heures)
- Décisions techniques (avec justifications)
- Problèmes connus (bugs, limitations)
- Notes importantes (pour futures sessions)

**Permet à Claude de reprendre le contexte même après des semaines**

---

### 5. Qualité > Vitesse

**Toujours privilégier du code propre, testé, documenté**

✅ **Priorités :**
1. Sécurité (validation, authentication, secrets)
2. Qualité du code (lisible, maintenable, DRY)
3. Documentation (commentaires, README, PROJECT.md)
4. Tests (au moins pour la logique critique)
5. Performance (SSR, ISR, optimisations raisonnables)
6. Vitesse de développement

**Mieux vaut poser une question que faire une mauvaise hypothèse**

---

## 🛠️ Stack Technique Standard

### Technologies Obligatoires

- **Framework :** Next.js 14+ (App Router)
- **Langage :** TypeScript (strict mode)
- **Backend :** Firebase (Auth, Firestore, Storage, Analytics, Cloud Functions)
- **State Management :** Zustand (global) + Context API (features spécifiques)
- **Routing :** Next.js App Router (file-based routing)
- **Styling :** Tailwind CSS + theme system
- **i18n :** next-intl (multi-langue OBLIGATOIRE)
- **Tests :** Jest + React Testing Library
- **Deployment :** Vercel (recommandé) ou Firebase Hosting
- **Versioning :** Semantic Versioning (MAJOR.MINOR.PATCH)

### Technologies Conditionnelles (selon onboarding)

- **Stripe** : Si abonnements/achats
- **Google Maps JavaScript API** : Si géolocalisation/cartes
- **Web Push API** : Si notifications push navigateur
- **Algolia** : Si recherche full-text avancée
- **Mixpanel/Amplitude** : Si analytics avancés
- **Sentry** : Si monitoring erreurs production

---

## 🚫 Interdictions Absolues

### ❌ NE JAMAIS :

1. **Commiter des secrets** (API keys, tokens, passwords, certificats)
2. **Push direct sur main** (toujours via Pull Request)
3. **Coder sans demander permission**
4. **Commit sans confirmation du dev**
5. **Utiliser des accents dans les commentaires** (é, è, à, ç, etc.)
6. **Ignorer les erreurs TypeScript** (strict mode obligatoire)
7. **Oublier de mettre à jour PROJECT.md**
8. **Créer du code sans tests** (pour logique critique)
9. **Hardcoder des valeurs** (toujours utiliser .env.local ou constants)
10. **Merge sans review** (au moins 1 approbation)

---

## ✅ Obligations Absolues

### ✅ TOUJOURS :

1. **Poser les 16 questions d'onboarding** avant de démarrer
2. **Demander permission avant de coder** (présenter le plan)
3. **Demander confirmation avant commit** (proposer message)
4. **Mettre à jour PROJECT.md** après chaque action significative
5. **Commenter en français SANS accents**
6. **Utiliser TypeScript strict mode**
7. **Valider les inputs utilisateur** (côté client ET serveur)
8. **Gérer les erreurs proprement** (try/catch, Error Boundary)
9. **Suivre les conventions de commit** (feat, fix, docs, etc.)
10. **Proposer des tests manuels** au dev après chaque feature

---

## 📱 Responsive Design (OBLIGATOIRE)

**REGLE ABSOLUE : Toute interface DOIT etre responsive**

### Principe Mobile-First ou Desktop-First

**Adapter selon priorité définie en onboarding**

```typescript
// ✅ BON : Adaptatif selon taille ecran avec Tailwind
<div className="p-4 md:p-8 lg:p-12">
  <h1 className="text-2xl md:text-4xl lg:text-5xl">Titre</h1>
</div>

// ❌ MAUVAIS : Taille fixe
<div style={{ width: 1200 }}>
  <h1 style={{ fontSize: 48 }}>Titre</h1>
</div>
```

### Breakpoints Standards Tailwind

```typescript
// Breakpoints Tailwind par defaut
sm: 640px   // Small devices (phones)
md: 768px   // Medium devices (tablets)
lg: 1024px  // Large devices (desktops)
xl: 1280px  // Extra large devices
2xl: 1536px // 2X Extra large devices
```

**Regle d'Or** :
- ❌ JAMAIS de `width: 300px` ou `height: 500px` en dur
- ✅ TOUJOURS utiliser Tailwind responsive classes
- ✅ TOUJOURS tester sur plusieurs tailles d'ecran
- ✅ Utiliser `flexbox` et `grid` pour layouts adaptatifs

---

## ⚠️ Error Handling (OBLIGATOIRE)

**REGLE ABSOLUE : Toujours gerer les erreurs proprement**

### Principes de Base

1. **Toujours wrapper les appels async dans try/catch**
   ```typescript
   // ✅ BON
   const handleLogin = async () => {
     try {
       await authService.login(email, password);
     } catch (error) {
       showError(error);
     }
   };

   // ❌ MAUVAIS
   const handleLogin = async () => {
     await authService.login(email, password); // Peut crasher l'app
   };
   ```

2. **Toujours afficher un message user-friendly**
   ```typescript
   // ✅ BON
   const message = getErrorMessage(error); // "Mot de passe incorrect"

   // ❌ MAUVAIS
   const message = error.code; // "auth/wrong-password"
   ```

3. **Toujours proposer une action (Reessayer, Retour)**
   ```typescript
   // ✅ BON
   {error && (
     <div>
       <p>{errorMessage}</p>
       <button onClick={retry}>Reessayer</button>
     </div>
   )}
   ```

4. **Utiliser Error Boundary pour les erreurs React**
   ```typescript
   // app/layout.tsx
   <ErrorBoundary>
     {children}
   </ErrorBoundary>
   ```

**Regle d'Or** :
- ✅ TOUJOURS try/catch sur appels Firebase/API
- ✅ TOUJOURS messages d'erreur en francais
- ✅ TOUJOURS proposer un bouton "Reessayer"
- ✅ TOUJOURS logger les erreurs (console ou Sentry)
- ❌ JAMAIS laisser une erreur crasher le site
- ❌ JAMAIS afficher les codes erreur techniques a l'utilisateur

---

## 🎓 Principes de Code

### DRY (Don't Repeat Yourself)
```typescript
// ❌ MAUVAIS
const user1 = await getDoc(doc(db, 'users', userId1));
const user2 = await getDoc(doc(db, 'users', userId2));
const user3 = await getDoc(doc(db, 'users', userId3));

// ✅ BON
const getUser = async (userId: string) => {
  return await getDoc(doc(db, 'users', userId));
};
```

### KISS (Keep It Simple, Stupid)
```typescript
// ❌ MAUVAIS (trop complexe)
const isValid = (user?.profile?.settings?.notifications?.enabled ?? false) === true ? true : false;

// ✅ BON (simple et clair)
const isValid = user?.profile?.settings?.notifications?.enabled ?? false;
```

### Separation of Concerns
```
// ✅ BON
app/                   # Pages Next.js (routing)
├── components/        # UI reutilisable
├── services/          # Logique metier
├── hooks/             # Hooks custom
└── lib/               # Utilitaires

// ❌ MAUVAIS (tout mélangé)
pages/everything.tsx   # 2000 lignes avec UI + logique + API
```

---

## 📋 Checklist Avant Chaque Action

### Avant de coder :
- [ ] J'ai posé les 16 questions d'onboarding (nouveau projet uniquement)
- [ ] J'ai présenté mon plan au développeur
- [ ] J'ai attendu la validation explicite
- [ ] Je sais exactement quels fichiers je vais créer/modifier

### Avant de commit :
- [ ] Le code compile sans erreur
- [ ] TypeScript strict mode passe
- [ ] Pas de console.log oubliés
- [ ] Pas de secrets dans le code
- [ ] Commentaires en français SANS accents
- [ ] PROJECT.md mis à jour
- [ ] J'ai proposé le message de commit
- [ ] J'ai attendu la confirmation du dev

### Avant de proposer une version :
- [ ] Feature complétée et testée
- [ ] Tous les commits propres
- [ ] PROJECT.md à jour
- [ ] Pas de TODO critiques
- [ ] J'ai proposé MINOR/PATCH/MAJOR
- [ ] J'ai attendu la confirmation du dev

---

## 🤖 Ton et Communication

### Style de communication :

**Concis et direct** :
```
✅ "J'ai cree la page /login. Pour tester : va sur http://localhost:3000/login."
❌ "J'ai terminé de créer avec succès la page /login qui permet..."
```

**Pragmatique** :
```
✅ "Il manque la config Firebase. Donne-moi tes cles, je cree le .env.local."
❌ "Il semblerait qu'il y ait un problème avec la configuration Firebase..."
```

**Sans fioritures** :
```
✅ "Bug corrige. Teste maintenant."
❌ "Félicitations ! J'ai réussi à corriger le bug. Tu peux maintenant..."
```

---

**🎯 Ces règles sont ABSOLUES et s'appliquent à TOUS les projets Next.js**

🤖 _Guide destiné à Claude Code - Ne jamais dévier de ces principes_
