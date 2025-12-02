/**
 * Ecran de reinitialisation du mot de passe
 *
 * Permet a l'utilisateur de recevoir un email de reinitialisation
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
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../../contexts/AuthContext';
import { useTheme } from '../../../contexts/ThemeContext';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Card } from '../../../components/ui/Card';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';
import { isValidEmail } from '../../../services/auth/authService';

type AuthStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
};

type ForgotPasswordScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'ForgotPassword'
>;

export const ForgotPasswordScreen: React.FC = () => {
  const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();
  const { resetPassword, error, clearError } = useAuth();
  const { colors } = useTheme();

  // Etats du formulaire
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // Erreurs de validation
  const [emailError, setEmailError] = useState('');

  // Validation du formulaire
  const validateForm = (): boolean => {
    if (!email.trim()) {
      setEmailError('Email requis');
      return false;
    }

    if (!isValidEmail(email)) {
      setEmailError('Email invalide');
      return false;
    }

    setEmailError('');
    return true;
  };

  // Gestion de l'envoi
  const handleResetPassword = async () => {
    clearError();
    setEmailSent(false);

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    const result = await resetPassword(email);
    setLoading(false);

    if (result.success) {
      setEmailSent(true);
    }
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
          <Text style={[styles.title, { color: colors.text }]}>
            Mot de passe oublie
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Entrez votre email pour recevoir un lien de reinitialisation
          </Text>
        </View>

        {/* Formulaire */}
        <Card style={styles.card}>
          {!emailSent ? (
            <>
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

              {/* Bouton envoi */}
              <Button
                title="Envoyer le lien"
                onPress={handleResetPassword}
                loading={loading}
                disabled={loading}
                style={styles.submitButton}
                accessibilityHint="Appuyez pour recevoir le lien de reinitialisation"
              />
            </>
          ) : (
            <>
              {/* Message de confirmation */}
              <View style={styles.successContainer}>
                <Text style={[styles.successTitle, { color: colors.success }]}>
                  Email envoye !
                </Text>
                <Text style={[styles.successMessage, { color: colors.textSecondary }]}>
                  Un email de reinitialisation a ete envoye a{' '}
                  <Text style={{ fontWeight: typography.fontWeight.semibold }}>
                    {email}
                  </Text>
                  .
                </Text>
                <Text style={[styles.successMessage, { color: colors.textSecondary }]}>
                  Verifiez votre boite de reception et suivez les instructions.
                </Text>
              </View>

              {/* Bouton retour connexion */}
              <Button
                title="Retour a la connexion"
                onPress={handleNavigateToLogin}
                style={styles.submitButton}
                accessibilityHint="Retourner a l'ecran de connexion"
              />
            </>
          )}
        </Card>

        {/* Lien connexion */}
        {!emailSent && (
          <View style={styles.loginContainer}>
            <Text style={[styles.loginText, { color: colors.textSecondary }]}>
              Vous vous souvenez de votre mot de passe ?{' '}
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
        )}
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
  submitButton: {
    marginTop: spacing.md,
  },
  errorText: {
    fontSize: typography.fontSize.sm,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  successContainer: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  successTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.md,
  },
  successMessage: {
    fontSize: typography.fontSize.base,
    textAlign: 'center',
    lineHeight: typography.lineHeight.relaxed,
    marginBottom: spacing.sm,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  loginText: {
    fontSize: typography.fontSize.sm,
  },
  loginLink: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
});
