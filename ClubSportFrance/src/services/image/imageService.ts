/**
 * Service de gestion des images pour Next.js
 *
 * Gestion de l'upload des images vers Firebase Storage :
 * - Upload de photo de profil
 * - Utilisation de File objects natifs du web
 * - Gestion des erreurs
 *
 * Note: Pour le web, on utilise directement les File objects
 * issus d'un input HTML <input type="file" />
 */

import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase/firebase';

export interface ImageUploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

/**
 * Upload une photo de profil vers Firebase Storage
 * @param userId - ID de l'utilisateur
 * @param file - Fichier image (File object du web)
 * @returns Promise<ImageUploadResult>
 */
export const uploadProfilePhoto = async (
  userId: string,
  file: File
): Promise<ImageUploadResult> => {
  try {
    // Valider que c'est bien une image
    if (!file.type.startsWith('image/')) {
      return {
        success: false,
        error: 'Le fichier doit etre une image.',
      };
    }

    // Valider la taille (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return {
        success: false,
        error: 'L\'image ne doit pas depasser 5MB.',
      };
    }

    // Creer reference Storage avec timestamp pour eviter cache
    const timestamp = Date.now();
    const filename = `profile_${userId}_${timestamp}.jpg`;
    const storageRef = ref(storage, `users/${userId}/profile/${filename}`);

    // Upload le fichier directement
    await uploadBytes(storageRef, file);

    // Recuperer l'URL de telechargement
    const downloadURL = await getDownloadURL(storageRef);

    return {
      success: true,
      url: downloadURL,
    };
  } catch (error) {
    console.error('Erreur lors de l\'upload de la photo de profil:', error);
    return {
      success: false,
      error: 'Impossible d\'uploader la photo de profil.',
    };
  }
};

/**
 * Supprime une photo de profil de Firebase Storage
 * @param photoURL - URL de la photo a supprimer
 * @returns Promise<boolean>
 */
export const deleteProfilePhoto = async (photoURL: string): Promise<boolean> => {
  try {
    // Extraire le chemin Firebase Storage depuis l'URL
    const storageRef = ref(storage, photoURL);
    await deleteObject(storageRef);
    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression de la photo:', error);
    return false;
  }
};

/**
 * Valider un fichier image avant upload
 * @param file - Fichier a valider
 * @returns Objet avec validite et message d'erreur si invalide
 */
export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  // Verifier que c'est une image
  if (!file.type.startsWith('image/')) {
    return {
      valid: false,
      error: 'Le fichier doit etre une image.',
    };
  }

  // Verifier la taille (max 5MB)
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'L\'image ne doit pas depasser 5MB.',
    };
  }

  // Verifier le format (JPEG, PNG, WebP)
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Format d\'image non supporte. Utilisez JPEG, PNG ou WebP.',
    };
  }

  return { valid: true };
};

/**
 * Convertir un File en Data URL pour preview
 * @param file - Fichier image
 * @returns Promise<string> - Data URL
 */
export const fileToDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result as string);
      } else {
        reject(new Error('Impossible de lire le fichier.'));
      }
    };
    reader.onerror = () => {
      reject(new Error('Erreur lors de la lecture du fichier.'));
    };
    reader.readAsDataURL(file);
  });
};
