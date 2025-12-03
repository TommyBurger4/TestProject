/**
 * Ecran des favoris
 *
 * Affiche la liste des clubs sportifs sauvegardes par l'utilisateur
 * Necessite connexion
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';
import { useAuth } from '../../../contexts/AuthContext';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';

export const FavoritesScreen: React.FC = () => {
  const { colors } = useTheme();
  const { user } = useAuth();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        ⭐ Mes Favoris
      </Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Fonctionnalite favoris a venir
      </Text>
      <Text style={[styles.description, { color: colors.textSecondary }]}>
        Vous pourrez sauvegarder vos clubs preferes et les retrouver rapidement ici.
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
