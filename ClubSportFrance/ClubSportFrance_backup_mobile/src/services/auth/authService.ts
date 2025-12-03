/**
 * Service d'authentification Firebase
 *
 * Fournit toutes les fonctions d'authentification :
 * - Inscription (Email/Password)
 * - Connexion (Email/Password)
 * - Deconnexion
 * - Reinitialisation mot de passe
 * - Gestion erreurs en francais
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  User,
  AuthError,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../firebase/firebase';

// Types pour les resultats des operations
export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

/**
 * Inscription avec email et mot de passe
 * @param email - Email de l'utilisateur
 * @param password - Mot de passe (min 6 caracteres)
 * @param displayName - Nom d'affichage optionnel
 * @returns AuthResult avec user si succes, error si echec
 */
export const registerWithEmail = async (
  email: string,
  password: string,
  displayName?: string
): Promise<AuthResult> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Mettre a jour le nom d'affichage si fourni
    if (displayName) {
      await updateProfile(user, { displayName });
    }

    return {
      success: true,
      user,
    };
  } catch (error) {
    return {
      success: false,
      error: getFirebaseErrorMessage(error as AuthError),
    };
  }
};

/**
 * Connexion avec email et mot de passe
 * @param email - Email de l'utilisateur
 * @param password - Mot de passe
 * @returns AuthResult avec user si succes, error si echec
 */
export const loginWithEmail = async (
  email: string,
  password: string
): Promise<AuthResult> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return {
      success: true,
      user: userCredential.user,
    };
  } catch (error) {
    return {
      success: false,
      error: getFirebaseErrorMessage(error as AuthError),
    };
  }
};

/**
 * Deconnexion de l'utilisateur
 * @returns AuthResult avec success true/false
 */
export const logout = async (): Promise<AuthResult> => {
  try {
    await signOut(auth);
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: getFirebaseErrorMessage(error as AuthError),
    };
  }
};

/**
 * Envoyer un email de reinitialisation de mot de passe
 * @param email - Email de l'utilisateur
 * @returns AuthResult avec success true/false
 */
export const sendPasswordReset = async (email: string): Promise<AuthResult> => {
  try {
    await sendPasswordResetEmail(auth, email);
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: getFirebaseErrorMessage(error as AuthError),
    };
  }
};

/**
 * Obtenir l'utilisateur actuellement connecte
 * @returns User ou null si non connecte
 */
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

/**
 * Traduire les erreurs Firebase en francais
 * @param error - Erreur Firebase
 * @returns Message d'erreur en francais
 */
const getFirebaseErrorMessage = (error: AuthError): string => {
  switch (error.code) {
    // Erreurs d'inscription
    case 'auth/email-already-in-use':
      return 'Cette adresse email est deja utilisee.';
    case 'auth/invalid-email':
      return 'Adresse email invalide.';
    case 'auth/weak-password':
      return 'Le mot de passe doit contenir au moins 6 caracteres.';
    case 'auth/operation-not-allowed':
      return 'Operation non autorisee.';

    // Erreurs de connexion
    case 'auth/user-not-found':
      return 'Aucun compte ne correspond a cet email.';
    case 'auth/wrong-password':
      return 'Mot de passe incorrect.';
    case 'auth/user-disabled':
      return 'Ce compte a ete desactive.';
    case 'auth/invalid-credential':
      return 'Identifiants invalides.';

    // Erreurs de reinitialisation mot de passe
    case 'auth/missing-email':
      return 'Veuillez fournir une adresse email.';

    // Erreurs reseau
    case 'auth/network-request-failed':
      return 'Erreur reseau. Verifiez votre connexion internet.';
    case 'auth/too-many-requests':
      return 'Trop de tentatives. Reessayez plus tard.';

    // Erreur generique
    default:
      console.error('Erreur Firebase Auth:', error.code, error.message);
      return 'Une erreur est survenue. Veuillez reessayer.';
  }
};

/**
 * Valider le format d'un email
 * @param email - Email a valider
 * @returns true si valide, false sinon
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valider la force d'un mot de passe
 * @param password - Mot de passe a valider
 * @returns Objet avec validite et message d'erreur si invalide
 */
export const validatePassword = (password: string): { valid: boolean; error?: string } => {
  if (password.length < 6) {
    return {
      valid: false,
      error: 'Le mot de passe doit contenir au moins 6 caracteres.',
    };
  }
  return { valid: true };
};

/**
 * Valider que deux mots de passe correspondent
 * @param password - Mot de passe
 * @param confirmPassword - Confirmation du mot de passe
 * @returns true si identiques, false sinon
 */
export const passwordsMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};
