/**
 * Fichier: index.ts
 *
 * Export centralis du systeme de theme
 * Theme conforme WCAG 2.1 AA
 */

import { lightColors, darkColors, ColorScheme } from './colors';
import { typography, Typography } from './typography';
import { spacing, touchTargetSize, borderRadius, Spacing } from './spacing';

export interface Theme {
  colors: ColorScheme;
  typography: Typography;
  spacing: Spacing;
  touchTargetSize: typeof touchTargetSize;
  borderRadius: typeof borderRadius;
}

export const lightTheme: Theme = {
  colors: lightColors,
  typography,
  spacing,
  touchTargetSize,
  borderRadius,
};

export const darkTheme: Theme = {
  colors: darkColors,
  typography,
  spacing,
  touchTargetSize,
  borderRadius,
};

export { lightColors, darkColors, typography, spacing, touchTargetSize, borderRadius };
export type { ColorScheme, Typography, Spacing };
