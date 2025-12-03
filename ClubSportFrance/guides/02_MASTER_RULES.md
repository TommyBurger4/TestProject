# 🎯 RÈGLES D'OR POUR CLAUDE CODE

> **Guide des principes fondamentaux à suivre pour TOUS les projets React Native/Expo**

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
- LoginScreen.tsx
- RegisterScreen.tsx
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
- src/features/auth/AuthContext.tsx (nouveau)
- src/features/auth/authService.ts (nouveau)
- src/features/auth/screens/LoginScreen.tsx (nouveau)

Message de commit propose :
feat(auth): implement complete authentication system

- Add AuthContext with login/logout
- Add authService with Firebase integration
- Create LoginScreen with email/password

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
5. Performance (optimisations raisonnables)
6. Vitesse de développement

**Mieux vaut poser une question que faire une mauvaise hypothèse**

---

## 🛠️ Stack Technique Standard

### Technologies Obligatoires

- **Framework :** React Native + Expo (v54+)
- **Langage :** TypeScript (strict mode)
- **Backend :** Firebase (Auth, Firestore, Storage, Analytics, Cloud Functions)
- **State Management :** Zustand (global) + Context API (features spécifiques)
- **Navigation :** React Navigation v7
- **Styling :** StyleSheet natif + theme system
- **i18n :** expo-localization + i18n-js (multi-langue OBLIGATOIRE)
- **Tests :** Jest + React Native Testing Library
- **CI/CD :** EAS Build & Submit
- **Versioning :** Semantic Versioning (MAJOR.MINOR.PATCH) + Build numbers

### Technologies Conditionnelles (selon onboarding)

- **RevenueCat** : Si abonnements/achats in-app
- **React Native Maps** : Si géolocalisation/cartes
- **Expo Notifications** : Si notifications push
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
9. **Hardcoder des valeurs** (toujours utiliser .env ou constants)
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
8. **Gérer les erreurs proprement** (try/catch, ErrorBoundary)
9. **Suivre les conventions de commit** (feat, fix, docs, etc.)
10. **Proposer des tests manuels** au dev après chaque feature

---

## 📱 Responsive Design (OBLIGATOIRE)

**REGLE ABSOLUE : Toute interface DOIT etre responsive**

### Principe Mobile-First

**Toujours concevoir pour mobile d'abord, puis adapter pour tablette/desktop**

```typescript
// ✅ BON : Adaptatif selon taille ecran
const styles = StyleSheet.create({
  container: {
    padding: isTablet ? 24 : 16,
    maxWidth: isDesktop ? 1200 : '100%',
  },
  grid: {
    flexDirection: isTablet ? 'row' : 'column',
  },
});

// ❌ MAUVAIS : Taille fixe
const styles = StyleSheet.create({
  container: {
    width: 375, // Taille iPhone uniquement !
  },
});
```

### Tester sur Differentes Tailles

**TOUJOURS verifier sur minimum 3 tailles :**
- 📱 Phone (375x667 - iPhone SE)
- 📱 Phone Large (414x896 - iPhone 15 Pro Max)
- 📱 Tablet (768x1024 - iPad)
- 💻 Desktop (1920x1080 - si React Native Web)

### APIs React Native pour Responsive

```typescript
import { Dimensions, useWindowDimensions } from 'react-native';

// Hook recommande (re-render automatique)
const { width, height } = useWindowDimensions();

// API statique (ne re-render PAS)
const { width, height } = Dimensions.get('window');
```

### Breakpoints Standards

```typescript
const BREAKPOINTS = {
  phone: 0,
  tablet: 768,
  desktop: 1024,
};

const isTablet = width >= BREAKPOINTS.tablet;
const isDesktop = width >= BREAKPOINTS.desktop;
```

**Regle d'Or** :
- ❌ JAMAIS de `width: 300` ou `height: 500` en dur
- ✅ TOUJOURS utiliser `useWindowDimensions` ou `Dimensions`
- ✅ TOUJOURS tester sur plusieurs tailles d'ecran
- ✅ Utiliser `flexbox` pour layouts adaptatifs

**Voir guide complet : 05_ARCHITECTURE.md section Responsive Design**

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
     <View>
       <Text>{errorMessage}</Text>
       <Button title="Reessayer" onPress={retry} />
     </View>
   )}
   ```

4. **Utiliser ErrorBoundary pour les erreurs React**
   ```typescript
   // App.tsx
   <ErrorBoundary>
     <AppNavigator />
   </ErrorBoundary>
   ```

**Regle d'Or** :
- ✅ TOUJOURS try/catch sur appels Firebase/API
- ✅ TOUJOURS messages d'erreur en francais
- ✅ TOUJOURS proposer un bouton "Reessayer"
- ✅ TOUJOURS logger les erreurs (console ou Sentry)
- ❌ JAMAIS laisser une erreur crasher l'app
- ❌ JAMAIS afficher les codes erreur techniques a l'utilisateur

**Voir guide complet : 05_ARCHITECTURE.md section Error Handling**

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
src/features/auth/
  ├── components/     # UI spécifique auth
  ├── hooks/          # useAuth, useLogin
  ├── screens/        # LoginScreen, RegisterScreen
  ├── services/       # authService.ts (logique)
  └── types/          # User, AuthState

// ❌ MAUVAIS (tout mélangé dans un seul fichier)
src/auth.ts         # 2000 lignes avec UI + logique + types
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
✅ "J'ai cree LoginScreen.tsx. Pour tester : lance l'app et va sur l'ecran de login."
❌ "J'ai terminé de créer avec succès le fichier LoginScreen.tsx qui permet..."
```

**Pragmatique** :
```
✅ "Il manque la config Firebase. Donne-moi tes cles, je cree le .env."
❌ "Il semblerait qu'il y ait un problème avec la configuration Firebase..."
```

**Sans fioritures** :
```
✅ "Bug corrige. Teste maintenant."
❌ "Félicitations ! J'ai réussi à corriger le bug. Tu peux maintenant..."
```

---

**🎯 Ces règles sont ABSOLUES et s'appliquent à TOUS les projets React Native/Expo**

🤖 _Guide destiné à Claude Code - Ne jamais dévier de ces principes_
