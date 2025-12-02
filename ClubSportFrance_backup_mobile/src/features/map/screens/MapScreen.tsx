/**
 * Ecran de carte principale
 *
 * Affiche une carte interactive avec :
 * - Geolocalisation de l'utilisateur
 * - Marqueurs des clubs sportifs (a venir)
 * - Accessible SANS connexion
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import MapView, { Marker, Region, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { useTheme } from '../../../contexts/ThemeContext';
import { useAuth } from '../../../contexts/AuthContext';
import { useUserProfile } from '../../../hooks/useUserProfile';
import { spacing } from '../../../theme/spacing';

interface MapScreenProps {
  navigation: any;
}

export const MapScreen: React.FC<MapScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const { user } = useAuth();
  const { profile } = useUserProfile(); // Recuperer le profil avec le role

  // Region initiale centree sur Paris
  const [region, setRegion] = useState<Region>({
    latitude: 48.8566,
    longitude: 2.3522,
    latitudeDelta: 5.0,
    longitudeDelta: 5.0,
  });

  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [locationPermission, setLocationPermission] = useState<boolean>(false);

  // Demander permission de localisation au montage
  useEffect(() => {
    requestLocationPermission();
  }, []);

  // Demander permission de localisation
  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setLocationPermission(false);
        setLoading(false);
        Alert.alert(
          'Permission refusee',
          'L\'application a besoin de votre position pour afficher les clubs sportifs a proximite.'
        );
        return;
      }

      setLocationPermission(true);

      // Recuperer la position actuelle
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const currentLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setUserLocation(currentLocation);

      // Centrer la carte sur la position utilisateur
      setRegion({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });

      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la recuperation de la position:', error);
      setLoading(false);
      Alert.alert('Erreur', 'Impossible de recuperer votre position.');
    }
  };

  // Bouton pour recentrer sur la position utilisateur
  const handleCenterOnUser = async () => {
    if (!userLocation) {
      Alert.alert('Info', 'Position utilisateur non disponible.');
      return;
    }

    setRegion({
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    });
  };

  // Naviguer vers Auth ou Dashboard selon l'etat de connexion et le role
  const handleAuthButton = useCallback(() => {
    if (user && profile) {
      // Utilisateur connecte → Naviguer selon le role
      if (profile.role === 'club') {
        // Compte Club → Dashboard Club
        navigation.navigate('ClubDashboard');
      } else {
        // Compte User → Tabs (Carte/Recherche/Favoris/Profil)
        navigation.navigate('Tabs', { screen: 'ProfileTab' });
      }
    } else {
      // Pas connecte → Aller vers Auth
      navigation.navigate('Auth');
    }
  }, [user, profile, navigation]);

  // Configuration du header - Afficher bouton selon etat connexion
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={handleAuthButton}
          style={styles.headerButton}
          accessible={true}
          accessibilityLabel={user ? "Mon compte" : "Se connecter"}
          accessibilityRole="button"
        >
          <Text style={[styles.headerButtonText, { color: colors.primary }]}>
            {user ? (profile?.role === 'club' ? '🏢' : '👤') : 'Se connecter'}
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, user, profile, colors, handleAuthButton]);

  // Affichage du loader
  if (loading) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
          Chargement de la carte...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Carte interactive */}
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        showsUserLocation={locationPermission}
        showsMyLocationButton={false}
        showsCompass={true}
        showsScale={true}
        loadingEnabled={true}
        accessible={true}
        accessibilityLabel="Carte interactive des clubs sportifs"
      >
        {/* Marqueur position utilisateur (si disponible) */}
        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="Ma position"
            description="Vous etes ici"
            pinColor={colors.primary}
          />
        )}

        {/* TODO: Ajouter marqueurs des clubs sportifs ici */}
      </MapView>

      {/* Bouton pour recentrer sur l'utilisateur */}
      {userLocation && (
        <TouchableOpacity
          style={[styles.centerButton, { backgroundColor: colors.primary }]}
          onPress={handleCenterOnUser}
          accessible={true}
          accessibilityLabel="Recentrer sur ma position"
          accessibilityRole="button"
        >
          <Text style={styles.centerButtonText}>📍</Text>
        </TouchableOpacity>
      )}

      {/* Message si pas de permission */}
      {!locationPermission && (
        <View style={[styles.permissionBanner, { backgroundColor: colors.error }]}>
          <Text style={styles.permissionText}>
            Activez la localisation pour voir les clubs a proximite
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: 16,
    fontWeight: '400',
  },
  headerButton: {
    marginRight: spacing.md,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  headerButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  centerButton: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  centerButtonText: {
    fontSize: 24,
  },
  permissionBanner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
    alignItems: 'center',
  },
  permissionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
