/**
 * Fichier: typography.ts
 *
 * Systeme typographique conforme WCAG 2.1 AA
 * Tailles minimales: 16px pour corps de texte
 */

export const typography = {
  // Font families
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
    light: 'System',
  },

  // Font sizes
  fontSize: {
    xs: 12, // Petit texte (ex: labels)
    sm: 14, // Texte secondaire
    base: 16, // Texte de corps (minimum WCAG)
    lg: 18, // Texte important
    xl: 20, // Titres de section
    '2xl': 24, // Titres de page
    '3xl': 30, // Grands titres
    '4xl': 36, // Tres grands titres
  },

  // Font weights
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },

  // Letter spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
  },
};

export type Typography = typeof typography;
