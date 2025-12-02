/**
 * Ecran d'inscription
 *
 * Permet a l'utilisateur de creer un compte avec :
 * - Nom d'affichage
 * - Email
 * - Mot de passe + confirmation
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
import { useNavigation, useRoute, RouteProp, CommonActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../../contexts/AuthContext';
import { useTheme } from '../../../contexts/ThemeContext';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Card } from '../../../components/ui/Card';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';
import {
  isValidEmail,
  validatePassword,
  passwordsMatch,
} from '../../../services/auth/authService';
import { UserRole } from '../../../services/user/userService';

type AuthStackParamList = {
  Login: undefined;
  Register: { role?: UserRole };
};

type RegisterScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;
type RegisterScreenRouteProp = RouteProp<AuthStackParamList, 'Register'>;

export const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const route = useRoute<RegisterScreenRouteProp>();
  const { register, error, clearError } = useAuth();
  const { colors } = useTheme();

  // Recuperer le role depuis les params (defaut 'user')
  const role: UserRole = route.params?.role || 'user';

  // Etats du formulaire
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Erreurs de validation
  const [displayNameError, setDisplayNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // Validation du formulaire
  const validateForm = (): boolean => {
    let valid = true;

    // Validation nom d'affichage
    if (!displayName.trim()) {
      setDisplayNameError('Nom requis');
      valid = false;
    } else if (displayName.trim().length < 2) {
      setDisplayNameError('Le nom doit contenir au moins 2 caracteres');
      valid = false;
    } else {
      setDisplayNameError('');
    }

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
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      setPasswordError(passwordValidation.error || '');
      valid = false;
    } else {
      setPasswordError('');
    }

    // Validation confirmation mot de passe
    if (!confirmPassword) {
      setConfirmPasswordError('Confirmation requise');
      valid = false;
    } else if (!passwordsMatch(password, confirmPassword)) {
      setConfirmPasswordError('Les mots de passe ne correspondent pas');
      valid = false;
    } else {
      setConfirmPasswordError('');
    }

    return valid;
  };

  // Gestion de l'inscription
  const handleRegister = async () => {
    clearError();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    const result = await register(email, password, displayName.trim(), role);

    if (result.success) {
      console.log('Inscription reussie avec role:', role);

      // Naviguer selon le role (user → Tabs)
      const parent = navigation.getParent();
      if (parent) {
        parent.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Tabs' }],
          })
        );
      }
    }

    setLoading(false);
  };

  // Navigation vers connexion
  const handleNavigateToLogin = () => {
    clearError();
    navigation.navigate('Login');
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
          <Text style={[styles.title, { color: colors.text }]}>Inscription</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Creez un compte pour rejoindre des clubs sportifs
          </Text>
        </View>

        {/* Formulaire */}
        <Card style={styles.card}>
          {/* Nom d'affichage */}
          <Input
            label="Nom"
            placeholder="Votre nom"
            value={displayName}
            onChangeText={setDisplayName}
            autoCapitalize="words"
            error={displayNameError}
            accessibilityLabel="Nom"
            accessibilityHint="Entrez votre nom d'affichage"
          />

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
            autoComplete="off"
            textContentType="oneTimeCode"
            error={passwordError}
            accessibilityLabel="Mot de passe"
            accessibilityHint="Entrez un mot de passe d'au moins 6 caracteres"
          />

          {/* Confirmation mot de passe */}
          <Input
            label="Confirmer le mot de passe"
            placeholder="••••••••"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoComplete="off"
            textContentType="oneTimeCode"
            error={confirmPasswordError}
            accessibilityLabel="Confirmation du mot de passe"
            accessibilityHint="Confirmez votre mot de passe"
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

          {/* Bouton inscription */}
          <Button
            title="S'inscrire"
            onPress={handleRegister}
            loading={loading}
            disabled={loading}
            style={styles.registerButton}
            accessibilityHint="Appuyez pour creer votre compte"
          />
        </Card>

        {/* Lien connexion */}
        <View style={styles.loginContainer}>
          <Text style={[styles.loginText, { color: colors.textSecondary }]}>
            Vous avez deja un compte ?{' '}
          </Text>
          <TouchableOpacity
            onPress={handleNavigateToLogin}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Se connecter"
          >
            <Text style={[styles.loginLink, { color: colors.primary }]}>
              Se connecter
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
  registerButton: {
    marginTop: spacing.md,
  },
  errorText: {
    fontSize: typography.fontSize.sm,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: typography.fontSize.base,
  },
  loginLink: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
  },
});
