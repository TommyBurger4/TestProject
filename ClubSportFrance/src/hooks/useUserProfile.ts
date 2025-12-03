'use client';

/**
 * Hook pour recuperer le profil utilisateur depuis Firestore
 *
 * Permet d'obtenir :
 * - Le profil complet (UserProfile)
 * - Le role de l'utilisateur ('user' | 'club')
 * - Etat de chargement
 *
 * Note: Marque 'use client' car il utilise des hooks React
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserProfile, UserProfile } from '../services/user/userService';

interface UseUserProfileResult {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

export const useUserProfile = (): UseUserProfileResult => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      const result = await getUserProfile(user.uid);

      if (result.success && result.profile) {
        setProfile(result.profile);
      } else {
        setError(result.error || 'Erreur lors du chargement du profil');
      }

      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  return { profile, loading, error };
};
