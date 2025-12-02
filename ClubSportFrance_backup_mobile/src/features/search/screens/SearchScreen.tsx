/**
 * Ecran de recherche
 *
 * Permet de rechercher des clubs sportifs avec filtres avances :
 * - Par sport
 * - Par ville/region
 * - Par distance
 * - Par equipements
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';

export const SearchScreen: React.FC = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        🔍 Recherche
      </Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Fonctionnalite de recherche avancee a venir
      </Text>
      <Text style={[styles.description, { color: colors.textSecondary }]}>
        Vous pourrez filtrer les clubs par :{'\n'}
        • Sport pratique{'\n'}
        • Ville / Region{'\n'}
        • Distance depuis votre position{'\n'}
        • Equipements disponibles{'\n'}
        • Horaires d'ouverture
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
