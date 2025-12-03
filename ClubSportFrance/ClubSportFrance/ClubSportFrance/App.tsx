/**
 * Point d'entree de l'application ClubSportFrance
 *
 * Gere :
 * - ThemeProvider (theme clair/sombre)
 * - AuthProvider (authentification Firebase)
 * - NavigationContainer (React Navigation)
 * - Navigation conditionnelle (AuthNavigator vs AppNavigator)
 */

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { AuthNavigator } from './src/navigation/AuthNavigator';
import { AppNavigator } from './src/navigation/AppNavigator';

// Composant interne qui utilise les contexts
const RootNavigator: React.FC = () => {
  const { user, loading } = useAuth();
  const { colors, colorScheme } = useTheme();

  // Afficher loader pendant verification session
  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // Navigation conditionnelle selon etat authentification
  return (
    <>
      <NavigationContainer>
        {user ? <AppNavigator /> : <AuthNavigator />}
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
        <RootNavigator />
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
