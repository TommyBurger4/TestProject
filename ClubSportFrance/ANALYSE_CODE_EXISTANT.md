# 📊 ANALYSE COMPLETE DU CODE REACT NATIVE EXISTANT

**Date d'analyse :** 02/12/2025
**Projet analysé :** ClubSportFrance_backup_mobile/
**Objectif :** Documenter tout le code existant pour reconstruire en Next.js

---

## 🎯 RÉSUMÉ GLOBAL

**Fichiers source analysés :** 35 fichiers TypeScript (.ts/.tsx)
**Écrans totaux :** 12 écrans
**Services :** 4 services complets
**Composants UI :** 3 composants de base
**Contextes :** 1 contexte d'authentification
**Hooks custom :** 1 hook

---

## 📂 ARCHITECTURE ACTUELLE (React Native/Expo)

```
ClubSportFrance_backup_mobile/
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── Button.tsx ✅
│   │       ├── Card.tsx ✅
│   │       └── Input.tsx ✅
│   │
│   ├── contexts/
│   │   ├── AuthContext.tsx ✅ (complet)
│   │   └── ThemeContext.tsx (référencé)
│   │
│   ├── features/
│   │   ├── auth/screens/
│   │   │   ├── AccountTypeChoiceScreen.tsx ✅
│   │   │   ├── ForgotPasswordScreen.tsx ✅
│   │   │   ├── LoginScreen.tsx ✅
│   │   │   ├── RegisterClubScreen.tsx ✅
│   │   │   └── RegisterScreen.tsx ✅
│   │   │
│   │   ├── chat/screens/
│   │   │   └── ChatScreen.tsx ⚠️ (placeholder)
│   │   │
│   │   ├── club/screens/
│   │   │   └── ClubDashboardScreen.tsx ⚠️ (basique)
│   │   │
│   │   ├── favorites/screens/
│   │   │   └── FavoritesScreen.tsx ⚠️ (placeholder)
│   │   │
│   │   ├── map/screens/
│   │   │   └── MapScreen.tsx ✅ (géolocalisation)
│   │   │
│   │   ├── profile/screens/
│   │   │   ├── EditProfileScreen.tsx ✅
│   │   │   └── ProfileScreen.tsx ✅
│   │   │
│   │   └── search/screens/
│   │       └── SearchScreen.tsx ⚠️ (placeholder)
│   │
│   ├── hooks/
│   │   └── useUserProfile.ts ✅
│   │
│   ├── services/
│   │   ├── auth/
│   │   │   └── authService.ts ✅ (complet)
│   │   ├── firebase/
│   │   │   └── firebase.ts ✅
│   │   ├── image/
│   │   │   └── imageService.ts ✅
│   │   └── user/
│   │       └── userService.ts ✅
│   │
│   └── theme/
│       ├── spacing.ts
│       └── typography.ts
```

---

## ✅ FONCTIONNALITÉS COMPLÈTES (à recréer identiquement)

### 🔐 1. AUTHENTIFICATION COMPLÈTE

#### **Service : `authService.ts` (210 lignes)**

**Fonctions implémentées :**

✅ **`registerWithEmail(email, password, displayName?)`**
- Crée un compte Firebase Auth
- Met à jour le displayName si fourni
- Retourne `{ success, user?, error? }`

✅ **`loginWithEmail(email, password)`**
- Connexion avec identifiants
- Retourne `{ success, user?, error? }`

✅ **`logout()`**
- Déconnexion Firebase Auth

✅ **`sendPasswordReset(email)`**
- Envoie email de réinitialisation

✅ **`getCurrentUser()`**
- Retourne l'utilisateur connecté (`User | null`)

✅ **`isValidEmail(email)`**
- Validation format email avec regex

✅ **`validatePassword(password)`**
- Minimum 6 caractères
- Retourne `{ valid, error? }`

✅ **`passwordsMatch(password, confirmPassword)`**
- Vérifie que les mots de passe correspondent

✅ **`getFirebaseErrorMessage(error)`**
- Traduction des erreurs Firebase en français
- Gère tous les codes d'erreur courants :
  - `auth/email-already-in-use`
  - `auth/invalid-email`
  - `auth/weak-password`
  - `auth/user-not-found`
  - `auth/wrong-password`
  - `auth/invalid-credential`
  - `auth/network-request-failed`
  - `auth/too-many-requests`

**À recréer en Next.js :**
- Service identique pour Client Components
- Possibilité d'ajouter Server Actions pour SSR

---

#### **Context : `AuthContext.tsx` (165 lignes)**

**État global fourni :**
```typescript
interface AuthContextType {
  user: User | null;              // Utilisateur connecté
  loading: boolean;               // Chargement initial
  error: string | null;           // Dernière erreur

  // Fonctions
  register(email, password, displayName?, role?): Promise<AuthResult>;
  login(email, password): Promise<AuthResult>;
  logout(): Promise<AuthResult>;
  resetPassword(email): Promise<AuthResult>;
  clearError(): void;
}
```

**Logique importante :**
- `onAuthStateChanged` écoute les changements d'auth
- Crée automatiquement le profil Firestore au premier login (via `createUserProfile`)
- Gère le role utilisateur ('user' ou 'club')

**À recréer en Next.js :**
- Provider client-side avec `'use client'`
- Utiliser `useState` + `useEffect` + `onAuthStateChanged`

---

#### **Écrans Auth (5 écrans)**

✅ **1. LoginScreen.tsx (283 lignes)**
- Formulaire email + password
- Validation temps réel
- Liens vers Register et ForgotPassword
- Navigation conditionnelle selon role :
  - `role === 'club'` → `ClubDashboard`
  - `role === 'user'` → `Tabs` (Map, Search, Favorites, Chat, Profile)

✅ **2. RegisterScreen.tsx (314 lignes)**
- Formulaire : displayName, email, password, confirmPassword
- Validation complète (min 2 caractères nom, email valide, passwords match)
- Accepte `role` en param de navigation
- Crée profil Firestore avec role après inscription

✅ **3. RegisterClubScreen.tsx (316 lignes)**
- Identique à RegisterScreen mais pour clubs
- Champ "Nom du club" (min 3 caractères)
- Role fixé à 'club'
- Navigation vers `ClubDashboard` après inscription

✅ **4. AccountTypeChoiceScreen.tsx (205 lignes)**
- Écran de choix entre "Utilisateur" ou "Club"
- 2 Cards avec icônes (👤 et 🏢)
- Navigate vers `Register` (role: 'user') ou `RegisterClub` (role: 'club')

✅ **5. ForgotPasswordScreen.tsx (266 lignes)**
- Formulaire email uniquement
- Appelle `resetPassword(email)`
- Affiche message de confirmation après envoi
- Bouton retour vers Login

**À recréer en Next.js :**
- Remplacer par pages Next.js :
  - `app/(auth)/login/page.tsx`
  - `app/(auth)/register/page.tsx`
  - `app/(auth)/register-club/page.tsx`
  - `app/(auth)/account-choice/page.tsx`
  - `app/(auth)/forgot-password/page.tsx`
- Utiliser `useRouter` pour navigation
- Remplacer `KeyboardAvoidingView` par formulaires HTML standards

---

### 👤 2. GESTION DES PROFILS UTILISATEURS

#### **Service : `userService.ts` (212 lignes)**

**Interface UserProfile :**
```typescript
interface UserProfile {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  bio: string | null;
  role: 'user' | 'club';          // ⚠️ IMPORTANT : différencie users et clubs
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

**Fonctions implémentées :**

✅ **`createUserProfile(user: FirebaseUser, role: UserRole)`**
- Crée document dans collection `users/{uid}`
- Vérifie si existe déjà (évite duplication)
- Ajoute `createdAt` et `updatedAt` avec `serverTimestamp()`
- Retourne `{ success, profile?, error? }`

✅ **`getUserProfile(userId: string)`**
- Récupère profil depuis Firestore
- Retourne `{ success, profile?, error? }`

✅ **`updateUserProfile(userId, data: UpdateUserProfileData)`**
- Met à jour `displayName`, `photoURL`, `bio`
- Update automatique de `updatedAt`
- Retourne profil mis à jour

✅ **`deleteUserProfile(userId: string)`**
- Supprime document Firestore
- ⚠️ Ne supprime PAS le compte Firebase Auth (à faire séparément)

**À recréer en Next.js :**
- Service identique
- Possibilité d'ajouter Server Actions pour SSR

---

#### **Hook : `useUserProfile.ts` (53 lignes)**

**Retourne :**
```typescript
{
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}
```

**Logique :**
- `useEffect` avec dépendance sur `user` (AuthContext)
- Appelle `getUserProfile(user.uid)` au changement d'user
- Gère les états de chargement et erreur

**À recréer en Next.js :**
- Hook identique pour Client Components
- Alternative : Server Component qui fetch directement

---

#### **Écrans Profil (2 écrans)**

✅ **1. ProfileScreen.tsx (274 lignes)**

**Affiche :**
- Photo de profil (ou placeholder avec initiale)
- Nom d'affichage
- Email
- Bio
- Bouton "Éditer le profil"
- Bouton "Se déconnecter" (avec Alert de confirmation)

**États :**
- Loading avec ActivityIndicator
- Erreur avec message + bouton "Réessayer"
- Profil complet dans Card

✅ **2. EditProfileScreen.tsx (344 lignes)**

**Permet de modifier :**
- **Photo de profil** (2 options) :
  - 📷 Prendre photo avec caméra
  - 🖼️ Choisir depuis galerie
  - Upload automatique vers Firebase Storage
- **Nom d'affichage** (max 50 caractères)
- **Bio** (max 500 caractères, multiline)

**Validation :**
- Nom requis (min 2 caractères)
- Bio max 500 caractères
- Compteur de caractères affiché

**Logique upload photo :**
1. Demande permission (camera ou galerie)
2. Conversion URI → Blob
3. Upload vers `storage/users/{uid}/profile/{filename}`
4. Récupère `downloadURL`
5. Met à jour `photoURL` dans Firestore

**À recréer en Next.js :**
- `app/(main)/profile/page.tsx`
- `app/(main)/profile/edit/page.tsx`
- Remplacer `expo-image-picker` par `<input type="file">`
- Upload via API Route ou directement depuis client

---

### 📸 3. GESTION DES IMAGES

#### **Service : `imageService.ts` (158 lignes)**

**Fonctions implémentées :**

✅ **`uploadProfilePhoto(userId, imageUri)`**
- Convertit URI React Native en Blob (`uriToBlob`)
- Génère filename avec timestamp : `profile_{userId}_{timestamp}.jpg`
- Upload vers `users/{userId}/profile/{filename}`
- Retourne `{ success, url?, error? }`

✅ **`deleteProfilePhoto(photoURL)`**
- Supprime photo de Storage
- Prend URL en paramètre et extrait le path

✅ **`takePictureWithCamera()`**
- Demande permission caméra
- Ouvre caméra avec `expo-image-picker`
- Options : `allowsEditing: true`, `aspect: [1, 1]`, `quality: 0.7`
- Retourne URI ou `null` si annulé

✅ **`pickImageFromGallery()`**
- Demande permission galerie
- Ouvre galerie
- Mêmes options que caméra
- Retourne URI ou `null`

✅ **`uriToBlob(uri: string)` (helper interne)**
- Convertit URI React Native en Blob pour Firebase Storage
- Utilise XMLHttpRequest

**À recréer en Next.js :**
- **Suppression complète** de `takePictureWithCamera` et `pickImageFromGallery` (web natif)
- **Remplacer** par `<input type="file" accept="image/*">`
- **Conserver** `uploadProfilePhoto` (adapter pour File web au lieu de URI)
- **Conserver** `deleteProfilePhoto`
- **Nouveau** : Fonction de compression côté client (ex: canvas API)

---

### 🔥 4. CONFIGURATION FIREBASE

#### **Service : `firebase.ts` (50 lignes)**

**Configuration actuelle (React Native) :**
```typescript
// ❌ Spécifique React Native
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
```

**Services initialisés :**
- `auth` - Firebase Auth
- `db` - Firestore
- `storage` - Firebase Storage
- `analytics` - Firebase Analytics (web uniquement dans code actuel)

**Variables d'environnement :**
- Utilise `Constants.expoConfig?.extra?.EXPO_PUBLIC_*`
- Fallback sur `process.env.EXPO_PUBLIC_*`

**À recréer en Next.js :**
```typescript
// ✅ Configuration Next.js (plus simple)
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Pas besoin de initializeAuth
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);        // Persistence automatique (web)
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { auth, db, storage, analytics, app };
```

---

## 🧩 COMPOSANTS UI (à recréer en Tailwind)

### **1. Button.tsx (188 lignes)**

**Props :**
```typescript
{
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  style?: ViewStyle;
}
```

**Variants :**
- **Primary** : Fond `colors.primary`, texte blanc
- **Secondary** : Fond `colors.secondary`, texte blanc
- **Outline** : Fond transparent, bordure `colors.primary`, texte `colors.primary`
- **Text** : Fond transparent, texte `colors.primary`, pas de minHeight

**Sizes :**
- **Small** : `fontSize: sm`, `padding: md/sm`
- **Medium** : `fontSize: base`, `padding: lg/md`
- **Large** : `fontSize: lg`, `padding: xl/lg`

**Accessibility :**
- `accessibilityRole="button"`
- `accessibilityState={{ disabled }}`
- Touch target minimum : iOS 44px, Android 48px

**Loading state :**
- Affiche `ActivityIndicator` au lieu du texte
- Couleur spinner selon variant

**À recréer en Next.js :**
```tsx
// Tailwind variant classes
const variants = {
  primary: 'bg-primary text-white hover:bg-primary-dark',
  secondary: 'bg-secondary text-white hover:bg-secondary-dark',
  outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white',
  text: 'bg-transparent text-primary hover:underline',
};

const sizes = {
  small: 'text-sm px-4 py-2',
  medium: 'text-base px-6 py-3',
  large: 'text-lg px-8 py-4',
};
```

---

### **2. Input.tsx (152 lignes)**

**Props :**
```typescript
{
  label?: string;
  error?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'email-address' | ...;
  secureTextEntry?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  style?: ViewStyle;
}
```

**Fonctionnalités :**
- **Label** au-dessus de l'input
- **Focus state** : Bordure `colors.primary` quand focus
- **Error state** : Bordure rouge + message d'erreur en dessous
- **Disabled state** : Fond gris `colors.disabled`
- **Multiline** : Textarea avec `textAlignVertical: 'top'`
- **Touch target** minimum respecté (iOS/Android)

**Accessibility :**
- `accessibilityLabel={label || placeholder}`
- `accessibilityHint={error}` (screen reader lit l'erreur)
- `accessibilityLiveRegion="polite"` pour message d'erreur

**À recréer en Next.js :**
```tsx
// Tailwind avec focus et error states
<input
  className={cn(
    'border-2 rounded-md px-4 py-3',
    'focus:outline-none focus:border-primary',
    error && 'border-red-500',
    disabled && 'bg-gray-100 cursor-not-allowed'
  )}
/>
```

---

### **3. Card.tsx (95 lignes)**

**Props :**
```typescript
{
  children: React.ReactNode;
  padding?: 'none' | 'small' | 'medium' | 'large';
  elevated?: boolean;
  style?: ViewStyle;
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityRole?: 'none' | 'button' | 'link' | ...;
}
```

**Styles :**
- **Background** : `colors.surface` (blanc ou gris clair selon thème)
- **Bordure** : 1px `colors.border`
- **Border radius** : `borderRadius.lg`
- **Elevation** (si `elevated: true`) :
  - iOS : Shadow (offset, opacity, radius)
  - Android : `elevation: 3`
  - Web : `boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)'`

**Padding values :**
- `none` : 0
- `small` : `spacing.sm`
- `medium` : `spacing.md`
- `large` : `spacing.xl`

**À recréer en Next.js :**
```tsx
// Tailwind avec shadow
<div
  className={cn(
    'bg-white dark:bg-gray-800',
    'border border-gray-200 dark:border-gray-700',
    'rounded-lg',
    elevated && 'shadow-md',
    padding === 'small' && 'p-2',
    padding === 'medium' && 'p-4',
    padding === 'large' && 'p-6'
  )}
>
  {children}
</div>
```

---

## ⚠️ ÉCRANS PLACEHOLDER (à implémenter)

### **1. ChatScreen.tsx**
**État actuel :** Placeholder avec texte "Fonctionnalité à venir"
**À implémenter :**
- Messagerie 1-to-1 entre users et clubs
- Liste des conversations (Firestore collection `conversations`)
- Messages temps réel (Firestore snapshots)
- Notifications push (FCM)
- Support médias (photos)

---

### **2. ClubDashboardScreen.tsx**
**État actuel :** Dashboard basique avec déconnexion
**À implémenter :**
- Tabs club :
  - **Ma Fiche** : CRUD fiche club (nom, sport, adresse, horaires, photos)
  - **Équipes** : CRUD équipes du club
  - **Statistiques** : Vues profil, favoris
  - **Paramètres** : Compte, déconnexion

---

### **3. FavoritesScreen.tsx**
**État actuel :** Placeholder
**À implémenter :**
- Collection Firestore `users/{uid}/favorites/{clubId}`
- Liste des clubs favoris (query + populate)
- Bouton retirer des favoris
- Navigation vers fiche club

---

### **4. MapScreen.tsx**
**État actuel :** Carte avec géolocalisation (react-native-maps)
**À migrer vers Google Maps JavaScript API :**
- Géolocalisation navigateur (`navigator.geolocation`)
- Marqueurs des clubs depuis Firestore
- Filtres de recherche sur la carte
- Click sur marqueur → Popup fiche club

---

### **5. SearchScreen.tsx**
**État actuel :** Placeholder
**À implémenter :**
- Barre de recherche (ville)
- Filtres :
  - Sport (checkboxes)
  - Distance (slider)
  - Niveau (checkboxes)
  - Genre (checkboxes)
  - Âge (range)
- Résultats depuis Firestore (queries composées)
- Pagination

---

## 📋 TODOLIST COMPLÈTE POUR RECONSTRUCTION NEXT.JS

### 🔧 PHASE 1 : INITIALISATION (0/10)

- [ ] **Initialiser projet Next.js 14+** | `npx create-next-app@latest --typescript --tailwind --app --src-dir`
- [ ] **Installer dépendances Firebase** | `npm install firebase`
- [ ] **Configurer .env.local** | Copier credentials Firebase Web
- [ ] **Créer structure de dossiers** | `src/app/`, `src/components/`, `src/services/`, `src/hooks/`
- [ ] **Créer firebase.ts** | Configuration Firebase Web SDK (sans React Native persistence)
- [ ] **Créer theme Tailwind** | `tailwind.config.ts` avec colors, spacing
- [ ] **Créer layout.tsx** | Layout principal avec metadata
- [ ] **Créer page.tsx** | Page d'accueil (redirect vers /map)
- [ ] **Créer CONTRIBUTING.md** | Copier depuis templates/
- [ ] **Premier commit Git** | "feat: init Next.js project with Firebase config"

---

### 🔐 PHASE 2 : SERVICES & AUTHENTIFICATION (0/8)

- [ ] **Créer authService.ts** | Copier depuis React Native (100% compatible)
- [ ] **Créer userService.ts** | Copier depuis React Native (100% compatible)
- [ ] **Créer imageService.ts** | Adapter pour web (File au lieu de URI)
- [ ] **Créer AuthContext.tsx** | Context avec `'use client'`, onAuthStateChanged
- [ ] **Créer useUserProfile.ts** | Hook pour récupérer profil Firestore
- [ ] **Tester services en console** | Vérifier register, login, logout
- [ ] **Créer Firestore Rules** | Règles basiques pour collection `users`
- [ ] **Commit** | "feat(auth): add auth services and context"

---

### 🧩 PHASE 3 : COMPOSANTS UI (0/5)

- [ ] **Créer Button.tsx** | Tailwind, 4 variants, loading, accessible
- [ ] **Créer Input.tsx** | Tailwind, label, error, multiline
- [ ] **Créer Card.tsx** | Tailwind, padding, elevation
- [ ] **Créer hook useToast** | Pour notifications (remplace Alert de React Native)
- [ ] **Commit** | "feat(ui): add base UI components"

---

### 🔑 PHASE 4 : PAGES AUTHENTIFICATION (0/6)

- [ ] **app/(auth)/layout.tsx** | Layout auth (centré, pas de navbar)
- [ ] **app/(auth)/login/page.tsx** | LoginScreen → page Next.js
- [ ] **app/(auth)/register/page.tsx** | RegisterScreen → page Next.js
- [ ] **app/(auth)/register-club/page.tsx** | RegisterClubScreen → page Next.js
- [ ] **app/(auth)/account-choice/page.tsx** | AccountTypeChoiceScreen → page Next.js
- [ ] **app/(auth)/forgot-password/page.tsx** | ForgotPasswordScreen → page Next.js
- [ ] **Tester flow complet auth** | Register → Login → Forgot Password
- [ ] **Commit** | "feat(auth): add authentication pages"

---

### 👤 PHASE 5 : PAGES PROFIL (0/4)

- [ ] **app/(main)/layout.tsx** | Layout principal avec navbar + AuthProvider
- [ ] **app/(main)/profile/page.tsx** | ProfileScreen → page Next.js
- [ ] **app/(main)/profile/edit/page.tsx** | EditProfileScreen → page Next.js
- [ ] **Tester upload photo** | Camera/galerie → Upload Storage → Update Firestore
- [ ] **Commit** | "feat(profile): add profile pages with photo upload"

---

### 🗺️ PHASE 6 : CARTE INTERACTIVE (0/5)

- [ ] **Installer Google Maps** | `npm install @googlemaps/react-wrapper`
- [ ] **Créer MapComponent.tsx** | Carte Google Maps avec géolocalisation
- [ ] **app/(main)/map/page.tsx** | MapScreen → page Next.js
- [ ] **Afficher marqueurs clubs** | Query Firestore `clubs` + afficher sur carte
- [ ] **Click marqueur → Popup** | Afficher fiche club en popup
- [ ] **Commit** | "feat(map): add interactive map with clubs"

---

### 🔍 PHASE 7 : RECHERCHE & FILTRES (0/6)

- [ ] **app/(main)/search/page.tsx** | SearchScreen → page Next.js
- [ ] **Créer composant SearchBar** | Input ville avec suggestions
- [ ] **Créer composant Filters** | Checkboxes sport, slider distance, etc.
- [ ] **Créer service searchService.ts** | Queries Firestore composées
- [ ] **Afficher résultats paginés** | Liste clubs avec pagination
- [ ] **Commit** | "feat(search): add search with advanced filters"

---

### ⭐ PHASE 8 : FAVORIS (0/4)

- [ ] **Créer service favoritesService.ts** | Add/remove/list favoris
- [ ] **app/(main)/favorites/page.tsx** | FavoritesScreen → page Next.js
- [ ] **Bouton "Ajouter aux favoris"** | Sur fiche club + carte
- [ ] **Commit** | "feat(favorites): add favorites system"

---

### 💬 PHASE 9 : MESSAGERIE (0/6)

- [ ] **Créer service chatService.ts** | Conversations + messages Firestore
- [ ] **app/(main)/chat/page.tsx** | Liste conversations
- [ ] **app/(main)/chat/[conversationId]/page.tsx** | Messages 1-to-1
- [ ] **Temps réel avec snapshots** | Firestore `onSnapshot`
- [ ] **Support médias** | Upload photos dans chat
- [ ] **Commit** | "feat(chat): add real-time messaging"

---

### 🏢 PHASE 10 : DASHBOARD CLUB (0/5)

- [ ] **app/(club)/layout.tsx** | Layout club avec navigation tabs
- [ ] **app/(club)/dashboard/page.tsx** | Vue d'ensemble club
- [ ] **app/(club)/club-info/page.tsx** | CRUD fiche club
- [ ] **app/(club)/teams/page.tsx** | CRUD équipes
- [ ] **app/(club)/stats/page.tsx** | Statistiques (vues, favoris)
- [ ] **Commit** | "feat(club): add club dashboard"

---

### 🎨 PHASE 11 : THÈME CLAIR/SOMBRE (0/3)

- [ ] **Créer ThemeContext.tsx** | Context pour gérer thème
- [ ] **Bouton toggle thème** | Dans navbar
- [ ] **Adapter tous les composants** | Couleurs dynamiques selon thème
- [ ] **Commit** | "feat(theme): add dark mode support"

---

### 🌍 PHASE 12 : INTERNATIONALISATION (0/4)

- [ ] **Installer next-intl** | `npm install next-intl`
- [ ] **Créer messages/fr.json** | Traductions françaises
- [ ] **Créer messages/en.json** | Traductions anglaises
- [ ] **Adapter toutes les pages** | Utiliser `t('key')` au lieu de strings hardcodées
- [ ] **Commit** | "feat(i18n): add French and English translations"

---

### 🚀 PHASE 13 : DÉPLOIEMENT (0/5)

- [ ] **Configurer Vercel** | Connecter GitHub repo
- [ ] **Ajouter variables d'environnement** | Firebase credentials sur Vercel
- [ ] **Tester build production** | `npm run build`
- [ ] **Déployer sur Vercel** | Push vers main → auto deploy
- [ ] **Configurer domaine custom** | clubsportfrance.com
- [ ] **Commit** | "chore(deploy): configure Vercel deployment"

---

### 📊 PHASE 14 : ANALYTICS & SEO (0/4)

- [ ] **Activer Firebase Analytics** | Vérifier tracking events
- [ ] **Ajouter Google Analytics 4** | Tag dans layout.tsx
- [ ] **Optimiser metadata** | Title, description, OpenGraph pour chaque page
- [ ] **Créer sitemap.xml** | Généré dynamiquement
- [ ] **Commit** | "feat(seo): add analytics and optimize metadata"

---

### 🧪 PHASE 15 : TESTS (0/4)

- [ ] **Installer Jest + Playwright** | Testing libraries
- [ ] **Tests unitaires services** | authService, userService, etc.
- [ ] **Tests E2E** | Flow auth, recherche, profil
- [ ] **Commit** | "test: add unit and E2E tests"

---

## 📊 STRUCTURE FIRESTORE

**Collections créées :**

```
/users/{uid}
  ├── uid: string
  ├── email: string
  ├── displayName: string | null
  ├── photoURL: string | null
  ├── bio: string | null
  ├── role: 'user' | 'club'
  ├── createdAt: Timestamp
  └── updatedAt: Timestamp

/users/{uid}/favorites/{clubId}
  ├── clubId: string
  └── addedAt: Timestamp

/conversations/{conversationId}
  ├── participants: string[] (array of UIDs)
  ├── lastMessage: string
  ├── lastMessageAt: Timestamp
  └── createdAt: Timestamp

/conversations/{conversationId}/messages/{messageId}
  ├── senderId: string
  ├── text: string
  ├── mediaURL: string | null
  ├── read: boolean
  └── sentAt: Timestamp

/clubs/{clubId}
  ├── name: string
  ├── sport: string
  ├── address: string
  ├── location: GeoPoint
  ├── photos: string[]
  ├── description: string
  ├── ownerId: string (référence vers /users/{uid} avec role='club')
  ├── createdAt: Timestamp
  └── updatedAt: Timestamp
```

---

## 🔒 FIRESTORE RULES À GÉNÉRER

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Users collection
    match /users/{userId} {
      // Lecture : authentifié peut lire tous les profils publics
      allow read: if request.auth != null;

      // Création : seulement lors de l'inscription
      allow create: if request.auth != null
        && request.auth.uid == userId
        && request.resource.data.uid == userId
        && request.resource.data.role in ['user', 'club'];

      // Mise à jour : seulement son propre profil
      allow update: if request.auth != null
        && request.auth.uid == userId
        && request.resource.data.uid == userId
        && request.resource.data.role == resource.data.role; // Pas de changement de role

      // Suppression : seulement son propre profil
      allow delete: if request.auth != null && request.auth.uid == userId;

      // Favoris subcollection
      match /favorites/{clubId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }

    // Clubs collection
    match /clubs/{clubId} {
      // Lecture : tout le monde (même non authentifié pour découverte)
      allow read: if true;

      // Création : seulement users avec role='club'
      allow create: if request.auth != null
        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'club'
        && request.resource.data.ownerId == request.auth.uid;

      // Mise à jour : seulement le propriétaire du club
      allow update: if request.auth != null
        && resource.data.ownerId == request.auth.uid;

      // Suppression : seulement le propriétaire du club
      allow delete: if request.auth != null
        && resource.data.ownerId == request.auth.uid;
    }

    // Conversations collection
    match /conversations/{conversationId} {
      // Lecture : seulement les participants
      allow read: if request.auth != null
        && request.auth.uid in resource.data.participants;

      // Création : seulement si l'user est dans participants
      allow create: if request.auth != null
        && request.auth.uid in request.resource.data.participants;

      // Messages subcollection
      match /messages/{messageId} {
        // Lecture : seulement les participants de la conversation
        allow read: if request.auth != null
          && request.auth.uid in get(/databases/$(database)/documents/conversations/$(conversationId)).data.participants;

        // Création : seulement si l'user est participant ET senderId correspond
        allow create: if request.auth != null
          && request.auth.uid in get(/databases/$(database)/documents/conversations/$(conversationId)).data.participants
          && request.resource.data.senderId == request.auth.uid;
      }
    }
  }
}
```

---

## 🎯 DIFFÉRENCES CLÉS REACT NATIVE → NEXT.JS

| **Aspect** | **React Native** | **Next.js** |
|------------|------------------|-------------|
| **Navigation** | React Navigation | `useRouter()` + file-based routing |
| **Styling** | StyleSheet | Tailwind CSS |
| **Input** | TextInput | `<input>` / `<textarea>` |
| **Button** | TouchableOpacity | `<button>` |
| **Image** | React Native Image | `<Image>` de next/image |
| **Scroll** | ScrollView | `<div>` avec overflow |
| **Keyboard** | KeyboardAvoidingView | Non nécessaire (web) |
| **Alerts** | Alert.alert() | useToast() custom hook |
| **Permissions** | expo-image-picker permissions | `<input type="file">` (natif navigateur) |
| **Camera/Galerie** | expo-image-picker | `<input type="file" accept="image/*">` |
| **Maps** | react-native-maps | Google Maps JavaScript API |
| **Storage** | AsyncStorage | localStorage / sessionStorage |
| **Auth persistence** | getReactNativePersistence | Automatique (web) |
| **Analytics** | expo-firebase-analytics | Firebase Analytics Web SDK |
| **Geolocation** | expo-location | navigator.geolocation API |

---

## ✅ RÉSUMÉ DES LIVRABLES

**Code React Native analysé :**
- ✅ 4 services complets (auth, user, image, firebase)
- ✅ 1 contexte d'authentification
- ✅ 1 hook custom
- ✅ 3 composants UI de base
- ✅ 7 écrans complètement fonctionnels
- ✅ 5 écrans placeholder à implémenter

**TodoList Next.js créée :**
- ✅ 15 phases de développement
- ✅ 77 tâches détaillées
- ✅ Architecture Firestore documentée
- ✅ Firestore Rules complètes
- ✅ Tableau de correspondance React Native → Next.js

**Prochaines étapes :**
1. Valider cette analyse avec l'équipe
2. Commencer PHASE 1 : Initialisation Next.js
3. Suivre la TodoList phase par phase

---

🤖 *Analyse générée avec [Claude Code](https://claude.com/claude-code)*
**Dernière mise à jour :** 02/12/2025
