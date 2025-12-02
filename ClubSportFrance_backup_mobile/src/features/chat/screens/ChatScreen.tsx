/**
 * Ecran de chat
 *
 * Affiche les conversations de l'utilisateur avec :
 * - Autres utilisateurs (messagerie 1-to-1)
 * - Clubs sportifs
 * Necessite connexion
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';
import { useAuth } from '../../../contexts/AuthContext';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';

export const ChatScreen: React.FC = () => {
  const { colors } = useTheme();
  const { user } = useAuth();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        💬 Messagerie
      </Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Fonctionnalite de chat a venir
      </Text>
      <Text style={[styles.description, { color: colors.textSecondary }]}>
        Vous pourrez communiquer avec :{'\n'}
        • Les clubs sportifs{'\n'}
        • Les autres utilisateurs{'\n'}
        • Messagerie instantanee 1-to-1{'\n'}
        • Notifications en temps reel
        {'\n\n'}
        Connecte en tant que : {user?.email}
      </Text>
    </View>
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
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.medium,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  description: {
    fontSize: typography.fontSize.base,
    lineHeight: typography.lineHeight.relaxed,
    textAlign: 'center',
  },
});
