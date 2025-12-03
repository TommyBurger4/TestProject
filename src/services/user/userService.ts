/**
 * Service de gestion des utilisateurs dans Firestore
 *
 * Gestion complete des profils utilisateurs :
 * - Creation profil apres inscription
 * - Recuperation profil
 * - Mise a jour profil
 * - Suppression profil
 * - Support roles user/club
 */

import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { User as FirebaseUser } from 'firebase/auth';

// Type de compte utilisateur
export type UserRole = 'user' | 'club';

// Interface du profil utilisateur dans Firestore
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  bio: string | null;
  role: UserRole; // 'user' ou 'club'
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Interface pour les donnees de mise a jour du profil
export interface UpdateUserProfileData {
  displayName?: string;
  photoURL?: string;
  bio?: string;
}

// Interface pour le resultat des operations
export interface UserServiceResult {
  success: boolean;
  error?: string;
  profile?: UserProfile;
}

/**
 * Cree un nouveau profil utilisateur dans Firestore apres inscription
 * @param user - Utilisateur Firebase Auth
 * @param role - Type de compte ('user' ou 'club')
 * @returns Promise<UserServiceResult>
 */
export const createUserProfile = async (
  user: FirebaseUser,
  role: UserRole = 'user'
): Promise<UserServiceResult> => {
  try {
    const userRef = doc(db, 'users', user.uid);

    // Verifier si le profil existe deja
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return {
        success: true,
        profile: userSnap.data() as UserProfile,
      };
    }

    // Creer le nouveau profil
    const newProfile: Omit<UserProfile, 'createdAt' | 'updatedAt'> = {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || null,
      photoURL: user.photoURL || null,
      bio: null,
      role, // 'user' ou 'club'
    };

    await setDoc(userRef, {
      ...newProfile,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    // Recuperer le profil cree pour avoir les timestamps
    const createdSnap = await getDoc(userRef);
    const profile = createdSnap.data() as UserProfile;

    return {
      success: true,
      profile,
    };
  } catch (error) {
    console.error('Erreur lors de la creation du profil utilisateur:', error);
    return {
      success: false,
      error: 'Impossible de creer le profil utilisateur.',
    };
  }
};

/**
 * Recupere le profil utilisateur depuis Firestore
 * @param userId - ID de l'utilisateur
 * @returns Promise<UserServiceResult>
 */
export const getUserProfile = async (
  userId: string
): Promise<UserServiceResult> => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return {
        success: false,
        error: 'Profil utilisateur introuvable.',
      };
    }

    const profile = userSnap.data() as UserProfile;

    return {
      success: true,
      profile,
    };
  } catch (error) {
    console.error('Erreur lors de la recuperation du profil utilisateur:', error);
    return {
      success: false,
      error: 'Impossible de recuperer le profil utilisateur.',
    };
  }
};

/**
 * Met a jour le profil utilisateur dans Firestore
 * @param userId - ID de l'utilisateur
 * @param data - Donnees a mettre a jour
 * @returns Promise<UserServiceResult>
 */
export const updateUserProfile = async (
  userId: string,
  data: UpdateUserProfileData
): Promise<UserServiceResult> => {
  try {
    const userRef = doc(db, 'users', userId);

    // Verifier que le profil existe
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      return {
        success: false,
        error: 'Profil utilisateur introuvable.',
      };
    }

    // Mettre a jour les champs
    await updateDoc(userRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });

    // Recuperer le profil mis a jour
    const updatedSnap = await getDoc(userRef);
    const profile = updatedSnap.data() as UserProfile;

    return {
      success: true,
      profile,
    };
  } catch (error) {
    console.error('Erreur lors de la mise a jour du profil utilisateur:', error);
    return {
      success: false,
      error: 'Impossible de mettre a jour le profil utilisateur.',
    };
  }
};

/**
 * Supprime le profil utilisateur de Firestore
 * Note: Cette fonction ne supprime PAS le compte Firebase Auth
 * @param userId - ID de l'utilisateur
 * @returns Promise<UserServiceResult>
 */
export const deleteUserProfile = async (
  userId: string
): Promise<UserServiceResult> => {
  try {
    const userRef = doc(db, 'users', userId);

    // Verifier que le profil existe
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      return {
        success: false,
        error: 'Profil utilisateur introuvable.',
      };
    }

    // Supprimer le document
    await deleteDoc(userRef);

    return {
      success: true,
    };
  } catch (error) {
    console.error('Erreur lors de la suppression du profil utilisateur:', error);
    return {
      success: false,
      error: 'Impossible de supprimer le profil utilisateur.',
    };
  }
};
