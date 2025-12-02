/**
 * Ecran d'inscription Club (version basique)
 *
 * Permet a un club de creer un compte avec :
 * - Nom du club
 * - Email
 * - Mot de passe + confirmation
 *
 * TODO: Transformer en formulaire multi-etapes plus tard
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
import {
  isValidEmail,
  validatePassword,
  passwordsMatch,
} from '../../../services/auth/authService';
import { UserRole } from '../../../services/user/userService';

type AuthStackParamList = {
  Login: undefined;
  RegisterClub: { role?: UserRole };
};

type RegisterClubScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'RegisterClub'>;
type RegisterClubScreenRouteProp = RouteProp<AuthStackParamList, 'RegisterClub'>;

export const RegisterClubScreen: React.FC = () => {
  const navigation = useNavigation<RegisterClubScreenNavigationProp>();
  const route = useRoute<RegisterClubScreenRouteProp>();
  const { register, error, clearError } = useAuth();
  const { colors } = useTheme();

  // Recuperer le role depuis les params (doit etre 'club')
  const role: UserRole = route.params?.role || 'club';

  // Etats du formulaire
  const [clubName, setClubName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Erreurs de validation
  const [clubNameError, setClubNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // Validation du formulaire
  const validateForm = (): boolean => {
    let valid = true;

    // Validation nom du club
    if (!clubName.trim()) {
      setClubNameError('Nom du club requis');
      valid = false;
    } else if (clubName.trim().length < 3) {
      setClubNameError('Le nom doit contenir au moins 3 caracteres');
      valid = false;
    } else {
      setClubNameError('');
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
    const result = await register(email, password, clubName.trim(), role);

    if (result.success) {
      console.log('Inscription club reussie avec role:', role);

      // Naviguer vers ClubDashboard pour les clubs
      const parent = navigation.getParent();
      if (parent) {
        parent.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'ClubDashboard' }],
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
          <Text style={[styles.title, { color: colors.text }]}>Inscription Club</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Creez un compte pour gerer votre club sportif
          </Text>
        </View>

        {/* Formulaire */}
        <Card padding="lg">
          {/* Nom du club */}
          <Input
            label="Nom du club"
            placeholder="Ex: Tennis Club de Paris"
            value={clubName}
            onChangeText={setClubName}
            error={clubNameError}
            autoCapitalize="words"
            accessibilityLabel="Nom du club"
            accessibilityHint="Entrez le nom de votre club sportif"
          />

          {/* Email */}
          <Input
            label="Email"
            placeholder="contact@club.fr"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            error={emailError}
            accessibilityLabel="Email du club"
            accessibilityHint="Entrez l'adresse email de contact du club"
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

          {/* Message d'erreur global */}
          {error && (
            <View style={styles.errorContainer}>
              <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
            </View>
          )}

          {/* Bouton inscription */}
          <Button
            variant="primary"
            onPress={handleRegister}
            loading={loading}
            disabled={loading}
            accessibilityLabel="S'inscrire en tant que club"
            accessibilityHint="Creer un compte club avec les informations fournies"
          >
            S'inscrire
          </Button>
        </Card>

        {/* Lien vers connexion */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            Vous avez deja un compte ?
          </Text>
          <TouchableOpacity
            onPress={handleNavigateToLogin}
            accessible={true}
            accessibilityLabel="Se connecter"
            accessibilityRole="button"
          >
            <Text style={[styles.footerLink, { color: colors.primary }]}>
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
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  header: {
    marginBottom: spacing.xl,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
  },
  errorContainer: {
    marginVertical: spacing.sm,
    padding: spacing.sm,
    borderRadius: 8,
    backgroundColor: 'rgba(239, 65, 53, 0.1)',
  },
  errorText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
    gap: spacing.xs,
  },
  footerText: {
    fontSize: 14,
    fontWeight: '400',
  },
  footerLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});
