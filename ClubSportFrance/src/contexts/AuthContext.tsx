'use client';

/**
 * Context d'authentification pour Next.js
 *
 * Fournit l'etat d'authentification a toute l'application :
 * - Utilisateur connecte
 * - Etat de chargement
 * - Fonctions d'authentification
 *
 * Note: Ce composant doit etre marque 'use client' car il utilise
 * des hooks React (useState, useEffect, useContext)
 */

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase/firebase';
import {
  registerWithEmail,
  loginWithEmail,
  logout as logoutService,
  sendPasswordReset,
  AuthResult,
} from '../services/auth/authService';
import { createUserProfile, UserRole } from '../services/user/userService';

interface AuthContextType {
  // Utilisateur actuellement connecte (null si non connecte)
  user: User | null;
  // Indicateur de chargement (verification session en cours)
  loading: boolean;
  // Derniere erreur d'authentification
  error: string | null;

  // Fonctions d'authentification
  register: (email: string, password: string, displayName?: string, role?: UserRole) => Promise<AuthResult>;
  login: (email: string, password: string) => Promise<AuthResult>;
  logout: () => Promise<AuthResult>;
  resetPassword: (email: string) => Promise<AuthResult>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Ecouter les changements d'etat d'authentification
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Creer le profil Firestore si l'utilisateur n'en a pas encore
        // (utile pour les utilisateurs qui se connectent pour la premiere fois)
        await createUserProfile(currentUser);
      }
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup listener au demontage du composant
    return () => unsubscribe();
  }, []);

  // Inscription
  const register = async (
    email: string,
    password: string,
    displayName?: string,
    role: UserRole = 'user'
  ): Promise<AuthResult> => {
    setError(null);
    setLoading(true);

    const result = await registerWithEmail(email, password, displayName);

    // Si inscription reussie, creer le profil Firestore avec le role
    if (result.success && result.user) {
      await createUserProfile(result.user, role);
    }

    if (!result.success && result.error) {
      setError(result.error);
    }

    setLoading(false);
    return result;
  };

  // Connexion
  const login = async (email: string, password: string): Promise<AuthResult> => {
    setError(null);
    setLoading(true);

    const result = await loginWithEmail(email, password);

    if (!result.success && result.error) {
      setError(result.error);
    }

    setLoading(false);
    return result;
  };

  // Deconnexion
  const logout = async (): Promise<AuthResult> => {
    setError(null);
    setLoading(true);

    const result = await logoutService();

    if (!result.success && result.error) {
      setError(result.error);
    }

    setLoading(false);
    return result;
  };

  // Reinitialisation mot de passe
  const resetPassword = async (email: string): Promise<AuthResult> => {
    setError(null);
    setLoading(true);

    const result = await sendPasswordReset(email);

    if (!result.success && result.error) {
      setError(result.error);
    }

    setLoading(false);
    return result;
  };

  // Effacer l'erreur
  const clearError = () => {
    setError(null);
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    resetPassword,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook pour utiliser le contexte d'authentification
 * @throws Erreur si utilise hors d'un AuthProvider
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit etre utilise dans un AuthProvider');
  }
  return context;
};
