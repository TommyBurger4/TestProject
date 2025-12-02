/**
 * Service de gestion des images
 *
 * Gestion de l'upload des images vers Firebase Storage :
 * - Upload de photo de profil
 * - Conversion en blob pour React Native
 * - Gestion des erreurs
 */

import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase/firebase';
import * as ImagePicker from 'expo-image-picker';

export interface ImageUploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

/**
 * Convertit une URI React Native en Blob pour Firebase Storage
 * @param uri - URI de l'image locale
 * @returns Promise<Blob>
 */
const uriToBlob = async (uri: string): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response as Blob);
    };
    xhr.onerror = function () {
      reject(new Error('Erreur lors de la conversion de l\'image'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });
};

/**
 * Upload une photo de profil vers Firebase Storage
 * @param userId - ID de l'utilisateur
 * @param imageUri - URI locale de l'image
 * @returns Promise<ImageUploadResult>
 */
export const uploadProfilePhoto = async (
  userId: string,
  imageUri: string
): Promise<ImageUploadResult> => {
  try {
    // Convertir l'URI en blob
    const blob = await uriToBlob(imageUri);

    // Creer reference Storage avec timestamp pour eviter cache
    const timestamp = Date.now();
    const filename = `profile_${userId}_${timestamp}.jpg`;
    const storageRef = ref(storage, `users/${userId}/profile/${filename}`);

    // Upload le blob
    await uploadBytes(storageRef, blob);

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
 * Ouvre la camera pour prendre une photo
 * @returns Promise<string | null> - URI de l'image ou null si annule
 */
export const takePictureWithCamera = async (): Promise<string | null> => {
  try {
    // Demander permission camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      throw new Error('Permission camera refusee.');
    }

    // Ouvrir la camera
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [1, 1], // Ratio carre pour photo de profil
      quality: 0.7, // Compression pour reduire taille
    });

    if (result.canceled || !result.assets || result.assets.length === 0) {
      return null;
    }

    return result.assets[0].uri;
  } catch (error) {
    console.error('Erreur lors de la prise de photo:', error);
    throw error;
  }
};

/**
 * Ouvre la galerie pour choisir une photo
 * @returns Promise<string | null> - URI de l'image ou null si annule
 */
export const pickImageFromGallery = async (): Promise<string | null> => {
  try {
    // Demander permission galerie
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      throw new Error('Permission galerie refusee.');
    }

    // Ouvrir la galerie
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [1, 1], // Ratio carre pour photo de profil
      quality: 0.7, // Compression pour reduire taille
    });

    if (result.canceled || !result.assets || result.assets.length === 0) {
      return null;
    }

    return result.assets[0].uri;
  } catch (error) {
    console.error('Erreur lors de la selection de l\'image:', error);
    throw error;
  }
};
