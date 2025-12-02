import React from 'react';
import { View, StyleSheet, ViewStyle, Platform } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { spacing, borderRadius } from '../../theme/spacing';

interface CardProps {
  // Contenu de la card
  children: React.ReactNode;
  // Padding interne de la card
  padding?: 'none' | 'small' | 'medium' | 'large';
  // Afficher une ombre/elevation
  elevated?: boolean;
  // Style personnalise
  style?: ViewStyle;
  // Props d'accessibilite
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityRole?: 'none' | 'button' | 'link' | 'header' | 'summary';
}

export const Card: React.FC<CardProps> = ({
  children,
  padding = 'medium',
  elevated = true,
  style,
  accessible = false,
  accessibilityLabel,
  accessibilityRole = 'none',
}) => {
  const { colors } = useTheme();

  // Determination du padding selon la prop
  const getPaddingValue = () => {
    switch (padding) {
      case 'none':
        return 0;
      case 'small':
        return spacing.sm;
      case 'large':
        return spacing.xl;
      case 'medium':
      default:
        return spacing.md;
    }
  };

  const paddingValue = getPaddingValue();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          padding: paddingValue,
          borderColor: colors.border,
        },
        elevated && styles.elevated,
        style,
      ]}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    overflow: 'hidden', // Assure que le contenu respecte le borderRadius
  },
  elevated: {
    // Shadow iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    // Elevation Android
    elevation: 3,
    // Web fallback
    ...Platform.select({
      web: {
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
});
