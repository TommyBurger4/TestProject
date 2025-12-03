/**
 * Navigation pour les ecrans d'authentification
 *
 * Stack Navigator avec :
 * - LoginScreen (ecran initial)
 * - RegisterScreen
 * - ForgotPasswordScreen
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
} from '../features/auth/screens';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false, // Pas de header pour les ecrans auth
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};
