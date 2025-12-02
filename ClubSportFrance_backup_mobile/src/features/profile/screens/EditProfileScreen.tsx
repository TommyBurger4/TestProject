/**
 * Ecran d'edition du profil utilisateur
 *
 * Permet de modifier :
 * - Photo de profil (camera ou galerie)
 * - Nom d'affichage
 * - Bio
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';
import { useAuth } from '../../../contexts/AuthContext';
import { updateUserProfile, UserProfile } from '../../../services/user/userService';
import {
  takePictureWithCamera,
  pickImageFromGallery,
  uploadProfilePhoto,
} from '../../../services/image/imageService';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Card } from '../../../components/ui/Card';
import { spacing } from '../../../theme/spacing';

interface EditProfileScreenProps {
  navigation: any;
  route: {
    params: {
      profile: UserProfile;
    };
  };
}

export const EditProfileScreen: React.FC<EditProfileScreenProps> = ({
  navigation,
  route,
}) => {
  const { colors } = useTheme();
  const { user } = useAuth();
  const { profile } = route.params;

  const [displayName, setDisplayName] = useState<string>(profile.displayName || '');
  const [bio, setBio] = useState<string>(profile.bio || '');
  const [photoURL, setPhotoURL] = useState<string | null>(profile.photoURL);

  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ displayName?: string; bio?: string }>({});

  // Validation du formulaire
  const validateForm = (): boolean => {
    const newErrors: { displayName?: string; bio?: string } = {};

    // Validation nom d'affichage
    if (displayName.trim() === '') {
      newErrors.displayName = 'Le nom d\'affichage est requis.';
    } else if (displayName.length > 50) {
      newErrors.displayName = 'Le nom d\'affichage ne peut pas depasser 50 caracteres.';
    }

    // Validation bio
    if (bio.length > 500) {
      newErrors.bio = 'La bio ne peut pas depasser 500 caracteres.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Gestion de la sauvegarde
  const handleSave = async () => {
    if (!validateForm() || !user) return;

    setLoading(true);

    const result = await updateUserProfile(user.uid, {
      displayName: displayName.trim(),
      bio: bio.trim() || null,
      photoURL,
    });

    setLoading(false);

    if (result.success) {
      Alert.alert('Succes', 'Profil mis a jour avec succes.', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } else {
      Alert.alert('Erreur', result.error || 'Erreur lors de la mise a jour du profil.');
    }
  };

  // Gestion de l'upload de photo
  const handlePhotoUpload = () => {
    Alert.alert(
      'Photo de profil',
      'Choisissez une source',
      [
        {
          text: 'Camera',
          onPress: handleTakePhoto,
        },
        {
          text: 'Galerie',
          onPress: handlePickImage,
        },
        {
          text: 'Annuler',
          style: 'cancel',
        },
      ]
    );
  };

  // Prendre une photo avec la camera
  const handleTakePhoto = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Ouvrir la camera
      const imageUri = await takePictureWithCamera();
      if (!imageUri) {
        setLoading(false);
        return;
      }

      // Upload vers Firebase Storage
      const uploadResult = await uploadProfilePhoto(user.uid, imageUri);

      if (uploadResult.success && uploadResult.url) {
        setPhotoURL(uploadResult.url);
        Alert.alert('Succes', 'Photo de profil mise a jour !');
      } else {
        Alert.alert('Erreur', uploadResult.error || 'Erreur lors de l\'upload.');
      }

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      Alert.alert('Erreur', error.message || 'Erreur lors de la prise de photo.');
    }
  };

  // Choisir une image de la galerie
  const handlePickImage = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Ouvrir la galerie
      const imageUri = await pickImageFromGallery();
      if (!imageUri) {
        setLoading(false);
        return;
      }

      // Upload vers Firebase Storage
      const uploadResult = await uploadProfilePhoto(user.uid, imageUri);

      if (uploadResult.success && uploadResult.url) {
        setPhotoURL(uploadResult.url);
        Alert.alert('Succes', 'Photo de profil mise a jour !');
      } else {
        Alert.alert('Erreur', uploadResult.error || 'Erreur lors de l\'upload.');
      }

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      Alert.alert('Erreur', error.message || 'Erreur lors de la selection de l\'image.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={[styles.scrollView, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Card style={styles.card}>
          {/* Photo de profil */}
          <View style={styles.avatarContainer}>
            <TouchableOpacity
              onPress={handlePhotoUpload}
              accessible={true}
              accessibilityLabel="Modifier la photo de profil"
              accessibilityHint="Appuyez pour choisir une nouvelle photo"
            >
              {photoURL ? (
                <Image
                  source={{ uri: photoURL }}
                  style={styles.avatar}
                  accessibilityLabel="Photo de profil actuelle"
                />
              ) : (
                <View style={[styles.avatarPlaceholder, { backgroundColor: colors.disabled }]}>
                  <Text style={[styles.avatarPlaceholderText, { color: colors.textSecondary }]}>
                    {displayName?.charAt(0).toUpperCase() || profile.email.charAt(0).toUpperCase()}
                  </Text>
                </View>
              )}
              <View style={[styles.editBadge, { backgroundColor: colors.primary }]}>
                <Text style={styles.editBadgeText}>✎</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Champ nom d'affichage */}
          <Input
            label="Nom d'affichage"
            placeholder="Votre nom"
            value={displayName}
            onChangeText={setDisplayName}
            error={errors.displayName}
            maxLength={50}
          />

          {/* Champ bio */}
          <Input
            label="Bio"
            placeholder="Parlez-nous de vous..."
            value={bio}
            onChangeText={setBio}
            error={errors.bio}
            multiline
            numberOfLines={4}
            maxLength={500}
          />

          {/* Compteur de caracteres pour bio */}
          <Text style={[styles.characterCount, { color: colors.textSecondary }]}>
            {bio.length} / 500 caracteres
          </Text>

          {/* Boutons d'action */}
          <View style={styles.buttonContainer}>
            <Button
              title="Annuler"
              onPress={() => navigation.goBack()}
              variant="outline"
              style={styles.button}
            />
            <Button
              title="Enregistrer"
              onPress={handleSave}
              loading={loading}
              variant="primary"
              style={styles.button}
            />
          </View>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.lg,
  },
  card: {
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: spacing.lg,
    position: 'relative',
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
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  editBadgeText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  characterCount: {
    fontSize: 12,
    fontWeight: '400',
    alignSelf: 'flex-end',
    marginTop: -spacing.xs,
    marginBottom: spacing.md,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: spacing.md,
  },
  button: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
});
