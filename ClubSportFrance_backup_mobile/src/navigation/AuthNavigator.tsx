/**
 * Navigation pour les ecrans d'authentification
 *
 * Stack Navigator avec :
 * - AccountTypeChoiceScreen (ecran initial - choix User/Club)
 * - LoginScreen
 * - RegisterScreen (inscription utilisateur)
 * - RegisterClubScreen (inscription club)
 * - ForgotPasswordScreen
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, ForgotPasswordScreen } from '../features/auth/screens';
import { RegisterScreen } from '../features/auth/screens/RegisterScreen';
import { RegisterClubScreen } from '../features/auth/screens/RegisterClubScreen';
import { AccountTypeChoiceScreen } from '../features/auth/screens/AccountTypeChoiceScreen';
import { UserRole } from '../services/user/userService';

export type AuthStackParamList = {
  AccountTypeChoice: undefined;
  Login: undefined;
  Register: { role?: UserRole };
  RegisterClub: { role?: UserRole };
  ForgotPassword: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="AccountTypeChoice"
      screenOptions={{
        headerShown: false, // Pas de header pour les ecrans auth
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="AccountTypeChoice" component={AccountTypeChoiceScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="RegisterClub" component={RegisterClubScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};
