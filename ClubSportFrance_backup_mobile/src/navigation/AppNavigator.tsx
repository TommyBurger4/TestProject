/**
 * Navigation principale de l'application
 *
 * Affichee quand l'utilisateur est connecte
 * Pour l'instant : ecran Home simple
 * Plus tard : Bottom Tabs avec Carte, Recherche, Favoris, Chat, Profil
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { ProfileScreen } from '../features/profile/screens/ProfileScreen';
import { EditProfileScreen } from '../features/profile/screens/EditProfileScreen';
import { UserProfile } from '../services/user/userService';

export type AppStackParamList = {
  Home: undefined;
  Profile: undefined;
  EditProfile: { profile: UserProfile };
};

const Stack = createNativeStackNavigator<AppStackParamList>();

// Ecran Home temporaire
const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { colors } = useTheme();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const handleGoToProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        Bienvenue sur ClubSportFrance !
      </Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Connecte en tant que : {user?.email}
      </Text>
      <Text style={[styles.info, { color: colors.textSecondary }]}>
        La navigation complete (carte, recherche, etc.) sera ajoutee bientot.
      </Text>
      <Button
        title="Voir mon profil"
        onPress={handleGoToProfile}
        variant="primary"
        style={styles.profileButton}
      />
      <Button
        title="Se deconnecter"
        onPress={handleLogout}
        variant="outline"
        style={styles.logoutButton}
      />
    </View>
  );
};

export const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Mon Profil' }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ title: 'Editer le Profil' }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  info: {
    fontSize: typography.fontSize.sm,
    marginBottom: spacing.xl,
    textAlign: 'center',
    lineHeight: typography.lineHeight.relaxed,
  },
  profileButton: {
    minWidth: 200,
    marginBottom: spacing.md,
  },
  logoutButton: {
    minWidth: 200,
  },
});
