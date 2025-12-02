/**
 * Ecran temporaire Dashboard Club
 *
 * Ecran simple pour tester la navigation conditionnelle
 * TODO: Remplacer par ClubTabs complet plus tard (Ma Fiche, Equipes, Statistiques, Parametres)
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';
import { useAuth } from '../../../contexts/AuthContext';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { spacing } from '../../../theme/spacing';

export const ClubDashboardScreen: React.FC = () => {
  const { colors } = useTheme();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          Dashboard Club
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Bienvenue sur votre espace club
        </Text>
      </View>

      <Card padding="lg">
        <Text style={[styles.infoText, { color: colors.text }]}>
          🏢 Compte Club detecte
        </Text>
        <Text style={[styles.infoText, { color: colors.textSecondary }]}>
          Email : {user?.email}
        </Text>
        <Text style={[styles.infoText, { color: colors.textSecondary }]}>
          Nom : {user?.displayName || 'Non defini'}
        </Text>
      </Card>

      <Card padding="lg" style={styles.card}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>
          A venir :
        </Text>
        <Text style={[styles.cardText, { color: colors.textSecondary }]}>
          • Tab "Ma Fiche" - Gerer la fiche du club
        </Text>
        <Text style={[styles.cardText, { color: colors.textSecondary }]}>
          • Tab "Equipes" - CRUD equipes
        </Text>
        <Text style={[styles.cardText, { color: colors.textSecondary }]}>
          • Tab "Statistiques" - Vues, Favoris
        </Text>
        <Text style={[styles.cardText, { color: colors.textSecondary }]}>
          • Tab "Parametres" - Compte, deconnexion
        </Text>
      </Card>

      <Button variant="outline" onPress={handleLogout}>
        Deconnexion
      </Button>
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
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
  infoText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  card: {
    marginVertical: spacing.md,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  cardText: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: spacing.xs,
    lineHeight: 20,
  },
});
