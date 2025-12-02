/**
 * Fichier: spacing.ts
 *
 * Systeme d'espacement conforme WCAG 2.1 AA
 * Tailles tactiles minimales: 44x44 iOS / 48x48 Android
 */

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
  '4xl': 64,
};

export const touchTargetSize = {
  // Tailles tactiles minimales WCAG 2.1 AA
  ios: 44, // 44x44 points minimum pour iOS
  android: 48, // 48x48 dp minimum pour Android
};

export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
};

export type Spacing = typeof spacing;
