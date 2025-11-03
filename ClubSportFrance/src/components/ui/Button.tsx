import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  Platform,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { typography } from '../../theme/typography';
import { spacing, touchTargetSize, borderRadius } from '../../theme/spacing';

// Types de variants disponibles pour le bouton
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  // Texte affiche sur le bouton
  title: string;
  // Fonction appelee au clic
  onPress: () => void;
  // Variant visuel du bouton
  variant?: ButtonVariant;
  // Taille du bouton
  size?: ButtonSize;
  // Desactiver le bouton
  disabled?: boolean;
  // Afficher indicateur de chargement
  loading?: boolean;
  // Label d'accessibilite (optionnel, utilise title par defaut)
  accessibilityLabel?: string;
  // Hint d'accessibilite pour screen readers
  accessibilityHint?: string;
  // Style personnalise du conteneur
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  accessibilityLabel,
  accessibilityHint,
  style,
}) => {
  const { colors } = useTheme();

  // Determination des styles selon le variant
  const getContainerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      ...styles.baseContainer,
      minHeight: Platform.select({
        ios: touchTargetSize.ios,
        android: touchTargetSize.android,
        default: touchTargetSize.ios,
      }),
    };

    // Styles specifiques par variant
    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: disabled ? colors.disabled : colors.primary,
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: disabled ? colors.disabled : colors.secondary,
        };
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: disabled ? colors.disabled : colors.primary,
        };
      case 'text':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          minHeight: undefined, // Pas de minHeight pour variant text
        };
      default:
        return baseStyle;
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      ...styles.baseText,
      fontSize: getSizeStyles().fontSize,
      fontWeight: typography.fontWeight.semibold,
    };

    // Couleur texte selon variant
    switch (variant) {
      case 'primary':
      case 'secondary':
        return {
          ...baseTextStyle,
          color: colors.textOnPrimary,
        };
      case 'outline':
      case 'text':
        return {
          ...baseTextStyle,
          color: disabled ? colors.disabled : colors.primary,
        };
      default:
        return baseTextStyle;
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          fontSize: typography.fontSize.sm,
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.sm,
        };
      case 'large':
        return {
          fontSize: typography.fontSize.lg,
          paddingHorizontal: spacing.xl,
          paddingVertical: spacing.lg,
        };
      case 'medium':
      default:
        return {
          fontSize: typography.fontSize.base,
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.md,
        };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <TouchableOpacity
      style={[
        getContainerStyle(),
        { paddingHorizontal: sizeStyles.paddingHorizontal, paddingVertical: sizeStyles.paddingVertical },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: disabled || loading }}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' || variant === 'secondary' ? colors.textOnPrimary : colors.primary}
          size="small"
        />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseContainer: {
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    // Touch target minimum respecte automatiquement via minHeight
  },
  baseText: {
    textAlign: 'center',
    lineHeight: typography.lineHeight.tight,
  },
});
