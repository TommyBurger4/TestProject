# 🏗️ ARCHITECTURE COMPLETE

> **Guide complet de l'architecture par features pour React Native/Expo**

---

## 📐 Regle d'Or : Separation des Responsabilites

```
FEATURES (src/features/) = LOGIQUE METIER + UI SPECIFIQUE
    ↓
COMPONENTS (src/components/) = UI REUTILISABLE PURE
    ↓
SERVICES (src/services/) = LOGIQUE GLOBALE (Firebase, API, Storage)
    ↓
HOOKS (src/hooks/) = LOGIQUE CUSTOM GENERIQUE
    ↓
UTILS (src/utils/) = FONCTIONS PURES UTILITAIRES
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
├── screens/                 # Ecrans de la feature
│   ├── ProfileScreen.tsx    # Ecran principal
│   ├── EditProfileScreen.tsx
│   └── SettingsScreen.tsx
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

// Screens (pour navigation)
export { ProfileScreen } from './screens/ProfileScreen';
export { EditProfileScreen } from './screens/EditProfileScreen';
export { SettingsScreen } from './screens/SettingsScreen';

// Hooks (pour reutilisation dans d'autres features)
export { useProfile } from './hooks/useProfile';

// Types (pour typage externe)
export type { Profile, ProfileData } from './types/profile.types';

// NE PAS exporter :
// - components/ (usage interne uniquement)
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
import { db } from '@services/firebase/firebase';
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
 * if (loading) return <ActivityIndicator />;
 * if (error) return <Text>{error}</Text>;
 * if (!profile) return <Text>Profil introuvable</Text>;
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

## 📱 Structure d'un Screen

**Exemple : src/features/profile/screens/ProfileScreen.tsx**

```typescript
/**
 * Fichier: ProfileScreen.tsx
 *
 * Ecran principal du profil utilisateur.
 * Affiche les informations du profil et permet la navigation vers l'edition.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useProfile } from '../hooks/useProfile';
import { useAuthStore } from '@store/authStore';
import { ProfileHeader } from '../components/ProfileHeader';
import { ProfileStats } from '../components/ProfileStats';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';

/**
 * Ecran de profil utilisateur
 *
 * Affiche :
 * - Header avec avatar et nom
 * - Statistiques (posts, followers, etc.)
 * - Bouton edition
 * - Bouton parametres
 */
export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const { user } = useAuthStore();
  const { profile, loading, error, refetch } = useProfile(user?.uid || '');

  /**
   * Naviguer vers l'ecran d'edition
   */
  const handleEditPress = () => {
    navigation.navigate('EditProfile');
  };

  /**
   * Naviguer vers les parametres
   */
  const handleSettingsPress = () => {
    navigation.navigate('Settings');
  };

  // Etats de chargement et erreur
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={refetch}>
          <Text style={styles.retryButtonText}>Reessayer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Profil introuvable</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
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

      <View style={styles.actions}>
        <TouchableOpacity style={styles.button} onPress={handleEditPress}>
          <Text style={styles.buttonText}>Modifier le profil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonSecondary} onPress={handleSettingsPress}>
          <Text style={styles.buttonSecondaryText}>Parametres</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  errorText: {
    fontSize: 16,
    color: colors.error,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  retryButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  retryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  actions: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  buttonSecondary: {
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  buttonSecondaryText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
});
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
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  /**
   * Texte affiche dans le bouton
   */
  title: string;

  /**
   * Callback execute lors du clic
   */
  onPress: () => void;

  /**
   * Variante visuelle du bouton
   * @default 'primary'
   */
  variant?: ButtonVariant;

  /**
   * Taille du bouton
   * @default 'medium'
   */
  size?: ButtonSize;

  /**
   * Desactiver le bouton
   * @default false
   */
  disabled?: boolean;

  /**
   * Afficher un spinner de chargement
   * @default false
   */
  loading?: boolean;

  /**
   * Styles additionnels pour le container
   */
  style?: ViewStyle;

  /**
   * Styles additionnels pour le texte
   */
  textStyle?: TextStyle;
}

/**
 * Bouton reutilisable avec differentes variantes
 *
 * @example
 * <Button
 *   title="Connexion"
 *   onPress={handleLogin}
 *   variant="primary"
 *   loading={isLoading}
 * />
 */
export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[`button_${variant}`],
        styles[`button_${size}`],
        isDisabled && styles.button_disabled,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' ? colors.primary : colors.white}
        />
      ) : (
        <Text
          style={[
            styles.text,
            styles[`text_${variant}`],
            styles[`text_${size}`],
            isDisabled && styles.text_disabled,
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Variantes
  button_primary: {
    backgroundColor: colors.primary,
  },
  button_secondary: {
    backgroundColor: colors.secondary,
  },
  button_outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  button_danger: {
    backgroundColor: colors.error,
  },

  // Tailles
  button_small: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  button_medium: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  button_large: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
  },

  // Disabled
  button_disabled: {
    opacity: 0.5,
  },

  // Texte
  text: {
    fontWeight: '600',
  },
  text_primary: {
    color: colors.white,
  },
  text_secondary: {
    color: colors.textPrimary,
  },
  text_outline: {
    color: colors.primary,
  },
  text_danger: {
    color: colors.white,
  },
  text_small: {
    fontSize: 14,
  },
  text_medium: {
    fontSize: 16,
  },
  text_large: {
    fontSize: 18,
  },
  text_disabled: {
    opacity: 0.7,
  },
});
```

---

## 🏪 State Management - Alternatives

### Option A : Zustand (Recommande)

**Cas d'usage :** State global simple, pas de middleware complexe

```typescript
/**
 * Fichier: authStore.ts
 *
 * Store Zustand pour l'authentification globale
 */
import { create } from 'zustand';
import { User } from '../types/auth.types';

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

### Option B : Redux Toolkit

**Cas d'usage :** App complexe, middleware requis (saga, thunk), time-travel debugging

```typescript
/**
 * Fichier: authSlice.ts
 *
 * Slice Redux pour l'authentification
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/auth.types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
  } as AuthState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
```

### Option C : Context API

**Cas d'usage :** State isole a une feature specifique, pas besoin de global store

```typescript
/**
 * Fichier: ThemeContext.tsx
 *
 * Context pour le theme clair/sombre
 */
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
- **Redux Toolkit** : Seulement si app tres complexe ou equipe habituee a Redux

---

## 🧪 Tests

### Structure des Tests

```
__tests__/
├── unit/                       # Tests unitaires
│   ├── components/
│   │   └── Button.test.tsx
│   ├── utils/
│   │   └── validators.test.ts
│   └── services/
│       └── authService.test.ts
│
├── integration/                # Tests d'integration
│   └── LoginFlow.test.tsx
│
└── e2e/                        # Tests end-to-end
    └── app.e2e.ts
```

### Test Unitaire : Composant

```typescript
/**
 * Fichier: Button.test.tsx
 *
 * Tests unitaires pour le composant Button
 */
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '@components/ui/Button';

describe('Button', () => {
  it('should render correctly', () => {
    const { getByText } = render(
      <Button title="Click me" onPress={() => {}} />
    );
    expect(getByText('Click me')).toBeTruthy();
  });

  it('should call onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button title="Click me" onPress={onPress} />
    );

    fireEvent.press(getByText('Click me'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button title="Click me" onPress={onPress} disabled />
    );

    fireEvent.press(getByText('Click me'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
```

### Test Unitaire : Service

```typescript
/**
 * Fichier: authService.test.ts
 *
 * Tests pour le service d'authentification
 */
import { login, register, logout } from '../authService';
import { auth } from '@services/firebase/firebase';

jest.mock('@services/firebase/firebase');

describe('authService', () => {
  describe('login', () => {
    it('should login successfully with valid credentials', async () => {
      const mockUser = { uid: '123', email: 'test@test.com' };
      (auth.signInWithEmailAndPassword as jest.Mock).mockResolvedValue({
        user: mockUser,
      });

      const result = await login('test@test.com', 'password123');
      expect(result).toEqual(mockUser);
    });

    it('should throw error with invalid credentials', async () => {
      (auth.signInWithEmailAndPassword as jest.Mock).mockRejectedValue(
        new Error('Invalid credentials')
      );

      await expect(login('test@test.com', 'wrong')).rejects.toThrow();
    });
  });
});
```

### Test Integration : Flow Complet

```typescript
/**
 * Fichier: LoginFlow.test.tsx
 *
 * Test d'integration du flow de connexion complet
 */
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { LoginScreen } from '@features/auth/screens/LoginScreen';
import { authService } from '@features/auth/services/authService';

jest.mock('@features/auth/services/authService');

describe('Login Flow', () => {
  it('should complete login flow successfully', async () => {
    (authService.login as jest.Mock).mockResolvedValue({
      uid: '123',
      email: 'test@test.com',
    });

    const { getByPlaceholderText, getByText } = render(<LoginScreen />);

    // Remplir le formulaire
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@test.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');

    // Cliquer sur le bouton login
    fireEvent.press(getByText('Se connecter'));

    // Verifier que le service a ete appele
    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith(
        'test@test.com',
        'password123'
      );
    });
  });
});
```

---

## 🚀 Performance

### 1. Memoisation

**useMemo** pour calculer des valeurs couteuses :

```typescript
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);
```

**useCallback** pour memoiser des callbacks :

```typescript
const handlePress = useCallback(() => {
  doSomething(id);
}, [id]);
```

### 2. Lazy Loading

**React.lazy** pour charger les ecrans a la demande :

```typescript
const ProfileScreen = React.lazy(() => import('./screens/ProfileScreen'));
const SettingsScreen = React.lazy(() => import('./screens/SettingsScreen'));
```

### 3. Optimisation des Listes

**FlatList** avec optimisations :

```typescript
<FlatList
  data={items}
  renderItem={renderItem}
  keyExtractor={(item) => item.id}
  // Optimisations
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  updateCellsBatchingPeriod={50}
  initialNumToRender={10}
  windowSize={10}
  // Memoiser le renderItem
  getItemLayout={(data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })}
/>
```

### 4. Optimisation des Images

**expo-image** avec cache et lazy loading :

```typescript
import { Image } from 'expo-image';

<Image
  source={{ uri: imageUrl }}
  style={styles.image}
  contentFit="cover"
  transition={200}
  cachePolicy="memory-disk"
/>
```

### 5. Debounce et Throttle

**Debounce** pour les recherches :

```typescript
import { useDebouncedCallback } from 'use-debounce';

const debouncedSearch = useDebouncedCallback((query: string) => {
  searchService.search(query);
}, 500);

<TextInput
  onChangeText={(text) => debouncedSearch(text)}
  placeholder="Rechercher..."
/>
```

### 6. Eviter les Re-renders Inutiles

**React.memo** pour les composants purs :

```typescript
export const ProfileCard = React.memo<ProfileCardProps>(
  ({ profile }) => {
    return (
      <View>
        <Text>{profile.displayName}</Text>
      </View>
    );
  }
);
```

---

## 📱 Responsive Design (OBLIGATOIRE)

**REGLE ABSOLUE : Toute interface DOIT s'adapter a toutes les tailles d'ecran**

### Breakpoints et Hook useBreakpoint

**Creer `src/hooks/useBreakpoint.ts`** :

```typescript
/**
 * Fichier: useBreakpoint.ts
 *
 * Hook personnalise pour gerer le responsive design.
 * Retourne les breakpoints actuels et les dimensions.
 */

import { useWindowDimensions } from 'react-native';
import { useMemo } from 'react';

export const BREAKPOINTS = {
  phone: 0,
  tablet: 768,
  desktop: 1024,
  desktopLarge: 1440,
} as const;

export type BreakpointKey = keyof typeof BREAKPOINTS;

export interface UseBreakpointReturn {
  width: number;
  height: number;
  isPhone: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isDesktopLarge: boolean;
  breakpoint: BreakpointKey;
}

export const useBreakpoint = (): UseBreakpointReturn => {
  const { width, height } = useWindowDimensions();

  const breakpointData = useMemo(() => {
    const isPhone = width < BREAKPOINTS.tablet;
    const isTablet = width >= BREAKPOINTS.tablet && width < BREAKPOINTS.desktop;
    const isDesktop = width >= BREAKPOINTS.desktop && width < BREAKPOINTS.desktopLarge;
    const isDesktopLarge = width >= BREAKPOINTS.desktopLarge;

    let breakpoint: BreakpointKey = 'phone';
    if (isDesktopLarge) breakpoint = 'desktopLarge';
    else if (isDesktop) breakpoint = 'desktop';
    else if (isTablet) breakpoint = 'tablet';

    return {
      isPhone,
      isTablet,
      isDesktop,
      isDesktopLarge,
      breakpoint,
    };
  }, [width]);

  return {
    width,
    height,
    ...breakpointData,
  };
};
```

---

### Utilisation du Hook

**Exemple 1 : Layout adaptatif**

```typescript
import { useBreakpoint } from '@hooks/useBreakpoint';

const HomeScreen = () => {
  const { isTablet, isDesktop } = useBreakpoint();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.content,
          isTablet && styles.contentTablet,
          isDesktop && styles.contentDesktop,
        ]}
      >
        {/* Contenu */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  contentTablet: {
    padding: 24,
    maxWidth: 768,
    alignSelf: 'center',
  },
  contentDesktop: {
    padding: 32,
    maxWidth: 1200,
  },
});
```

**Exemple 2 : Grid responsive**

```typescript
const ProductList = () => {
  const { isPhone, isTablet, isDesktop } = useBreakpoint();

  // Nombre de colonnes adaptatif
  const numColumns = isDesktop ? 4 : isTablet ? 3 : 2;

  return (
    <FlatList
      data={products}
      numColumns={numColumns}
      key={numColumns} // Force re-render si numColumns change
      renderItem={({ item }) => <ProductCard product={item} />}
    />
  );
};
```

---

### Patterns Layouts Adaptatifs

#### 1. Navigation Adaptative

```typescript
/**
 * Navigation : Bottom tabs sur phone, sidebar sur tablet/desktop
 */

const AppNavigator = () => {
  const { isPhone } = useBreakpoint();

  if (isPhone) {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    );
  }

  // Tablet/Desktop : Drawer navigation
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Search" component={SearchScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};
```

#### 2. Sidebar Conditionnelle

```typescript
/**
 * Afficher sidebar uniquement sur tablet/desktop
 */

const DashboardScreen = () => {
  const { isPhone } = useBreakpoint();

  return (
    <View style={styles.container}>
      {!isPhone && (
        <View style={styles.sidebar}>
          <Sidebar />
        </View>
      )}
      <View style={styles.mainContent}>
        <MainContent />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 250,
    borderRightWidth: 1,
    borderRightColor: '#E5E5E5',
  },
  mainContent: {
    flex: 1,
  },
});
```

#### 3. Orientation Flexbox Adaptative

```typescript
/**
 * Column sur phone, row sur tablet/desktop
 */

const ProfileHeader = () => {
  const { isPhone } = useBreakpoint();

  return (
    <View style={[styles.container, { flexDirection: isPhone ? 'column' : 'row' }]}>
      <Image source={{ uri: avatarUrl }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.bio}>{bio}</Text>
      </View>
    </View>
  );
};
```

#### 4. Tailles Adaptatives

```typescript
/**
 * Typography et spacing adaptatifs
 */

const useResponsiveStyles = () => {
  const { isPhone, isTablet, isDesktop } = useBreakpoint();

  return StyleSheet.create({
    title: {
      fontSize: isDesktop ? 32 : isTablet ? 28 : 24,
      lineHeight: isDesktop ? 40 : isTablet ? 36 : 32,
    },
    body: {
      fontSize: isDesktop ? 18 : isTablet ? 16 : 14,
      lineHeight: isDesktop ? 28 : isTablet ? 24 : 20,
    },
    spacing: {
      padding: isDesktop ? 32 : isTablet ? 24 : 16,
    },
  });
};

const MyComponent = () => {
  const styles = useResponsiveStyles();

  return (
    <View style={styles.spacing}>
      <Text style={styles.title}>Titre</Text>
      <Text style={styles.body}>Contenu</Text>
    </View>
  );
};
```

---

### Modal Adaptatif

```typescript
/**
 * Modal fullscreen sur phone, dialog centre sur tablet/desktop
 */

const CustomModal = ({ visible, onClose, children }) => {
  const { isPhone } = useBreakpoint();

  return (
    <Modal
      visible={visible}
      animationType={isPhone ? 'slide' : 'fade'}
      presentationStyle={isPhone ? 'fullScreen' : 'overFullScreen'}
      transparent={!isPhone}
      onRequestClose={onClose}
    >
      <View
        style={[
          styles.modalContainer,
          isPhone ? styles.modalPhone : styles.modalDesktop,
        ]}
      >
        <View
          style={[
            styles.modalContent,
            isPhone && styles.modalContentPhone,
          ]}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  modalPhone: {
    backgroundColor: '#FFF',
  },
  modalDesktop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    flex: 1,
  },
  modalContentPhone: {
    // Fullscreen
  },
  modalContentDesktop: {
    flex: 0,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 24,
    width: '90%',
    maxWidth: 600,
    maxHeight: '80%',
  },
});
```

---

### FlatList numColumns Dynamique

```typescript
/**
 * Grid adaptatif avec numColumns dynamique
 * IMPORTANT : Ajouter key={numColumns} pour forcer re-render
 */

const ImageGrid = ({ images }: { images: string[] }) => {
  const { width, isPhone, isTablet } = useBreakpoint();

  const numColumns = isPhone ? 2 : isTablet ? 3 : 4;
  const itemSize = (width - (numColumns + 1) * 16) / numColumns;

  return (
    <FlatList
      data={images}
      numColumns={numColumns}
      key={numColumns} // OBLIGATOIRE pour re-render
      contentContainerStyle={styles.listContent}
      columnWrapperStyle={styles.columnWrapper}
      renderItem={({ item }) => (
        <View style={[styles.imageContainer, { width: itemSize, height: itemSize }]}>
          <Image source={{ uri: item }} style={styles.image} />
        </View>
      )}
      keyExtractor={(item, index) => `${item}-${index}`}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding: 8,
  },
  columnWrapper: {
    gap: 16,
    marginBottom: 16,
  },
  imageContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
```

---

### Theme avec Valeurs Responsives

**Creer `src/theme/responsive.ts`** :

```typescript
/**
 * Fichier: responsive.ts
 *
 * Valeurs responsive pour theme (spacing, typography, etc.)
 */

import { BREAKPOINTS } from '@hooks/useBreakpoint';

export const getResponsiveSpacing = (width: number) => {
  if (width >= BREAKPOINTS.desktop) {
    return {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 32,
      xl: 48,
      xxl: 64,
    };
  }

  if (width >= BREAKPOINTS.tablet) {
    return {
      xs: 4,
      sm: 8,
      md: 12,
      lg: 24,
      xl: 36,
      xxl: 48,
    };
  }

  // Phone
  return {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    xxl: 32,
  };
};

export const getResponsiveFontSizes = (width: number) => {
  if (width >= BREAKPOINTS.desktop) {
    return {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 20,
      xl: 28,
      xxl: 36,
    };
  }

  if (width >= BREAKPOINTS.tablet) {
    return {
      xs: 11,
      sm: 13,
      md: 15,
      lg: 18,
      xl: 24,
      xxl: 32,
    };
  }

  // Phone
  return {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 20,
    xxl: 28,
  };
};
```

**Utilisation** :

```typescript
import { useWindowDimensions } from 'react-native';
import { getResponsiveSpacing, getResponsiveFontSizes } from '@theme/responsive';

const MyComponent = () => {
  const { width } = useWindowDimensions();
  const spacing = getResponsiveSpacing(width);
  const fontSize = getResponsiveFontSizes(width);

  const styles = StyleSheet.create({
    container: {
      padding: spacing.md,
    },
    title: {
      fontSize: fontSize.xl,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Titre</Text>
    </View>
  );
};
```

---

### Bonnes Pratiques Responsive

#### ✅ A FAIRE

1. **Toujours utiliser `useWindowDimensions` ou `useBreakpoint`**
   ```typescript
   const { width, isTablet } = useBreakpoint();
   ```

2. **Tester sur 3+ tailles d'ecran minimum**
   - iPhone SE (375x667)
   - iPhone 15 Pro Max (430x932)
   - iPad (768x1024)
   - Desktop Web (1920x1080)

3. **Utiliser flexbox pour layouts adaptatifs**
   ```typescript
   flexDirection: isPhone ? 'column' : 'row'
   ```

4. **Ajouter `key={numColumns}` sur FlatList avec numColumns dynamique**
   ```typescript
   <FlatList key={numColumns} numColumns={numColumns} />
   ```

5. **Creer des composants adaptatifs**
   ```typescript
   {isPhone ? <MobileHeader /> : <DesktopHeader />}
   ```

#### ❌ A EVITER

1. **Tailles fixes en dur**
   ```typescript
   // ❌ MAUVAIS
   width: 375,
   height: 600,
   ```

2. **Ignorer les tablettes**
   ```typescript
   // ❌ MAUVAIS (seulement phone/desktop)
   const isMobile = width < 768;
   ```

3. **Oublier de tester sur plusieurs tailles**

4. **Dimensions.get() sans re-render**
   ```typescript
   // ❌ MAUVAIS (ne re-render pas si rotation)
   const { width } = Dimensions.get('window');
   ```

5. **Breakpoints inconsistants**
   ```typescript
   // ❌ MAUVAIS (valeurs differentes partout)
   const isTablet1 = width > 768;
   const isTablet2 = width >= 800; // Inconsistent !
   ```

---

### Tests Responsive

**Tester dans le code** :

```typescript
// __tests__/hooks/useBreakpoint.test.ts

import { renderHook } from '@testing-library/react-native';
import { useBreakpoint } from '@hooks/useBreakpoint';
import { Dimensions } from 'react-native';

describe('useBreakpoint', () => {
  it('should return isPhone for width < 768', () => {
    jest.spyOn(Dimensions, 'get').mockReturnValue({
      width: 375,
      height: 667,
      scale: 2,
      fontScale: 1,
    });

    const { result } = renderHook(() => useBreakpoint());

    expect(result.current.isPhone).toBe(true);
    expect(result.current.isTablet).toBe(false);
    expect(result.current.breakpoint).toBe('phone');
  });

  it('should return isTablet for width >= 768', () => {
    jest.spyOn(Dimensions, 'get').mockReturnValue({
      width: 800,
      height: 1024,
      scale: 2,
      fontScale: 1,
    });

    const { result } = renderHook(() => useBreakpoint());

    expect(result.current.isPhone).toBe(false);
    expect(result.current.isTablet).toBe(true);
    expect(result.current.breakpoint).toBe('tablet');
  });
});
```

**Tester manuellement** :

1. Expo Dev Tools → Change device size
2. iOS Simulator → Hardware → Device → Different models
3. Android Emulator → Settings → Display → Different sizes
4. React Native Web → Browser DevTools → Responsive mode

---

### Checklist Responsive

Avant de valider une feature UI :

- [ ] Teste sur iPhone SE (375px)
- [ ] Teste sur iPhone 15 Pro Max (430px)
- [ ] Teste sur iPad (768px)
- [ ] Teste rotation portrait/landscape
- [ ] Teste sur React Native Web (si applicable)
- [ ] Aucune taille fixe en dur (width/height)
- [ ] Utilise `useWindowDimensions` ou `useBreakpoint`
- [ ] FlatList numColumns avec `key={numColumns}`
- [ ] Spacing/Typography adaptatifs
- [ ] Navigation adaptative (si necessaire)

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

import React, { Component, ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
    // Log to Sentry or console
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
        <View style={styles.container}>
          <Text style={styles.emoji}>😔</Text>
          <Text style={styles.title}>Oups, une erreur est survenue</Text>
          <Text style={styles.description}>
            Nous sommes desoles pour la gene occasionnee.
          </Text>
          <TouchableOpacity style={styles.button} onPress={this.handleReset}>
            <Text style={styles.buttonText}>Reessayer</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFF',
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#0066CC',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
```

**Utilisation dans `App.tsx`** :

```typescript
import { ErrorBoundary } from '@components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <AppNavigator />
    </ErrorBoundary>
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

import { useState } from 'react';
import { getErrorMessage } from '@utils/errorMessages';
import Toast from 'react-native-toast-message';

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
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: getErrorMessage(error),
        position: 'bottom',
      });
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
const LoginScreen = () => {
  const { execute, isLoading } = useAsyncError();
  const navigation = useNavigation();

  const handleLogin = () => {
    execute(async () => {
      await authService.login(email, password);
      navigation.navigate('Home');
    });
  };

  return (
    <View>
      <TextInput value={email} onChangeText={setEmail} />
      <TextInput value={password} onChangeText={setPassword} secureTextEntry />
      <Button
        title={isLoading ? 'Connexion...' : 'Se connecter'}
        onPress={handleLogin}
        disabled={isLoading}
      />
    </View>
  );
};
```

---

### Messages d'Erreur User-Friendly

**Creer `src/utils/errorMessages.ts`** :

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

### Pattern Retry Mechanism

**Composant ErrorView reutilisable** :

```typescript
// components/ui/ErrorView.tsx

interface ErrorViewProps {
  error: Error;
  onRetry: () => void;
  title?: string;
}

export const ErrorView = ({ error, onRetry, title = 'Erreur' }: ErrorViewProps) => (
  <View style={styles.container}>
    <Icon name="alert-circle" size={48} color="#E53E3E" />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.message}>{getErrorMessage(error)}</Text>
    <TouchableOpacity style={styles.button} onPress={onRetry}>
      <Icon name="refresh-cw" size={16} color="#FFF" />
      <Text style={styles.buttonText}>Reessayer</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#0066CC',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
```

**Utilisation** :

```typescript
const MyScreen = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await api.getData();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorView error={error} onRetry={fetchData} />;

  return <DataView data={data} />;
};
```

---

### Crash Reporting avec Sentry (Optionnel)

**Installation** :

```bash
npm install @sentry/react-native
npx @sentry/wizard -i reactNative
```

**Configuration `App.tsx`** :

```typescript
import * as Sentry from '@sentry/react-native';

// Initialiser Sentry
Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
  tracesSampleRate: 1.0,
  environment: __DEV__ ? 'development' : 'production',
  enabled: !__DEV__, // Desactive en dev
});

function App() {
  return (
    <ErrorBoundary>
      <AppNavigator />
    </ErrorBoundary>
  );
}

export default Sentry.wrap(App);
```

**Utilisation dans ErrorBoundary** :

```typescript
componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
  console.error('ErrorBoundary caught error:', error);

  // Envoyer a Sentry
  Sentry.captureException(error, {
    extra: errorInfo,
    tags: {
      boundary: 'ErrorBoundary',
    },
  });
}
```

**Utilisation manuelle** :

```typescript
try {
  await riskyOperation();
} catch (error) {
  // Log local
  console.error('Risky operation failed:', error);

  // Envoyer a Sentry
  Sentry.captureException(error, {
    tags: {
      operation: 'riskyOperation',
    },
  });

  throw error;
}
```

---

### Bonnes Pratiques Error Handling

#### ✅ A FAIRE

1. **Wrapper tous les appels async**
   ```typescript
   const handleAction = async () => {
     try {
       await asyncOperation();
     } catch (error) {
       handleError(error);
     }
   };
   ```

2. **Toujours afficher message user-friendly**
   ```typescript
   Toast.show({
     type: 'error',
     text2: getErrorMessage(error) // "Mot de passe incorrect"
   });
   ```

3. **Toujours proposer une action**
   ```typescript
   <Button title="Reessayer" onPress={retry} />
   ```

4. **Logger les erreurs**
   ```typescript
   console.error('Error:', error);
   Sentry.captureException(error);
   ```

5. **Utiliser ErrorBoundary**
   ```typescript
   <ErrorBoundary>
     <App />
   </ErrorBoundary>
   ```

#### ❌ A EVITER

1. **Appels async sans try/catch**
   ```typescript
   // ❌ MAUVAIS
   await authService.login(email, password); // Peut crasher
   ```

2. **Afficher codes erreur techniques**
   ```typescript
   // ❌ MAUVAIS
   <Text>{error.code}</Text> // "auth/wrong-password"
   ```

3. **Ignorer les erreurs**
   ```typescript
   // ❌ MAUVAIS
   try {
     await operation();
   } catch (error) {
     // Rien... l'utilisateur ne sait pas qu'il y a eu une erreur
   }
   ```

4. **Erreurs sans action**
   ```typescript
   // ❌ MAUVAIS
   {error && <Text>Erreur</Text>}
   // Pas de bouton pour reessayer
   ```

---

## 📊 Loading States et Skeletons

**REGLE : Toujours afficher un etat de chargement pour eviter les ecrans blancs**

### Composant Skeleton

**Creer `src/components/ui/Skeleton.tsx`** :

```typescript
/**
 * Fichier: Skeleton.tsx
 *
 * Composant skeleton pour afficher un placeholder anime pendant le chargement.
 */

import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

interface SkeletonProps {
  width: number | string;
  height: number;
  borderRadius?: number;
  style?: any;
}

export const Skeleton = ({
  width,
  height,
  borderRadius = 8,
  style,
}: SkeletonProps) => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, { duration: 1000 }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: '#E0E0E0',
        },
        animatedStyle,
        style,
      ]}
    />
  );
};
```

**Exemple : Skeleton pour ProfileCard** :

```typescript
// components/skeletons/ProfileCardSkeleton.tsx

export const ProfileCardSkeleton = () => (
  <View style={styles.card}>
    <Skeleton width={60} height={60} borderRadius={30} /> {/* Avatar */}
    <View style={styles.info}>
      <Skeleton width={120} height={20} style={styles.nameSkele} /> {/* Nom */}
      <Skeleton width={180} height={16} /> {/* Bio */}
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 12,
  },
  info: {
    marginLeft: 12,
    flex: 1,
  },
  nameSkeleton: {
    marginBottom: 8,
  },
});
```

**Utilisation** :

```typescript
const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser().then(setUser).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <ProfileCardSkeleton />;
  }

  return <ProfileCard user={user} />;
};
```

---

### Pull to Refresh

```typescript
/**
 * Pattern standard pour rafraichir une liste
 */

import { RefreshControl } from 'react-native';

const MyListScreen = () => {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    const result = await api.getData();
    setData(result);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <FlatList
      data={data}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#0066CC" // Couleur du spinner iOS
          colors={['#0066CC']} // Couleur du spinner Android
        />
      }
      renderItem={({ item }) => <ItemCard item={item} />}
    />
  );
};
```

---

### Infinite Scroll

```typescript
/**
 * Charger automatiquement plus de contenu en scrollant
 */

const InfiniteListScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newData = await api.getData({ page: page + 1, limit: 20 });

      if (newData.length === 0) {
        setHasMore(false);
      } else {
        setData([...data, ...newData]);
        setPage(page + 1);
      }
    } catch (error) {
      console.error('Error loading more:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderFooter = () => {
    if (!loading) return null;

    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#0066CC" />
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <ItemCard item={item} />}
      keyExtractor={(item) => item.id}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5} // Declencher a 50% du bas
      ListFooterComponent={renderFooter}
    />
  );
};

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});
```

---

### Composants Loading Standards

#### LoadingScreen (Fullscreen)

**Creer `src/components/ui/LoadingScreen.tsx`** :

```typescript
/**
 * Fichier: LoadingScreen.tsx
 *
 * Ecran de chargement fullscreen avec spinner et texte.
 */

import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

interface LoadingScreenProps {
  text?: string;
}

export const LoadingScreen = ({ text = 'Chargement...' }: LoadingScreenProps) => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#0066CC" />
    <Text style={styles.text}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
});
```

---

#### LoadingButton

**Creer `src/components/ui/LoadingButton.tsx`** :

```typescript
/**
 * Fichier: LoadingButton.tsx
 *
 * Bouton avec spinner integre pour les actions async.
 */

import React from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  Text,
  StyleSheet,
  View,
} from 'react-native';

interface LoadingButtonProps {
  title: string;
  loading: boolean;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

export const LoadingButton = ({
  title,
  loading,
  onPress,
  disabled = false,
  variant = 'primary',
}: LoadingButtonProps) => {
  const isDisabled = loading || disabled;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'primary' ? styles.primaryButton : styles.secondaryButton,
        isDisabled && styles.disabledButton,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? '#FFF' : '#0066CC'}
          size="small"
        />
      ) : (
        <Text
          style={[
            styles.text,
            variant === 'primary' ? styles.primaryText : styles.secondaryText,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  primaryButton: {
    backgroundColor: '#0066CC',
  },
  secondaryButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#0066CC',
  },
  disabledButton: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: '#FFF',
  },
  secondaryText: {
    color: '#0066CC',
  },
});
```

**Utilisation** :

```typescript
const LoginScreen = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await authService.login(email, password);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <TextInput value={email} onChangeText={setEmail} />
      <TextInput value={password} onChangeText={setPassword} />
      <LoadingButton
        title="Se connecter"
        loading={loading}
        onPress={handleLogin}
      />
    </View>
  );
};
```

---

#### EmptyState

**Creer `src/components/ui/EmptyState.tsx`** :

```typescript
/**
 * Fichier: EmptyState.tsx
 *
 * Composant pour afficher un etat vide avec icone, titre, description et action.
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  action?: {
    label: string;
    onPress: () => void;
  };
}

export const EmptyState = ({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) => (
  <View style={styles.container}>
    <Icon name={icon} size={64} color="#999" />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
    {action && (
      <TouchableOpacity style={styles.button} onPress={action.onPress}>
        <Text style={styles.buttonText}>{action.label}</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#0066CC',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
```

**Utilisation** :

```typescript
const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    loadFavorites().then(setFavorites).finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingScreen />;

  if (favorites.length === 0) {
    return (
      <EmptyState
        icon="heart"
        title="Aucun favori"
        description="Ajoutez des terrains a vos favoris pour les retrouver ici"
        action={{
          label: 'Decouvrir des terrains',
          onPress: () => navigation.navigate('Search'),
        }}
      />
    );
  }

  return <FlatList data={favorites} renderItem={...} />;
};
```

---

### Pattern Loading/Error/Data

**Pattern standard pour gerer les 3 etats** :

```typescript
const MyScreen = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await api.getData();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 1. Loading state
  if (loading) {
    return <LoadingScreen />;
  }

  // 2. Error state
  if (error) {
    return <ErrorView error={error} onRetry={fetchData} />;
  }

  // 3. Empty state
  if (!data || data.length === 0) {
    return (
      <EmptyState
        icon="inbox"
        title="Aucune donnee"
        description="Il n'y a rien a afficher pour le moment"
      />
    );
  }

  // 4. Success state
  return <DataView data={data} />;
};
```

---

### Bonnes Pratiques Loading States

#### ✅ A FAIRE

1. **Toujours afficher un skeleton pour chargement initial**
   ```typescript
   if (loading) return <ProfileCardSkeleton />;
   ```

2. **Utiliser ActivityIndicator pour actions**
   ```typescript
   <LoadingButton loading={isSubmitting} title="Envoyer" />
   ```

3. **Pull to Refresh sur toutes les listes**
   ```typescript
   <FlatList refreshControl={<RefreshControl ... />} />
   ```

4. **Infinite scroll pour grandes listes**
   ```typescript
   <FlatList onEndReached={loadMore} />
   ```

5. **EmptyState si aucune donnee**
   ```typescript
   if (data.length === 0) return <EmptyState />;
   ```

#### ❌ A EVITER

1. **Ecran blanc pendant chargement**
   ```typescript
   // ❌ MAUVAIS
   if (loading) return null;
   ```

2. **Pas de feedback sur action**
   ```typescript
   // ❌ MAUVAIS
   <Button title="Envoyer" onPress={submit} />
   // L'utilisateur ne sait pas si ca charge
   ```

3. **Liste vide sans explication**
   ```typescript
   // ❌ MAUVAIS
   {data.length === 0 && <View />}
   ```

4. **Oublier le pull to refresh**
   ```typescript
   // ❌ MAUVAIS
   <FlatList data={data} />
   // L'utilisateur ne peut pas rafraichir
   ```

---

## 📝 Forms et Validation

**REGLE : Utiliser React Hook Form + Yup pour tous les formulaires**

### Setup React Hook Form + Yup

**Installation** :

```bash
npm install react-hook-form @hookform/resolvers yup
npm install --save-dev @types/yup
```

---

### Schema Yup Standard

**Creer `src/utils/validationSchemas.ts`** :

```typescript
/**
 * Fichier: validationSchemas.ts
 *
 * Collection de schemas Yup reutilisables pour validation formulaires.
 */

import * as Yup from 'yup';

// Champs reutilisables
export const emailField = Yup.string()
  .email('Email invalide')
  .required('Email requis');

export const passwordField = Yup.string()
  .min(8, 'Minimum 8 caracteres')
  .matches(/[A-Z]/, 'Au moins une majuscule requise')
  .matches(/[0-9]/, 'Au moins un chiffre requis')
  .required('Mot de passe requis');

export const phoneField = Yup.string()
  .matches(/^(\+33|0)[1-9](\d{2}){4}$/, 'Numero de telephone invalide')
  .optional();

export const displayNameField = Yup.string()
  .min(2, 'Minimum 2 caracteres')
  .max(50, 'Maximum 50 caracteres')
  .required('Nom requis');

// Schemas complets
export const loginSchema = Yup.object().shape({
  email: emailField,
  password: Yup.string().required('Mot de passe requis'), // Pas de validation stricte pour login
});

export const registerSchema = Yup.object().shape({
  displayName: displayNameField,
  email: emailField,
  password: passwordField,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Les mots de passe ne correspondent pas')
    .required('Confirmation requise'),
});

export const profileSchema = Yup.object().shape({
  displayName: displayNameField,
  bio: Yup.string().max(500, 'Maximum 500 caracteres').optional(),
  phoneNumber: phoneField,
  website: Yup.string().url('URL invalide').optional(),
});

// Validation custom async (exemple: email deja utilise)
export const asyncEmailAvailableValidation = async (email: string) => {
  // Appel API pour verifier si email est dispo
  const exists = await authService.checkEmailExists(email);
  return !exists || 'Cet email est deja utilise';
};
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

import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Control, Controller, FieldError } from 'react-hook-form';

interface FormInputProps extends TextInputProps {
  control: Control<any>;
  name: string;
  label: string;
  error?: FieldError;
  required?: boolean;
}

export const FormInput = ({
  control,
  name,
  label,
  error,
  required = false,
  ...textInputProps
}: FormInputProps) => (
  <View style={styles.container}>
    <Text style={styles.label}>
      {label}
      {required && <Text style={styles.required}> *</Text>}
    </Text>
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          style={[styles.input, error && styles.inputError]}
          placeholderTextColor="#999"
          {...textInputProps}
        />
      )}
    />
    {error && (
      <View
        style={styles.errorContainer}
        accessible={true}
        accessibilityRole="alert"
        accessibilityLiveRegion="polite"
      >
        <Text style={styles.errorText}>{error.message}</Text>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1A1A1A',
  },
  required: {
    color: '#E53E3E',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#FFF',
  },
  inputError: {
    borderColor: '#E53E3E',
    borderWidth: 2,
  },
  errorContainer: {
    marginTop: 4,
  },
  errorText: {
    fontSize: 12,
    color: '#E53E3E',
  },
});
```

---

### Exemple Complet : LoginForm

```typescript
/**
 * Fichier: LoginScreen.tsx
 *
 * Exemple de formulaire complet avec React Hook Form + Yup.
 */

import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@utils/validationSchemas';
import { FormInput } from '@components/forms/FormInput';
import { LoadingButton } from '@components/ui/LoadingButton';
import { useAsyncError } from '@hooks/useAsyncError';
import { AccessibilityInfo } from 'react-native';

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur', // Valider quand l'utilisateur quitte le champ
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { execute } = useAsyncError();
  const navigation = useNavigation();

  // Annoncer les erreurs aux lecteurs d'ecran
  useEffect(() => {
    if (errors.email) {
      AccessibilityInfo.announceForAccessibility(`Erreur : ${errors.email.message}`);
    }
    if (errors.password) {
      AccessibilityInfo.announceForAccessibility(`Erreur : ${errors.password.message}`);
    }
  }, [errors]);

  const onSubmit = async (data: LoginFormData) => {
    await execute(async () => {
      await authService.login(data.email, data.password);
      navigation.navigate('Home');
    });
  };

  return (
    <View style={styles.container}>
      <FormInput
        control={control}
        name="email"
        label="Email"
        error={errors.email}
        placeholder="exemple@email.com"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        textContentType="emailAddress"
        required
      />

      <FormInput
        control={control}
        name="password"
        label="Mot de passe"
        error={errors.password}
        placeholder="••••••••"
        secureTextEntry
        autoCapitalize="none"
        autoComplete="password"
        textContentType="password"
        required
      />

      <LoadingButton
        title="Se connecter"
        loading={isSubmitting}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
```

---

### Validation Temps Reel

**3 modes disponibles** :

```typescript
// Mode 1: onSubmit (par defaut) - Valide uniquement a la soumission
useForm({ mode: 'onSubmit' });

// Mode 2: onChange - Valide a chaque caractere (trop agressif)
useForm({ mode: 'onChange' });

// Mode 3: onBlur (recommande) - Valide quand l'utilisateur quitte le champ
useForm({ mode: 'onBlur' });

// Mode 4: onTouched - Valide apres le premier blur, puis onChange
useForm({ mode: 'onTouched' });
```

**Recommandation** : Utiliser `onBlur` pour un bon compromis UX.

---

### Validation Custom Async

**Exemple : Verifier si email est disponible** :

```typescript
const registerSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email invalide')
    .required('Email requis')
    .test(
      'email-available',
      'Cet email est deja utilise',
      async (value) => {
        if (!value) return true; // Skip si vide (required s'en occupe)

        try {
          const available = await authService.checkEmailAvailable(value);
          return available;
        } catch (error) {
          // En cas d'erreur API, on laisse passer (ne pas bloquer)
          return true;
        }
      }
    ),
});
```

**Note** : Les validations async peuvent ralentir l'UX. Utiliser avec parcimonie.

---

### FormSelect (Dropdown)

**Creer `src/components/forms/FormSelect.tsx`** :

```typescript
/**
 * Fichier: FormSelect.tsx
 *
 * Composant select/dropdown reutilisable avec React Hook Form.
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import { Control, Controller, FieldError } from 'react-hook-form';
import Icon from 'react-native-vector-icons/Feather';

interface Option {
  label: string;
  value: string | number;
}

interface FormSelectProps {
  control: Control<any>;
  name: string;
  label: string;
  options: Option[];
  error?: FieldError;
  placeholder?: string;
  required?: boolean;
}

export const FormSelect = ({
  control,
  name,
  label,
  options,
  error,
  placeholder = 'Selectionner...',
  required = false,
}: FormSelectProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => {
          const selectedOption = options.find((opt) => opt.value === value);

          return (
            <>
              <TouchableOpacity
                style={[styles.input, error && styles.inputError]}
                onPress={() => setModalVisible(true)}
              >
                <Text style={[styles.inputText, !selectedOption && styles.placeholder]}>
                  {selectedOption ? selectedOption.label : placeholder}
                </Text>
                <Icon name="chevron-down" size={20} color="#666" />
              </TouchableOpacity>

              <Modal
                visible={modalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
              >
                <TouchableOpacity
                  style={styles.modalOverlay}
                  activeOpacity={1}
                  onPress={() => setModalVisible(false)}
                >
                  <View style={styles.modalContent}>
                    <FlatList
                      data={options}
                      keyExtractor={(item) => String(item.value)}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={styles.option}
                          onPress={() => {
                            onChange(item.value);
                            setModalVisible(false);
                          }}
                        >
                          <Text style={styles.optionText}>{item.label}</Text>
                          {value === item.value && (
                            <Icon name="check" size={20} color="#0066CC" />
                          )}
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                </TouchableOpacity>
              </Modal>
            </>
          );
        }}
      />

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error.message}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1A1A1A',
  },
  required: {
    color: '#E53E3E',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
  },
  inputError: {
    borderColor: '#E53E3E',
    borderWidth: 2,
  },
  inputText: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  placeholder: {
    color: '#999',
  },
  errorContainer: {
    marginTop: 4,
  },
  errorText: {
    fontSize: 12,
    color: '#E53E3E',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '50%',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  optionText: {
    fontSize: 16,
    color: '#1A1A1A',
  },
});
```

**Utilisation** :

```typescript
<FormSelect
  control={control}
  name="country"
  label="Pays"
  options={[
    { label: 'France', value: 'FR' },
    { label: 'Belgique', value: 'BE' },
    { label: 'Suisse', value: 'CH' },
  ]}
  error={errors.country}
  required
/>
```

---

### Bonnes Pratiques Forms

#### ✅ A FAIRE

1. **Toujours utiliser React Hook Form**
   ```typescript
   const { control, handleSubmit } = useForm();
   ```

2. **Toujours valider avec Yup**
   ```typescript
   resolver: yupResolver(loginSchema)
   ```

3. **Mode onBlur pour validation**
   ```typescript
   useForm({ mode: 'onBlur' })
   ```

4. **Desactiver bouton pendant soumission**
   ```typescript
   <LoadingButton loading={isSubmitting} />
   ```

5. **Annoncer erreurs aux lecteurs d'ecran**
   ```typescript
   AccessibilityInfo.announceForAccessibility(`Erreur : ${error.message}`);
   ```

6. **Composants reutilisables**
   ```typescript
   <FormInput control={control} name="email" label="Email" />
   ```

#### ❌ A EVITER

1. **Gerer state manuellement**
   ```typescript
   // ❌ MAUVAIS
   const [email, setEmail] = useState('');
   ```

2. **Validation manuelle**
   ```typescript
   // ❌ MAUVAIS
   if (!email.includes('@')) { ... }
   ```

3. **Mode onChange (trop agressif)**
   ```typescript
   // ❌ MAUVAIS
   useForm({ mode: 'onChange' })
   ```

4. **Validation uniquement client**
   ```typescript
   // ❌ MAUVAIS - Toujours valider cote serveur aussi
   ```

5. **Oublier les messages d'erreur**
   ```typescript
   // ❌ MAUVAIS
   <TextInput ... />
   // Pas de {errors.email && ...}
   ```

---

🤖 _Guide destine a Claude Code - Architecture par features standardisee_
