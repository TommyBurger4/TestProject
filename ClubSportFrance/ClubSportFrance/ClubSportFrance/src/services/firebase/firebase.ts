/**
 * Fichier: firebase.ts
 *
 * Configuration et initialisation de Firebase.
 * Utilise la config WEB pour compatibilite Expo.
 */

import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Configuration Firebase depuis .env
const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.EXPO_PUBLIC_FIREBASE_API_KEY || process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: Constants.expoConfig?.extra?.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: Constants.expoConfig?.extra?.EXPO_PUBLIC_FIREBASE_PROJECT_ID || process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: Constants.expoConfig?.extra?.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Constants.expoConfig?.extra?.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: Constants.expoConfig?.extra?.EXPO_PUBLIC_FIREBASE_APP_ID || process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: Constants.expoConfig?.extra?.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID || process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser Auth avec persistence React Native
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (error) {
  // Si deja initialise (hot reload)
  auth = getAuth(app);
}

// Initialiser les autres services
const db = getFirestore(app);
const storage = getStorage(app);

// Analytics uniquement sur web
const analytics = Platform.OS === 'web' ? getAnalytics(app) : null;

export { auth, db, storage, analytics, app };
