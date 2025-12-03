/**
 * Ecran de choix du type de compte
 *
 * Permet a l'utilisateur de choisir entre :
 * - Compte Utilisateur (cherche des clubs)
 * - Compte Club (gere son club)
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';
import { spacing } from '../../../theme/spacing';
import { Card } from '../../../components/ui/Card';

interface AccountTypeChoiceScreenProps {
  navigation: any;
}

export const AccountTypeChoiceScreen: React.FC<AccountTypeChoiceScreenProps> = ({
  navigation,
}) => {
  const { colors } = useTheme();

  const handleUserChoice = () => {
    navigation.navigate('Register', { role: 'user' });
  };

  const handleClubChoice = () => {
    navigation.navigate('RegisterClub', { role: 'club' });
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          Bienvenue sur ClubSportFrance
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Choisissez votre type de compte
        </Text>
      </View>

      <View style={styles.choices}>
        {/* Choix Utilisateur */}
        <TouchableOpacity
          onPress={handleUserChoice}
          accessible={true}
          accessibilityLabel="Creer un compte utilisateur"
          accessibilityRole="button"
          accessibilityHint="Je cherche des clubs sportifs"
        >
          <Card padding="lg" style={styles.choiceCard}>
            <View style={styles.choiceContent}>
              <Text style={styles.choiceIcon}>👤</Text>
              <Text style={[styles.choiceTitle, { color: colors.text }]}>
                Je suis un utilisateur
              </Text>
              <Text style={[styles.choiceDescription, { color: colors.textSecondary }]}>
                Je cherche des clubs sportifs a rejoindre
              </Text>
            </View>
            <View
              style={[styles.choiceButton, { backgroundColor: colors.primary }]}
            >
              <Text style={styles.choiceButtonText}>Continuer</Text>
            </View>
          </Card>
        </TouchableOpacity>

        {/* Choix Club */}
        <TouchableOpacity
          onPress={handleClubChoice}
          accessible={true}
          accessibilityLabel="Creer un compte club"
          accessibilityRole="button"
          accessibilityHint="Je gere un club sportif"
        >
          <Card padding="lg" style={styles.choiceCard}>
            <View style={styles.choiceContent}>
              <Text style={styles.choiceIcon}>🏢</Text>
              <Text style={[styles.choiceTitle, { color: colors.text }]}>
                Je suis un club
              </Text>
              <Text style={[styles.choiceDescription, { color: colors.textSecondary }]}>
                Je gere un club sportif et je veux attirer des membres
              </Text>
            </View>
            <View
              style={[styles.choiceButton, { backgroundColor: colors.primary }]}
            >
              <Text style={styles.choiceButtonText}>Continuer</Text>
            </View>
          </Card>
        </TouchableOpacity>
      </View>

      {/* Lien vers connexion */}
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.textSecondary }]}>
          Vous avez deja un compte ?
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
  choices: {
    gap: spacing.lg,
    marginBottom: spacing.xl,
  },
  choiceCard: {
    borderWidth: 2,
    borderColor: 'transparent',
  },
  choiceContent: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  choiceIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  choiceTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  choiceDescription: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 20,
  },
  choiceButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  choiceButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: 'auto',
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
