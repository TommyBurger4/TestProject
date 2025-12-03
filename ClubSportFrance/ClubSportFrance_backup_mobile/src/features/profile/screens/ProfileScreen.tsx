/**
 * Ecran de profil utilisateur
 *
 * Affiche les informations du profil :
 * - Photo de profil
 * - Nom d'affichage
 * - Email
 * - Bio
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';
import { useAuth } from '../../../contexts/AuthContext';
import { getUserProfile, UserProfile } from '../../../services/user/userService';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';

interface ProfileScreenProps {
  navigation: any;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const { user, logout } = useAuth();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Charger le profil utilisateur au montage du composant
  useEffect(() => {
    loadProfile();
  }, [user]);

  // Fonction pour charger le profil depuis Firestore
  const loadProfile = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const result = await getUserProfile(user.uid);

    if (result.success && result.profile) {
      setProfile(result.profile);
    } else {
      setError(result.error || 'Erreur lors du chargement du profil.');
    }

    setLoading(false);
  };

  // Gestion de la deconnexion
  const handleLogout = async () => {
    Alert.alert(
      'Deconnexion',
      'Etes-vous sur de vouloir vous deconnecter ?',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Deconnexion',
          style: 'destructive',
          onPress: async () => {
            const result = await logout();
            if (!result.success) {
              Alert.alert('Erreur', result.error || 'Erreur lors de la deconnexion.');
            }
          },
        },
      ]
    );
  };

  // Navigation vers l'ecran d'edition
  const handleEditProfile = () => {
    navigation.navigate('EditProfile', { profile });
  };

  // Affichage du loader
  if (loading) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
          Chargement du profil...
        </Text>
      </View>
    );
  }

  // Affichage de l'erreur
  if (error || !profile) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.error }]}>
          {error || 'Profil introuvable'}
        </Text>
        <Button
          title="Reessayer"
          onPress={loadProfile}
          variant="outline"
          style={styles.retryButton}
        />
      </View>
    );
  }

  // Affichage du profil
  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Card style={styles.profileCard}>
        {/* Photo de profil */}
        <View style={styles.avatarContainer}>
          {profile.photoURL ? (
            <Image
              source={{ uri: profile.photoURL }}
              style={styles.avatar}
              accessibilityLabel="Photo de profil"
            />
          ) : (
            <View style={[styles.avatarPlaceholder, { backgroundColor: colors.disabled }]}>
              <Text style={[styles.avatarPlaceholderText, { color: colors.textSecondary }]}>
                {profile.displayName?.charAt(0).toUpperCase() || profile.email.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
        </View>

        {/* Nom d'affichage */}
        <Text style={[styles.displayName, { color: colors.text }]}>
          {profile.displayName || 'Utilisateur sans nom'}
        </Text>

        {/* Email */}
        <Text style={[styles.email, { color: colors.textSecondary }]}>
          {profile.email}
        </Text>

        {/* Bio */}
        {profile.bio && (
          <View style={styles.bioContainer}>
            <Text style={[styles.bioLabel, { color: colors.textSecondary }]}>
              Bio
            </Text>
            <Text style={[styles.bioText, { color: colors.text }]}>
              {profile.bio}
            </Text>
          </View>
        )}

        {/* Bouton editer profil */}
        <Button
          title="Editer le profil"
          onPress={handleEditProfile}
          variant="primary"
          style={styles.editButton}
        />
      </Card>

      {/* Bouton deconnexion */}
      <Button
        title="Se deconnecter"
        onPress={handleLogout}
        variant="outline"
        style={styles.logoutButton}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.lg,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: 16,
    fontWeight: '400',
  },
  errorText: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  retryButton: {
    marginTop: spacing.md,
  },
  profileCard: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  avatarContainer: {
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarPlaceholderText: {
    fontSize: 48,
    fontWeight: '600',
  },
  displayName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  email: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  bioContainer: {
    width: '100%',
    marginBottom: spacing.lg,
  },
  bioLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  bioText: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  editButton: {
    width: '100%',
  },
  logoutButton: {
    marginTop: spacing.md,
  },
});
