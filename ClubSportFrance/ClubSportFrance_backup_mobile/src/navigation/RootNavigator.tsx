/**
 * Root Navigator
 *
 * Gestion de la navigation hybride et conditionnelle :
 * - MapScreen accessible a TOUS (connectes ou non)
 * - TabNavigator pour utilisateurs avec role='user'
 * - ClubDashboard pour utilisateurs avec role='club'
 * - AuthNavigator pour authentification
 */

import React, { useMemo } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MapScreen } from '../features/map/screens/MapScreen';
import { TabNavigator } from './TabNavigator';
import { AuthNavigator } from './AuthNavigator';
import { ClubDashboardScreen } from '../features/club/screens/ClubDashboardScreen';
import { useAuth } from '../contexts/AuthContext';
import { useUserProfile } from '../hooks/useUserProfile';
import { useTheme } from '../contexts/ThemeContext';

export type RootStackParamList = {
  Map: undefined;
  Tabs: undefined;
  ClubDashboard: undefined;
  Auth: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const { user } = useAuth();
  const { profile, loading } = useUserProfile();
  const { colors } = useTheme();

  // Determiner l'ecran initial en fonction de l'authentification et du role
  const initialRouteName = useMemo((): keyof RootStackParamList => {
    if (!user || !profile) {
      return 'Map'; // Pas connecte → Carte avec header
    }

    if (profile.role === 'club') {
      return 'ClubDashboard'; // Compte club → Dashboard
    }

    return 'Tabs'; // Compte user → Tabs avec footer
  }, [user, profile]);

  // Afficher loader pendant la verification du profil
  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Ecran Carte - Accessible a tous */}
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerShown: true,
          title: 'ClubSportFrance',
        }}
      />

      {/* TabNavigator - Pour utilisateurs avec role='user' */}
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />

      {/* ClubDashboard - Pour utilisateurs avec role='club' */}
      <Stack.Screen
        name="ClubDashboard"
        component={ClubDashboardScreen}
        options={{
          headerShown: true,
          title: 'Dashboard Club',
        }}
      />

      {/* AuthNavigator - Pour connexion/inscription */}
      <Stack.Screen
        name="Auth"
        component={AuthNavigator}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
