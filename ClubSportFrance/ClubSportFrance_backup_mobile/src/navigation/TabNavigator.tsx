/**
 * Tab Navigator principal
 *
 * Navigation par onglets pour utilisateurs connectes :
 * - Carte : Voir tous les clubs sur carte interactive
 * - Recherche : Filtres avances
 * - Favoris : Clubs sauvegardes
 * - Chat : Messagerie
 * - Profil : Gestion du compte
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { MapScreen } from '../features/map/screens/MapScreen';
import { SearchScreen } from '../features/search/screens/SearchScreen';
import { FavoritesScreen } from '../features/favorites/screens/FavoritesScreen';
import { ProfileScreen } from '../features/profile/screens/ProfileScreen';
import { EditProfileScreen } from '../features/profile/screens/EditProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserProfile } from '../services/user/userService';

// Type definitions pour navigation
export type TabParamList = {
  MapTab: undefined;
  SearchTab: undefined;
  FavoritesTab: undefined;
  ProfileTab: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
  EditProfile: { profile: UserProfile };
};

const Tab = createBottomTabNavigator<TabParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

// Stack Navigator pour l'onglet Profil
const ProfileStackNavigator: React.FC = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Mon Profil' }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ title: 'Editer le Profil' }}
      />
    </ProfileStack.Navigator>
  );
};

export const TabNavigator: React.FC = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          paddingBottom: Platform.OS === 'ios' ? 20 : 5,
          height: Platform.OS === 'ios' ? 85 : 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: '700',
        },
      }}
    >
      <Tab.Screen
        name="MapTab"
        component={MapScreen}
        options={{
          title: 'Carte',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <TabBarIcon icon="🗺️" color={color} />,
        }}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchScreen}
        options={{
          title: 'Recherche',
          tabBarIcon: ({ color, size }) => <TabBarIcon icon="🔍" color={color} />,
        }}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesScreen}
        options={{
          title: 'Favoris',
          tabBarIcon: ({ color, size }) => <TabBarIcon icon="⭐" color={color} />,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStackNavigator}
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size }) => <TabBarIcon icon="👤" color={color} />,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

// Composant simple pour les icones (emojis)
const TabBarIcon: React.FC<{ icon: string; color: string }> = ({ icon, color }) => {
  return <Text style={{ fontSize: 24 }}>{icon}</Text>;
};
