# 🏗️ ARCHITECTURE COMPLETE

> **Guide complet de l'architecture par features pour Next.js**

---

## 📐 Regle d'Or : Separation des Responsabilites

```
FEATURES (src/features/) = LOGIQUE METIER + COMPOSANTS SPECIFIQUES
    ↓
COMPONENTS (src/components/) = UI REUTILISABLE PURE
    ↓
SERVICES (src/services/) = LOGIQUE GLOBALE (Firebase, API, Storage)
    ↓
HOOKS (src/hooks/) = LOGIQUE CUSTOM GENERIQUE
    ↓
LIB (src/lib/) = FONCTIONS PURES UTILITAIRES
```

---

## 🧩 Anatomie d'une Feature

**Exemple : Feature "Profile"**

```
src/features/profile/
├── components/              # Composants UI specifiques au profil
│   ├── ProfileHeader.tsx    # Header avec avatar et nom
│   ├── ProfileStats.tsx     # Statistiques utilisateur
│   └── ProfileEditForm.tsx  # Formulaire edition
│
├── hooks/                   # Hooks specifiques au profil
│   ├── useProfile.ts        # Hook principal pour charger profil
│   ├── useProfileUpdate.ts  # Hook pour mise a jour
│   └── useAvatarUpload.ts   # Hook pour upload avatar
│
├── services/                # Logique metier specifique
│   └── profileService.ts    # CRUD operations profil
│
├── types/                   # Types TypeScript specifiques
│   └── profile.types.ts     # Profile, ProfileData, etc.
│
└── index.ts                 # Exports publics de la feature
```

### Point d'Entree d'une Feature

**src/features/profile/index.ts :**

```typescript
/**
 * Fichier: profile/index.ts
 *
 * Point d'entree public de la feature Profile.
 * Exporte uniquement ce qui doit etre accessible depuis l'exterieur.
 */

// Composants (pour utilisation dans pages)
export { ProfileHeader } from './components/ProfileHeader';
export { ProfileStats } from './components/ProfileStats';

// Hooks (pour reutilisation dans d'autres features)
export { useProfile } from './hooks/useProfile';

// Types (pour typage externe)
export type { Profile, ProfileData } from './types/profile.types';

// NE PAS exporter :
// - components/ internes (usage interne uniquement)
// - services/ (usage interne, sauf cas tres specifique)
```

---

## 🔧 Structure d'un Service

**Exemple : src/features/profile/services/profileService.ts**

```typescript
/**
 * Fichier: profileService.ts
 *
 * Service centralise pour la gestion des profils utilisateurs.
 * Gere toutes les operations CRUD sur la collection Firestore 'profiles'.
 * Inclut validation, cache local et gestion erreurs.
 */

import { doc, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/services/firebase/firebase';
import { Profile, ProfileData } from '../types/profile.types';

/**
 * Recupere le profil d'un utilisateur depuis Firestore
 *
 * @param userId - ID de l'utilisateur
 * @returns Profil de l'utilisateur ou null si inexistant
 * @throws Error si probleme de connexion Firestore
 */
export const getProfile = async (userId: string): Promise<Profile | null> => {
  try {
    const profileRef = doc(db, 'profiles', userId);
    const profileSnap = await getDoc(profileRef);

    if (!profileSnap.exists()) {
      return null;
    }

    return {
      id: profileSnap.id,
      ...profileSnap.data(),
    } as Profile;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw new Error('Impossible de charger le profil');
  }
};

/**
 * Cree un nouveau profil utilisateur
 *
 * @param userId - ID de l'utilisateur
 * @param data - Donnees du profil (nom, email, avatar, etc.)
 * @returns Profil cree
 */
export const createProfile = async (
  userId: string,
  data: ProfileData
): Promise<Profile> => {
  try {
    // Valider les donnees
    validateProfileData(data);

    const profileRef = doc(db, 'profiles', userId);
    const profile: Profile = {
      id: userId,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await setDoc(profileRef, profile);
    return profile;
  } catch (error) {
    console.error('Error creating profile:', error);
    throw new Error('Impossible de creer le profil');
  }
};

/**
 * Met a jour un profil existant
 *
 * @param userId - ID de l'utilisateur
 * @param updates - Champs a mettre a jour
 */
export const updateProfile = async (
  userId: string,
  updates: Partial<ProfileData>
): Promise<void> => {
  try {
    const profileRef = doc(db, 'profiles', userId);
    await updateDoc(profileRef, {
      ...updates,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    throw new Error('Impossible de mettre a jour le profil');
  }
};

/**
 * Supprime un profil utilisateur
 * Attention: Cette fonction devrait normalement gerer la cascade delete
 *
 * @param userId - ID de l'utilisateur
 */
export const deleteProfile = async (userId: string): Promise<void> => {
  try {
    const profileRef = doc(db, 'profiles', userId);
    await deleteDoc(profileRef);

    // TODO: Gerer cascade delete (posts, comments, etc.)
  } catch (error) {
    console.error('Error deleting profile:', error);
    throw new Error('Impossible de supprimer le profil');
  }
};

/**
 * Valide les donnees d'un profil
 *
 * @param data - Donnees a valider
 * @throws Error si validation echoue
 */
const validateProfileData = (data: ProfileData): void => {
  if (!data.displayName || data.displayName.trim().length < 2) {
    throw new Error('Le nom doit contenir au moins 2 caracteres');
  }

  if (data.email && !isValidEmail(data.email)) {
    throw new Error('Email invalide');
  }
};

/**
 * Verifie si un email est valide
 *
 * @param email - Email a valider
 * @returns true si valide, false sinon
 */
const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
```

---

## 🪝 Structure d'un Hook Custom

**Exemple : src/features/profile/hooks/useProfile.ts**

```typescript
/**
 * Fichier: useProfile.ts
 *
 * Hook custom pour gerer l'etat et les operations sur le profil utilisateur.
 * Gere le chargement, les erreurs et la mise en cache.
 */

import { useState, useEffect } from 'react';
import { getProfile } from '../services/profileService';
import { Profile } from '../types/profile.types';

interface UseProfileReturn {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook pour charger et gerer le profil d'un utilisateur
 *
 * @param userId - ID de l'utilisateur
 * @returns Objet contenant profile, loading, error, refetch
 *
 * @example
 * const { profile, loading, error, refetch } = useProfile(userId);
 *
 * if (loading) return <LoadingSpinner />;
 * if (error) return <ErrorMessage message={error} />;
 * if (!profile) return <div>Profil introuvable</div>;
 *
 * return <ProfileView profile={profile} />;
 */
export const useProfile = (userId: string): UseProfileReturn => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Charge le profil depuis Firestore
   */
  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getProfile(userId);
      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  // Charger au montage du composant
  useEffect(() => {
    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  return {
    profile,
    loading,
    error,
    refetch: fetchProfile,
  };
};
```

---

## 📄 Structure d'une Page Next.js

**Exemple : src/app/profile/page.tsx**

```typescript
/**
 * Fichier: app/profile/page.tsx
 *
 * Page principale du profil utilisateur.
 * Affiche les informations du profil et permet la navigation vers l'edition.
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { useProfile } from '@/features/profile';
import { ProfileHeader } from '@/features/profile/components/ProfileHeader';
import { ProfileStats } from '@/features/profile/components/ProfileStats';

/**
 * Page de profil utilisateur
 *
 * Affiche :
 * - Header avec avatar et nom
 * - Statistiques (posts, followers, etc.)
 * - Bouton edition
 * - Bouton parametres
 */
export default function ProfilePage() {
  const { user } = useAuthStore();
  const { profile, loading, error, refetch } = useProfile(user?.uid || '');

  /**
   * Etats de chargement et erreur
   */
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center p-6">
        <p className="mb-4 text-center text-red-600">{error}</p>
        <button
          onClick={refetch}
          className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Reessayer
        </button>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-600">Profil introuvable</p>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-4xl p-6">
      <ProfileHeader
        avatarUrl={profile.avatarUrl}
        displayName={profile.displayName}
        bio={profile.bio}
      />

      <ProfileStats
        postsCount={profile.postsCount}
        followersCount={profile.followersCount}
        followingCount={profile.followingCount}
      />

      <div className="mt-6 flex gap-4">
        <Link
          href="/profile/edit"
          className="flex-1 rounded-lg bg-blue-600 px-6 py-3 text-center text-white hover:bg-blue-700"
        >
          Modifier le profil
        </Link>

        <Link
          href="/settings"
          className="flex-1 rounded-lg border border-gray-300 px-6 py-3 text-center hover:bg-gray-50"
        >
          Parametres
        </Link>
      </div>
    </main>
  );
}
```

---

## 🎨 Composants UI Reutilisables

**Les composants dans `src/components/` doivent etre PURS et GENERIQUES.**

**Exemple : src/components/ui/Button.tsx**

```typescript
/**
 * Fichier: Button.tsx
 *
 * Composant bouton reutilisable avec differentes variantes.
 * Ne contient AUCUNE logique metier, uniquement UI.
 */

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
        outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-600',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600',
      },
      size: {
        small: 'px-4 py-2 text-sm',
        medium: 'px-6 py-3 text-base',
        large: 'px-8 py-4 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Afficher un spinner de chargement
   * @default false
   */
  loading?: boolean;
}

/**
 * Bouton reutilisable avec differentes variantes
 *
 * @example
 * <Button
 *   variant="primary"
 *   size="medium"
 *   onClick={handleClick}
 *   loading={isLoading}
 * >
 *   Connexion
 * </Button>
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={loading || disabled}
        {...props}
      >
        {loading ? (
          <>
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Chargement...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

---

## 🏪 State Management - Alternatives

### Option A : Zustand (Recommande)

**Cas d'usage :** State global simple, pas de middleware complexe

```typescript
/**
 * Fichier: store/authStore.ts
 *
 * Store Zustand pour l'authentification globale
 */
import { create } from 'zustand';
import { User } from '@/types/auth.types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));

// Usage dans un composant
const { user, login, logout } = useAuthStore();
```

### Option B : Context API

**Cas d'usage :** State isole a une feature specifique, pas besoin de global store

```typescript
/**
 * Fichier: contexts/ThemeContext.tsx
 *
 * Context pour le theme clair/sombre
 */
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
```

**Recommandation Claude :**
- **Zustand** : Par defaut pour state global simple
- **Context API** : Pour features isolees (theme, language)

---

## 📱 Responsive Design (OBLIGATOIRE)

**REGLE ABSOLUE : Toute interface DOIT s'adapter a toutes les tailles d'ecran**

### Tailwind Responsive Classes

**Next.js utilise Tailwind CSS pour le responsive** :

```tsx
{/* Mobile first approach */}
<div className="p-4 md:p-8 lg:p-12">
  <h1 className="text-2xl md:text-4xl lg:text-5xl">Titre</h1>
</div>

{/* Grid responsive */}
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>

{/* Flexbox adaptatif */}
<div className="flex flex-col md:flex-row gap-4">
  <aside className="w-full md:w-64">Sidebar</aside>
  <main className="flex-1">Content</main>
</div>

{/* Affichage conditionnel */}
<div>
  {/* Cache sur mobile */}
  <nav className="hidden md:block">Desktop Nav</nav>
  
  {/* Visible seulement sur mobile */}
  <button className="md:hidden">Mobile Menu</button>
</div>
```

### Breakpoints Tailwind

```typescript
// Breakpoints par defaut
sm: 640px   // Small devices (phones)
md: 768px   // Medium devices (tablets)
lg: 1024px  // Large devices (desktops)
xl: 1280px  // Extra large devices
2xl: 1536px // 2X Extra large devices
```

### Hook useMediaQuery (Optionnel)

**Pour logique conditionnelle complexe :**

```typescript
/**
 * Fichier: hooks/useMediaQuery.ts
 *
 * Hook pour detecter les breakpoints en JavaScript
 */

'use client';

import { useState, useEffect } from 'react';

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};

// Usage
const isMobile = useMediaQuery('(max-width: 768px)');
const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1024px)');
const isDesktop = useMediaQuery('(min-width: 1024px)');
```

---

## ⚠️ Error Handling (Gestion des Erreurs)

**REGLE : Toujours gerer les erreurs proprement pour eviter les crashs et ameliorer l'UX**

### ErrorBoundary React

**Creer `src/components/ErrorBoundary.tsx`** :

```typescript
/**
 * Fichier: ErrorBoundary.tsx
 *
 * Composant qui catch les erreurs React et affiche un fallback UI.
 * Evite que toute l'app crash si un composant a une erreur.
 */

'use client';

import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to console or Sentry
    console.error('ErrorBoundary caught error:', error, errorInfo);

    // Si Sentry est configure
    // Sentry.captureException(error, { extra: errorInfo });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center p-6">
          <div className="text-6xl mb-4">😔</div>
          <h1 className="mb-2 text-2xl font-bold">Oups, une erreur est survenue</h1>
          <p className="mb-6 text-center text-gray-600">
            Nous sommes desoles pour la gene occasionnee.
          </p>
          <button
            onClick={this.handleReset}
            className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            Reessayer
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

**Utilisation dans `app/layout.tsx`** :

```typescript
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
```

---

### Hook useAsyncError

**Creer `src/hooks/useAsyncError.ts`** :

```typescript
/**
 * Fichier: useAsyncError.ts
 *
 * Hook reutilisable pour gerer les erreurs dans les appels async.
 * Gere automatiquement loading, error, et affichage toast.
 */

'use client';

import { useState } from 'react';
import { getErrorMessage } from '@/lib/errorMessages';
import { toast } from 'sonner'; // ou react-hot-toast

export interface UseAsyncErrorReturn {
  error: Error | null;
  isLoading: boolean;
  execute: (fn: () => Promise<void>) => Promise<void>;
  reset: () => void;
}

export const useAsyncError = (): UseAsyncErrorReturn => {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = async (fn: () => Promise<void>) => {
    try {
      setIsLoading(true);
      setError(null);
      await fn();
    } catch (err) {
      const error = err as Error;
      setError(error);

      // Afficher toast user-friendly
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setIsLoading(false);
  };

  return {
    error,
    isLoading,
    execute,
    reset,
  };
};
```

**Utilisation** :

```typescript
'use client';

const LoginPage = () => {
  const { execute, isLoading } = useAsyncError();
  const router = useRouter();

  const handleLogin = () => {
    execute(async () => {
      await authService.login(email, password);
      router.push('/dashboard');
    });
  };

  return (
    <div>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleLogin} loading={isLoading}>
        Se connecter
      </Button>
    </div>
  );
};
```

---

### Messages d'Erreur User-Friendly

**Creer `src/lib/errorMessages.ts`** :

```typescript
/**
 * Fichier: errorMessages.ts
 *
 * Mapper les codes erreur techniques vers messages user-friendly.
 */

export const getErrorMessage = (error: any): string => {
  // Si erreur custom avec message
  if (error.userMessage) {
    return error.userMessage;
  }

  // Firebase Auth errors
  switch (error.code) {
    // Auth errors
    case 'auth/wrong-password':
      return 'Mot de passe incorrect';
    case 'auth/user-not-found':
      return 'Aucun compte avec cet email';
    case 'auth/email-already-in-use':
      return 'Cet email est deja utilise';
    case 'auth/weak-password':
      return 'Mot de passe trop faible (minimum 6 caracteres)';
    case 'auth/invalid-email':
      return 'Email invalide';
    case 'auth/user-disabled':
      return 'Ce compte a ete desactive';
    case 'auth/too-many-requests':
      return 'Trop de tentatives. Reessayez plus tard.';
    case 'auth/network-request-failed':
      return 'Pas de connexion internet';

    // Firestore errors
    case 'permission-denied':
      return 'Vous n\'avez pas les droits pour cette action';
    case 'not-found':
      return 'Donnees introuvables';
    case 'already-exists':
      return 'Ces donnees existent deja';
    case 'unavailable':
      return 'Service temporairement indisponible';

    // Storage errors
    case 'storage/unauthorized':
      return 'Vous n\'avez pas les droits pour acceder a ce fichier';
    case 'storage/canceled':
      return 'Upload annule';
    case 'storage/quota-exceeded':
      return 'Quota de stockage depasse';

    // Network errors
    case 'ECONNABORTED':
    case 'ETIMEDOUT':
      return 'Delai d\'attente depasse. Verifiez votre connexion.';

    // Generic
    default:
      if (error.message) {
        // Eviter d'afficher les messages techniques
        if (error.message.includes('Firebase') || error.message.includes('Error')) {
          return 'Une erreur est survenue. Veuillez reessayer.';
        }
        return error.message;
      }
      return 'Une erreur est survenue. Veuillez reessayer.';
  }
};
```

---

## 📊 Loading States

**REGLE : Toujours afficher un etat de chargement pour eviter les ecrans blancs**

### Composant Loading

**Next.js convention : `loading.tsx` dans app/ directory**

```typescript
/**
 * Fichier: app/loading.tsx
 *
 * Loading UI automatique pour toutes les pages
 */

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
    </div>
  );
}
```

### Skeleton Component

**Creer `src/components/ui/Skeleton.tsx`** :

```typescript
/**
 * Fichier: Skeleton.tsx
 *
 * Composant skeleton pour afficher un placeholder anime pendant le chargement.
 */

import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-gray-200', className)}
      {...props}
    />
  );
};

// Usage
<div className="space-y-3">
  <Skeleton className="h-12 w-12 rounded-full" /> {/* Avatar */}
  <Skeleton className="h-4 w-[250px]" /> {/* Name */}
  <Skeleton className="h-4 w-[200px]" /> {/* Bio */}
</div>
```

---

## 📝 Forms et Validation

**REGLE : Utiliser React Hook Form + Zod pour tous les formulaires**

### Setup React Hook Form + Zod

**Installation** :

```bash
npm install react-hook-form @hookform/resolvers zod
```

---

### Schema Zod Standard

**Creer `src/lib/validationSchemas.ts`** :

```typescript
/**
 * Fichier: validationSchemas.ts
 *
 * Collection de schemas Zod reutilisables pour validation formulaires.
 */

import { z } from 'zod';

// Champs reutilisables
export const emailField = z.string().email('Email invalide');

export const passwordField = z
  .string()
  .min(8, 'Minimum 8 caracteres')
  .regex(/[A-Z]/, 'Au moins une majuscule requise')
  .regex(/[0-9]/, 'Au moins un chiffre requis');

export const displayNameField = z
  .string()
  .min(2, 'Minimum 2 caracteres')
  .max(50, 'Maximum 50 caracteres');

// Schemas complets
export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(1, 'Mot de passe requis'),
});

export const registerSchema = z
  .object({
    displayName: displayNameField,
    email: emailField,
    password: passwordField,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  });

export const profileSchema = z.object({
  displayName: displayNameField,
  bio: z.string().max(500, 'Maximum 500 caracteres').optional(),
  website: z.string().url('URL invalide').optional().or(z.literal('')),
});
```

---

### Composant FormInput Reutilisable

**Creer `src/components/forms/FormInput.tsx`** :

```typescript
/**
 * Fichier: FormInput.tsx
 *
 * Composant input reutilisable avec gestion erreur integree.
 */

'use client';

import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';
import { cn } from '@/lib/utils';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
  register: ReturnType<UseFormRegister<any>>;
}

export const FormInput = ({
  label,
  error,
  register,
  className,
  ...props
}: FormInputProps) => {
  return (
    <div className="mb-4">
      <label className="mb-2 block text-sm font-semibold text-gray-900">
        {label}
        {props.required && <span className="text-red-600"> *</span>}
      </label>
      <input
        {...register}
        className={cn(
          'w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600',
          error && 'border-red-600 focus:border-red-600 focus:ring-red-600',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
};
```

---

### Exemple Complet : LoginForm

```typescript
/**
 * Fichier: app/login/page.tsx
 *
 * Exemple de formulaire complet avec React Hook Form + Zod.
 */

'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { FormInput } from '@/components/forms/FormInput';
import { Button } from '@/components/ui/Button';
import { useAsyncError } from '@/hooks/useAsyncError';
import { authService } from '@/services/auth/authService';
import { loginSchema } from '@/lib/validationSchemas';

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { execute } = useAsyncError();
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    await execute(async () => {
      await authService.login(data.email, data.password);
      router.push('/dashboard');
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
        <h1 className="mb-6 text-3xl font-bold">Connexion</h1>

        <FormInput
          label="Email"
          type="email"
          placeholder="exemple@email.com"
          register={register('email')}
          error={errors.email}
          required
        />

        <FormInput
          label="Mot de passe"
          type="password"
          placeholder="••••••••"
          register={register('password')}
          error={errors.password}
          required
        />

        <Button type="submit" loading={isSubmitting} className="w-full">
          Se connecter
        </Button>
      </form>
    </div>
  );
}
```

---

## 🧪 Tests

**Next.js utilise Jest + React Testing Library**

### Test Unitaire : Composant

```typescript
/**
 * Fichier: __tests__/components/Button.test.tsx
 *
 * Tests unitaires pour le composant Button
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/Button';

describe('Button', () => {
  it('should render correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click me</Button>);

    fireEvent.click(screen.getByText('Click me'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    const onClick = jest.fn();
    render(
      <Button onClick={onClick} disabled>
        Click me
      </Button>
    );

    const button = screen.getByText('Click me');
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('should show loading state', () => {
    render(<Button loading>Click me</Button>);
    expect(screen.getByText('Chargement...')).toBeInTheDocument();
  });
});
```

---

🤖 _Guide destine a Claude Code - Architecture par features standardisee pour Next.js_
