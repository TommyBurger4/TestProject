# 💻 CONVENTIONS DE CODE

> **Guide complet des conventions de code pour Next.js**

---

## 📛 Regles de Nommage

### Variables et Constantes

```typescript
// Variables : camelCase
const userName = 'John';
const isLoading = false;
const userProfile = {};

// Constantes globales : SCREAMING_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com';
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const DEFAULT_TIMEOUT = 30000;

// Constantes locales (pas modifiables mais pas "constantes semantiques") : camelCase
const currentDate = new Date();
const filteredItems = items.filter(item => item.active);
```

### Fonctions

```typescript
// Fonctions : camelCase
const fetchUserData = async (userId: string) => {};
const calculateTotal = (items: Item[]) => {};

// Fonctions de validation : is*, has*, can*, should*
const isValidEmail = (email: string): boolean => {};
const hasPermission = (user: User, permission: string): boolean => {};
const canEdit = (user: User, document: Document): boolean => {};

// Handlers d'evenements : handle*
const handleClick = () => {};
const handleSubmit = async () => {};
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
```

### Composants React

```typescript
// Composants : PascalCase
export const UserProfile: React.FC<Props> = () => {};
export const LoginPage: React.FC = () => {};
export const CustomButton: React.FC<ButtonProps> = () => {};

// Composants HOC : with* prefix
const withAuth = (Component: React.ComponentType) => {};
const withTheme = (Component: React.ComponentType) => {};
```

### Hooks

```typescript
// Hooks custom : use* prefix (obligatoire)
export const useAuth = () => {};
export const useProfile = (userId: string) => {};
export const useDebounce = <T>(value: T, delay: number) => {};
```

### Types et Interfaces

```typescript
// Interfaces : PascalCase (preferer 'interface' pour les objets)
interface UserProfile {
  id: string;
  name: string;
  email: string;
}

// Types : PascalCase (pour unions, primitives, etc.)
type UserId = string;
type UserRole = 'admin' | 'user' | 'guest';
type ApiResponse<T> = {
  data: T;
  error: string | null;
};

// Props de composants : NomComposant + Props
interface ButtonProps {
  title: string;
  onClick: () => void;
}

interface UserProfilePageProps {
  params: {
    userId: string;
  };
}
```

### Fichiers

```typescript
// Composants : PascalCase.tsx
Button.tsx
UserProfile.tsx
LoginPage.tsx

// Pages Next.js : page.tsx, layout.tsx, loading.tsx, error.tsx
app/login/page.tsx
app/dashboard/layout.tsx
app/profile/loading.tsx
app/error.tsx

// Services : camelCase.ts
authService.ts
profileService.ts
firebaseService.ts

// Hooks : camelCase.ts
useAuth.ts
useDebounce.ts

// Lib/Utils : camelCase.ts
validators.ts
formatters.ts
dateUtils.ts

// Types : camelCase.types.ts
user.types.ts
api.types.ts

// Constantes : camelCase.ts ou constants.ts
colors.ts
config.ts
constants.ts
```

---

## 💬 Convention de Commentaires (CRITIQUE)

**TOUJOURS commenter en FRANCAIS SANS ACCENTS (e → e, e → e, a → a, c → c)**

### Header de Fichier (OBLIGATOIRE)

```typescript
/**
 * Fichier: nomDuFichier.ts
 *
 * Description courte du role du fichier (1-3 lignes).
 * Peut inclure des details sur les responsabilites principales,
 * les dependances importantes ou les particularites.
 */
```

### Commentaires de Fonction (JSDoc)

```typescript
/**
 * Description courte de ce que fait la fonction
 *
 * Description detaillee optionnelle si la fonction est complexe.
 * Expliquer le "pourquoi" plutot que le "quoi" si necessaire.
 *
 * @param paramName - Description du parametre
 * @param optionalParam - Description (optionnel)
 * @returns Description de ce qui est retourne
 * @throws Error si [condition d'erreur]
 *
 * @example
 * const result = maFonction('valeur');
 * console.log(result); // Output attendu
 */
export const maFonction = (paramName: string, optionalParam?: number): ReturnType => {
  // Implementation
};
```

### Commentaires Inline

```typescript
// Commentaire simple pour expliquer UNE ligne specifique
const total = items.reduce((sum, item) => sum + item.price, 0);

// MAUVAIS : commentaire evident (a eviter)
const name = 'John'; // Assigner 'John' a name

// BON : commentaire qui explique le "pourquoi"
const timeout = 5000; // Timeout augmente pour laisser le temps au serveur de repondre
```

### Commentaires de Section

```typescript
/**
 * ============================================
 * VALIDATION
 * ============================================
 */

const validateEmail = (email: string) => {};
const validatePassword = (password: string) => {};

/**
 * ============================================
 * HELPERS
 * ============================================
 */

const formatDate = (date: Date) => {};
const capitalize = (str: string) => {};
```

### TODOs et FIXMEs

```typescript
// TODO: Implementer la pagination pour ameliorer les performances
const fetchItems = async () => {};

// FIXME: Cette fonction peut crasher si l'utilisateur n'est pas connecte
const getUserData = () => {};

// HACK: Solution temporaire en attendant le fix du bug #123 dans la lib
const workaroundBug = () => {};

// NOTE: Cette approche est volontairement simplifiee pour rester performant
const calculateApproximation = () => {};
```

---

## 🇫🇷 Francais SANS ACCENTS - Exemples Explicites

**REGLE ABSOLUE : Tous les commentaires doivent etre en francais SANS ACCENTS.**

### Table de Conversion des Caracteres Accentues

```
é → e    (exemple: utilisateur -> utilisateur)
è → e    (exemple: premiere -> premiere)
ê → e    (exemple: etre -> etre)
à → a    (exemple: a -> a)
ù → u    (exemple: ou -> ou)
ô → o    (exemple: controle -> controle)
î → i    (exemple: maitrise -> maitrise)
ç → c    (exemple: francais -> francais)
ï → i    (exemple: naif -> naif)
ü → u    (exemple: aiguë -> aigue)

Majuscules:
É → E    È → E    Ê → E    À → A    Ç → C
```

### Exemple Complet : MAUVAIS vs BON

❌ **MAUVAIS (avec accents) :**

```typescript
/**
 * Fichier: authService.ts
 *
 * Service d'authentification pour gérer la connexion,
 * l'inscription et la déconnexion des utilisateurs.
 */

import { signInWithEmailAndPassword } from 'firebase/auth';

/**
 * Vérifie si l'utilisateur est authentifié
 *
 * Cette fonction récupère le token depuis localStorage
 * et vérifie qu'il n'est pas expiré.
 *
 * @param userId - Identifiant unique de l'utilisateur
 * @returns true si l'utilisateur est authentifié, false sinon
 * @throws Error si le token est expiré
 */
export const isAuthenticated = async (userId: string): Promise<boolean> => {
  try {
    // Récupérer le token depuis localStorage
    const token = await getToken();

    // Vérifier que le token n'est pas expiré
    if (isExpired(token)) {
      throw new Error('Token expiré');
    }

    // Vérifier que l'utilisateur existe dans Firestore
    const userDoc = await getUserDoc(userId);

    return userDoc !== null;
  } catch (error) {
    // Logger l'erreur pour débogage
    console.error('Erreur lors de la vérification:', error);
    return false;
  }
};
```

✅ **BON (sans accents) :**

```typescript
/**
 * Fichier: authService.ts
 *
 * Service d'authentification pour gerer la connexion,
 * l'inscription et la deconnexion des utilisateurs.
 */

import { signInWithEmailAndPassword } from 'firebase/auth';

/**
 * Verifie si l'utilisateur est authentifie
 *
 * Cette fonction recupere le token depuis localStorage
 * et verifie qu'il n'est pas expire.
 *
 * @param userId - Identifiant unique de l'utilisateur
 * @returns true si l'utilisateur est authentifie, false sinon
 * @throws Error si le token est expire
 */
export const isAuthenticated = async (userId: string): Promise<boolean> => {
  try {
    // Recuperer le token depuis localStorage
    const token = await getToken();

    // Verifier que le token n'est pas expire
    if (isExpired(token)) {
      throw new Error('Token expire');
    }

    // Verifier que l'utilisateur existe dans Firestore
    const userDoc = await getUserDoc(userId);

    return userDoc !== null;
  } catch (error) {
    // Logger l'erreur pour debogage
    console.error('Erreur lors de la verification:', error);
    return false;
  }
};
```

### Mots Courants a Convertir

**Authentification / Auth :**
- ❌ vérifie → ✅ verifie
- ❌ authentifié → ✅ authentifie
- ❌ déconnexion → ✅ deconnexion
- ❌ créer → ✅ creer
- ❌ récupérer → ✅ recuperer
- ❌ expiré → ✅ expire

**Firestore / Base de donnees :**
- ❌ données → ✅ donnees
- ❌ supprimé → ✅ supprime
- ❌ modifié → ✅ modifie
- ❌ créé → ✅ cree
- ❌ récupéré → ✅ recupere

**Erreurs / Logs :**
- ❌ échec → ✅ echec
- ❌ erreur détectée → ✅ erreur detectee
- ❌ tentative échouée → ✅ tentative echouee
- ❌ débogage → ✅ debogage

**Navigation / UI :**
- ❌ cliqué → ✅ clique
- ❌ sélectionné → ✅ selectionne
- ❌ désactivé → ✅ desactive
- ❌ écran → ✅ ecran (ou "page" pour Next.js)

**Dates / Temps :**
- ❌ créé le → ✅ cree le
- ❌ modifié le → ✅ modifie le
- ❌ première → ✅ premiere
- ❌ dernière → ✅ derniere

### Pourquoi cette regle ?

**Raisons techniques :**
1. **Compatibilite** : Certains systemes/editeurs ont des problemes d'encodage
2. **Recherche** : Rechercher "verifie" trouve tous les cas (verifie, verifie, etc.)
3. **Coherence** : Code uniforme entre developpeurs de differentes regions
4. **Git diff** : Pas de problemes d'encodage dans les diffs

**Important** : Cette regle s'applique UNIQUEMENT aux **commentaires et noms de variables en francais**. Le code TypeScript/JavaScript lui-meme reste en anglais (ex: `isAuthenticated`, pas `estAuthentifie`).

---

## 📦 Structure des Imports

**Ordre STRICT des imports (ESLint doit le forcer) :**

```typescript
// 1. Imports React et Next.js
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

// 2. Librairies externes (node_modules)
import { collection, getDocs } from 'firebase/firestore';
import { toast } from 'sonner';
import { clsx } from 'clsx';

// 3. Imports absolus du projet (alias @)
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { cn } from '@/lib/utils';

// 4. Imports relatifs (meme feature)
import { ProfileHeader } from '../components/ProfileHeader';
import { useProfile } from '../hooks/useProfile';
import { Profile } from '../types/profile.types';

// 5. Imports de types uniquement (si necessaire de les separer)
import type { Metadata } from 'next';
```

---

## ⚠️ Gestion des Erreurs

**TOUJOURS utiliser try/catch pour operations async :**

```typescript
/**
 * Cree un nouveau profil utilisateur dans Firestore
 *
 * @param userId - ID de l'utilisateur
 * @param data - Donnees du profil
 * @returns Profil cree
 * @throws Error si creation echoue
 */
export const createProfile = async (
  userId: string,
  data: ProfileData
): Promise<Profile> => {
  try {
    // Valider les donnees en premier
    validateProfileData(data);

    // Operation Firestore
    const profileRef = doc(db, 'profiles', userId);
    await setDoc(profileRef, data);

    return { id: userId, ...data };
  } catch (error) {
    // Logger l'erreur technique (pour debug)
    console.error('Error in createProfile:', error);

    // Lancer une erreur user-friendly
    if (error instanceof ValidationError) {
      throw error; // Propager l'erreur de validation telle quelle
    }

    // Erreur generique pour les autres cas
    throw new Error('Impossible de creer le profil. Veuillez reessayer.');
  }
};
```

**Dans les composants :**

```typescript
'use client';

const MyComponent: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      await someAsyncOperation();

      // Succes : feedback utilisateur
      toast.success('Operation reussie !');
    } catch (err) {
      // Erreur : afficher message user-friendly
      const message = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p className="text-red-600">{error}</p>}
      <Button onClick={handleSubmit} loading={loading}>
        Submit
      </Button>
    </div>
  );
};
```

---

## 🎯 Bonnes Pratiques TypeScript

```typescript
// BON : Typage explicite des parametres et return
export const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.price, 0);
};

// MAUVAIS : any (a eviter absolument)
const handleData = (data: any) => {
  // any desactive le typage !
};

// BON : unknown si type reel inconnu, puis narrowing
const handleData = (data: unknown) => {
  if (typeof data === 'string') {
    // Ici TypeScript sait que data est string
    console.log(data.toUpperCase());
  }
};

// BON : Union types pour valeurs limitees
type Status = 'pending' | 'success' | 'error';
const handleStatus = (status: Status) => {};

// BON : Generics pour fonctions reutilisables
const createArray = <T>(length: number, value: T): T[] => {
  return Array(length).fill(value);
};

// BON : Optional chaining et nullish coalescing
const userName = user?.profile?.name ?? 'Anonyme';

// BON : Type guards
const isUser = (obj: unknown): obj is User => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'email' in obj
  );
};
```

---

## 🎨 Conventions Next.js Specifiques

### Server Components vs Client Components

```typescript
// Server Component (par defaut)
// Pas de 'use client' directive
// Peut faire des appels DB directs

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const profile = await getProfile(params.id); // Appel serveur direct
  
  return <div>{profile.name}</div>;
}

// Client Component
// Directive 'use client' obligatoire si utilise hooks, event handlers, etc.

'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

### Route Handlers (API Routes)

```typescript
// app/api/users/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const users = await fetchUsers();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const user = await createUser(body);
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
```

---

🤖 _Guide destine a Claude Code - Conventions standardisees pour qualite maximale_
