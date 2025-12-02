/**
 * Ecran de connexion
 *
 * Permet a l'utilisateur de se connecter avec :
 * - Email + Mot de passe
 * - Lien vers inscription
 * - Lien vers mot de passe oublie
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../../contexts/AuthContext';
import { useTheme } from '../../../contexts/ThemeContext';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Card } from '../../../components/ui/Card';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';
import { isValidEmail } from '../../../services/auth/authService';
import { getUserProfile } from '../../../services/user/userService';

type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { login, error, clearError } = useAuth();
  const { colors } = useTheme();

  // Etats du formulaire
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Erreurs de validation
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Validation du formulaire
  const validateForm = (): boolean => {
    let valid = true;

    // Validation email
    if (!email.trim()) {
      setEmailError('Email requis');
      valid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Email invalide');
      valid = false;
    } else {
      setEmailError('');
    }

    // Validation mot de passe
    if (!password) {
      setPasswordError('Mot de passe requis');
      valid = false;
    } else {
      setPasswordError('');
    }

    return valid;
  };

  // Gestion de la connexion
  const handleLogin = async () => {
    clearError();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    const result = await login(email, password);

    if (result.success && result.user) {
      // Recuperer le profil pour connaitre le role
      const profileResult = await getUserProfile(result.user.uid);

      if (profileResult.success && profileResult.profile) {
        const role = profileResult.profile.role;

        // Naviguer selon le role
        const parent = navigation.getParent();
        if (parent) {
          parent.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: role === 'club' ? 'ClubDashboard' : 'Tabs' }],
            })
          );
        }
      }
    }

    setLoading(false);
  };

  // Navigation vers inscription
  const handleNavigateToRegister = () => {
    clearError();
    navigation.navigate('Register');
  };

  // Navigation vers mot de passe oublie
  const handleNavigateToForgotPassword = () => {
    clearError();
    navigation.navigate('ForgotPassword');
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Titre */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Connexion</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Connectez-vous pour decouvrir les clubs sportifs de France
          </Text>
        </View>

        {/* Formulaire */}
        <Card style={styles.card}>
          {/* Email */}
          <Input
            label="Email"
            placeholder="votre@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            error={emailError}
            accessibilityLabel="Email"
            accessibilityHint="Entrez votre adresse email"
          />

          {/* Mot de passe */}
          <Input
            label="Mot de passe"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={passwordError}
            accessibilityLabel="Mot de passe"
            accessibilityHint="Entrez votre mot de passe"
          />

          {/* Erreur globale */}
          {error && (
            <Text
              style={[styles.errorText, { color: colors.error }]}
              accessible={true}
              accessibilityRole="alert"
            >
              {error}
            </Text>
          )}

          {/* Bouton connexion */}
          <Button
            title="Se connecter"
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
            style={styles.loginButton}
            accessibilityHint="Appuyez pour vous connecter"
          />

          {/* Mot de passe oublie */}
          <TouchableOpacity
            onPress={handleNavigateToForgotPassword}
            style={styles.forgotPasswordButton}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Mot de passe oublie"
          >
            <Text style={[styles.forgotPasswordText, { color: colors.primary }]}>
              Mot de passe oublie ?
            </Text>
          </TouchableOpacity>
        </Card>

        {/* Lien inscription */}
        <View style={styles.registerContainer}>
          <Text style={[styles.registerText, { color: colors.textSecondary }]}>
            Pas encore de compte ?{' '}
          </Text>
          <TouchableOpacity
            onPress={handleNavigateToRegister}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="S'inscrire"
          >
            <Text style={[styles.registerLink, { color: colors.primary }]}>
              S'inscrire
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  header: {
    marginBottom: spacing.xl,
    alignItems: 'center',
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    textAlign: 'center',
    lineHeight: typography.lineHeight.relaxed,
  },
  card: {
    marginBottom: spacing.lg,
  },
  loginButton: {
    marginTop: spacing.md,
  },
  forgotPasswordButton: {
    alignSelf: 'center',
    marginTop: spacing.md,
  },
  forgotPasswordText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },
  errorText: {
    fontSize: typography.fontSize.sm,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    fontSize: typography.fontSize.base,
  },
  registerLink: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
  },
});
