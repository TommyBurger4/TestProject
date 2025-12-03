/**
 * Point d'entree de l'application ClubSportFrance
 *
 * Gere :
 * - ThemeProvider (theme clair/sombre)
 * - AuthProvider (authentification Firebase)
 * - NavigationContainer (React Navigation)
 * - RootNavigator (navigation hybride MapScreen + Tabs)
 */

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { RootNavigator } from './src/navigation/RootNavigator';

// Composant interne qui utilise les contexts
const Navigation: React.FC = () => {
  const { loading: authLoading } = useAuth();
  const { colors, colorScheme } = useTheme();

  // Afficher loader pendant verification session
  if (authLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // RootNavigator gere la navigation hybride et conditionnelle selon role
  return (
    <>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </>
  );
};

// Composant App principal avec tous les Providers
export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
