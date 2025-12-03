'use client';

/**
 * Context d'authentification pour Next.js
 *
 * Fournit l'etat d'authentification a toute l'application :
 * - Utilisateur connecte (Firebase Auth)
 * - Donnees utilisateur Firestore (avec role)
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
  loginWithGoogle,
  loginWithApple,
  logout as logoutService,
  sendPasswordReset,
  getUserData,
  AuthResult,
  UserData,
} from '../services/auth/authService';

interface AuthContextType {
  // Utilisateur Firebase Auth (null si non connecte)
  user: User | null;
  // Donnees utilisateur Firestore (avec role, null si non connecte)
  userData: UserData | null;
  // Indicateur de chargement (verification session en cours)
  loading: boolean;
  // Derniere erreur d'authentification
  error: string | null;

  // Fonctions d'authentification
  register: (email: string, password: string, displayName: string, role?: 'user' | 'club') => Promise<AuthResult>;
  login: (email: string, password: string) => Promise<AuthResult>;
  loginGoogle: (role?: 'user' | 'club') => Promise<AuthResult>;
  loginApple: (role?: 'user' | 'club') => Promise<AuthResult>;
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
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Ecouter les changements d'etat d'authentification
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // Recuperer les donnees utilisateur depuis Firestore
        const data = await getUserData(currentUser.uid);
        setUserData(data);
      } else {
        setUserData(null);
      }

      setLoading(false);
    });

    // Cleanup listener au demontage du composant
    return () => unsubscribe();
  }, []);

  // Inscription
  const register = async (
    email: string,
    password: string,
    displayName: string,
    role: 'user' | 'club' = 'user'
  ): Promise<AuthResult> => {
    setError(null);
    setLoading(true);

    const result = await registerWithEmail(email, password, displayName, role);

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

  // Connexion avec Google
  const loginGoogle = async (role: 'user' | 'club' = 'user'): Promise<AuthResult> => {
    setError(null);
    setLoading(true);

    const result = await loginWithGoogle(role);

    if (!result.success && result.error) {
      setError(result.error);
    }

    setLoading(false);
    return result;
  };

  // Connexion avec Apple
  const loginApple = async (role: 'user' | 'club' = 'user'): Promise<AuthResult> => {
    setError(null);
    setLoading(true);

    const result = await loginWithApple(role);

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
    userData,
    loading,
    error,
    register,
    login,
    loginGoogle,
    loginApple,
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
